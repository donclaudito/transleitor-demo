import React, { useMemo, useState } from 'react'
import { Layers, Tag } from 'lucide-react'
import { PANELS_ESPECIALIDADE } from '@/data/paineisEspecialidade'
import { ESPECIALIDADES_DEMO } from '@/data/demo'
import { montarPainelDaArea, explicarAusencia } from '@/lib/painelDaArea'
import TelaDemo from '@/components/demo/TelaDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'
import { cn } from '@/lib/utils'

// ============================================================================
// PAINEL POR ESPECIALIDADE
//
// O argumento desta tela é uma medição, não uma promessa: o conteúdo do painel MUDA com a área.
// Antes, a caixa "Queixa Principal" trazia a mesma cauda de 29 itens em toda especialidade — e uma
// caixa que mostra a mesma coisa em todo lugar deixa de ser "a queixa desta área".
//
// Comparação lado a lado, com os números contados na hora a partir da mesma tabela que o
// aplicativo usa. Nada aqui é digitado à mão.
// ============================================================================
function contar(secao) {
  return secao.groups.reduce((soma, g) => soma + g.items.length, 0)
}

// O painel de cada área vem de `@/lib/painelDaArea` — a mesma função da tela principal e da prova
// de renderização. Aqui ficava a SEGUNDA cópia das quatro chaves fixas, que quebrava pelo mesmo
// motivo: área sem uma das seções virava `{ chave: 'exames' }`, sem `groups`.

// `slugInicial` existe para a prova de renderização montar esta tela em cada área curada.
export default function DemoEspecialidades({ slugInicial = 'urologia' }) {
  const comPainel = useMemo(() => ESPECIALIDADES_DEMO.filter((e) => PANELS_ESPECIALIDADE[e.slug]), [])
  const [slug, setSlug] = useState(slugInicial)

  const painel = useMemo(() => montarPainelDaArea(slug), [slug])
  const area = ESPECIALIDADES_DEMO.find((e) => e.slug === slug)
  const avisoDeAusencia = useMemo(() => explicarAusencia(painel.semSecao), [painel])
  const total = painel.secoes.reduce((soma, s) => soma + contar(s), 0)

  return (
    <TelaDemo
      titulo="🏷️ Painel por especialidade"
      descricao="Cada área tem o seu próprio conjunto de itens, escrito e conferido um por um. A especialidade que ainda não tem painel próprio usa o geral — o aplicativo prefere a versão genérica a inventar conteúdo clínico de uma área que ele não conhece."
      acoes={<EtiquetaExemplo>tabela real do aplicativo</EtiquetaExemplo>}
    >
      <section className="glass-card rounded-2xl p-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Áreas com painel próprio
        </p>
        <div className="flex flex-wrap gap-2">
          {comPainel.map((e) => (
            <button
              key={e.slug}
              type="button"
              onClick={() => setSlug(e.slug)}
              className={cn(
                // Alvo de toque: cresce no celular e volta ao tamanho do aplicativo em 640px+.
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
      </section>

      <section className="glass-card rounded-2xl p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <Tag className="h-4 w-4 text-primary" /> {area?.icone} {area?.nome}
          </h2>
          <span className="text-xs text-muted-foreground">
            {painel.secoes.length} seções · <strong className="text-foreground">{total} itens</strong>
          </span>
        </div>

        {avisoDeAusencia ? (
          <p className="mb-4 text-xs leading-relaxed text-muted-foreground">{avisoDeAusencia}</p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {painel.secoes.map((s) => (
            <div key={s.chave} className={cn('rounded-2xl border p-3', s.border, s.bg)}>
              <p className={cn('text-[11px] font-bold uppercase tracking-wider', s.color)}>{s.label}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {contar(s)} itens em {s.groups.length} grupos
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-4">
          {painel.secoes.map((s) => (
            <details key={s.chave} className="rounded-xl border border-border bg-card/50 p-3">
              <summary className="cursor-pointer text-xs font-bold text-foreground">
                {s.label} — ver os itens
              </summary>
              <div className="mt-3 space-y-3">
                {s.groups.map((g) => (
                  <div key={g.label}>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {g.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Layers className="h-4 w-4 text-primary" /> O que mudou, em números
        </h2>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          A medição que originou esta tela, feita no aplicativo antes da correção: urologia tinha 54
          itens na caixa "Queixa Principal", cardiologia 52 e dermatologia 50 — e{' '}
          <strong className="text-foreground">29 deles eram exatamente os mesmos</strong> nas três
          áreas (Parestesias, Insônia, Perda de apetite, Dor de garganta…). A caixa dizia ser "a
          queixa desta área" e trazia a mesma cauda em todas.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Agora os itens comuns a qualquer área saíram da caixa e ganharam uma caixa própria, com nome
          que diz o que são. A sobreposição de <em>texto</em> continua existindo — "Cefaleia" é
          queixa da clínica médica e também item comum —, mas nenhum item da caixa vem de fora da
          configuração da área.
        </p>
      </section>
    </TelaDemo>
  )
}
