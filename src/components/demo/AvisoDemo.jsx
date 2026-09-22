import React from 'react'
import { AlertTriangle, Info } from 'lucide-react'
import { AVISO_DEMO, LIMITES_POR_TELA } from '@/data/demo'

// FAIXA PERMANENTE DA DEMONSTRAÇÃO.
// Ela fica no topo de TODAS as telas internas de propósito: quem abre um link direto para
// /demo/evolucao, sem passar pela capa, precisa saber no primeiro segundo que aquilo é ilustração.
export function FaixaDemo() {
  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 text-[11px] font-semibold text-amber-700 md:text-xs dark:text-amber-300">
        <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
        <span>{AVISO_DEMO.curto}</span>
      </div>
    </div>
  )
}

// EXPLICAÇÃO LONGA — o "o que esta página não faz", com a marcação do que se aplica àquela rota.
export function NotaDemo({ children, className = '' }) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-4 ${className}`}>
      <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
      <p className="text-xs leading-relaxed text-muted-foreground">{children || AVISO_DEMO.longo}</p>
    </div>
  )
}

// O limite específico da tela. A chave é a ROTA, para não haver duas listas de limites.
export function LimiteDaTela({ rota }) {
  const limite = LIMITES_POR_TELA[rota]
  if (!limite) return null
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4">
      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
      <p className="text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">O que esta tela não faz:</strong> {limite}
      </p>
    </div>
  )
}

// ETIQUETA DE EXEMPLO — para marcar qualquer bloco cujo conteúdo é fixo e escrito à mão.
export function EtiquetaExemplo({ children = 'Conteúdo de exemplo' }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  )
}
