// ============================================================================
// PROVA DE RENDERIZAÇÃO
//
// O build verde e o lint limpo NÃO provam que a tela desenha. Neste projeto de origem isso já
// aconteceu três vezes: import que resolve mas aponta para o lugar errado, prop que não existe,
// identificador fora de escopo — tudo passa no build e mata a tela no navegador.
//
// Aqui cada tela é de fato RENDERIZADA (fora do navegador, com react-dom/server) e o HTML
// resultante é conferido por marcas de TEXTO DE TELA — o que o usuário lê, não nome de função.
//
// Roda via `npm run provar`, que compila este arquivo com o Vite e executa o resultado.
// ============================================================================
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

import LandingPage from '@/pages/LandingPage'
import NaoEncontrada from '@/pages/NaoEncontrada'
import DemoIndex from '@/pages/demo/DemoIndex'
import DemoMapa from '@/pages/demo/DemoMapa'
import DemoMenu from '@/pages/demo/DemoMenu'
import DemoEvolucao from '@/pages/demo/DemoEvolucao'
import DemoCaptura from '@/pages/demo/DemoCaptura'
import DemoImagem from '@/pages/demo/DemoImagem'
import DemoCirurgia from '@/pages/demo/DemoCirurgia'
import DemoPassagem from '@/pages/demo/DemoPassagem'
import DemoEspecialidades from '@/pages/demo/DemoEspecialidades'
import DemoElio from '@/pages/demo/DemoElio'
import DemoMonitoramento from '@/pages/demo/DemoMonitoramento'
import DemoDireitos from '@/pages/demo/DemoDireitos'
import DemoSeguranca from '@/pages/demo/DemoSeguranca'
import DemoMinhaLLM from '@/pages/demo/DemoMinhaLLM'
import DemoConformidade from '@/pages/demo/DemoConformidade'
import DemoIntegracoes from '@/pages/demo/DemoIntegracoes'
import DemoShell from '@/components/demo/DemoShell'

import { ESPECIALIDADES_DEMO } from '@/data/demo'
import { PANELS_ESPECIALIDADE } from '@/data/paineisEspecialidade'
import { montarPainelDaArea } from '@/lib/painelDaArea'

