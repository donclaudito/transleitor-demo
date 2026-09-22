import React, { useId, useState } from 'react'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AVISO_DEMO } from '@/data/demo'

// BOTÃO QUE NÃO EXECUTA — e diz por quê.
//
// Nesta demonstração não existe função de verdade: não há backend, não há chave de IA, não há banco.
// Em vez de desabilitar o botão (o que não ensina nada) ou de fingir que funcionou (o que seria
// mentira), ele mostra o que faria no aplicativo de verdade. A pessoa vê ONDE a função fica e o que
// ela faz — que é o objetivo de uma demonstração de produto.
export default function BotaoDemo({
  children,
  motivo,
  variant = 'default',
  size = 'default',
  className = '',
  ...resto
}) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <span className="inline-flex flex-col items-stretch gap-2">
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-describedby={aberto ? id : undefined}
        {...resto}
      >
        {children}
      </Button>
      {aberto && (
        <span
          id={id}
          role="status"
          className="flex max-w-sm items-start gap-2 rounded-xl border border-primary/25 bg-primary/5 px-3 py-2 text-xs leading-relaxed text-muted-foreground"
        >
          <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
          <span>{motivo || AVISO_DEMO.botao}</span>
        </span>
      )}
    </span>
  )
}
