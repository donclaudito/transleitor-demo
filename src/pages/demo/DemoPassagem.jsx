import React from 'react'
import { BedDouble, ClipboardList, Copy, RefreshCw } from 'lucide-react'
import { PASSAGEM_DEMO } from '@/data/demo'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// PASSAGEM DE VISITA
//
// É a tela que resolve o momento mais arriscado do plantão: a troca de turno. Quem sai conta o que
// sabe, quem entra anota o que conseguiu ouvir — e o que não foi dito simplesmente desaparece.
// Aqui o resumo de cada leito é escrito com o que foi registrado no dia, e o que ficou PENDENTE
// aparece marcado: pendência escondida é pendência que ninguém assume.
// ============================================================================
export default function DemoPassagem() {
  return (
    <TelaDemo
      titulo="🔄 Passagem de visita"
      descricao="O resumo por leito que o próximo plantão recebe — com o que está pendente dito em voz alta, em vez de ficar na memória de quem saiu."
      acoes={
        <>
          <BotaoDemo variant="outline" size="sm" motivo="Nesta demonstração não há registros do dia para resumir: os resumos abaixo são fixos.">
            <RefreshCw className="h-3.5 w-3.5" /> Atualizar resumos
          </BotaoDemo>
          <BotaoDemo size="sm" motivo="No aplicativo, a passagem gerada pode ser copiada para colar no sistema do hospital.">
            <Copy className="h-3.5 w-3.5" /> Copiar a passagem
          </BotaoDemo>
        </>
      }
    >
      <section className="glass-card rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <BedDouble className="h-4 w-4 text-primary" />
            </span>
            <div>
              <p className="text-sm font-bold">{PASSAGEM_DEMO.setor}</p>
              <p className="text-xs text-muted-foreground">{PASSAGEM_DEMO.turno}</p>
            </div>
          </div>
          <EtiquetaExemplo>resumos fixos de exemplo</EtiquetaExemplo>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {PASSAGEM_DEMO.leitos.map((l) => (
          <article key={l.leito} className="glass-card flex flex-col gap-3 rounded-2xl p-5">
            <header className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-muted px-2 py-1 text-[11px] font-bold text-muted-foreground">
                  Leito {l.leito}
                </span>
                <h2 className="text-sm font-extrabold">{l.paciente}</h2>
              </div>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                {l.pendencia}
              </span>
            </header>
            <p className="text-xs leading-relaxed text-foreground/85">{l.resumo}</p>
            <div className="mt-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ClipboardList className="h-3.5 w-3.5 text-primary" />
              Resumo montado a partir dos registros do dia
            </div>
          </article>
        ))}
      </div>

      <section className="glass-card rounded-2xl p-4">
        <h2 className="text-sm font-bold">Por que a pendência aparece em destaque</h2>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Um resumo que só conta o que já está resolvido passa uma impressão de turno tranquilo. O
          aplicativo marca o que ficou em aberto — exame aguardando resultado, curativo a revisar,
          suporte de oxigênio a reavaliar — porque é isso que o plantão seguinte precisa saber
          primeiro. Nesta demonstração os pacientes são fictícios e aparecem sem identificação.
        </p>
      </section>
    </TelaDemo>
  )
}
