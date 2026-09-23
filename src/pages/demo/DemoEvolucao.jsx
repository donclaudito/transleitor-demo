import React, { useMemo, useState } from 'react'
import { Eraser, FileText, Printer, RefreshCw, Sparkles, Stethoscope } from 'lucide-react'
import { ESPECIALIDADES_DEMO, ESTRUTURA_EVOLUCAO, PRESCRICAO_DEMO } from '@/data/demo'
import { montarPainelDaArea, explicarAusencia } from '@/lib/painelDaArea'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// ============================================================================
// A TELA PRINCIPAL DO APLICATIVO
//
// Aqui a demonstração é INTERATIVA de propósito: o visitante clica nos itens do painel e vê a
// pré-visualização da evolução se montar. É o gesto que vende o produto — e é honesto, porque tudo
// acontece dentro do navegador dele e nada é enviado a lugar nenhum.
//
// O que a IA faria no aplicativo (escrever a prosa de cada seção) NÃO é simulado: o bloco de
// Avaliação fica em branco com a explicação. Inventar uma avaliação clínica para uma página de
// marketing seria exatamente o que o aplicativo não faz.
// ============================================================================

// Como cada seção do painel cai na estrutura SOAP no aplicativo real.
const LETRA_POR_SECAO = { queixa: 'S', exame: 'O', exames: 'O', conduta: 'P', subjetivo: 'S', objetivo: 'O', observacoes: 'P' }

// O painel de cada área vem de `@/lib/painelDaArea` — a mesma função que a tela "Painel por
// especialidade" e a prova de renderização usam. Ficava aqui uma cópia que espalhava as quatro
// chaves fixas; era ela que derrubava a tela na área sem seção de exames.