// [nome, componente, marcas que PRECISAM aparecer no HTML renderizado]
const TELAS = [
  [
    'Capa',
    LandingPage,
    [
      // A linha "Inteligência Cirúrgica por Oren.AI" SAIU a pedido do Dr. Claudio: se alguém a
      // trouxer de volta, o conferidor de marcas não acusa — por isso ela não está aqui. O que
      // está aqui é o que TEM de aparecer.
      'Inteligência Médica',
      'Ver a demonstração',
      // A MARCA COMO SUJEITO: quem age é a Oren.AI, não "a IA".
      'A Oren.AI muda conforme',
      'A Oren.AI processa e correlaciona',
      'a Oren.AI cuida do resto',
      'Nossos profissionais e nossos Assistentes da Oren.AI que trabalham com você',
      // O RODAPÉ EM TRÊS LINHAS. O nome da marca quebra em `<span>` (o ".AI" é colorido), então a
      // marca da frase tem de começar DEPOIS do span — foi por isso que o marcador é o trecho final.
      'Inteligência Cirúrgica',
      'Transleitor · Clínica Adaptativa · Documentação médica inteligente',
      'Ver demonstração',
      'Oren',
      'Precisão · Tecnologia · Resultado',
      // A amostra da tela do aplicativo dentro da moldura do herói.
      'Escolha o ambiente',
      'sem alteração',
      // O emblema da marca é ARQUIVO, não desenho em SVG: se o <img> sumir, isto reprova.
      'oren-ai-192.png',
    ],
  ],
  ['Molde da demonstração', DemoShell, ['demonstração', 'Voltar à apresentação', 'Telas demonstradas']],
  ['Índice da demonstração', DemoIndex, ['Demonstração navegável', 'Evolução SOAP', 'Auditor de segurança']],
  [
    'Menu do aplicativo',
    DemoMenu,
    ['Menu — a central do plantão', 'Escolha o ambiente', 'Ambiente Hospitalar', 'Clínicas &amp; Ambulatório', 'O que vem depois do menu'],
  ],
  ['Evolução SOAP', DemoEvolucao, ['Sinais &amp; Sintomas', 'Evolução — pré-visualização', 'Subjetivo', 'Prescrição']],
  ['Captura de laudo', DemoCaptura, ['Capturar laudo/exame', 'O que foi extraído', 'Identificadores restantes']],
  ['Análise de imagem', DemoImagem, ['Análise de imagem médica', 'EXAME E TÉCNICA', 'LIMITAÇÕES DESTA ANÁLISE', 'FONTES CONFERIDAS']],
  ['Descrição cirúrgica', DemoCirurgia, ['Descrição cirúrgica', 'Lichtenstein', 'Não encontrei menção a', 'Conferência do registro']],
  ['Passagem de visita', DemoPassagem, ['Passagem de visita', 'Paciente A', 'Passagem do plantão']],
  ['Painel por especialidade', DemoEspecialidades, ['Painel por especialidade', 'Urologia', 'seções']],
  ['Ellah', DemoElio, ['Ellah', 'conversa fixa', 'O que ela não faz', 'Modelo em uso']],
  ['Monitoramento', DemoMonitoramento, ['Monitoramento e trilha de IA', 'O que nunca entra', 'Trilha de uso']],
  ['Direitos do titular', DemoDireitos, ['Direitos do titular', '15 dias', '20 anos']],
  ['Auditor de segurança', DemoSeguranca, ['Auditor de segurança', 'Ficha de achado', 'Severidade']],
  [
    'Mapa do aplicativo',
    DemoMapa,
    ['Mapa do aplicativo', 'todas as telas', 'O que esta demonstração cobre', 'Não demonstrada', 'funções de backend'],
  ],
  [
    'Use a sua própria chave de IA',
    DemoMinhaLLM,
    ['Use a sua própria chave de IA', 'Sem gastar créditos da plataforma', 'Minhas linhas', 'transferência para outro serviço'],
  ],
  [
    'Conformidade e critérios',
    DemoConformidade,
    ['Conformidade — normativas e critérios', 'Res. CFM 1.638/2002', 'Recusados sem fonte conferida', 'BI-RADS', 'Artigos da LGPD, um a um', 'A trava'],
  ],
  [
    'Integração com a instituição',
    DemoIntegracoes,
    ['Integração com o sistema da instituição', 'O envio ainda não está ligado', 'Conferir segredo', 'O nome do paciente não sai daqui', 'não implementado'],
  ],
  ['Página não encontrada', NaoEncontrada, ['Esta página não existe aqui', 'Ver a demonstração']],
]

let falhas = 0
let marcasConferidas = 0
let areasRenderizadas = 0

for (const [nome, Componente, marcas] of TELAS) {
  let html
  try {
    html = renderToStaticMarkup(
      <MemoryRouter>
        <Componente />
      </MemoryRouter>,
    )
  } catch (erro) {
    console.log(`✗ ${nome} — NÃO RENDERIZOU: ${erro.message}`)
    falhas++
    continue
  }

  if (html.length < 400) {
    console.log(`✗ ${nome} — HTML suspeito de vazio (${html.length} caracteres)`)
    falhas++
    continue
  }

  const ausentes = marcas.filter((m) => !html.includes(m))
  marcasConferidas += marcas.length
  if (ausentes.length) {
    console.log(`✗ ${nome} — marcas ausentes: ${ausentes.join(' | ')}`)
    falhas++
  } else {
    console.log(`ok  ${nome} — ${html.length} caracteres, ${marcas.length}/${marcas.length} marcas`)
  }
}

