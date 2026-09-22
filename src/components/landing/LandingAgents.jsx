import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, ShieldAlert, ScanLine, CheckCircle2, ArrowRight, ClipboardCheck } from 'lucide-react';

// Cards baseados nos assistentes REAIS do aplicativo — só o que existe hoje:
// - Ellah: assistente clínica, conversa dentro do app e usa o modelo escolhido pelo médico.
// - Revisor da evolução: relê a evolução como quem vai assumir o caso e aponta o que falta
//   documentar. Pergunta, não decide.
// - Auditor de segurança: examina o próprio aplicativo em busca de furos, com evidência.
// - Análise de imagem médica: leitura estruturada em cinco seções, com as limitações declaradas.
// O pipeline de imaginologia (recuperação em base de fontes) ainda não tem tela própria: fica fora
// até existir.
const AGENTES = [
  {
    icon: Bot,
    nome: 'Ellah',
    papel: 'Assistente clínica de plantão, 24h',
    oQueE: 'Uma assistente virtual com quem você conversa por chat, em linguagem natural, dentro do app.',
    oQueFaz: 'Redige evoluções com você, interpreta exames, discute condutas e planeja tratamentos a partir do caso que você descreve — respondendo com o modelo de IA que você escolher (DeepSeek, Gemini e outros).',
    onde: '/demo/elio',
    ondeLabel: 'Ver na demonstração',
    diferencial: 'Só trabalha com os dados que você fornece — não inventa exames, doses ou diagnósticos.',
  },
  {
    icon: ClipboardCheck,
    nome: 'Revisor da evolução',
    papel: 'Segunda leitura, como quem assume o caso',
    oQueE: 'Depois que a evolução está escrita, ele a relê como o responsável pelo paciente: o que eu precisaria saber para responder por este caso e que não está aqui?',
    oQueFaz: 'Devolve uma lista curta do que falta documentar e muda a conduta — dor e controle, drenos e débitos, eliminações, dieta, exames pendentes, o que o próximo turno precisa e o que um perito procuraria e não acharia. Cada item vem como pergunta com opção de resposta.',
    onde: '/demo/evolucao',
    ondeLabel: 'Ver na demonstração',
    diferencial: 'Ele pergunta, não decide: não sugere diagnóstico, dose ou conduta — e nada entra no documento sem você responder e gerar de novo.',
  },
  {
    icon: ShieldAlert,
    nome: 'Auditor de Segurança',
    papel: 'Red Team e Blue Team do prontuário',
    oQueE: 'Um auditor interno que examina o próprio app em busca de furos, como um profissional revisando o protocolo do hospital.',
    oQueFaz: 'Varre configurações, chaves de API, links e permissões de acesso aos dados clínicos. Cada achado vem com evidência real e correção sugerida — e só é registrado com sua permissão.',
    onde: '/demo/seguranca',
    ondeLabel: 'Ver na demonstração',
    diferencial: 'Nunca altera dados por conta própria e nunca cita evidência que não possa verificar.',
  },
  {
    icon: ScanLine,
    nome: 'Análise de Imagem Médica',
    papel: 'Segunda opinião em radiologia',
    oQueE: 'Envie a radiografia, tomografia, ultrassom ou ressonância e receba uma leitura sugerida na hora.',
    oQueFaz: 'Descreve os achados visíveis na imagem e lista os diagnósticos diferenciais por ordem de probabilidade — para colar no prontuário ou refinar sua própria avaliação.',
    onde: '/demo/imagem',
    ondeLabel: 'Ver na demonstração',
    diferencial: 'Sem inventar achados: descreve apenas o que está de fato visível na imagem enviada.',
  },
];

export default function LandingAgents() {
  return (
    <section id="agentes" className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">AGENTES DE IA</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Nossos profissionais e nossos Assistentes da Oren.AI que trabalham com você</h2>
          <p className="text-muted-foreground">Cada assistente tem um papel definido — e todos seguem a mesma regra clínica: nada de inventar dado, e a palavra final é sempre do médico.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTES.map((a, i) => (
            <motion.div key={a.nome}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:shadow-glow transition-all">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <a.icon className="w-5 h-5 text-primary" />
                </span>
                <div>
                  <h3 className="font-extrabold">{a.nome}</h3>
                  <p className="text-[11px] text-muted-foreground">{a.papel}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <p><strong className="text-foreground">O que é:</strong> <span className="text-muted-foreground">{a.oQueE}</span></p>
                <p><strong className="text-foreground">Quando atua:</strong> <span className="text-muted-foreground">{a.oQueFaz}</span></p>
              </div>
              <p className="text-xs text-primary/90 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> {a.diferencial}
              </p>
              <Link to={a.onde} className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-80 transition-all">
                {a.ondeLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}