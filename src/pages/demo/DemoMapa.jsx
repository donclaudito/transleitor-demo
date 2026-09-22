import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Layers, MinusCircle, MousePointerClick } from 'lucide-react'
import { COBERTURA, MAPA_DO_APP, NUMEROS_DO_APP } from '@/data/mapaDoApp'
import TelaDemo from '@/components/demo/TelaDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// MAPA DO APLICATIVO — todas as telas, de uma vez
//
// Pedido do Dr. Claudio: *"ter um módulo que mostre todas as telas do aplicativo"*.
//
// POR QUE ISTO É HONESTO E NÃO VAIDADE: a demonstração cobre 14 telas; o aplicativo tem 34 rotas.
// Um mapa que listasse tudo como se tudo estivesse demonstrado seria propaganda enganosa. Aqui cada
// linha diz uma de duas coisas — "tem demonstração" (com o link) ou "não tem" —, e o número da
// cobertura aparece em cima. Quem lê sabe exatamente o que está vendo.
//
// A lista é LIDA do aplicativo (rotas de `App.jsx` e contagem de arquivos), não escrita de memória.
// ============================================================================
export default function DemoMapa() {
  const cobertura = Math.round((COBERTURA.comDemonstracao / COBERTURA.telasDoApp) * 100)

  return (
    <TelaDemo
      titulo="🗺️ Mapa do aplicativo — todas as telas"
      descricao="O inventário completo do Transleitor: as 34 rotas, agrupadas por onde elas entram no trabalho. Cada linha diz se aquela tela tem demonstração navegável aqui — e as que não têm, aparecem assim mesmo."
      acoes={<EtiquetaExemplo>lido das rotas do aplicativo</EtiquetaExemplo>}
    >
      {/* NÚMEROS DO APLICATIVO */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {NUMEROS_DO_APP.map((n) => (
          <div key={n.rotulo} className="glass-card rounded-2xl p-4">
            <p className="text-3xl leading-none">{n.valor}</p>
            <p className="mt-1.5 text-sm text-foreground">{n.rotulo}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{n.detalhe}</p>
          </div>
        ))}
      </section>

      {/* A COBERTURA, DITA EM VOZ ALTA */}
      <section className="glass-card rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-primary" /> O que esta demonstração cobre
          </h2>
          <span className="text-sm text-muted-foreground">
            <strong className="text-foreground">{COBERTURA.comDemonstracao}</strong> de{' '}
            <strong className="text-foreground">{COBERTURA.telasDoApp}</strong> rotas — {cobertura}%
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${cobertura}%` }} />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          As telas <strong className="text-foreground">sem demonstração</strong> são, em boa parte,
          telas de acesso e de administração: elas dependem de conta, de permissão de administrador ou
          de credencial de terceiro — mostrar uma delas exigiria inventar um login e um sistema por
          trás. Preferimos listar e dizer que não estão aqui.
        </p>
      </section>

      {/* O MAPA */}
      {MAPA_DO_APP.map((g) => (
        <section key={g.grupo} className="glass-card rounded-2xl p-5">
          <header className="mb-4">
            <h2 className="flex items-center gap-2 text-base">
              <span aria-hidden="true">{g.icone}</span> {g.grupo}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{g.descricao}</p>
          </header>

          <ul className="space-y-2">
            {g.telas.map((t) => (
              <li
                key={t.rota}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card/50 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{t.nome}</p>
                  <p className="font-mono text-[11px] text-primary">{t.rota}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{t.o_que}</p>
                </div>

                {t.demo ? (
                  <Link
                    to={t.demo}
                    className="inline-flex flex-shrink-0 items-center gap-1.5 self-start rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] text-primary transition-colors hover:bg-primary/20"
                  >
                    <MousePointerClick className="h-3.5 w-3.5" /> Ver demonstração
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <span className="inline-flex flex-shrink-0 items-center gap-1.5 self-start rounded-xl border border-border px-3 py-1.5 text-[11px] text-muted-foreground">
                    <MinusCircle className="h-3.5 w-3.5" /> Não demonstrada
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="rounded-2xl border border-border bg-card/60 p-4 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">De onde vem esta lista:</strong> das rotas declaradas no
        roteador do aplicativo e da contagem dos arquivos de página, entidade e função de backend. Não
        é um resumo de memória — e é por isso que ela inclui uma tela que existe no código mas não tem
        rota, e marca as 20 rotas que esta demonstração não cobre.
      </p>
    </TelaDemo>
  )
}
