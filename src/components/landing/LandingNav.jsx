import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Stethoscope, ArrowRight } from 'lucide-react';

// CAPA DE APRESENTAÇÃO DO PRODUTO.
//
// Duas mudanças em relação à capa do aplicativo, e só duas:
//   1. saiu a consulta à plataforma que decidia se o botão "Capturar laudo/exame" aparecia (aqui
//      não há login, então o botão aparece sempre e leva à demonstração);
//   2. "Acessar App" virou "Ver demonstração" — no lugar do aplicativo, que exige login e guarda
//      dado real, entra a demonstração ilustrativa.
export default function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Modos', href: '#modos' },
    { label: 'Setores', href: '#setores' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Agentes', href: '#agentes' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-soft' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <span className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-primary-foreground" />
          </span>
          Transleitor<span className="text-primary">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              {l.label}
            </a>
          ))}
          <Link to="/demo/captura" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/30 text-sm font-bold hover:bg-primary/20 transition-all">
            📄 Capturar laudo/exame
          </Link>
          <Link to="/demo" className="group inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg btn-press">
            Ver demonstração <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-1 glass border-t border-border">
          {links.map(l => (
            <a key={l.label} href={l.href} className="block py-2.5 text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link to="/demo/captura" className="block px-5 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/30 text-sm font-bold text-center" onClick={() => setMenuOpen(false)}>
            📄 Capturar laudo/exame
          </Link>
          <Link to="/demo" className="block px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold text-center" onClick={() => setMenuOpen(false)}>
            Ver demonstração
          </Link>
        </div>
      )}
    </nav>
  );
}
