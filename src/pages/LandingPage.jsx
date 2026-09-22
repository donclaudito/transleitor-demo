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

// A capa é a MESMA do aplicativo — textos aprovados pelo Dr. Claudio — com uma única mudança de
// rota: onde antes entrava no aplicativo (que exige login e tem dado real), agora entra na
// demonstração ilustrativa. A seção da demonstração entra logo depois do herói para que ninguém
// precise procurar.
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
