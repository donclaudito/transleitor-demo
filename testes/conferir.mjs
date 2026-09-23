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
ok(PAGINAS_DEMO.length === 16, `esperava 16 arquivos de tela em pages/demo; achei ${PAGINAS_DEMO.length}`)

for (const pagina of PAGINAS_DEMO) {
  const fonte = readFileSync(pagina, 'utf8')
  const nome = relative(RAIZ, pagina)
  const temAviso = /from\s*['"]@\/components\/demo\/(TelaDemo|AvisoDemo)['"]/.test(fonte)
  ok(temAviso, `tela sem aviso de demonstração: ${nome}`)
}

// Toda tela declarada na navegação precisa existir de verdade (rota sem arquivo = link morto).
const dadosDemo = readFileSync(join(SRC, 'data', 'demo.js'), 'utf8')
const rotas = [...dadosDemo.matchAll(/rota:\s*'(\/demo\/[a-z-]+)'/g)].map((m) => m[1])
ok(rotas.length === 15, `esperava 15 telas na navegação; achei ${rotas.length}`)

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

// A checagem mede CÓDIGO, não comentário.
//
// ISTO JÁ REPROVOU UM COMENTÁRIO MEU: o mapa do aplicativo documenta de onde vieram os números
// ("lido de `base44/entities` e `base44/functions`") — e o conferidor acusou "referência à
// plataforma". Comentário não faz chamada, e é a quinta vez que este projeto tropeça em medir texto
// bruto: a regra é tirar o comentário antes. A garantia que importa continua sendo dupla — aqui
// nenhum arquivo de `src/` CHAMA nada, e `conferir-no-ar.mjs` confere que o bundle SERVIDO não traz
// a palavra.
const semComentario = (texto) =>
  texto.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

for (const arquivo of ARQUIVOS) {
  const relativo = relative(SRC, arquivo).replace(/\\/g, '/')
  // components/ui é código de terceiro copiado (shadcn) e não é usado nas telas; o resto é nosso.
  if (relativo.startsWith('components/ui/')) continue
  const fonte = semComentario(readFileSync(arquivo, 'utf8'))
  for (const { padrao, motivo } of PROIBIDOS) {
    const achou = padrao.test(fonte)
    ok(!achou, `${motivo} em src/${relativo}`)
  }
}

// CONTROLE NEGATIVO: o removedor não pode estar cegando a checagem. Uma chamada real tem de ser
// acusada mesmo depois de os comentários saírem.
ok(
  /\bfetch\s*\(/.test(semComentario('const x = await fetch("/api") // comentário')),
  'controle negativo: o removedor de comentário cegou a checagem de chamada de rede',
)

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

  // (a) As famílias pedidas têm de ser as das duas referências — e SÓ elas. Se a URL combinada
  //     quebrar, TODAS caem em silêncio e a página inteira aparece na fonte padrão do sistema.
  for (const familia of ['Instrument+Serif', 'Poppins']) {
    ok(html.includes(`family=${familia}`), `o index.html não pede a família "${familia}"`)
  }
  // Fonte que ninguém usa é pedido desperdiçado, e o pedido é de terceiro (ver decisão pendente
  // no README). Inter e Sora saíram quando as páginas da demonstração passaram para a Poppins.
  for (const familia of ['Inter', 'Sora']) {
    ok(!html.includes(`family=${familia}`), `o index.html voltou a pedir "${familia}", que nada usa`)
  }

  // (a2) A DEMONSTRAÇÃO usa a família da referência nas três variáveis. A referência usa UMA
  //      família em pesos diferentes — não duas.
  const raizCss = (() => {
    const semComentario = css.replace(/\/\*[\s\S]*?\*\//g, '')
    const i = semComentario.indexOf(':root')
    const abre = semComentario.indexOf('{', i)
    return semComentario.slice(abre + 1, semComentario.indexOf('}', abre))
  })()
  for (const variavel of ['--font-heading', '--font-body', '--font-display']) {
    const valor = (raizCss.match(new RegExp(`${variavel}\\s*:\\s*([^;]+);`)) || [])[1] || ''
    ok(/Poppins/.test(valor), `${variavel} não está na família da referência: "${valor.trim()}"`)
  }

  // (a3) A AMOSTRA DENTRO DA MOLDURA TEM DE MOSTRAR A FONTE DO APLICATIVO.
  //      A moldura do herói vive dentro de `.tema-oren`, que troca a tipografia por herança. Sem o
  //      reset em `.tema-app`, a "tela real do aplicativo" aparece escrita na serifa da capa —
  //      amostra mentirosa. Este defeito existiu por dois deploys porque nada media a fonte da
  //      amostra: o conferidor de marcas só olha texto, e o texto estava certo.
  const blocoApp = (() => {
    const semComentario = css.replace(/\/\*[\s\S]*?\*\//g, '')
    const i = semComentario.indexOf('.tema-app')
    const abre = semComentario.indexOf('{', i)
    return semComentario.slice(abre + 1, semComentario.indexOf('}', abre))
  })()
  ok(
    /font-family\s*:\s*var\(--font-body\)/.test(blocoApp),
    'a amostra dentro da moldura não reseta a fonte: ela herda a serifa da capa e mente sobre o aplicativo',
  )

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
// 8. NA CAPA, A MARCA É O SUJEITO DA AÇÃO — não "a IA"
//
// Pedido do Dr. Claudio: em todas as partes onde a IA aparece como quem age, quem age é a Oren.AI.
// "A IA muda conforme o setor do paciente" virou "A Oren.AI muda conforme o setor do paciente".
//
// A REGRA É SOBRE O SUJEITO, NÃO SOBRE A PALAVRA. "Multi-modelo de IA", "trilha de IA" e
// "extração de texto por IA" descrevem a CATEGORIA da tecnologia, e trocar ali produziria frase
// errada. Por isso o padrão exige o artigo antes: `a IA` / `o IA` — e é isso que o controle
// negativo logo abaixo protege.
// ---------------------------------------------------------------------------
{
  const semComentario = (texto) =>
    texto.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

  const LANDING = arquivosDe(join(SRC, 'components', 'landing'))
  ok(LANDING.length >= 9, `esperava varrer os componentes da capa; varri ${LANDING.length}`)

  for (const arquivo of LANDING) {
    const fonte = semComentario(readFileSync(arquivo, 'utf8'))
    const achados = [...fonte.matchAll(/\b[ao] IA\b/gi)].map((m) => m[0])
    ok(
      achados.length === 0,
      `a capa voltou a dizer "${achados[0]}" em ${relative(RAIZ, arquivo)} — quem age é a Oren.AI`,
    )
  }

  // CONTROLE NEGATIVO, dois lados: a categoria tem de continuar permitida, e o sujeito tem de ser
  // detectado. Sem os dois, a regra poderia estar proibindo a palavra "IA" — ou não medindo nada.
  ok(!/\b[ao] IA\b/i.test('Multi-modelo de IA'), 'controle negativo: a categoria "de IA" passou a ser proibida')
  ok(/\b[ao] IA\b/i.test('A IA muda conforme o setor'), 'controle negativo: o sujeito "A IA" deixou de ser detectado')
}

// ---------------------------------------------------------------------------
// 9. O MAPA DO APLICATIVO NÃO PODE TER LINK MORTO
//
// O mapa lista as rotas reais do app e aponta, quando existe, para a tela equivalente AQUI. Um
// `demo:` com caminho errado vira link quebrado no meio da demonstração — e o conferidor de rotas
// do App.jsx não pega isso, porque lá a rota existe; o que não existe é o destino do link.
// ---------------------------------------------------------------------------
{
  const mapa = readFileSync(join(SRC, 'data', 'mapaDoApp.js'), 'utf8')
  // Dois destinos diferentes apontam para telas daqui: `demo:` (tela do app que tem equivalente) e
  // `rota:` nos módulos que só existem na demonstração. Os dois precisam existir.
  const apontados = [
    ...[...mapa.matchAll(/demo:\s*'(\/demo\/[a-z-]+)'/g)].map((m) => m[1]),
    ...[...mapa.matchAll(/rota:\s*'(\/demo\/[a-z-]+)'/g)].map((m) => m[1]),
  ]
  ok(apontados.length >= 10, `esperava o mapa apontar para várias telas; apontou ${apontados.length}`)

  const dados = readFileSync(join(SRC, 'data', 'demo.js'), 'utf8')
  const existentes = new Set([...dados.matchAll(/rota:\s*'(\/demo\/[a-z-]+)'/g)].map((m) => m[1]))

  for (const destino of apontados) {
    ok(existentes.has(destino), `o mapa aponta para "${destino}", que não é uma tela desta demonstração`)
  }

  // Controle negativo: um destino inventado tem de ser acusado — senão a conferência acima
  // passaria por não estar medindo nada.
  ok(
    !existentes.has('/demo/nao-existe'),
    'controle negativo: uma rota inexistente foi aceita como tela da demonstração',
  )
}

// ---------------------------------------------------------------------------
// 10. A TELA DE INTEGRAÇÃO NÃO CITA FORNECEDOR
//
// Regra do PRÓPRIO aplicativo: o desenho da integração é genérico e o teste dele reprova citar
// fornecedor na tela. Nome de fornecedor no produto envelhece, exclui os outros e transforma uma
// decisão de arquitetura em preferência comercial. O README pode citar o exemplo medido; a TELA, não.
// ---------------------------------------------------------------------------
{
  const bruto = readFileSync(join(SRC, 'pages', 'demo', 'DemoIntegracoes.jsx'), 'utf8')
  const codigo = bruto.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

  for (const fornecedor of ['Tasy', 'Philips', 'MV', 'Soul MV']) {
    ok(
      !new RegExp(fornecedor, 'i').test(codigo),
      `a tela de integração cita o fornecedor "${fornecedor}" — o desenho é genérico`,
    )
  }
  // Ela TEM de falar de dialeto: é o que substitui o nome do fornecedor.
  ok(/dialeto/i.test(codigo), 'a tela de integração não fala em dialeto — sem isso ela não explica a genericidade')

  // CONTROLE NEGATIVO: o removedor de comentário não pode estar cegando a checagem — o meu próprio
  // comentário acima cita fornecedores, e é assim que ele tem de continuar: fora da medida.
  ok(
    /Tasy/i.test(bruto),
    'controle negativo: o comentário que explica a regra deixou de citar o fornecedor (ou o removedor sumiu com ele)',
  )
}

// ---------------------------------------------------------------------------
// 11. A ASSISTENTE CHAMA-SE ELLAH — e os ids internos continuam `elio`
//
// Regra copiada do aplicativo, onde a troca foi feita em 22/09/2026: o nome que o MÉDICO LÊ muda
// para Ellah, mas os ids internos NÃO — a rota segue `/elio` e a função segue `elioChat`. Renomear
// id interno trocaria a chave do histórico de conversas já salvo e não melhoraria nada para quem usa.
//
// A trava é a mesma de lá: nenhum "elvira" pode sobrar, e o nome novo tem de estar onde se lê.
// ---------------------------------------------------------------------------
{
  // A checagem do aplicativo varre `src/**` E `base44/**`. Aqui não há base44 — mas a regra é a
  // mesma, e o README entra junto porque foi ele que escapou na primeira passada da troca.
  const semComentario = (texto) =>
    texto.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

  for (const arquivo of ARQUIVOS) {
    const fonte = readFileSync(arquivo, 'utf8')
    const nome = relative(RAIZ, arquivo)
    // Comentário também conta: o nome antigo em comentário confunde quem for ler depois.
    ok(!/elvira/i.test(fonte), `sobrou "Elvira" em ${nome}`)
  }

  const readme = readFileSync(join(RAIZ, 'README.md'), 'utf8')
  ok(!/elvira/i.test(readme), 'sobrou "Elvira" no README')

  // O NOME NOVO ONDE SE LÊ: na tela da demonstração e no cartão da capa.
  const pagina = readFileSync(join(SRC, 'pages', 'demo', 'DemoElio.jsx'), 'utf8')
  ok(/Ellah/.test(pagina), 'a tela da assistente não mostra o nome Ellah')
  const capa = readFileSync(join(SRC, 'components', 'landing', 'LandingAgents.jsx'), 'utf8')
  ok(/nome:\s*'Ellah'/.test(capa), 'o cartão da capa não usa o nome Ellah')

  // OS IDS INTERNOS NÃO MUDAM. Se alguém renomear a rota para `/ellah`, isto reprova — e é o
  // ponto: o id é chave, não rótulo.
  const dados = readFileSync(join(SRC, 'data', 'demo.js'), 'utf8')
  ok(/rota:\s*'\/demo\/elio'/.test(dados), 'a rota interna da assistente deixou de ser /demo/elio')
  const app = readFileSync(join(SRC, 'App.jsx'), 'utf8')
  ok(/path="elio"/.test(app), 'a rota da assistente no roteador deixou de ser "elio"')

  // CONTROLE NEGATIVO: a regra tem de PEGAR o nome antigo — senão ela passaria por não medir nada.
  ok(/elvira/i.test(semComentario('const x = "Elvira"')), 'controle negativo: a regra deixou de reconhecer o nome antigo')
}

// ---------------------------------------------------------------------------
// 12. QUEM TRABALHA COM O MÉDICO: profissionais dele + Assistentes da Oren.AI
//
// Três passadas a pedido do Dr. Claudio. A primeira tirou "de IA" e pôs a marca como sujeito
// ("Colegas da Oren.AI"). A segunda tirou "Colegas" do TÍTULO. A terceira tirou a mesma palavra
// do SITE INTEIRO: no texto corrido ela virou "assistente" (a Ellah, três vezes) e "profissional"
// (a metáfora do auditor, duas vezes).
//
// Por isso esta trava é mais larga que as anteriores: não basta vigiar o título, tem de reprovar
// a palavra em qualquer arquivo. As duas primeiras regras (os títulos antigos) ficam porque
// continuam sendo o erro mais provável de alguém reintroduzir.
// ---------------------------------------------------------------------------
{
  const TITULO = 'Nossos profissionais e nossos Assistentes da Oren.AI que trabalham com você'
  const CAPA = join(SRC, 'components', 'landing', 'LandingAgents.jsx')
  const SMOKE = join(RAIZ, 'testes', 'smoke', 'entrada.jsx')
  const README = join(RAIZ, 'README.md')

  for (const arquivo of [...ARQUIVOS, SMOKE, README]) {
    const fonte = readFileSync(arquivo, 'utf8')
    const nome = relative(RAIZ, arquivo)
    ok(!/colegas de ia/i.test(fonte), `voltou "Colegas de IA" em ${nome}`)
    ok(!/colegas da oren\.ai/i.test(fonte), `voltou "Colegas da Oren.AI" em ${nome}`)
    // A palavra, em qualquer forma e em qualquer lugar. Era o buraco que sobrava: o título estava
    // limpo e as cinco frases do texto corrido não.
    ok(!/colega/i.test(fonte), `voltou a palavra antiga do título em ${nome}`)
  }

  // O TÍTULO NOVO ONDE SE LÊ: na capa, no smoke e no README — os três lugares que escaparam
  // em trocas anteriores deste mesmo texto.
  ok(readFileSync(CAPA, 'utf8').includes(TITULO), 'o título novo da seção de agentes saiu da capa')
  ok(readFileSync(SMOKE, 'utf8').includes(TITULO), 'o título novo da seção de agentes saiu do smoke')
  ok(readFileSync(README, 'utf8').includes(TITULO), 'o título novo da seção de agentes saiu do README')

  // AS SUBSTITUIÇÕES DO TEXTO CORRIDO também ficam travadas: se alguém desfizer uma delas, reprova.
  const FRASES_NOVAS = [
    [CAPA, 'Uma assistente virtual com quem você conversa por chat'],
    [CAPA, 'como um profissional revisando o protocolo do hospital'],
    [join(SRC, 'components', 'landing', 'LandingFeatures.jsx'), 'Uma assistente virtual disponível 24h durante o plantão'],
    [join(SRC, 'pages', 'demo', 'DemoElio.jsx'), 'Uma assistente virtual com quem o médico conversa'],
    [join(SRC, 'pages', 'demo', 'DemoSeguranca.jsx'), 'como um profissional revisando o protocolo do hospital'],
  ]
  for (const [arquivo, frase] of FRASES_NOVAS) {
    ok(readFileSync(arquivo, 'utf8').includes(frase), `a frase nova saiu de ${relative(RAIZ, arquivo)}: "${frase}"`)
  }

  // CONTROLE NEGATIVO: as regras têm de PEGAR o que foi proibido.
  ok(/colegas de ia/i.test('Colegas de IA que trabalham com você'),
    'controle negativo: a regra deixou de reconhecer "Colegas de IA"')
  ok(/colegas da oren\.ai/i.test('Colegas da Oren.AI que trabalham com você'),
    'controle negativo: a regra deixou de reconhecer "Colegas da Oren.AI"')
  ok(/colega/i.test('Uma colega virtual com quem você conversa'),
    'controle negativo: a regra deixou de reconhecer a palavra no texto corrido')
  // E o outro lado, para a regra não virar proibição burra de coisa parecida:
  ok(!/colega/i.test('O colégio de médicos reuniu-se ontem'),
    'controle negativo: a regra está reprovando palavra parecida (colégio)')
}

// ---------------------------------------------------------------------------
// 13. CELULAR: tabela não pode ser CORTADA, e o texto pequeno tem piso
//
// Nada disso é visível no desktop, e é exatamente por isso que precisa de trava: um defeito que só
// aparece em tela estreita passa por qualquer revisão feita numa tela larga.
//
// O caso concreto: a tabela do documento cirúrgico estava dentro de `overflow-hidden`. Em tela
// estreita ela era CORTADA — o valor do campo desaparecia, sem barra de rolagem e sem aviso. Trocar
// por `overflow-x-auto` faz rolar em vez de esconder. Esta regra impede que volte.
// ---------------------------------------------------------------------------
{
  // `sep` não é importado aqui de propósito: a barra do caminho varia com o sistema, então a
  // comparação aceita as duas formas em vez de depender de `node:path`.
  const paginas = ARQUIVOS.filter((a) => /[\\/]pages[\\/]/.test(a))

  // COMENTÁRIO FORA DA MEDIÇÃO. Esta regra reprovou a si mesma na primeira execução: o comentário
  // que explica por que o `overflow-hidden` saiu contém a palavra `overflow-hidden`, e o medidor de
  // fonte crua leu a explicação como se fosse o código. É a quinta vez que este projeto tropeça
  // nisso, então a lição fica escrita aqui, no lugar onde ela morde.
  const semComentario = (t) =>
    t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

  // Toda tabela de página precisa de contenção por perto, senão ela estoura a largura do celular.
  let tabelasVistas = 0
  for (const arquivo of paginas) {
    const fonte = semComentario(readFileSync(arquivo, 'utf8'))
    const nome = relative(RAIZ, arquivo)
    for (const m of fonte.matchAll(/<table\b/g)) {
      tabelasVistas++
      const antes = fonte.slice(Math.max(0, m.index - 400), m.index)
      ok(antes.includes('overflow-x-auto'),
        `${nome}: <table> sem contêiner "overflow-x-auto" por perto — em tela estreita ela é cortada`)
      ok(!antes.includes('overflow-hidden'),
        `${nome}: <table> dentro de "overflow-hidden" — em tela estreita o conteúdo some em silêncio`)
    }
  }
  // CONTROLE NEGATIVO da própria busca: se o padrão parar de casar, a regra acima passaria vazia.
  ok(tabelasVistas >= 3, `controle negativo: a busca por <table> achou só ${tabelasVistas} — a regra está medindo pouco`)

  // E o controle dos DOIS LADOS do medidor de comentário, que é o que quase me enganou:
  // (a) um comentário que apenas CITA o problema não pode reprovar;
  // (b) um problema de verdade, no código, tem de reprovar.
  ok(!semComentario('<div className="overflow-x-auto">\n{/* antes era overflow-hidden */}').includes('overflow-hidden'),
    'controle negativo: o medidor está lendo comentário como se fosse código')
  ok(semComentario('<div className="overflow-hidden">').includes('overflow-hidden'),
    'controle negativo: o medidor deixou de reconhecer um overflow-hidden de verdade no código')

  // O piso de leitura móvel: a classe no molde, a regra no CSS e o ponto de quebra certo.
  const molde = readFileSync(join(SRC, 'components', 'demo', 'DemoShell.jsx'), 'utf8')
  ok(/leitura-no-celular/.test(molde), 'o molde da demonstração perdeu a classe do piso de leitura')

  const css = readFileSync(join(SRC, 'index.css'), 'utf8')
  ok(/@media \(max-width: 639px\)/.test(css), 'o piso de leitura do celular saiu do CSS')
  ok(/\.leitura-no-celular \.text-\\\[10px\\\]/.test(css), 'o piso de leitura deixou de cobrir os rótulos de 10px')
  ok(/\.leitura-no-celular \.text-\\\[11px\\\]/.test(css), 'o piso de leitura deixou de cobrir os rótulos de 11px')
  // E NÃO pode subir o text-xs: é o corpo de texto do aplicativo, e mexer nele empurraria o layout.
  ok(!/leitura-no-celular \.text-xs/.test(css), 'o piso de leitura passou a subir o text-xs, que é o corpo do aplicativo')

  // O alvo de toque das telas interativas: no celular, maior; a partir de 640px, o do aplicativo.
  const evolucao = readFileSync(join(SRC, 'pages', 'demo', 'DemoEvolucao.jsx'), 'utf8')
  ok(/px-3 py-2 text-xs font-semibold transition-colors sm:py-1\.5/.test(evolucao),
    'o seletor de especialidade perdeu o alvo de toque maior no celular')
  ok(/px-2\.5 py-2 text-xs transition-all sm:py-1/.test(evolucao),
    'os itens do painel perderam o alvo de toque maior no celular')
}

// ---------------------------------------------------------------------------
// 14. "ONDE VIVE" SAIU DA TELA DE CONFORMIDADE
//
// Pedido do Dr. Claudio (22/09/2026): o campo mostrava o caminho do arquivo DENTRO do aplicativo
// (`{n.onde}`) em cada cartão de normativa. Isso é detalhe de implementação, e numa página de
// apresentação não ajuda quem lê.
//
// O DADO continua em `src/data/conformidade.js` — o que saiu foi a EXIBIÇÃO. E o resto da
// auditabilidade permanece: o bloco de Fontes e a coluna "Onde o aplicativo implementa" da tabela
// de LGPD não foram tocados, e as duas asserções abaixo existem justamente para garantir que
// ninguém, ao limpar o campo removido, leve junto o que foi pedido para ficar.
// ---------------------------------------------------------------------------
{
  const tela = readFileSync(join(SRC, 'pages', 'demo', 'DemoConformidade.jsx'), 'utf8')
  const semComentario = (t) =>
    t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
  const codigo = semComentario(tela)

  ok(!/Onde vive/.test(codigo), 'o rótulo "Onde vive" voltou à tela de conformidade')
  ok(!/\{n\.onde\}/.test(codigo), 'a tela de conformidade voltou a exibir o caminho do arquivo (n.onde)')
  // A descrição da tela não pode prometer o que a tela não faz mais.
  ok(!/Cada item diz de onde foi lido/.test(codigo),
    'a descrição da tela promete o campo "Onde vive", que foi removido')

  // O QUE FICOU — e que não pode ser removido por arrasto:
  ok(/\{a\.onde\}/.test(codigo),
    'a coluna "Onde o aplicativo implementa" da tabela de LGPD saiu sem ter sido pedida')
  ok(/FONTES/.test(codigo), 'o bloco de Fontes saiu da tela de conformidade sem ter sido pedido')

  // CONTROLE NEGATIVO: a regra tem de PEGAR o que foi removido.
  ok(/Onde vive/.test('Onde vive'), 'controle negativo: a regra deixou de reconhecer o rótulo removido')
  ok(/\{n\.onde\}/.test('{n.onde}'), 'controle negativo: a regra deixou de reconhecer a expressão removida')
  // E o outro lado: a expressão da tabela de LGPD NÃO pode ser confundida com a removida.
  ok(!/\{n\.onde\}/.test('{a.onde}'),
    'controle negativo: a regra está confundindo {a.onde} (tabela, ficou) com {n.onde} (cartão, saiu)')
}

// ---------------------------------------------------------------------------
// 15. ALINHAMENTO DOS CARTÕES E DO CABEÇALHO NO CELULAR
//
// Dois defeitos que só aparecem em tela estreita — e por isso não têm como ser vistos numa revisão
// feita no computador, que é justamente onde este projeto foi revisado até agora.
//
// (a) O link "Abrir esta tela" do /demo estava com `mt-2` em vez de `mt-auto`. Sem `mt-auto` ele NÃO
//     fica preso no rodapé do cartão: sobe ou desce conforme o tamanho do resumo, e quando a grade
//     vira duas colunas os dois links ficam em alturas diferentes. `LandingAgents` e `DemoPassagem`
//     já usavam `mt-auto` — o /demo era o único fora do padrão, e é o defeito que o Dr. Claudio viu.
// (b) O rótulo "Voltar à apresentação" do cabeçalho ocupa ~130px e, somado à marca, aperta os 320px
//     das telas menores. A linha não encolhe (`min-width: auto` no item de flex): ela TRANSBORDA, e
//     a página ganha rolagem horizontal — que é o que faz o conteúdo parecer fora de alinhamento.
// ---------------------------------------------------------------------------
{
  const semComentario = (t) =>
    t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

  const indice = semComentario(readFileSync(join(SRC, 'pages', 'demo', 'DemoIndex.jsx'), 'utf8'))
  ok(/mt-auto[^"]*text-xs font-bold text-primary/.test(indice),
    'o link "Abrir esta tela" do /demo perdeu o mt-auto e voltou a desalinhar entre as colunas')
  ok(!/mt-2 inline-flex/.test(indice),
    'o link "Abrir esta tela" do /demo voltou ao mt-2, que não prende o link no rodapé do cartão')

  const molde = semComentario(readFileSync(join(SRC, 'components', 'demo', 'DemoShell.jsx'), 'utf8'))
  ok(/sm:hidden">Voltar</.test(molde),
    'o botão de voltar do cabeçalho perdeu a versão curta do celular (o rótulo longo transborda em tela estreita)')

  // (c) O DEFEITO DE VERDADE do celular, medido no navegador: o `<nav>` é item de grid e nasce com
  //     `min-width: auto`, então NÃO encolhia abaixo do conteúdo — a faixa das 15 telas, 3010px numa
  //     tela de 390px. A coluna do grid virava 3010px, o `main` herdava, e a PÁGINA INTEIRA passava a
  //     rolar de lado: tudo espremido nos primeiros 390px. Medido: `scrollWidth` 3026 -> 390.
  //     O `main` já tinha `min-w-0`; o `nav` não. Sem esta asserção, volta no próximo ajuste.
  ok(/<nav[^>]*className="[^"]*min-w-0/.test(molde),
    'o <nav> da demonstração perdeu o min-w-0 — item de grid sem ele faz a página inteira transbordar no celular')
  ok(/<main[^>]*className="[^"]*min-w-0/.test(molde),
    'o <main> da demonstração perdeu o min-w-0')

  // CONTROLE NEGATIVO dos dois lados: a regra tem de PEGAR o errado e ACEITAR o certo.
  ok(/mt-2 inline-flex/.test(semComentario('<span className="mt-2 inline-flex">x</span>')),
    'controle negativo: a regra deixou de reconhecer o mt-2 que precisa ser reprovado')
  ok(/mt-auto/.test(semComentario('<span className="mt-auto inline-flex">x</span>')),
    'controle negativo: a regra deixou de reconhecer o mt-auto correto')
  ok(!/<nav[^>]*className="[^"]*min-w-0/.test('<nav className="flex">'),
    'controle negativo: a regra está aceitando um <nav> SEM min-w-0')
}

// ---------------------------------------------------------------------------
console.log(`\n${assercoes} asserções, ${falhas.length} falha(s)`)
if (falhas.length) {
  console.log('\nFALHAS:')
  for (const f of falhas) console.log(`  ✗ ${f}`)
  process.exit(1)
}
console.log('Todas as conferências passaram.')
