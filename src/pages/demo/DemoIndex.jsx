import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MousePointerClick, ShieldCheck, Database } from 'lucide-react'
import { TELAS_DEMO } from '@/data/demo'
import { NotaDemo } from '@/components/demo/AvisoDemo'

// PORTA DE ENTRADA DA DEMONSTRAÇÃO.
// Explica em três linhas o que é esta peça antes de mostrar qualquer tela: sem isso, a primeira
// tela interna pareceria um sistema funcionando com dado de paciente — e não é.
export default function DemoIndex() {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
          <MousePointerClick className="h-3.5 w-3.5" /> Demonstração navegável
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          Veja o Transleitor por dentro — sem instalar nada e sem cadastro
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          As onze telas abaixo são a demonstração do aplicativo. Você pode clicar, navegar e explorar
          à vontade para entender como ele é na mão de quem usa.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icone: MousePointerClick,
              titulo: 'A navegação funciona',
              texto: 'Você anda entre as telas e vê o fluxo real do atendimento.',
            },
            {
              icone: Database,
              titulo: 'As funções não',
              texto: 'Nada é gravado, nada é consultado, nenhuma IA é chamada e nada sai do seu navegador.',
            },
            {
              icone: ShieldCheck,
              titulo: 'Os pacientes são fictícios',
              texto: 'Aparecem sem identificação (Paciente A, Paciente B…) — não há dado real aqui.',
            },
          ].map(({ icone: Icone, titulo, texto }) => (
            <div key={titulo} className="glass-card rounded-2xl p-4">
              <Icone className="mb-2 h-4 w-4 text-primary" />
              <p className="text-sm font-bold">{titulo}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{texto}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {TELAS_DEMO.map((t) => (
          <Link
            key={t.rota}
            to={t.rota}
            className="group glass-card flex flex-col gap-2 rounded-2xl p-5 transition-all hover:shadow-glow"
          >
            <span className="text-xl" aria-hidden="true">
              {t.icone}
            </span>
            <h2 className="text-base font-extrabold tracking-tight">{t.nome}</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">{t.resumo}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary">
              Abrir esta tela
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <NotaDemo>
        Esta demonstração é uma peça de apresentação do produto: ela reproduz a aparência e o fluxo
        das telas com conteúdo fixo, escrito para você entender o aplicativo. O Transleitor em uso —
        aquele que guarda dado de paciente — é um sistema separado, com acesso restrito e login.
      </NotaDemo>
    </div>
  )
}
