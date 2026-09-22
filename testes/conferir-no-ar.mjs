// ============================================================================
// CONFERIR O QUE ESTÁ NO AR
//
// Conferir que o arquivo foi ENVIADO não prova que ele é SERVIDO. Neste projeto de origem esse
// engano já produziu a afirmação "produção intacta" quando não estava. O jeito certo é:
//
//   1. buscar a página servida;
//   2. ler QUAL bundle ELA referencia (não o que foi construído);
//   3. baixar ESSE arquivo e procurar marcas de TEXTO DE TELA — o minificador renomeia nome de
//      função, então procurar por `htmlSeguro` ou `TelaDemo` não provaria nada.
//
// Uso:  node testes/conferir-no-ar.mjs https://seu-site.vercel.app
//
// ARMADILHA MEDIDA (24/09/2026): procurar estas marcas com `Get-Content` do PowerShell deu FALSO
// NEGATIVO em toda marca acentuada — "Inteligência Cirúrgica" aparecia como ausente no bundle,
// enquanto o Node lia 11/11. Era decodificação do terminal, não defeito do site. Este arquivo usa
// `fetch` + `response.text()`, que decodificam UTF-8 corretamente. Se um dia a conferência acusar
// ausência só em texto acentuado, desconfie do leitor antes de "consertar" o site.
// ============================================================================
const BASE = (process.argv[2] || '').replace(/\/+$/, '')

if (!BASE) {
  console.error('informe a URL: node testes/conferir-no-ar.mjs https://exemplo.vercel.app')
  process.exit(2)
}

// Marcas de TEXTO DE TELA (sobrevivem à minificação) e as rotas profundas a testar.
const MARCAS = [
  // Marca: Oren.AI é a mãe, Transleitor é o produto dentro dela.
  'Inteligência Cirúrgica',
  'Precisão · Tecnologia · Resultado',
  'Escolha o ambiente',
  'Menu — a central do plantão',
  'Demonstração ilustrativa',
  'Ver a demonstração',
  'Evolução — pré-visualização',
  'Não encontrei menção a',
  'LIMITAÇÕES DESTA ANÁLISE',
  'FONTES CONFERIDAS',
  'Direitos do titular',
  'Auditor de segurança',
  'Paciente A',
  'O que esta tela não faz',
  'Voltar à apresentação',
  '15 dias',
  'Lichtenstein',
  'Polaciúria',
]

const ROTAS_PROFUNDAS = ['/demo/menu', '/demo/evolucao', '/demo/cirurgia', '/demo/seguranca']

let falhas = 0
const ok = (condicao, texto) => {
  console.log(`${condicao ? 'ok ' : '✗  '} ${texto}`)
  if (!condicao) falhas++
}

const buscar = async (caminho) => {
  const resposta = await fetch(`${BASE}${caminho}`, { redirect: 'follow' })
  const corpo = await resposta.text()
  return { resposta, corpo }
}

try {
  // 1. A página servida responde e é o nosso index?
  const { resposta: raiz, corpo: html } = await buscar('/')
  ok(raiz.status === 200, `GET / → HTTP ${raiz.status}`)
  ok(html.includes('id="root"'), 'a página servida é o nosso index.html')
  ok(/Transleitor/.test(html), 'a página traz o nome do produto')

  // 2. Qual bundle ELA referencia
  const asset = (html.match(/\/assets\/index-[A-Za-z0-9_-]+\.js/) || [])[0]
  const css = (html.match(/\/assets\/index-[A-Za-z0-9_-]+\.css/) || [])[0]
  ok(Boolean(asset), `a página referencia um bundle: ${asset || 'nenhum'}`)
  ok(Boolean(css), `a página referencia um css: ${css || 'nenhum'}`)

  // 3. Baixar ESSE bundle e procurar as marcas de tela
  if (asset) {
    const { resposta: rjs, corpo: js } = await buscar(asset)
    ok(rjs.status === 200, `GET ${asset} → HTTP ${rjs.status} (${js.length} bytes)`)

    const ausentes = MARCAS.filter((m) => !js.includes(m))
    ok(
      ausentes.length === 0,
      `marcas de tela no bundle SERVIDO: ${MARCAS.length - ausentes.length}/${MARCAS.length}` +
        (ausentes.length ? ` — ausentes: ${ausentes.join(' | ')}` : ''),
    )

    const cache = rjs.headers.get('cache-control') || ''
    ok(/immutable/.test(cache), `assets com cache imutável: "${cache}"`)
  }

  // 4. Rota profunda: o rewrite tem de devolver o app, não um 404
  for (const rota of ROTAS_PROFUNDAS) {
    const { resposta, corpo } = await buscar(rota)
    ok(resposta.status === 200 && corpo.includes('id="root"'), `GET ${rota} → HTTP ${resposta.status}, devolveu o app`)
  }

  // 5. O que NÃO pode estar no ar
  if (asset) {
    const { corpo: js } = await buscar(asset)
    ok(!js.includes('base44'), 'o bundle servido não menciona a plataforma base44')
    ok(!/SUPABASE|FIREBASE_|apiKey/.test(js), 'o bundle servido não traz chave de serviço')
  }

  // Controle negativo: uma marca inventada tem de ser acusada. Sem isto, um conferidor que
  // aceitasse tudo passaria como "site verificado".
  if (asset) {
    const { corpo: js } = await buscar(asset)
    ok(!js.includes('MARCA-QUE-NAO-EXISTE-NO-SITE'), 'controle negativo — o conferidor reprova marca inexistente')
  }
} catch (erro) {
  console.log(`✗  falha de rede: ${erro.message}`)
  falhas++
}

console.log(`\n${falhas} falha(s) em ${BASE}`)
process.exit(falhas ? 1 : 0)
