import React from 'react'
import { cn } from '@/lib/utils'

// ============================================================================
// MOLDURA DA AMOSTRA DO APLICATIVO
//
// Uma tela do aplicativo dentro de uma moldura, para deixar claro que aquilo é uma AMOSTRA e não o
// site em volta. Duas decisões deliberadas:
//
// 1. SEM BARRA DE NAVEGADOR FALSA. Não desenho "três bolinhas" nem uma barra de endereço: isso
//    seria inventar uma interface que o aplicativo não tem, numa página cujo argumento é não
//    inventar. A moldura é só a borda e o brilho.
// 2. TEMA DO APLICATIVO, NÃO DA CAPA (`tema-app`). A capa é azul-marinho com ciano; a amostra
//    mostra o aplicativo como ele é. Amostra vestida com a cor da capa seria ficção.
// ============================================================================
export default function MolduraApp({ children, className = '', legenda }) {
  return (
    <figure className={cn('m-0', className)}>
      <div className="overflow-hidden rounded-2xl border border-primary/25 ring-1 ring-primary/10 shadow-glow">
        <div className="tema-app">{children}</div>
      </div>
      {legenda && (
        <figcaption className="mt-3 text-center text-[11px] font-medium text-muted-foreground">
          {legenda}
        </figcaption>
      )}
    </figure>
  )
}
