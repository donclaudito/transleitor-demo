import React from 'react'
import { useLocation } from 'react-router-dom'
import { LimiteDaTela, NotaDemo } from '@/components/demo/AvisoDemo'

// CABEÇALHO PADRÃO DE TODA TELA DA DEMONSTRAÇÃO.
// Garante que nenhuma tela nasça sem: título, explicação do que ela é, o limite específico
// daquela tela e o aviso geral. Se um dia alguém criar uma tela nova sem o limite, o aviso geral
// continua aparecendo — a omissão não vira silêncio.
export default function TelaDemo({ titulo, descricao, acoes, children }) {
  const { pathname } = useLocation()

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">{titulo}</h1>
            {descricao && (
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">{descricao}</p>
            )}
          </div>
          {acoes && <div className="flex flex-wrap items-center gap-2">{acoes}</div>}
        </div>
        <LimiteDaTela rota={pathname} />
      </header>

      {children}

      <NotaDemo />
    </div>
  )
}
