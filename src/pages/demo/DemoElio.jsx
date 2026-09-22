import React from 'react'
import { Bot, Send, Sparkles, User } from 'lucide-react'
import { ELIO_DEMO } from '@/data/demo'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'
import { cn } from '@/lib/utils'

// ============================================================================
// ELLAH — ASSISTENTE CLÍNICA
//
// A conversa abaixo é um roteiro fixo, escrito para a demonstração. Não há modelo de IA aqui, e o
// ponto do roteiro não é a resposta bonita: é o comportamento. Ela organiza o que o médico trouxe,
// diz o que ainda precisaria saber para o registro ficar completo, e não fecha diagnóstico nem
// conduta — quem assina é o médico.
// ============================================================================
export default function DemoElio() {
  return (
    <TelaDemo
      titulo="💬 Ellah — assistente clínica"
      descricao="Uma colega virtual com quem o médico conversa em linguagem natural, dentro do aplicativo. Ela trabalha com o modelo de IA que o médico escolher e só com os dados que ele fornecer."
      acoes={<EtiquetaExemplo>conversa fixa de exemplo</EtiquetaExemplo>}
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* MODELO */}
        <aside className="space-y-4">
          <div className="glass-card rounded-2xl p-4">
            <p className="mb-3 text-sm font-bold">Modelo em uso</p>
            <div className="space-y-2">
              {ELIO_DEMO.modelos.map((m) => (
                <div
                  key={m.modelo}
                  className={cn(
                    'rounded-xl border px-3 py-2',
                    m.marcado ? 'border-primary bg-primary/5' : 'border-border bg-card/60',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold">{m.nome}</span>
                    {m.marcado && <Sparkles className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{m.modelo}</p>
                  <p className="text-[11px] text-muted-foreground">{m.capacidade}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              O provedor é escolha do médico. Se o provedor recusar o documento por tamanho, o
              aplicativo tenta outra linha e <strong className="text-foreground">diz na tela</strong>{' '}
              que trocou — não finge que foi o modelo escolhido.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-4">
            <p className="text-xs font-bold">O que ela não faz</p>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-muted-foreground">
              <li>• Não inventa exame, dose ou diagnóstico que não esteja nos dados.</li>
              <li>• Não escolhe conduta no lugar do médico.</li>
              <li>• Não recebe nome, contato ou imagem do paciente sem necessidade.</li>
            </ul>
          </div>
        </aside>

        {/* CONVERSA */}
        <section className="glass-card flex min-h-[520px] flex-col rounded-2xl">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </span>
            <div>
              <p className="text-sm font-bold">Ellah</p>
              <p className="text-[11px] text-muted-foreground">{ELIO_DEMO.avisoConversa}</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {ELIO_DEMO.mensagens.map((m, i) => (
              <div
                key={i}
                className={cn('flex gap-3', m.de === 'medico' ? 'flex-row-reverse text-right' : '')}
              >
                <span
                  className={cn(
                    'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg',
                    m.de === 'medico' ? 'bg-muted' : 'bg-primary/10',
                  )}
                >
                  {m.de === 'medico' ? (
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  )}
                </span>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed',
                    m.de === 'medico'
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-card/60 text-foreground/90',
                  )}
                >
                  {m.texto.split('\n').map((linha, j) => (
                    <p key={j} className={j > 0 ? 'mt-1.5' : ''}>
                      {linha}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-end gap-2">
              <div className="flex-1 rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-xs text-muted-foreground">
                Nesta demonstração a conversa é um roteiro fixo — não é possível escrever.
              </div>
              <BotaoDemo
                size="sm"
                motivo="Nenhum modelo é consultado nesta página: não há o que enviar e nada sairia do seu navegador."
              >
                <Send className="h-3.5 w-3.5" /> Enviar
              </BotaoDemo>
            </div>
          </div>
        </section>
      </div>
    </TelaDemo>
  )
}
