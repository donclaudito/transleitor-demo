import React from 'react'
import { Ban, CheckCircle2, FileSearch, Scale, ShieldCheck } from 'lucide-react'
import {
  ARTIGOS_DA_LGPD,
  CRITERIOS_OFERECIDOS,
  CRITERIOS_RECUSADOS,
  FONTES,
  NORMATIVAS,
} from '@/data/conformidade'
import TelaDemo from '@/components/demo/TelaDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// CONFORMIDADE — normativas, critérios e o que o aplicativo se recusa a afirmar
//
// Pedido do Dr. Claudio: *"um módulo que mostre todas as adaptações a normativas, critérios"*.
//
// POR QUE ISTO NÃO É UMA PÁGINA DE SELOS: cada bloco diz o que a norma EXIGE, o que o aplicativo FAZ
// e qual é a TRAVA que impede o contrário — com o arquivo onde isso vive. Norma sem trava em código é
// intenção; e intenção não defende ninguém numa auditoria.
//
// E tem a parte que quase nenhum produto mostra: a lista de classificações que o aplicativo se
// RECUSA a nomear sem fonte conferida — e o fato, medido, de que hoje a base está vazia, então o
// laudo sai sem classificar de propósito.
// ============================================================================
export default function DemoConformidade() {
  return (
    <TelaDemo
      titulo="⚖️ Conformidade — normativas e critérios"
      descricao="A que o aplicativo se submete, o que ele faz para cumprir, e a trava em código que impede o contrário — inclusive o que ainda NÃO está pronto. Os arquivos de origem de cada afirmação estão no bloco de Fontes, no fim."
      acoes={<EtiquetaExemplo>lido do aplicativo</EtiquetaExemplo>}
    >
      {/* NORMATIVAS */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg">
          <Scale className="h-5 w-5 text-primary" /> Normativas
        </h2>

        {NORMATIVAS.map((n) => (
          <article key={n.norma} className="glass-card rounded-2xl p-5">
            <header className="mb-3">
              <p className="text-base text-foreground">{n.norma}</p>
              <p className="mt-0.5 text-xs text-primary">{n.tema}</p>
            </header>

            <dl className="space-y-3">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  O que exige
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-foreground/85">{n.exige}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  O que o aplicativo faz
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-foreground/85">{n.faz}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  A trava
                </dt>
                <dd className="mt-1 flex gap-2 text-xs leading-relaxed text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  <span>{n.trava}</span>
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      {/* CRITÉRIOS CLÍNICOS — a distinção que importa */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg">
          <FileSearch className="h-5 w-5 text-primary" /> Critérios clínicos
        </h2>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
          O aplicativo usa <strong className="text-foreground">duas listas que não se misturam</strong>:
          escalas que ele oferece para o médico registrar — e que ele <strong className="text-foreground">não
          calcula nem interpreta</strong> — e classificações que ele <strong className="text-foreground">se
          recusa a nomear</strong> sem trecho de fonte conferida. Confundir as duas seria o defeito mais
          grave possível num aplicativo que existe para defender quem assina.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* OFERECIDOS */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="flex items-center gap-2 text-sm text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Oferecidos como opção — o médico registra
            </h3>
            <ul className="mt-4 space-y-4">
              {CRITERIOS_OFERECIDOS.map((c) => (
                <li key={c.criterio}>
                  <p className="text-xs text-foreground">{c.criterio}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{c.como}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-primary">{c.regra}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* RECUSADOS */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="flex items-center gap-2 text-sm text-amber-700">
              <Ban className="h-4 w-4" /> Recusados sem fonte conferida
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {CRITERIOS_RECUSADOS.familias.map((f) => (
                <span
                  key={f}
                  className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-2.5 py-1 font-mono text-[11px] text-amber-800"
                >
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              {CRITERIOS_RECUSADOS.regra}
            </p>
            <p className="mt-3 rounded-xl border border-border bg-card/60 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <strong className="text-foreground">O fato medido:</strong> {CRITERIOS_RECUSADOS.fatoMedido}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {CRITERIOS_RECUSADOS.consequencia}
            </p>
            <p className="mt-3 font-mono text-[11px] text-primary">{CRITERIOS_RECUSADOS.onde}</p>
          </div>
        </div>
      </section>

      {/* ARTIGOS DA LGPD */}
      <section className="glass-card rounded-2xl p-5">
        <h2 className="text-lg">Artigos da LGPD, um a um</h2>
        <p className="mt-1 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Cada artigo que o aplicativo implementa, com a funcionalidade que o implementa. O mapeamento
          vem do acervo de conformidade do próprio projeto, onde os artigos e prazos estão codificados
          com fonte.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-bold">Artigo</th>
                <th className="py-2 pr-3 font-bold">Sobre o quê</th>
                <th className="py-2 font-bold">Onde o aplicativo implementa</th>
              </tr>
            </thead>
            <tbody>
              {ARTIGOS_DA_LGPD.map((a) => (
                <tr key={a.artigo} className="border-b border-border/60 last:border-0">
                  <td className="whitespace-nowrap py-2 pr-3 font-mono text-[11px] text-primary">{a.artigo}</td>
                  <td className="py-2 pr-3 text-foreground/85">{a.assunto}</td>
                  <td className="py-2 text-muted-foreground">{a.onde}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FONTES */}
      <section className="rounded-2xl border border-border bg-card/60 p-5">
        <h2 className="flex items-center gap-2 text-sm">
          <FileSearch className="h-4 w-4 text-primary" /> De onde saiu cada afirmação desta tela
        </h2>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {FONTES.map((f) => (
            <li key={f} className="font-mono text-[11px] leading-relaxed text-muted-foreground">
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          A lista existe para a tela poder ser <strong className="text-foreground">auditada</strong>: se
          uma regra sair do código, o item desta página fica órfão e alguém percebe. Norma citada sem
          arquivo de origem é norma que ninguém confere.
        </p>
      </section>
    </TelaDemo>
  )
}
