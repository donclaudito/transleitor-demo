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
            Veja as telas do Transleitor agora, sem cadastro e sem instalar nada — são quatorze telas
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

      <footer className="px-6 py-10 text-center text-muted-foreground border-t border-border">
        {/* AS TRÊS LINHAS DO RODAPÉ, na ordem pedida pelo Dr. Claudio: as duas leituras da marca
            (Médica, a ampla; Cirúrgica, a específica) e a linha do produto. O peso não separa
            nada aqui — a capa inteira usa peso único (400) porque a serifa display não tem outro;
            a hierarquia vem do TAMANHO e da COR. */}
        <p className="text-xl leading-none text-foreground">
          Oren<span className="text-primary">.AI</span> — Inteligência Médica
        </p>
        <p className="mt-2 text-base leading-none">
          Oren<span className="text-primary">.AI</span> — Inteligência Cirúrgica
        </p>
        <p className="mt-2 text-sm">Transleitor · Clínica Adaptativa · Documentação médica inteligente</p>
        <p className="mx-auto mt-5 max-w-2xl text-xs leading-relaxed">
          Página de apresentação do produto. A demonstração é ilustrativa: pacientes fictícios, sem
          identificação, e nenhuma coleta de dados nesta página.
        </p>
        <p className="mt-3 text-xs">© {new Date().getFullYear()} Oren.AI</p>
      </footer>
    </>
  );
}