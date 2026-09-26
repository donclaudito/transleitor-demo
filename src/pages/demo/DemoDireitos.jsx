import React from 'react'
import { CalendarClock, Download, Scale, Trash2 } from 'lucide-react'
import { DIREITOS_DEMO } from '@/data/demo'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// DIREITOS DO TITULAR
//
// Esta tela existe porque direito do titular é requisito de funcionalidade, não cortesia: quem cria
// cadastro que guarda dado de paciente tem de nascer com exportação e eliminação.
//
// E tem uma parte que é fácil de errar: eliminar. O que não tem guarda legal se elimina; o que tem
// — o prontuário, com guarda de 20 anos — é bloqueado ou anonimizado, com o motivo escrito.
// Apagar prontuário porque alguém pediu não é atender um direito: é infração do médico.
// ============================================================================
export default function DemoDireitos() {
  return (
    <TelaDemo
      titulo="⚖️ Direitos do titular"
      descricao="O caminho para atender um pedido de acesso, correção, portabilidade ou eliminação — com o que a lei permite fazer e o que ela proíbe."
      acoes={<EtiquetaExemplo>etapas do procedimento</EtiquetaExemplo>}
    >
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-2xl p-4">
          <CalendarClock className="mb-2 h-4 w-4 text-primary" />
          <p className="text-sm font-bold">15 dias</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Prazo de resposta ao titular, contado do pedido.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <Scale className="mb-2 h-4 w-4 text-primary" />
          <p className="text-sm font-bold">Permanente</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Guarda do prontuário eletrônico (Res. CFM 1.821/2007, art. 7º). No papel, o mínimo é 20
            anos (art. 8º). É ela que impede a eliminação de parte do registro.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <Download className="mb-2 h-4 w-4 text-primary" />
          <p className="text-sm font-bold">Exportar é requisito</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Portabilidade nasce junto com o cadastro, não depois que alguém pede.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        {DIREITOS_DEMO.etapas.map((e, i) => (
          <article key={e.titulo} className="glass-card rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-extrabold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h2 className="text-sm font-extrabold tracking-tight">{e.titulo.replace(/^\d+\.\s*/, '')}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{e.texto}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Trash2 className="h-4 w-4 text-destructive" /> A parte que é fácil de errar
        </h2>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Um pedido de eliminação não vira um <code className="rounded bg-muted px-1.5 py-0.5">DELETE</code>{' '}
          automático. A tela separa o que tem guarda legal do que não tem, elimina só o segundo, e
          registra o motivo de ter preservado o primeiro. O titular recebe uma resposta que ele
          entende — não o resultado de uma consulta ao banco de dados.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <BotaoDemo
            variant="outline"
            size="sm"
            motivo="Nesta demonstração não existe base de dados: não há o que exportar e nenhum arquivo seria gerado."
          >
            <Download className="h-3.5 w-3.5" /> Exportar os dados do titular
          </BotaoDemo>
          <BotaoDemo
            variant="outline"
            size="sm"
            motivo="Nesta demonstração não existe base de dados: nada pode ser eliminado. E, no aplicativo, a eliminação nunca é automática — ela passa pela checagem da guarda legal."
          >
            <Trash2 className="h-3.5 w-3.5" /> Atender pedido de eliminação
          </BotaoDemo>
        </div>
      </section>

      <p className="rounded-2xl border border-primary/25 bg-primary/5 p-4 text-xs leading-relaxed text-muted-foreground">
        {DIREITOS_DEMO.nota}
      </p>
    </TelaDemo>
  )
}