// ---------------------------------------------------------------------------
// TODA ÁREA, NÃO SÓ A PADRÃO — e a forma dos dados ANTES do render
//
// O laço acima renderiza cada tela no estado INICIAL. Ele passou por Pediatria sem ver nada: aquela
// tela só quebra DEPOIS que o visitante clica na área. Foi assim que o site foi ao ar com
// "Cannot read properties of undefined (reading 'map')" ao clicar em Pediatria — o smoke provava
// que a tela desenha, não que ela sobrevive ao clique. A lição é a mesma que originou este arquivo,
// um nível mais fundo: renderizar não é o mesmo que renderizar TODOS OS ESTADOS.
//
// Aqui cada área do seletor é renderizada DE FATO, nas duas telas que mostram o painel, e os nomes
// das seções daquela área têm de aparecer no HTML.
// ---------------------------------------------------------------------------
{
  // 1) A FORMA DOS DADOS. Uma seção PRESENTE na config tem de ter `groups` em lista.
  //
  // Este é o ponto que a tolerância pode esconder: se uma seção malformada fosse apenas ignorada,
  // a tela não quebraria — e ninguém saberia que faltou conteúdo. Sumir em silêncio é pior do que
  // quebrar, então medir a forma da config é o que separa "esta área não tem a seção" (legítimo)
  // de "esta área tem a seção, escrita errado" (defeito).
  let areasComSecaoAusente = 0
  for (const [slug, cfg] of Object.entries(PANELS_ESPECIALIDADE)) {
    for (const [chave, secao] of Object.entries(cfg.secoes || {})) {
      marcasConferidas++
      if (!Array.isArray(secao?.groups)) {
        console.log(`✗ config de ${slug}: a seção "${chave}" existe mas não tem groups em lista`)
        falhas++
      }
    }

    const montado = montarPainelDaArea(slug)
    const aproveitaveis = Object.values(cfg.secoes || {}).filter((s) => Array.isArray(s?.groups)).length
    marcasConferidas++
    if (montado.secoes.length !== aproveitaveis) {
      console.log(
        `✗ ${slug}: o painel montado tem ${montado.secoes.length} seções e a config tem ${aproveitaveis} aproveitáveis`,
      )
      falhas++
    }
    if (montado.semSecao.length) areasComSecaoAusente++
  }
  console.log(`ok  forma dos painéis — ${Object.keys(PANELS_ESPECIALIDADE).length} configs medidas`)
  // O caminho tolerante só é exercitado se ALGUMA área tiver seção ausente. Se este número cair a
  // zero, a prova continua válida — mas deixa de estar testando o caso que derrubou o site.
  console.log(`    ${areasComSecaoAusente} área(s) com seção ausente na config — é o caminho que quebrava`)

  // 2) O RENDER, área por área. Uma exceção aqui é o defeito que foi publicado.
  const escapar = (texto) => texto.replace(/&/g, '&amp;')
  const porArea = [
    ['Transleitor (evolução)', DemoEvolucao, ESPECIALIDADES_DEMO],
    [
      'Painel por especialidade',
      DemoEspecialidades,
      ESPECIALIDADES_DEMO.filter((e) => PANELS_ESPECIALIDADE[e.slug]),
    ],
  ]

  for (const [nome, Componente, areas] of porArea) {
    for (const area of areas) {
      let html
      try {
        html = renderToStaticMarkup(
          <MemoryRouter>
            <Componente slugInicial={area.slug} />
          </MemoryRouter>,
        )
      } catch (erro) {
        console.log(`✗ ${nome} na área ${area.nome} — NÃO RENDERIZOU: ${erro.message}`)
        falhas++
        continue
      }

      const rotulos = montarPainelDaArea(area.slug).secoes.map((s) => s.label)
      const semRotulo = rotulos.filter((r) => !html.includes(r) && !html.includes(escapar(r)))
      marcasConferidas += rotulos.length
      areasRenderizadas++
      if (html.length < 400) {
        console.log(`✗ ${nome} na área ${area.nome} — HTML suspeito de vazio (${html.length} caracteres)`)
        falhas++
      } else if (semRotulo.length) {
        console.log(`✗ ${nome} na área ${area.nome} — seções ausentes: ${semRotulo.join(' | ')}`)
        falhas++
      } else {
        console.log(`ok  ${nome} — área ${area.nome} — ${html.length} caracteres, ${rotulos.length} seções`)
      }
    }
  }
}

// Controle negativo: uma marca que NÃO existe tem de ser acusada. Sem isto, um conferidor que
// aceitasse tudo passaria como "todas as telas provadas".
{
  const html = renderToStaticMarkup(
    <MemoryRouter>
      <DemoIndex />
    </MemoryRouter>,
  )
  if (html.includes('MARCA-QUE-NAO-EXISTE-EM-TELA-NENHUMA')) {
    console.log('✗ controle negativo: o conferidor de marcas aceitou uma marca inexistente')
    falhas++
  } else {
    console.log('ok  controle negativo — o conferidor de marcas reprova marca inexistente')
  }
}

console.log(
  `\n${TELAS.length} telas + ${areasRenderizadas} áreas renderizadas, ${marcasConferidas} marcas de texto conferidas, ${falhas} falha(s)`,
)
process.exit(falhas ? 1 : 0)
