import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Clock, Activity, ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import OrenEmblema from '@/components/marca/OrenEmblema';
import MolduraApp from '@/components/demo/MolduraApp';
import PainelMenu from '@/components/demo/PainelMenu';

// ============================================================================
// HERÓI DA CAPA — duas colunas
//
// À ESQUERDA, a marca e a proposta; À DIREITA, uma tela do aplicativo dentro da moldura.
// A amostra vem do MESMO componente que desenha a tela em /demo/menu (PainelMenu): se o menu do
// aplicativo mudar, a capa muda junto e ninguém precisa lembrar de atualizar os dois.
//
// TIPOGRAFIA (pedido do Dr. Claudio): a marca usa uma serifa display de alto contraste. O peso das
// manchetes é 400 de propósito — a Instrument Serif só existe nesse peso, e forçar negrito faria o
// navegador FABRICAR o negrito, borrando as hairlines. A regra está em `.tema-oren h1/h2` no
// index.css, junto com o motivo.
//
// A marca aparece nas três linhas pedidas, na ordem pedida: Oren.AI (marca-mãe) → Inteligência
// Cirúrgica por Oren.AI (a linha) → Inteligência Médica (a manchete).
// ============================================================================
export default function LandingHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-10 md:pb-28 md:pt-16">
      {/* Brilhos de fundo: o mesmo vocabulário do material da marca. */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full bg-primary/20 opacity-60 blur-[120px]" />
        <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-primary/10 opacity-50 blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-accent-foreground/10 opacity-40 blur-[100px]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
        {/* ---------------- COLUNA ESQUERDA: marca e proposta ---------------- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8 flex items-center gap-4">
            <OrenEmblema tamanho={62} className="flex-shrink-0" />
            <div className="min-w-0">
              <p className="fonte-marca text-3xl leading-none md:text-4xl">
                Oren<span className="text-primary">.AI</span>
              </p>
              <p className="mt-2.5 text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-primary">
                Inteligência Cirúrgica por Oren.AI
              </p>
            </div>
          </div>

          <h1 className="mb-7 text-5xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Inteligência Médica
          </h1>

          <p className="mb-9 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            O <strong className="text-foreground">Transleitor</strong>, o produto da Oren.AI para
            documentação clínica, gera evoluções SOAP, Livres e Simples em segundos. IA que entende o
            setor, analisa evoluções anteriores cronologicamente, integra exames, prescrição e
            comorbidades — e ainda <strong className="text-foreground">relê a evolução</strong>{' '}
            apontando o que falta documentar antes de você assinar.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/demo"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:opacity-90 btn-press"
            >
              Ver a demonstração
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-border px-8 py-4 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Play className="h-4 w-4" /> Ver Como Funciona
            </a>
          </div>

          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Precisão · Tecnologia · Resultado
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-medium text-muted-foreground">
            {[
              { icon: Shield, text: 'Dados seguros' },
              { icon: Clock, text: 'Evolução em segundos' },
              { icon: Activity, text: 'Análise cronológica' },
              { icon: ClipboardCheck, text: 'Revisão antes de assinar' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-primary" /> {text}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ---------------- COLUNA DIREITA: a tela do aplicativo ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <MolduraApp legenda="Transleitor · Menu — a primeira tela do plantão, sem alteração">
            <PainelMenu />
          </MolduraApp>

          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            Esta é uma tela real do aplicativo. Na{' '}
            <Link to="/demo" className="font-bold text-primary hover:underline">
              demonstração navegável
            </Link>{' '}
            são onze telas — com dado fictício e nenhuma função ativa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
