import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import NaoEncontrada from '@/pages/NaoEncontrada'
import ScrollToTop from '@/components/ScrollToTop'
import DemoShell from '@/components/demo/DemoShell'
import DemoIndex from '@/pages/demo/DemoIndex'
import DemoMapa from '@/pages/demo/DemoMapa'
import DemoMenu from '@/pages/demo/DemoMenu'
import DemoEvolucao from '@/pages/demo/DemoEvolucao'
import DemoCaptura from '@/pages/demo/DemoCaptura'
import DemoImagem from '@/pages/demo/DemoImagem'
import DemoCirurgia from '@/pages/demo/DemoCirurgia'
import DemoPassagem from '@/pages/demo/DemoPassagem'
import DemoEspecialidades from '@/pages/demo/DemoEspecialidades'
import DemoElio from '@/pages/demo/DemoElio'
import DemoMonitoramento from '@/pages/demo/DemoMonitoramento'
import DemoDireitos from '@/pages/demo/DemoDireitos'
import DemoSeguranca from '@/pages/demo/DemoSeguranca'
import DemoMinhaLLM from '@/pages/demo/DemoMinhaLLM'
import DemoConformidade from '@/pages/demo/DemoConformidade'
import DemoIntegracoes from '@/pages/demo/DemoIntegracoes'

// O site pode ser servido na raiz (máquina local, domínio próprio) ou dentro de uma subpasta
// (GitHub Pages serve em /<repo>/). O Vite já publica o valor certo em BASE_URL; o roteador
// precisa do mesmo prefixo, sem a barra final.
const basename = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') || '/'

export default function App() {
  return (
    <Router basename={basename}>
      <ScrollToTop />
      <Routes>
        {/* A capa de apresentação do produto. Não tem login, não tem app: é a porta de entrada. */}
        <Route path="/" element={<LandingPage />} />

        {/* A demonstração navegável. Todas as telas são ilustrativas e não executam função. */}
        <Route path="/demo" element={<DemoShell />}>
          <Route index element={<DemoIndex />} />
          <Route path="mapa" element={<DemoMapa />} />
          <Route path="menu" element={<DemoMenu />} />
          <Route path="evolucao" element={<DemoEvolucao />} />
          <Route path="captura" element={<DemoCaptura />} />
          <Route path="imagem" element={<DemoImagem />} />
          <Route path="cirurgia" element={<DemoCirurgia />} />
          <Route path="passagem" element={<DemoPassagem />} />
          <Route path="especialidades" element={<DemoEspecialidades />} />
          <Route path="elio" element={<DemoElio />} />
          <Route path="monitoramento" element={<DemoMonitoramento />} />
          <Route path="direitos" element={<DemoDireitos />} />
          <Route path="seguranca" element={<DemoSeguranca />} />
          <Route path="minha-llm" element={<DemoMinhaLLM />} />
          <Route path="conformidade" element={<DemoConformidade />} />
          <Route path="integracoes" element={<DemoIntegracoes />} />
        </Route>

        {/* Endereços antigos do aplicativo não existem aqui: quem chegar por um link velho vai
            para a demonstração em vez de ver uma tela de erro. */}
        <Route path="/menu" element={<Navigate to="/demo" replace />} />
        <Route path="/transleitor" element={<Navigate to="/demo/evolucao" replace />} />
        <Route path="/capturas" element={<Navigate to="/demo/captura" replace />} />
        <Route path="/imagem-medica" element={<Navigate to="/demo/imagem" replace />} />
        <Route path="/elio" element={<Navigate to="/demo/elio" replace />} />
        <Route path="/seguranca" element={<Navigate to="/demo/seguranca" replace />} />
        <Route path="/descricao-cirurgia" element={<Navigate to="/demo/cirurgia" replace />} />
        <Route path="/passagem" element={<Navigate to="/demo/passagem" replace />} />
        <Route path="/direitos-titular" element={<Navigate to="/demo/direitos" replace />} />
        <Route path="/monitoramento" element={<Navigate to="/demo/monitoramento" replace />} />

        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </Router>
  )
}
