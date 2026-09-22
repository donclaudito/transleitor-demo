import React from 'react'
import { ImageUp, Info, Library, ScanLine } from 'lucide-react'
import { LAUDO_DEMO } from '@/data/demo'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// ANÁLISE DE IMAGEM MÉDICA
//
// O que esta tela mostra não é "a IA lê sua radiografia". É mais estreito e mais útil: a saída tem
// SEMPRE as mesmas cinco seções, e há coisas que ela se recusa a afirmar.
//
// A mais importante: classificação (BI-RADS, Lung-RADS, PI-RADS…) NÃO vem da memória do modelo.
// Só entra com trecho de fonte conferida na base de imaginologia — e, sem esse trecho, o laudo
// registra a ausência em vez de arriscar um número. Um laudo incompleto com cara de completo é pior
// do que um laudo que diz o que falta.
// ============================================================================
export default function DemoImagem() {
  return (
    <TelaDemo
      titulo="🩻 Análise de imagem médica"
      descricao="Segunda leitura de uma imagem, organizada em cinco seções fixas — com as limitações declaradas dentro do próprio laudo."
      acoes={<EtiquetaExemplo>laudo fixo de exemplo</EtiquetaExemplo>}
    >
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* ENTRADA */}
        <section className="space-y-4">
          <div className="glass-card rounded-2xl p-4">
            <p className="mb-3 text-sm font-bold">1. Imagem</p>
            <div className="rounded-2xl border-2 border-dashed border-border bg-card/40 p-6 text-center">
              <ImageUp className="mx-auto mb-3 h-6 w-6 text-primary" />
              <p className="text-sm font-semibold">Enviar radiografia, tomografia, ultrassom ou ressonância</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Nesta demonstração nenhuma imagem é enviada, lida ou analisada. O bloco ao lado é um
                exemplo fixo do formato da saída.
              </p>
              <div className="mt-4">
                <BotaoDemo size="sm" motivo="Nesta demonstração não existe envio de imagem nem chamada a nenhum modelo de visão.">
                  <ImageUp className="h-3.5 w-3.5" /> Escolher a imagem
                </BotaoDemo>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4">
            <p className="mb-3 text-sm font-bold">2. Modelo de leitura</p>
            <div className="space-y-2">
              {[
                { nome: 'Groq (visão)', detalhe: 'pré-selecionado' },
                { nome: 'Gemini Flash', detalhe: 'lê imagem' },
                { nome: 'DeepSeek Vision (experimental)', detalhe: 'lê imagem · raciocina antes de responder' },
              ].map((m, i) => (
                <div
                  key={m.nome}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-xs ${
                    i === 0 ? 'border-primary bg-primary/5' : 'border-border bg-card/60'
                  }`}
                >
                  <span className="font-semibold">{m.nome}</span>
                  <span className="text-muted-foreground">{m.detalhe}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              A lista do aplicativo só mostra modelo <strong>ativo, com chave cadastrada e que lê
              imagem de verdade</strong> — modelo que não roda não aparece no seletor.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Library className="h-3.5 w-3.5 text-primary" /> Sobre a base de fontes
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              A classificação depende de uma base de fontes conferidas, ingerida à parte. Enquanto não
              houver trecho dessa base, o laudo sai <strong>sem classificar</strong> e diz o que
              faltaria. Não existe preset de mamografia no aplicativo por esse motivo.
            </p>
          </div>
        </section>

        {/* SAÍDA */}
        <section className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <ScanLine className="h-4 w-4 text-primary" /> Laudo estruturado
              </h2>
              <EtiquetaExemplo>exemplo de formato</EtiquetaExemplo>
            </div>

            <p className="mb-4 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-[11px] leading-relaxed text-amber-800 dark:text-amber-200">
              <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              {LAUDO_DEMO.aviso}
            </p>

            <div className="space-y-4">
              {LAUDO_DEMO.secoes.map((s, i) => (
                <div key={s.titulo} className="rounded-xl border border-border bg-card/50 p-4">
                  <p className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-[10px]">
                      {i + 1}
                    </span>
                    {s.titulo}
                  </p>
                  <p className="text-xs leading-relaxed text-foreground/85">{s.texto}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="text-xs font-bold text-foreground">Como o aplicativo lida com a classificação</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{LAUDO_DEMO.semClassificacao}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <BotaoDemo size="sm" motivo="No aplicativo, este botão chamaria o modelo de visão escolhido para ler a imagem enviada.">
                <ScanLine className="h-3.5 w-3.5" /> Analisar a imagem
              </BotaoDemo>
              <BotaoDemo variant="outline" size="sm" motivo="Nesta demonstração não há laudo gerado para copiar.">
                Copiar o laudo
              </BotaoDemo>
            </div>
          </div>
        </section>
      </div>
    </TelaDemo>
  )
}
