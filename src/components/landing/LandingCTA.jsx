import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingCTA() {
  return (
    <>
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-12 shadow-soft"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Comece a usar <span className="text-primary">agora mesmo</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Veja as telas do Transleitor agora, sem cadastro e sem instalar nada — são onze telas
            navegáveis para você entender como ele é na mão de quem usa.
          </p>
          <Link
            to="/demo"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-sm font-bold hover:opacity-90 transition-all shadow-lg btn-press"
          >
            Ver a demonstração <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            Demonstração ilustrativa: nenhuma função é executada e nenhum dado é coletado.
          </p>
        </motion.div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-muted-foreground border-t border-border">
        <p className="font-bold text-foreground">
          Oren<span className="text-primary">.AI</span> — Inteligência Cirúrgica
        </p>
        <p className="mt-1">Transleitor · IA Clínica Adaptativa · Documentação médica inteligente</p>
        <p className="mx-auto mt-3 max-w-2xl leading-relaxed">
          Página de apresentação do produto. A demonstração é ilustrativa: pacientes fictícios, sem
          identificação, e nenhuma coleta de dados nesta página.
        </p>
        <p className="mt-3">© {new Date().getFullYear()} Oren.AI</p>
      </footer>
    </>
  );
}