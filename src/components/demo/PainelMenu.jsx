import React from 'react'
import { Building2, Hospital } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// A TELA DE MENU DO APLICATIVO — "Escolha o ambiente"
//
// Este componente é a FONTE ÚNICA da tela de menu: a mesma marcação desenha a tela da
// demonstração (/demo/menu) e a amostra dentro da moldura do herói da capa. Duas cópias
// divergiriam na primeira mudança — e a capa passaria a mostrar uma tela que não existe.
//
// O conteúdo é o REAL do aplicativo (src/pages/Menu.jsx do projeto do app): dois ambientes.
// A prop `compacto` só reduz o tamanho; não muda o que está escrito.
// ============================================================================
const AMBIENTES = [
  {
    id: 'hospital',
    Icone: Hospital,
    titulo: 'Ambiente Hospitalar',
    desc: 'Setores, leitos e evolução hospitalar',
  },
  {
    id: 'clinica',
    Icone: Building2,
    titulo: 'Clínicas & Ambulatório',
    desc: 'Consultas e atendimentos ambulatoriais',
  },
]

export { AMBIENTES }

export default function PainelMenu({ compacto = false }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        compacto ? 'gap-5 px-5 py-7' : 'gap-8 px-4 py-12',
      )}
    >
      <div className="space-y-1 text-center">
        <h2 className={cn('font-extrabold tracking-tight', compacto ? 'text-lg' : 'text-2xl sm:text-3xl')}>
          Escolha o ambiente
        </h2>
        <p className={cn('text-muted-foreground', compacto ? 'text-[11px]' : 'text-sm')}>
          Onde você vai atender agora?
        </p>
      </div>

      <div className={cn('grid w-full', compacto ? 'grid-cols-2 gap-3' : 'max-w-2xl gap-5 md:grid-cols-2')}>
        {AMBIENTES.map(({ id, Icone, titulo, desc }) => (
          <div
            key={id}
            className={cn(
              'premium-card flex flex-col items-center gap-3 text-center',
              compacto ? 'rounded-xl p-4' : 'rounded-2xl p-8',
            )}
          >
            <span
              className={cn(
                'flex items-center justify-center rounded-2xl bg-primary/10 text-primary',
                compacto ? 'h-10 w-10' : 'h-14 w-14',
              )}
            >
              <Icone className={compacto ? 'h-5 w-5' : 'h-7 w-7'} />
            </span>
            <span className="space-y-1">
              <span className={cn('block font-extrabold', compacto ? 'text-xs' : 'text-lg')}>{titulo}</span>
              <span className={cn('block text-muted-foreground', compacto ? 'text-[10px]' : 'text-xs')}>
                {desc}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
