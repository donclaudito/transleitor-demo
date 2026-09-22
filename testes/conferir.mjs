// ============================================================================
// CONFERÊNCIAS DO SITE DE DEMONSTRAÇÃO
//
// Por que este arquivo existe: no projeto de onde esta demonstração saiu, três telas morreram em
// produção pelo mesmo motivo — um import que não resolve. Em JavaScript, `import { coisa } from
// './modulo'` onde `coisa` não é exportado NÃO é erro de build: o identificador vira `undefined`
// e a tela só quebra na hora de desenhar. Build verde, lint verde, tela morta.
//
// Então aqui não se confia no build. Roda com:  node testes/conferir.mjs
// ============================================================================
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'

const RAIZ = resolve(import.meta.dirname, '..')
const SRC = join(RAIZ, 'src')

let assercoes = 0
const falhas = []

function ok(condicao, descricao) {
  assercoes++
  if (!condicao) falhas.push(descricao)
}

function arquivosDe(diretorio, extensoes = ['.js', '.jsx']) {
  const saida = []
  for (const entrada of readdirSync(diretorio)) {
    const caminho = join(diretorio, entrada)
    if (statSync(caminho).isDirectory()) saida.push(...arquivosDe(caminho, extensoes))
    else if (extensoes.some((e) => caminho.endsWith(e))) saida.push(caminho)
  }
  return saida
}

const ARQUIVOS = arquivosDe(SRC)

// ---------------------------------------------------------------------------
// 0. Controle negativo do próprio conferidor
// Sem isto, um conferidor quebrado (que não acha nada) passaria como "tudo certo".
// ---------------------------------------------------------------------------
{
  const fonte = "import { naoExiste } from '@/lib/utils'"
  const nomes = [...fonte.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)]
  ok(nomes.length === 1, 'controle negativo: o extrator de imports não achou o import sintético')
  ok(nomes[0]?.[1].trim() === 'naoExiste', 'controle negativo: o extrator devolveu o nome errado')
}

// ---------------------------------------------------------------------------
// 1. Todo import nomeado de módulo local aponta para um export que existe
// ---------------------------------------------------------------------------
const exportacoesDe = (caminho) => {
  const bruto = readFileSync(caminho, 'utf8')
  // Comentário não é código: medir o fonte bruto já produziu falso positivo neste projeto.
  const fonte = bruto.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
  const nomes = new Set()
  for (const m of fonte.matchAll(/export\s+(?:async\s+)?(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g)) nomes.add(m[1])
  for (const m of fonte.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const parte of m[1].split(',')) {
      const limpo = parte.trim()
      if (!limpo) continue
      const apelido = limpo.split(/\s+as\s+/)
      nomes.add((apelido[1] || apelido[0]).trim())
    }
  }
  if (/export\s+default/.test(fonte)) nomes.add('default')
  return nomes
}

const cacheExportacoes = new Map()
const exportacoesComCache = (caminho) => {
  if (!cacheExportacoes.has(caminho)) cacheExportacoes.set(caminho, exportacoesDe(caminho))
  return cacheExportacoes.get(caminho)
}

const resolverLocal = (origem, especificador) => {
  let base
  if (especificador.startsWith('@/')) base = join(SRC, especificador.slice(2))
  else if (especificador.startsWith('.')) base = resolve(dirname(origem), especificador)
  else return null

  for (const tentativa of [base, `${base}.js`, `${base}.jsx`, join(base, 'index.js'), join(base, 'index.jsx')]) {
    if (existsSync(tentativa) && statSync(tentativa).isFile()) return tentativa
  }
  return null
}

let importsConferidos = 0
for (const arquivo of ARQUIVOS) {
  const fonte = readFileSync(arquivo, 'utf8')
  for (const m of fonte.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    const destino = resolverLocal(arquivo, m[2])
    if (!destino) continue
    const disponiveis = exportacoesComCache(destino)
    for (const parte of m[1].split(',')) {
      const limpo = parte.trim()
      if (!limpo) continue
      const nome = limpo.split(/\s+as\s+/)[0].trim()
      importsConferidos++
      ok(
        disponiveis.has(nome),
        `import quebrado: "${nome}" não é exportado por ${relative(RAIZ, destino)} (usado em ${relative(RAIZ, arquivo)})`,
      )
    }
  }
}
ok(importsConferidos > 50, `esperava conferir muitos imports nomeados; conferi ${importsConferidos}`)

// ---------------------------------------------------------------------------
// 2. Nenhuma tela da demonstração nasce sem aviso
// A regra dura desta peça: quem abre um link direto precisa saber que é ilustrativo.
// ---------------------------------------------------------------------------
const PAGINAS_DEMO = arquivosDe(join(SRC, 'pages', 'demo'))
ok(PAGINAS_DEMO.length === 11, `esperava 11 arquivos de tela em pages/demo; achei ${PAGINAS_DEMO.length}`)

