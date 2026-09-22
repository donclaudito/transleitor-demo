import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { ArrowLeft, Stethoscope } from 'lucide-react'
import { TELAS_DEMO } from '@/data/demo'
import { FaixaDemo } from '@/components/demo/AvisoDemo'

// ============================================================================
// MOLDE DA DEMONSTRAÇÃO
//
// A navegação entre as telas FUNCIONA — é o que permite a alguém "ter uma ideia do aplicativo",
// que é o objetivo desta peça. O que não funciona é tudo o que, no aplicativo real, grava, consulta
// ou chama IA.
// ============================================================================
export default function DemoShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FaixaDemo />

      <header className="sticky top-0 z-40 glass">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/demo" className="flex items-center gap-2 text-base font-extrabold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Stethoscope className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
            Transleitor<span className="text-primary">.</span>
            <span className="ml-1 hidden text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:inline">
              demonstração
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar à apresentação
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[264px_1fr] lg:py-10">
        {/* NAVEGAÇÃO — barra horizontal no celular, coluna fixa no computador */}
        <nav aria-label="Telas da demonstração">
          <p className="mb-2 hidden text-[10px] font-bold uppercase tracking-wider text-muted-foreground lg:block">
            Telas demonstradas
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
