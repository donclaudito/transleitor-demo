import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { MarcaOren } from '@/components/marca/OrenEmblema';

// CAPA DE APRESENTAÇÃO — cabeçalho.
//
// A hierarquia da marca é a definida pelo Dr. Claudio: Oren.AI é a MARCA-MÃE e o Transleitor é o
// PRODUTO dentro dela. Por isso o cabeçalho traz os dois, nesta ordem (MarcaOren já faz isso).
//
// Não há login nesta página: o botão de captura aparece sempre e leva à demonstração, em vez de
// depender da consulta à plataforma que existia na versão do aplicativo.
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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link to="/" aria-label="Oren.AI — início">
          <MarcaOren tamanho={36} />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/demo/captura"
            className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary/20"
          >
            📄 Capturar laudo/exame
          </Link>
          <Link
            to="/demo"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:opacity-90 btn-press"
          >
            Ver demonstração
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button className="p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="space-y-1 border-t border-border px-6 pb-4 glass lg:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block py-2.5 text-sm text-muted-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/demo/captura"
            className="block rounded-xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-center text-sm font-bold text-primary"
            onClick={() => setMenuOpen(false)}
          >
            📄 Capturar laudo/exame
          </Link>
          <Link
            to="/demo"
            className="block rounded-xl bg-primary px-5 py-2.5 text-center text-sm font-bold text-primary-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Ver demonstração
          </Link>
        </div>
      )}
    </nav>
  );
}
