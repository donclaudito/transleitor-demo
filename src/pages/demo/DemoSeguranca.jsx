import React from 'react'
import { AlertTriangle, KeyRound, Lock, ScanSearch, ShieldAlert, ShieldCheck } from 'lucide-react'
import { SEGURANCA_DEMO } from '@/data/demo'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// AUDITOR DE SEGURANÇA
//
// CUIDADO DELIBERADO NESTA TELA: ela NÃO afirma nada sobre o estado real da segurança do produto.
// Esta demonstração não audita o aplicativo. O que ela mostra é o FORMATO do relatório e a REGRA
// que o auditor segue — que é o que interessa a quem avalia o produto de fora.
//
// O exemplo de achado está marcado como exemplo porque é isso que ele é.
// ============================================================================
const ICONES = [KeyRound, Lock, ScanSearch, AlertTriangle, ShieldAlert]

export default function DemoSeguranca() {
  return (
    <TelaDemo
      titulo="🛡️ Auditor de segurança"
      descricao="Um auditor interno que examina o próprio aplicativo em busca de furos — como um colega revisando o protocolo do hospital — e só registra o que encontra com a sua permissão."
      acoes={<EtiquetaExemplo>formato do relatório</EtiquetaExemplo>}
    >
      <p className="flex items-start gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-800 dark:text-amber-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
        {SEGURANCA_DEMO.aviso}
      </p>

      <section className="glass-card rounded-2xl p-5">
        <h2 className="mb-4 text-sm font-bold">O que ele verifica</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SEGURANCA_DEMO.categorias.map((c, i) => {
            const Icone = ICONES[i] || ShieldAlert
            return (
              <div key={c.nome} className="rounded-2xl border border-border bg-card/60 p-4">
                <Icone className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm font-bold">{c.nome}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{c.descricao}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold">Ficha de achado</h2>
          <EtiquetaExemplo>exemplo de formato</EtiquetaExemplo>
        </div>

        <article className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-destructive/40 bg-destructive/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
              Severidade: {SEGURANCA_DEMO.achadoExemplo.severidade}
            </span>
          </div>
          <h3 className="mt-3 text-sm font-extrabold">{SEGURANCA_DEMO.achadoExemplo.titulo}</h3>

          <dl className="mt-3 space-y-3">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Evidência
              </dt>
              <dd className="mt-1 text-xs leading-relaxed text-foreground/85">
                {SEGURANCA_DEMO.achadoExemplo.evidencia}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Correção sugerida
              </dt>
              <dd className="mt-1 text-xs leading-relaxed text-foreground/85">
                {SEGURANCA_DEMO.achadoExemplo.correcao}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Registro
              </dt>
              <dd className="mt-1 flex items-center gap-1.5 text-xs leading-relaxed text-foreground/85">
                <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                {SEGURANCA_DEMO.achadoExemplo.registro}
              </dd>
            </div>
          </dl>
        </article>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{SEGURANCA_DEMO.regra}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <BotaoDemo
            size="sm"
            motivo="Nesta demonstração nenhuma varredura é executada: não há aplicativo para examinar a partir desta página."
          >
            <ScanSearch className="h-3.5 w-3.5" /> Rodar uma varredura
          </BotaoDemo>
        </div>
      </section>
    </TelaDemo>
  )
}