for (const pagina of PAGINAS_DEMO) {
  const fonte = readFileSync(pagina, 'utf8')
  const nome = relative(RAIZ, pagina)
  const temAviso = /from\s*['"]@\/components\/demo\/(TelaDemo|AvisoDemo)['"]/.test(fonte)
  ok(temAviso, `tela sem aviso de demonstração: ${nome}`)
}

// Toda tela declarada na navegação precisa existir de verdade (rota sem arquivo = link morto).
const dadosDemo = readFileSync(join(SRC, 'data', 'demo.js'), 'utf8')
const rotas = [...dadosDemo.matchAll(/rota:\s*'(\/demo\/[a-z-]+)'/g)].map((m) => m[1])
ok(rotas.length === 10, `esperava 10 telas na navegação; achei ${rotas.length}`)

const app = readFileSync(join(SRC, 'App.jsx'), 'utf8')
for (const rota of rotas) {
  const caminho = rota.replace('/demo/', '')
  ok(app.includes(`path="${caminho}"`), `rota "${rota}" está na navegação mas não está declarada em App.jsx`)
}

// ---------------------------------------------------------------------------
// 3. Arquivo com acento não pode ter sido gravado torto (mojibake)
// ---------------------------------------------------------------------------
for (const arquivo of ARQUIVOS) {
  const texto = readFileSync(arquivo, 'utf8')
  const nome = relative(RAIZ, arquivo)
  ok(!texto.includes('\uFFFD'), `caractere de substituição (U+FFFD) em ${nome}`)
  // "Ã©", "Ã£", "Ã§" são mojibake de verdade. "Ã" isolado NÃO é: "NÃO" e "CIRURGIÃO" têm Ã legítimo.
  ok(!/Ã[©£§µº]/.test(texto), `mojibake (Ã©/Ã£/Ã§) em ${nome}`)
}

// ---------------------------------------------------------------------------
// 4. A tabela de conteúdo clínico reaproveitada continua íntegra e legível
// ---------------------------------------------------------------------------
{
  const tabela = readFileSync(join(SRC, 'data', 'paineisEspecialidade.js'), 'utf8')
  const areasEsperadas = ['urologia', 'cardiologia', 'pneumologia', 'dermatologia', 'ortopedia', 'pediatria', 'oftalmologia', 'endocrino', 'ginecologia']
  for (const area of areasEsperadas) {
    ok(new RegExp(`^  ${area}: \\{`, 'm').test(tabela), `área "${area}" sumiu da tabela de painéis`)
  }
  // Acento legível é a prova de que a cópia preservou o UTF-8 (não passou por Set-Content).
  ok(tabela.includes('Polaciúria') || tabela.includes('Hematúria'), 'a tabela de painéis perdeu acentuação legível')
  ok(tabela.includes('NÃO') || tabela.includes('não'), 'a tabela de painéis perdeu texto em português')
}

// ---------------------------------------------------------------------------
// 5. A demonstração não pode falar com nada: sem backend, sem chave, sem chamada de rede
// ---------------------------------------------------------------------------
const PROIBIDOS = [
  { padrao: /base44/i, motivo: 'referência à plataforma base44' },
  { padrao: /\bfetch\s*\(/, motivo: 'chamada fetch' },
  { padrao: /XMLHttpRequest/, motivo: 'XMLHttpRequest' },
  { padrao: /api[_-]?key/i, motivo: 'menção a chave de API' },
  { padrao: /supabase|firebase|axios/i, motivo: 'cliente de backend' },
  { padrao: /localStorage|sessionStorage/, motivo: 'armazenamento no navegador' },
]

for (const arquivo of ARQUIVOS) {
  const relativo = relative(SRC, arquivo).replace(/\\/g, '/')
  // components/ui é código de terceiro copiado (shadcn) e não é usado nas telas; o resto é nosso.
  if (relativo.startsWith('components/ui/')) continue
  const fonte = readFileSync(arquivo, 'utf8')
  for (const { padrao, motivo } of PROIBIDOS) {
    const achou = padrao.test(fonte)
    ok(!achou, `${motivo} em src/${relativo}`)
  }
}

// ---------------------------------------------------------------------------
console.log(`\n${assercoes} asserções, ${falhas.length} falha(s)`)
if (falhas.length) {
  console.log('\nFALHAS:')
  for (const f of falhas) console.log(`  ✗ ${f}`)
  process.exit(1)
}
console.log('Todas as conferências passaram.')