// `slugInicial` existe para a prova de renderização poder montar esta tela em CADA área. Sem isso
// o smoke só provava o estado inicial (urologia) — e foi por esse buraco que o crash em Pediatria
// foi publicado: a tela só quebra depois do clique do visitante.
export default function DemoEvolucao({ slugInicial = 'urologia' }) {
  const [slug, setSlug] = useState(slugInicial)
  const [escolhidos, setEscolhidos] = useState({})

  const painel = useMemo(() => montarPainelDaArea(slug), [slug])
  const area = ESPECIALIDADES_DEMO.find((e) => e.slug === slug)
  const avisoDeAusencia = useMemo(() => explicarAusencia(painel.semSecao), [painel])

  const alternar = (secao, item) => {
    const chave = `${secao.chave}|${item}`
    setEscolhidos((atual) => {
      const proximo = { ...atual }
      if (proximo[chave]) delete proximo[chave]
      else proximo[chave] = { secao: secao.label, item, letra: LETRA_POR_SECAO[secao.chave] || 'S' }
      return proximo
    })
  }

  const porLetra = useMemo(() => {
    const mapa = { S: [], O: [], A: [], P: [] }
    Object.values(escolhidos).forEach((e) => {
      if (mapa[e.letra]) mapa[e.letra].push(e)
    })
    return mapa
  }, [escolhidos])

  const total = Object.keys(escolhidos).length

  const trocarArea = (novo) => {
    setSlug(novo)
    setEscolhidos({})
  }

  return (
    <TelaDemo
      titulo={`Transleitor — ${area?.nome || ''}`}
      descricao="O atendimento começa pelo painel da especialidade: o médico clica no que o paciente apresenta e no que encontrou no exame, e a evolução se monta a partir disso — em prosa, na estrutura SOAP."
      acoes={
        <>
          <BotaoDemo variant="outline" size="sm" motivo="No aplicativo, este botão relê a evolução como quem vai assumir o caso e devolve o que ainda falta documentar. Aqui não há texto para reler.">
            <RefreshCw className="h-3.5 w-3.5" /> Revisar evolução
          </BotaoDemo>
          <BotaoDemo size="sm" motivo="No aplicativo, este botão chama o modelo de IA escolhido por você e escreve a evolução em prosa a partir dos itens e do caso. Nesta demonstração nenhuma IA é chamada — a pré-visualização ao lado é montada com os itens que você clicar.">
            <Sparkles className="h-3.5 w-3.5" /> Gerar evolução
          </BotaoDemo>
        </>
      }
    >
      {/* SELETOR DE ÁREA */}
      <section className="glass-card rounded-2xl p-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Especialidade em uso
        </p>
        <div className="flex flex-wrap gap-2">
          {ESPECIALIDADES_DEMO.map((e) => (
            <button
              key={e.slug}
              type="button"
              onClick={() => trocarArea(e.slug)}
              className={cn(
                // Alvo de toque: no celular o botão cresce (py-2 = ~32px de altura); de 640px para
                // cima volta ao tamanho do aplicativo. É o gesto central desta tela, e dedo não
                // acerta 24px de altura.
                'rounded-xl border px-3 py-2 text-xs font-semibold transition-colors sm:py-1.5',
                e.slug === slug
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              <span aria-hidden="true">{e.icone}</span> {e.nome}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {painel.origem === 'curado' ? (
            <>
              Esta área tem painel próprio, escrito e conferido pelo Dr. Claudio — são as opções da
              área, não achados do paciente.
            </>
          ) : (
            <>
              Esta área ainda não tem painel próprio no aplicativo. Em vez de inventar conteúdo
              clínico para uma área que ele não conhece, o aplicativo usa o painel geral — é o que
              você está vendo.
            </>
          )}
        </p>
        {avisoDeAusencia ? (
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{avisoDeAusencia}</p>
        ) : null}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* PAINEL DE ITENS */}
        <section className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <Stethoscope className="h-4 w-4 text-primary" /> Sinais &amp; Sintomas — {area?.nome}
            </h2>
            <span className="text-xs text-muted-foreground">{total} item(ns) escolhido(s)</span>
          </div>

          <Tabs defaultValue={painel.secoes[0]?.chave}>
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1">
              {painel.secoes.map((s) => (
                <TabsTrigger key={s.chave} value={s.chave} className="text-xs">
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {painel.secoes.map((s) => (
              <TabsContent key={s.chave} value={s.chave} className="mt-3 space-y-4">
                {s.groups.map((g) => (
                  <div key={g.label} className={cn('rounded-2xl border p-3', s.border, s.bg)}>
                    <p className={cn('mb-2 text-[11px] font-bold uppercase tracking-wider', s.color)}>
                      {g.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((item) => {
                        const marcado = Boolean(escolhidos[`${s.chave}|${item}`])
                        return (
                          <button
                            key={item}
                            type="button"
                            aria-pressed={marcado}
                            onClick={() => alternar(s, item)}
                            className={cn(
                              // Os itens são o gesto mais repetido da demonstração — o médico clica
                              // dezenas seguidos. No celular sobem para ~32px de altura; de 640px
                              // para cima ficam idênticos ao aplicativo.
                              'rounded-lg border px-2.5 py-2 text-xs transition-all sm:py-1',
                              marcado
                                ? 'border-primary bg-primary text-primary-foreground shadow'
                                : 'border-border bg-card/70 text-foreground/80 hover:border-primary/50 hover:text-foreground',
                            )}
                          >
                            {item}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>

          {total > 0 && (
            <button
              type="button"
              onClick={() => setEscolhidos({})}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-destructive"
            >
              <Eraser className="h-3.5 w-3.5" /> Limpar o que eu cliquei
            </button>
          )}
        </section>

        {/* PRÉ-VISUALIZAÇÃO */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="glass-card rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold">Evolução — pré-visualização</h2>
              <EtiquetaExemplo>montada por você</EtiquetaExemplo>
            </div>

            <div className="space-y-3">
              {ESTRUTURA_EVOLUCAO.map((bloco) => {
                const itens = porLetra[bloco.chave] || []
                return (
                  <div key={bloco.chave} className="rounded-xl border border-border bg-card/60 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      {bloco.chave} — {bloco.titulo}
                    </p>
                    {itens.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {itens.map((e) => (
                          <li key={`${e.secao}|${e.item}`} className="text-xs leading-relaxed text-foreground/85">
                            • {e.item}
                            <span className="text-muted-foreground"> ({e.secao})</span>
                          </li>
                        ))}
                      </ul>
                    ) : bloco.chave === 'A' ? (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        Em branco de propósito. A avaliação é escrita com apoio da IA a partir do caso
                        — e aqui não há caso. Preencher isto com um texto de exemplo seria inventar
                        conduta clínica numa página de apresentação.
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Nada aqui ainda — clique nos itens do painel.
                      </p>
                    )}
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/80">{bloco.ajuda}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <BotaoDemo variant="outline" size="sm" motivo="No aplicativo, o texto copiado sai com a linha de identificação (data, hora, profissional e CRM) exigida pela Res. CFM 1.638/2002.">
                <FileText className="h-3.5 w-3.5" /> Copiar
              </BotaoDemo>
              <BotaoDemo variant="outline" size="sm" motivo="No aplicativo, este botão imprime a evolução em A4 retrato, com data e hora do registro, identificação do profissional e linha de assinatura.">
                <Printer className="h-3.5 w-3.5" /> Imprimir em PDF
              </BotaoDemo>
            </div>
          </div>

          {/* PRESCRIÇÃO */}
          <div className="glass-card mt-4 rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold">💊 Prescrição</h2>
              <EtiquetaExemplo>exemplo de formato</EtiquetaExemplo>
            </div>
            <ol className="space-y-2">
              {PRESCRICAO_DEMO.map((linha) => (
                <li
                  key={linha}
                  className="rounded-lg border border-border bg-card/60 px-3 py-2 text-xs leading-relaxed text-foreground/85"
                >
                  {linha}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Um medicamento por item, com dose, via, intervalo e diluição no MESMO item — é o
              formato que a farmácia lê. A numeração é da folha, não do texto do médico.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <BotaoDemo variant="outline" size="sm" motivo="No aplicativo, a folha de prescrição sai em A4 paisagem, com setor, leito e iniciais do paciente — nunca o nome completo.">
                <Printer className="h-3.5 w-3.5" /> Imprimir prescrição
              </BotaoDemo>
            </div>
          </div>
        </aside>
      </div>
    </TelaDemo>
  )
}
