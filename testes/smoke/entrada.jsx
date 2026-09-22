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
import DemoShell from '@/components/demo/DemoShell'

// [nome, componente, marcas que PRECISAM aparecer no HTML renderizado]
const TELAS = [
  [
    'Capa',
    LandingPage,
    [
      'Documentação clínica',
      'Ver a demonstração',
      'Ver demonstração',
      // Marca: Oren.AI é a marca-mãe, Transleitor é o produto dentro dela.
      'Oren',
      'Inteligência Cirúrgica',
      'Precisão · Tecnologia · Resultado',
      // A amostra da tela do aplicativo dentro da moldura do herói.
      'Escolha o ambiente',
      'sem alteração',
    ],
  ],
  ['Molde da demonstração', DemoShell, ['demonstração', 'Voltar à apresentação']],
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
  ['Elvira', DemoElio, ['Elvira', 'conversa fixa', 'O que ela não faz', 'Modelo em uso']],
  ['Monitoramento', DemoMonitoramento, ['Monitoramento e trilha de IA', 'O que nunca entra', 'Trilha de uso']],
  ['Direitos do titular', DemoDireitos, ['Direitos do titular', '15 dias', '20 anos']],
  ['Auditor de segurança', DemoSeguranca, ['Auditor de segurança', 'Ficha de achado', 'Severidade']],
  ['Página não encontrada', NaoEncontrada, ['Esta página não existe aqui', 'Ver a demonstração']],
]

let falhas = 0
let marcasConferidas = 0

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

console.log(`\n${TELAS.length} telas renderizadas, ${marcasConferidas} marcas de texto conferidas, ${falhas} falha(s)`)
process.exit(falhas ? 1 : 0)
