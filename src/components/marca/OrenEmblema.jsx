import React, { useId } from 'react'

// ============================================================================
// EMBLEMA OREN.AI
//
// O símbolo da marca: anel ciano, brilho interno e o traçado de pulso em degraus — a mesma
// linguagem visual do material da marca (azul-marinho profundo, ciano, "Inteligência Cirúrgica").
//
// O id do gradiente é único por instância (`useId`): o emblema aparece mais de uma vez na capa
// (cabeçalho e herói), e id repetido em SVG faz o navegador usar o primeiro — o segundo
// renderizaria sem brilho, sem erro nenhum no console. Foi por isso que o id não é fixo.
// ============================================================================
export default function OrenEmblema({ tamanho = 96, className = '', brilho = true }) {
  const bruto = useId()
  const idGradiente = `oren-brilho-${bruto.replace(/:/g, '')}`

  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 96 96"
      className={className}
      role="img"
      aria-label="Oren.AI"
    >
      <defs>
        <radialGradient id={idGradiente} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.30" />
          <stop offset="62%" stopColor="#22d3ee" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="48" cy="48" r="47" fill={`url(#${idGradiente})`} />
      <circle cx="48" cy="48" r="38" fill="#04121c" />
      <circle cx="48" cy="48" r="38" fill="none" stroke="#22d3ee" strokeOpacity="0.45" strokeWidth="1.25" />
      <path
        d="M24 51 H35 V59 H46 V33 H57 V51 H72"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={brilho ? { filter: 'drop-shadow(0 0 7px rgba(34, 211, 238, 0.75))' } : undefined}
      />
    </svg>
  )
}

// Marca completa: emblema + nome, com a hierarquia que o Dr. Claudio definiu — Oren.AI é a
// MARCA-MÃE e o Transleitor é o PRODUTO dentro dela. Por isso os dois aparecem, nesta ordem.
export function MarcaOren({ tamanho = 40, comProduto = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <OrenEmblema tamanho={tamanho} className="flex-shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight">
          Oren<span className="text-primary">.AI</span>
        </span>
        {comProduto && (
          <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Transleitor
          </span>
        )}
      </span>
    </span>
  )
}
