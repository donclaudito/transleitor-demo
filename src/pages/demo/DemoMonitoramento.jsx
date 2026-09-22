import React from 'react'
import { Activity, ShieldOff, Timer } from 'lucide-react'
import { MONITORAMENTO_DEMO } from '@/data/demo'
import TelaDemo from '@/components/demo/TelaDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// MONITORAMENTO E TRILHA DE IA
//
// O ponto desta tela não são os números — é o que a trilha registra e o que ela se RECUSA a
// registrar. Rastreio por allowlist: entram medidas (qual fluxo, qual modelo, quantos tokens,
// quanto tempo, deu certo ou não) e não entra conteúdo (nem o texto enviado, nem o texto
// devolvido, nem paciente, nem médico).
//
// É isso que permite dizer "a IA participou e eu consigo provar como" sem transformar o log num
// segundo prontuário, sem as proteções do primeiro.
// ============================================================================
export default function DemoMonitoramento() {
  const maior = Math.max(...MONITORAMENTO_DEMO.serie.map((d) => d.geradas))

  return (
    <TelaDemo
      titulo="📊 Monitoramento e trilha de IA"
      descricao="Quanto se usou, com qual modelo, em quanto tempo e com que resultado — registrado sem guardar uma linha do que era clínico."
      acoes={<EtiquetaExemplo>números de exemplo</EtiquetaExemplo>}
    >
      <p className="rounded-2xl border border-primary/25 bg-primary/5 p-4 text-xs leading-relaxed text-muted-foreground">
        {MONITORAMENTO_DEMO.aviso}
      </p>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MONITORAMENTO_DEMO.cartoes.map((c) => (
          <div key={c.rotulo} className="glass-card rounded-2xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {c.rotulo}
            </p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight">{c.valor}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{c.detalhe}</p>
          </div>
        ))}
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Activity className="h-4 w-4 text-primary" /> Evoluções geradas na semana
        </h2>
        <div className="mt-4 flex items-end justify-between gap-2" style={{ height: 160 }}>
          {MONITORAMENTO_DEMO.serie.map((d) => (
            <div key={d.dia} className="flex flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[11px] font-bold text-muted-foreground">{d.geradas}</span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary"
                style={{ height: `${Math.round((d.geradas / maior) * 110)}px` }}
                aria-hidden="true"
              />
              <span className="text-[11px] text-muted-foreground">{d.dia}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Timer className="h-4 w-4 text-primary" /> Trilha de uso
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-bold">Quando</th>
                <th className="py-2 pr-3 font-bold">Fluxo</th>
                <th className="py-2 pr-3 font-bold">Provedor</th>
                <th className="py-2 pr-3 font-bold">Modelo</th>
                <th className="py-2 pr-3 font-bold">Tokens</th>
                <th className="py-2 pr-3 font-bold">Tempo</th>
                <th className="py-2 font-bold">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {MONITORAMENTO_DEMO.trilha.map((r, i) => (
                <tr key={i} className="border-b border-border/60 last:border-0">
                  <td className="py-2 pr-3 whitespace-nowrap text-muted-foreground">{r.quando}</td>
                  <td className="py-2 pr-3 text-foreground/85">{r.fluxo}</td>
                  <td className="py-2 pr-3 text-foreground/85">{r.provedor}</td>
                  <td className="py-2 pr-3 font-mono text-[11px] text-foreground/85">{r.modelo}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{r.tokens}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{r.ms}</td>
                  <td className="py-2">
                    <span
                      className={
                        r.status.startsWith('sucesso')
                          ? 'rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300'
                          : 'rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300'
                      }
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          Repare na terceira e na quarta linha: o mesmo pedido aparece recusado por tamanho em um
          provedor e concluído em outro. A trilha registra as duas — a geração não morre porque um
          provedor impôs limite, e a tela diz qual modelo escreveu de fato.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <Activity className="h-4 w-4 text-emerald-500" /> O que entra na trilha
          </h2>
          <ul className="mt-3 space-y-1.5">
            {MONITORAMENTO_DEMO.oQueEntra.map((e) => (
              <li key={e} className="text-xs leading-relaxed text-foreground/85">
                • {e}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <ShieldOff className="h-4 w-4 text-destructive" /> O que nunca entra
          </h2>
          <ul className="mt-3 space-y-1.5">
            {MONITORAMENTO_DEMO.oQueNaoEntra.map((e) => (
              <li key={e} className="text-xs leading-relaxed text-foreground/85">
                • {e}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            A lista funciona por permissão, não por proibição: só entra o que foi autorizado
            explicitamente. Campo novo no rastreio é decisão consciente, não deslize.
          </p>
        </div>
      </section>
    </TelaDemo>
  )
}
