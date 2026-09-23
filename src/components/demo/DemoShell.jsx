import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { TELAS_DEMO } from '@/data/demo'
import { FaixaDemo } from '@/components/demo/AvisoDemo'
import { MarcaOren } from '@/components/marca/OrenEmblema'

// ============================================================================
// MOLDE DA DEMONSTRAÇÃO
//
// A navegação entre as telas FUNCIONA — é o que permite a alguém "ter uma ideia do aplicativo",
// que é o objetivo desta peça. O que não funciona é tudo o que, no aplicativo real, grava, consulta
// ou chama IA.
// ============================================================================
export default function DemoShell() {
  return (
    <div className="leitura-no-celular min-h-screen bg-background text-foreground">
      <FaixaDemo />

      <header className="sticky top-0 z-40 glass">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/demo" className="flex items-center gap-2">
            <MarcaOren tamanho={30} />
            <span className="hidden text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:inline">
              demonstração
            </span>
          </Link>
          {/* O RÓTULO ENCOLHE NO CELULAR. "Voltar à apresentação" ocupa ~130px, e junto com a marca
              (~120px) mais o padding isso estoura os 320px das telas menores — sem `flex-wrap` e com
              `min-width: auto`, a linha não encolhe: ela TRANSBORDA, e a página inteira ganha rolagem
              horizontal, que é o que faz tudo parecer fora de alinhamento.
              É a mesma técnica já usada no rótulo "demonstração" logo acima. */}
          <Link
            to="/"
            className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Voltar à apresentação</span>
            <span className="sm:hidden">Voltar</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[264px_1fr] lg:py-10">
        {/* NAVEGAÇÃO — barra horizontal no celular, coluna fixa no computador.

            `min-w-0` NÃO É OPCIONAL AQUI, e a falta dele era o defeito relatado no celular.
            `nav` é um item de grid; item de grid nasce com `min-width: auto`, isto é, NÃO encolhe
            abaixo do próprio conteúdo. O conteúdo é a faixa de 15 telas — 3010px numa tela de 390px.
            A coluna do grid virava 3010px, o `main` herdava essa largura e a PÁGINA INTEIRA passava a
            rolar de lado: tudo espremido nos primeiros 390px, o resto vazio. É o que se vê como
            "não está alinhado".

            O `overflow-x-auto` do <ul> não resolve sozinho: ele é filho, não o item de grid — quem
            precisa poder encolher é o `nav`. O `main` logo abaixo já tinha `min-w-0`; o `nav` era o
            único sem, e é o mesmo esquecimento do `mt-2` dos cartões. */}
        <nav aria-label="Telas da demonstração" className="min-w-0">
          {/* RÓTULO COM FAIXA — pedido do Dr. Claudio, no estilo do material dele: texto forte
              sobre uma faixa sólida. O `-mx-1` faz a faixa sangrar um pouco além do texto, que é
              o que dá o ar de marca-texto em vez de botão. A cor sai de `--primary`, a mesma do
              item ativo da lista logo abaixo, para o rótulo e a navegação falarem a mesma língua. */}
          <p className="mb-3 hidden lg:block">
            <span className="-mx-1 inline-block bg-primary px-2.5 py-1 text-[11px] font-extrabold uppercase leading-none tracking-wider text-primary-foreground">
              Telas demonstradas
            </span>
          </p>
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {TELAS_DEMO.map((t) => (
              <li key={t.rota} className="flex-shrink-0 lg:flex-shrink">
                <NavLink
                  to={t.rota}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors',
                      'lg:w-full',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow'
                        : 'border border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                    ].join(' ')
                  }
                >
                  <span aria-hidden="true">{t.icone}</span>
                  <span className="whitespace-nowrap lg:whitespace-normal">{t.nome}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">Página de apresentação do Transleitor.</p>
          <p className="mt-1 max-w-3xl">
            Tudo o que você vê aqui é ilustrativo: os pacientes são fictícios e aparecem sem
            identificação, e não existe ligação com nenhum sistema hospitalar, prontuário eletrônico ou
            base de dados. Nenhuma informação é coletada nesta página.
          </p>
          <p className="mt-3">
            <Link to="/" className="font-bold text-primary hover:underline">
              ← Voltar à apresentação
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
