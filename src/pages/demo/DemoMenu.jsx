import React from 'react'
import { ArrowRight, Building2, Hospital, Sparkles, Stethoscope } from 'lucide-react'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import MolduraApp from '@/components/demo/MolduraApp'
import PainelMenu, { AMBIENTES } from '@/components/demo/PainelMenu'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// MENU — A CENTRAL DO PLANTÃO
//
// É a primeira tela do aplicativo: antes de qualquer evolução, ele pergunta ONDE o atendimento
// vai acontecer. A pergunta não é decorativa — o ambiente muda o setor, o leito, o cabeçalho do
// documento e o raciocínio da IA. Ambulatório e enfermaria não documentam a mesma coisa.
//
// O conteúdo é o REAL do aplicativo (a tela tem exatamente dois ambientes).
// ============================================================================
const FLUXO = [
  {
    Icone: Hospital,
    titulo: '1. Ambiente',
    texto: 'Hospitalar ou ambulatorial. Define setor, leito e o formato do documento.',
  },
  {
    Icone: Stethoscope,
    titulo: '2. Especialidade',
    texto: 'A área do atendimento. É ela que traz o painel de sinais daquela especialidade.',
  },
  {
    Icone: Sparkles,
    titulo: '3. Atendimento',
    texto: 'O painel, a evolução, a revisão antes de assinar e o documento para o prontuário.',
  },
]

export default function DemoMenu() {
  return (
    <TelaDemo
      titulo="🧭 Menu — a central do plantão"
      descricao="A primeira tela do aplicativo. Antes de escrever qualquer coisa, ele pergunta onde o atendimento vai acontecer — e essa escolha muda o setor, o leito, o cabeçalho do documento e o raciocínio da IA."
      acoes={<EtiquetaExemplo>tela real do aplicativo</EtiquetaExemplo>}
    >
      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <MolduraApp legenda="Transleitor · Menu — a mesma tela, sem alteração">
          <PainelMenu />
        </MolduraApp>

        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4">
            <p className="mb-3 text-sm font-bold">Os dois ambientes</p>
            <ul className="space-y-3">
              {AMBIENTES.map(({ id, Icone, titulo, desc }) => (
                <li key={id} className="flex items-start gap-3 rounded-xl border border-border bg-card/60 p-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icone className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold">{titulo}</span>
                    <span className="block text-[11px] leading-relaxed text-muted-foreground">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
            <p className="text-xs font-bold">Por que perguntar antes</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              Documento de enfermaria não é documento de ambulatório: muda a identificação de leito, o
              que se acompanha a cada turno e o que o próximo plantão precisa saber. Escolher o
              ambiente no começo evita que o texto nasça no formato errado.
            </p>
          </div>

          <BotaoDemo
            variant="outline"
            size="sm"
            motivo="No aplicativo, cada cartão leva à lista de especialidades daquele ambiente. Nesta demonstração a navegação entre telas existe pelo menu da esquerda — os cartões aqui são a amostra."
          >
            Entrar em Ambiente Hospitalar <ArrowRight className="h-3.5 w-3.5" />
          </BotaoDemo>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold">O que vem depois do menu</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {FLUXO.map(({ Icone, titulo, texto }) => (
            <div key={titulo} className="glass-card rounded-2xl p-4">
              <Icone className="mb-2 h-4 w-4 text-primary" />
              <p className="text-sm font-bold">{titulo}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          O caminho <strong className="text-foreground">ambiente → especialidade → atendimento</strong>{' '}
          é o mesmo em qualquer área. O que muda é o conteúdo clínico de cada etapa — e a área que
          ainda não tem painel próprio usa o painel geral, em vez de receber conteúdo inventado.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card/60 p-4">
        <p className="flex items-center gap-2 text-xs font-bold">
          <Building2 className="h-3.5 w-3.5 text-primary" /> Sobre esta amostra
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          A tela desenhada acima é a mesma que o aplicativo mostra, sem alteração de conteúdo. A
          moldura e o brilho são da página de apresentação; o aplicativo não tem essa moldura.
        </p>
      </section>
    </TelaDemo>
  )
}
