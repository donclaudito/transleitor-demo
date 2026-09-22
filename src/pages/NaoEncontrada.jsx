import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NaoEncontrada() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-lg text-center">
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Compass className="h-6 w-6 text-primary" />
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight">Esta página não existe aqui</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Este site é a apresentação do Transleitor. O que existe nele é a capa e a demonstração
          navegável — o aplicativo de verdade fica em outro endereço, com acesso restrito.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Ver a demonstração
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar à apresentação
          </Link>
        </div>
      </div>
    </div>
  )
}
