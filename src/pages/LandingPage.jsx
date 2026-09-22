import React from 'react';
import LandingNav from '@/components/landing/LandingNav';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingModes from '@/components/landing/LandingModes';
import LandingSectors from '@/components/landing/LandingSectors';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingAgents from '@/components/landing/LandingAgents';
import LandingStats from '@/components/landing/LandingStats';
import LandingCTA from '@/components/landing/LandingCTA';

// A CAPA — identidade Oren.AI.
//
// O escopo `.tema-oren` no elemento raiz é o que veste a capa inteira com o azul-marinho e o ciano
// da marca: os componentes abaixo usam os tokens do Tailwind, então nenhum deles precisou saber que
// a cor mudou. As telas da demonstração NÃO passam por aqui — continuam com o visual do aplicativo.
//
// As seções são as mesmas que o Dr. Claudio aprovou (funcionalidades, modos, setores, como funciona,
// agentes, números, chamada final); o que mudou foi o herói, que ganhou a marca e a amostra da tela.
export default function LandingPage() {
  return (
    <div className="tema-oren min-h-screen bg-background text-foreground">
      <LandingNav />
      <LandingHero />
      <LandingFeatures />
      <LandingModes />
      <LandingSectors />
      <LandingHowItWorks />
      <LandingAgents />
      <LandingStats />
      <LandingCTA />
    </div>
  );
}
