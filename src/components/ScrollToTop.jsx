import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Sobe para o topo quando a ROTA muda. A capa usa âncoras (#funcionalidades) e a demonstração
// começa no meio da página: sem isto, trocar de tela mantém a rolagem anterior e a pessoa acha
// que a página nova está vazia. Âncora (hash) não conta como troca de rota: ali a rolagem é a
// própria navegação.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
