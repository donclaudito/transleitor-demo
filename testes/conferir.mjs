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
ok(PAGINAS_DEMO.length === 12, `esperava 12 arquivos de tela em pages/demo; achei ${PAGINAS_DEMO.length}`)

for (const pagina of PAGINAS_DEMO) {
  const fonte = readFileSync(pagina, 'utf8')
  const nome = relative(RAIZ, pagina)
  const temAviso = /from\s*['"]@\/components\/demo\/(TelaDemo|AvisoDemo)['"]/.test(fonte)
  ok(temAviso, `tela sem aviso de demonstração: ${nome}`)
}

// Toda tela declarada na navegação precisa existir de verdade (rota sem arquivo = link morto).
const dadosDemo = readFileSync(join(SRC, 'data', 'demo.js'), 'utf8')
const rotas = [...dadosDemo.matchAll(/rota:\s*'(\/demo\/[a-z-]+)'/g)].map((m) => m[1])
ok(rotas.length === 11, `esperava 11 telas na navegação; achei ${rotas.length}`)

const app = readFileSync(join(SRC, 'App.jsx'), 'utf8')
for (const rota of rotas) {
  const caminho = rota.replace('/demo/', '')
  ok(app.includes(`path="${caminho}"`), `rota "${rota}" está na navegação mas não está declarada em App.jsx`)
}

// ---------------------------------------------------------------------------
// 3. Arquivo com acento não pode ter sido gravado torto (mojibake)
//
// ISTO JÁ FALHOU UMA VEZ, E A CHECAGEM NÃO PEGOU — porque ela só olhava `src/`.
// Em 22/09/2026 um `Get-Content | Set-Content` do PowerShell passou o README de UTF-8 para CP1252 e
// de volta: o arquivo inteiro virou `Ã©`, `Ã£`, `Ã§`. As 608 asserções da época passaram verdes,
// porque nenhuma delas lia o README. O conserto foi `git checkout` + ferramenta de edição.
// Agora a conferência cobre TAMBÉM os arquivos de texto do projeto (não só os de `src/`).
// ---------------------------------------------------------------------------
const ARQUIVOS_DE_TEXTO = [
  'README.md',
  'index.html',
  'package.json',
  'vercel.json',
  'vite.config.js',
  'tailwind.config.js',
  'eslint.config.js',
  '.github/workflows/deploy-pages.yml',
  'ferramentas/gerar-icones-oren.py',
  ...arquivosDe(join(RAIZ, 'testes')),
]

ok(ARQUIVOS_DE_TEXTO.length > 8, `esperava cobrir os arquivos de texto do projeto; cobri ${ARQUIVOS_DE_TEXTO.length}`)

for (const relativo of ARQUIVOS_DE_TEXTO) {
  // `resolve`, e não `join`: esta lista mistura nome relativo ('README.md') com caminho absoluto
  // (o que `arquivosDe` devolve), e `join` concatenaria os dois.
  const arquivo = resolve(RAIZ, relativo)
  if (!existsSync(arquivo)) {
    ok(false, `arquivo de texto esperado não existe: ${relativo}`)
    continue
  }
  const texto = readFileSync(arquivo, 'utf8')
  ok(!texto.includes('\uFFFD'), `caractere de substituição (U+FFFD) em ${relativo}`)
  // "Ã©", "Ã£", "Ã§" são mojibake de verdade. "Ã" isolado NÃO é: "NÃO" e "CIRURGIÃO" têm Ã legítimo.
  ok(!/Ã[©£§µº]/.test(texto), `mojibake (Ã©/Ã£/Ã§) em ${relativo}`)
}

for (const arquivo of ARQUIVOS) {
  const texto = readFileSync(arquivo, 'utf8')
  const nome = relative(RAIZ, arquivo)
  ok(!texto.includes('\uFFFD'), `caractere de substituição (U+FFFD) em ${nome}`)
  ok(!/Ã[©£§µº]/.test(texto), `mojibake (Ã©/Ã£/Ã§) em ${nome}`)
}

// ---------------------------------------------------------------------------
// 3-B. O ESPELHO DO TEMA DO APLICATIVO NÃO PODE DIVERGIR
//
// A capa veste a identidade Oren.AI por escopo (`.tema-oren`). A moldura dentro dela devolve o
// tema do aplicativo (`.tema-app`) para a amostra não virar ficção — e esse bloco REPETE os
// valores de `:root`. Cópia que ninguém confere é cópia que envelhece: aqui a divergência reprova.
// ---------------------------------------------------------------------------
{
  // Medir código é tirar o comentário antes — já produziu falso positivo neste projeto.
  const css = readFileSync(join(SRC, 'index.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')

  const blocoDe = (seletor) => {
    const inicio = css.indexOf(seletor)
    if (inicio < 0) return null
    const abre = css.indexOf('{', inicio)
    const fecha = css.indexOf('}', abre)
    if (abre < 0 || fecha < 0) return null
    return css.slice(abre + 1, fecha)
  }

  const declaracoes = (texto) => {
    const mapa = new Map()
    if (!texto) return mapa
    for (const m of texto.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) mapa.set(m[1], m[2].trim())
    return mapa
  }

  const raiz = declaracoes(blocoDe(':root'))
  const espelho = declaracoes(blocoDe('.tema-app'))
  const capa = declaracoes(blocoDe('.tema-oren'))

  ok(raiz.size > 10, `esperava variáveis em :root; achei ${raiz.size}`)
  ok(espelho.size > 10, `esperava variáveis em .tema-app; achei ${espelho.size}`)
  ok(capa.size > 10, `esperava variáveis em .tema-oren; achei ${capa.size}`)

  for (const [nome, valor] of espelho) {
    ok(
      raiz.get(nome) === valor,
      `o espelho .tema-app divergiu de :root em ${nome}: "${valor}" contra "${raiz.get(nome)}"`,
    )
  }

  // Controle negativo: se o tema da capa ficasse igual ao do aplicativo, a conferência acima
  // passaria por acidente (dois blocos copiados iguais) e a capa sairia sem identidade própria.
  ok(
    capa.get('--primary') !== raiz.get('--primary'),
    'controle negativo: o tema da capa está com a mesma cor primária do aplicativo',
  )
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
// 6. ÍCONE DA MARCA: o que a página pede tem de existir de verdade
//
// Arquivo de ícone ausente não quebra build nem lint: a página abre com um quadradinho vazio na
// aba, e ninguém percebe até alguém olhar a aba. Esta conferência fecha esse silêncio.
// ---------------------------------------------------------------------------
{
  const html = readFileSync(join(RAIZ, 'index.html'), 'utf8')
  const pedidos = [...html.matchAll(/(?:href|src)="\/([^"]+\.(?:png|svg|ico|webmanifest))"/g)].map((m) => m[1])

  ok(pedidos.length >= 2, `esperava ícones declarados no index.html; achei ${pedidos.length}`)
  for (const arquivo of pedidos) {
    ok(existsSync(join(RAIZ, 'public', arquivo)), `index.html pede "/${arquivo}", que não existe em public/`)
  }

  const emblema = readFileSync(join(SRC, 'components', 'marca', 'OrenEmblema.jsx'), 'utf8')
  const usados = [...emblema.matchAll(/`\$\{BASE\}([^`]+)`/g)].map((m) => m[1])
  ok(usados.length >= 1, 'não achei o arquivo do emblema referenciado em OrenEmblema.jsx')
  for (const arquivo of usados) {
    ok(existsSync(join(RAIZ, 'public', arquivo)), `OrenEmblema aponta para "${arquivo}", que não existe em public/`)
  }

  // O EMBLEMA DESENHADO À MÃO NÃO PODE VOLTAR.
  // A primeira versão trazia um SVG meu, aproximado da marca a partir de uma imagem pequena — e
  // aproximação de marca é erro: o traçado e a cor não eram os da marca. Agora existe UM só
  // emblema, o arquivo oficial. Um `viewBox` aqui significa que alguém voltou a desenhar.
  ok(
    !/viewBox/.test(emblema),
    'OrenEmblema.jsx voltou a desenhar o emblema em SVG — tem de usar o arquivo da marca',
  )
}

// ---------------------------------------------------------------------------
// 7. TIPOGRAFIA DA CAPA — as armadilhas silenciosas da serifa display
//
// Nenhuma delas quebra build, lint ou teste de renderização: a página simplesmente aparece com a
// fonte errada, ou com o negrito FABRICADO pelo navegador borrando as hairlines da serifa. Por isso
// cada uma vira asserção.
// ---------------------------------------------------------------------------
{
  const html = readFileSync(join(RAIZ, 'index.html'), 'utf8')
  const css = readFileSync(join(SRC, 'index.css'), 'utf8')

  // (a) As três famílias têm de ser pedidas — se a URL combinada quebrar, TODAS caem em silêncio,
  //     inclusive a Inter, que é a fonte do corpo do aplicativo inteiro.
  for (const familia of ['Inter', 'Instrument+Serif', 'Sora']) {
    ok(html.includes(`family=${familia}`), `o index.html não pede a família "${familia}"`)
  }

  // (b) Fonte por <link>, nunca por `@import` dentro do CSS: `@import` é render-blocking e
  //     serializa a descoberta (o navegador só descobre o CSS de fonte depois de baixar o nosso).
  ok(!/@import\s+url\(/.test(css), 'o index.css voltou a carregar fonte por @import (deve ser <link> no index.html)')

  // (c) A capa tem de usar SERIFA. Se alguém trocar por uma sans, a página fica com a fonte errada
  //     e nada acusa.
  const blocoOren = (() => {
    const semComentario = css.replace(/\/\*[\s\S]*?\*\//g, '')
    const i = semComentario.indexOf('.tema-oren')
    const abre = semComentario.indexOf('{', i)
    return semComentario.slice(abre + 1, semComentario.indexOf('}', abre))
  })()
  const fonteDaCapa = (blocoOren.match(/--font-display\s*:\s*([^;]+);/) || [])[1] || ''
  ok(/Instrument Serif/.test(fonteDaCapa), `a capa não usa a serifa display: "${fonteDaCapa.trim()}"`)
  ok(/\bserif\b\s*$/.test(fonteDaCapa.trim()), `a cadeia de fallback não termina em serif: "${fonteDaCapa.trim()}"`)

  // (d) PESO 400 NA MANCHETE **E EM TODA A CAPA**. A Instrument Serif só existe em 400; com
  //     `font-bold` o navegador FABRICA o negrito, e numa serifa de alto contraste isso borra as
  //     hairlines. A capa usa peso único, com `!important`, porque a ênfase é por COR.
  ok(
    /\.tema-oren h1,\s*\.tema-oren h2\s*\{[^}]*font-weight:\s*400/.test(css),
    'as manchetes da capa não estão fixadas em peso 400 (risco de negrito fabricado)',
  )
  ok(
    /\.tema-oren \*[^{]*\{[^}]*font-weight:\s*400\s*!important/.test(css),
    'o peso único da capa caiu: `font-bold` de qualquer cartão voltaria a fabricar negrito na serifa',
  )

  // (e) A CAPA INTEIRA NA SERIFA, não só a manchete. Pedido do Dr. Claudio: manter a fonte "de
  //     forma proporcional nas outras partes" — texto corrido, botões, legenda e passos.
  ok(
    /\.tema-oren\s*\{[^}]*font-family:\s*var\(--font-display\)/.test(css),
    'a capa voltou a herdar a sans do aplicativo: só as manchetes ficariam na serifa',
  )
  ok(
    /\.tema-oren h3,\s*\.tema-oren h4\s*\{[^}]*font-family:\s*var\(--font-display\)/.test(css),
    'os títulos de cartão da capa saíram da serifa da marca',
  )

  // (f) ESCALA PROPORCIONAL. A serifa lê menor que a sans: as classes minúsculas (10/11px e xs)
  //     sobem um degrau dentro da capa. Sem isto, o rótulo pequeno fica apagado.
  //     Conferido por texto e não por expressão regular: os seletores têm colchete escapado
  //     (`.text-\[10px\]`), e montar isso em RegExp erra fácil — errei na primeira tentativa.
  for (const seletor of ['.tema-oren .text-\\[10px\\]', '.tema-oren .text-\\[11px\\]', '.tema-oren .text-xs']) {
    const i = css.indexOf(seletor)
    const corpo = i >= 0 ? css.slice(i, css.indexOf('}', i)) : ''
    ok(/font-size/.test(corpo), `a escala proporcional da capa perdeu "${seletor}"`)
  }

  // (g) A LINHA REMOVIDA NÃO PODE VOLTAR.
  //     "Inteligência Cirúrgica por Oren.AI" saiu a pedido do Dr. Claudio, e o conferidor de marcas
  //     do render NÃO pega o retorno dela (ele só confere o que TEM de aparecer). Registrado aqui.
  //
  //     MEDIR CÓDIGO É TIRAR O COMENTÁRIO ANTES — esta checagem nasceu reprovando a si mesma,
  //     porque a frase citada no comentário logo acima contava como ocorrência. É a quarta vez
  //     que este projeto tropeça nisso; a regra vale para quem escrever a próxima.
  const semComentario = (texto) =>
    texto.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

  const LANDING = arquivosDe(join(SRC, 'components', 'landing'))
  ok(LANDING.length >= 9, `esperava varrer os componentes da capa; varri ${LANDING.length}`)
  for (const arquivo of LANDING) {
    const fonte = semComentario(readFileSync(arquivo, 'utf8'))
    ok(
      !/Inteligência Cirúrgica por Oren\.AI/i.test(fonte),
      `a linha removida voltou em ${relative(RAIZ, arquivo)}: "Inteligência Cirúrgica por Oren.AI"`,
    )
  }

  // Controle negativo do removedor de comentário: uma ocorrência REAL tem de ser acusada mesmo
  // depois de os comentários saírem — senão a checagem acima passaria por estar medindo o vazio.
  ok(
    /Inteligência Cirúrgica por Oren\.AI/i.test('const x = "Inteligência Cirúrgica por Oren.AI"'),
    'controle negativo: a marca textual deixou de ser reconhecida fora de comentário',
  )
}

// ---------------------------------------------------------------------------
console.log(`\n${assercoes} asserções, ${falhas.length} falha(s)`)
if (falhas.length) {
  console.log('\nFALHAS:')
  for (const f of falhas) console.log(`  ✗ ${f}`)
  process.exit(1)
}
console.log('Todas as conferências passaram.')
