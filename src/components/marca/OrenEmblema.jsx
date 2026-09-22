import React from 'react'

// ============================================================================
// EMBLEMA OREN.AI — o arquivo da marca, não um desenho meu
//
// HISTÓRICO, PARA NÃO SE REPETIR: na primeira versão da capa eu desenhei o emblema à mão em SVG,
// a partir da imagem de capa que o Dr. Claudio mandou (baixa resolução). O resultado era uma
// APROXIMAÇÃO — e aproximação de marca é erro: o traçado e a cor não eram os da marca.
// Agora o emblema vem do arquivo oficial (2048×2048), recortado e com fundo transparente por
// `gerar-icones-oren.py`. O SVG foi removido; existe UM só emblema neste projeto.
//
// Por que arquivo separado e não embutido: o mesmo desenho serve de ícone de aba, ícone de app e
// marca na tela. Embutir obrigaria a manter três cópias do mesmo traçado.
// ============================================================================

// O prefixo do site (GitHub Pages serve em subpasta; Vercel e local servem na raiz).
const BASE = import.meta.env.BASE_URL || '/'

export default function OrenEmblema({ tamanho = 96, className = '' }) {
  return (
    <img
      src={`${BASE}oren-ai-192.png`}
      width={tamanho}
      height={tamanho}
      // Sem texto alternativo e fora da árvore de acessibilidade DE PROPÓSITO: o nome da marca
      // está escrito ao lado, em texto. Descrever a imagem de novo faria o leitor de tela dizer
      // "Oren.AI" duas vezes seguidas.
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`select-none ${className}`}
      style={{ width: tamanho, height: tamanho }}
    />
  )
}

// Marca completa: emblema + nome, com a hierarquia definida pelo Dr. Claudio — Oren.AI é a
// MARCA-MÃE e o Transleitor é o PRODUTO dentro dela. Por isso os dois aparecem, nesta ordem.
export function MarcaOren({ tamanho = 40, comProduto = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <OrenEmblema tamanho={tamanho} className="flex-shrink-0" />
      <span className="flex flex-col leading-none">
        {/* A marca é serifa em qualquer tela (`.fonte-marca`), inclusive na demonstração: o nome
            não é elemento de interface, é a marca — não deve mudar de tipo conforme a tela. */}
        <span className="fonte-marca text-xl leading-none">
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
