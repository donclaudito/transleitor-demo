import React from 'react'
import { CheckCircle2, ClipboardCheck, FileSignature, HelpCircle, Printer, ShieldCheck } from 'lucide-react'
import { AUDITORIA_DEMO, CIRURGIA_DEMO } from '@/data/demo'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// DESCRIÇÃO CIRÚRGICA + AUDITORIA DO REGISTRO
//
// O documento abaixo é o modelo que o Dr. Claudio já usa (herniorrafia inguinal pela técnica de
// Lichtenstein), condensado para a demonstração. E o painel de auditoria é a segunda metade da
// tela, que é onde está o argumento: o aplicativo confere o registro ANTES de a auditoria do
// convênio, da comissão ou do perito olhar.
//
// A LINGUAGEM É A TRAVA: ele diz "não encontrei menção a X", nunca "faltou X". O cirurgião pode
// ter feito e não ter escrito — afirmar a segunda a partir da primeira seria o aplicativo
// inventando fato clínico.
// ============================================================================
export default function DemoCirurgia() {
  return (
    <TelaDemo
      titulo="🩹 Descrição cirúrgica"
      descricao="O registro do ato cirúrgico em forma de documento para o prontuário — e a conferência dos campos que a auditoria vai procurar."
      acoes={<EtiquetaExemplo>modelo do Dr. Claudio</EtiquetaExemplo>}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* DOCUMENTO */}
        <section className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <div className="mb-4 flex items-center gap-2">
              <FileSignature className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold">Documento para o prontuário</h2>
            </div>

            {/* `overflow-x-auto` e não `overflow-hidden`: com `hidden` a tabela era CORTADA em tela
                estreita — o valor do campo simplesmente desaparecia, sem barra e sem aviso. Aqui ela
                passa a rolar. O `w-32 sm:w-40` devolve largura à coluna de valor no celular. */}
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-xs">
                <tbody>
                  {CIRURGIA_DEMO.cabecalho.map(([campo, valor]) => (
                    <tr key={campo} className="border-b border-border/60 last:border-0">
                      <th className="w-32 bg-muted/50 px-3 py-2 text-left align-top font-bold text-foreground sm:w-40">
                        {campo}
                      </th>
                      <td className="px-3 py-2 text-foreground/85">{valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 space-y-4">
              {CIRURGIA_DEMO.tempos.map((t, i) => (
                <div key={t.titulo} className="border-l-2 border-primary/30 pl-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    Tempo {i + 1} — {t.titulo}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/85">{t.texto}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-border bg-card/50 p-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Material utilizado
              </p>
              <ul className="grid gap-1 sm:grid-cols-2">
                {CIRURGIA_DEMO.material.map((m) => (
                  <li key={m} className="flex items-start gap-1.5 text-xs text-foreground/85">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" /> {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground">
              <p className="font-bold text-foreground">Assinatura</p>
              <p className="mt-1">
                No aplicativo, o documento sai com o carimbo de quem é e de quando é — data e hora do
                registro, identificação do profissional com CRM e linha para assinatura à mão. Sem
                isso, ele não se parece com prontuário: se parece com rascunho.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <BotaoDemo size="sm" motivo="No aplicativo, este botão gera o modelo do procedimento a partir da patologia informada, pelo provedor de IA que você escolher.">
                Gerar novo modelo
              </BotaoDemo>
              <BotaoDemo variant="outline" size="sm" motivo="No aplicativo, a impressão sai com data e hora do registro, identificação com CRM e linha de assinatura.">
                <Printer className="h-3.5 w-3.5" /> Imprimir em PDF
              </BotaoDemo>
            </div>
          </div>
        </section>

        {/* AUDITORIA */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="glass-card rounded-2xl p-4">
            <div className="mb-3 flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold">Conferência do registro</h2>
            </div>

            <p className="mb-3 flex items-start gap-2 rounded-xl border border-primary/25 bg-primary/5 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
              {AUDITORIA_DEMO.aviso}
            </p>

            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Menção encontrada no texto ({AUDITORIA_DEMO.encontrados.length})
            </p>
            <ul className="mb-4 space-y-1">
              {AUDITORIA_DEMO.encontrados.map((e) => (
                <li key={e} className="flex items-start gap-1.5 text-xs text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" /> {e}
                </li>
              ))}
            </ul>

            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Não encontrei menção a
            </p>
            <ul className="space-y-1">
              {AUDITORIA_DEMO.naoEncontrados.map((e) => (
                <li key={e} className="flex items-start gap-1.5 text-xs text-foreground/80">
                  <HelpCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" /> {e}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Cada item vira uma pergunta com campo para o cirurgião responder. O aplicativo não
              afirma que algo deixou de ser feito — quem sabe é quem operou.
            </p>

            <div className="mt-4">
              <BotaoDemo variant="outline" size="sm" motivo="No aplicativo, este botão pede ao modelo de IA a leitura do registro como quem vai ter de responder por ele depois.">
                <ClipboardCheck className="h-3.5 w-3.5" /> Auditar com IA
              </BotaoDemo>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4">
            <h3 className="mb-2 text-sm font-bold">Exemplos do que ele pergunta</h3>
            <ul className="space-y-2">
              {AUDITORIA_DEMO.perguntas.map((p) => (
                <li key={p} className="rounded-xl border border-border bg-card/60 px-3 py-2 text-xs leading-relaxed text-foreground/85">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Nenhuma delas é afirmação, e nenhuma sugere conduta: o aplicativo insere campos com
              marcador, nunca prescrição.
            </p>
          </div>
        </aside>
      </div>
    </TelaDemo>
  )
}
