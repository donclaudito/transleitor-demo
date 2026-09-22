import React from 'react'
import { Eye, KeyRound, RefreshCw, ShieldAlert, Sparkles } from 'lucide-react'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// USE A SUA PRÓPRIA CHAVE DE IA
//
// Módulo NOVO no aplicativo (tela `/minha-llm`). Até então as chaves de IA eram segredos do
// aplicativo, que só o dono administra — o que obrigava todo mundo a gastar a cota da plataforma.
// Aqui cada profissional cadastra a chave dele, numa entidade com regra de acesso por dono.
//
// O QUE ESTA TELA TEM DE MELHOR É O QUE ELA AVISA. Os três recados abaixo estão no aplicativo, com
// essas palavras: a chave fica gravada e quem a lê; o texto clínico vai para o provedor escolhido —
// muitas vezes fora do Brasil, e essa decisão é do médico (LGPD arts. 33 a 36); e a lista de modelos
// é a que o provedor devolve, porque o aplicativo não escolhe nem promete qual é o melhor.
// ============================================================================
const AVISOS = [
  {
    Icone: KeyRound,
    texto: (
      <>
        A chave fica <strong className="text-foreground">gravada no aplicativo</strong>, legível{' '}
        <strong className="text-foreground">só por você</strong> (a regra de acesso é por dono do
        registro). Quem tem acesso administrativo ao aplicativo também consegue lê-la.
      </>
    ),
  },
  {
    Icone: ShieldAlert,
    texto: (
      <>
        Ao escolher um provedor, o <strong className="text-foreground">texto clínico vai para ele</strong> —
        e a imagem também, se você marcar "este modelo lê imagem". Isso é{' '}
        <strong className="text-foreground">transferência para outro serviço, muitas vezes fora do
        Brasil</strong>: a decisão é sua (LGPD arts. 33 a 36). A anonimização em código continua valendo
        nas duas pontas.
      </>
    ),
  },
  {
    Icone: Sparkles,
    texto: (
      <>
        A lista de modelos é a que o <strong className="text-foreground">próprio provedor</strong> devolve
        para a sua chave. O aplicativo não escolhe por você nem promete qual é o melhor.
      </>
    ),
  },
]

const LINHAS = [
  { provedor: 'OpenAI (compatível)', modelo: 'gpt-4o-mini', visao: false, ativo: true },
  { provedor: 'Google Gemini', modelo: 'gemini-flash', visao: true, ativo: true },
]

export default function DemoMinhaLLM() {
  return (
    <TelaDemo
      titulo="🔑 Use a sua própria chave de IA"
      descricao="O profissional cadastra a chave do provedor que ele já paga e passa a usar o aplicativo sem gastar os créditos da plataforma — no texto e na leitura de imagem."
      acoes={<EtiquetaExemplo>módulo novo do aplicativo</EtiquetaExemplo>}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* FORMULÁRIO */}
        <section className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-base">Nova linha</h2>
            <p className="mt-1 text-xs text-muted-foreground">Sem gastar créditos da plataforma.</p>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[11px] text-muted-foreground">Provedor</p>
                <div className="mt-1.5 rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm text-muted-foreground">
                  Escolha o provedor…
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                  Só entram provedores <strong className="text-foreground">compatíveis com o formato
                  OpenAI</strong> — outro dialeto exigiria um adaptador, e o aplicativo não finge que
                  entende todos.
                </p>
              </div>

              <div>
                <p className="text-[11px] text-muted-foreground">Endereço da API (base)</p>
                <div className="mt-1.5 rounded-xl border border-border bg-card/60 px-3 py-2.5 font-mono text-xs text-muted-foreground">
                  https://api.exemplo.com/v1
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                  Endereço sugerido — <strong className="text-foreground">confira no painel do
                  provedor</strong>. Se estiver errado, a busca de modelos falha e diz isso.
                </p>
              </div>

              <div>
                <p className="text-[11px] text-muted-foreground">Chave do provedor</p>
                <div className="mt-1.5 rounded-xl border border-border bg-card/60 px-3 py-2.5 font-mono text-xs text-muted-foreground">
                  cole aqui a chave do provedor
                </div>
              </div>

              <div>
                <p className="text-[11px] text-muted-foreground">Modelo</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <div className="flex-1 rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm text-muted-foreground">
                    Escolha o modelo…
                  </div>
                  <BotaoDemo
                    variant="outline"
                    size="sm"
                    motivo="No aplicativo, este botão pergunta ao provedor quais modelos a SUA chave alcança — o aplicativo não mantém lista de modelo escrita à mão."
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Buscar no provedor
                  </BotaoDemo>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                  O app pergunta ao provedor quais modelos a <strong className="text-foreground">sua
                  chave</strong> alcança.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-xl border border-border bg-card/60 px-3 py-1.5 text-[11px] text-muted-foreground">
                  ○ este modelo lê imagem
                </span>
                <span className="rounded-xl border border-border bg-card/60 px-3 py-1.5 text-[11px] text-muted-foreground">
                  ○ ativo
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <BotaoDemo
                  size="sm"
                  motivo="No aplicativo, este botão grava a linha e faz uma chamada REAL ao provedor para provar que a chave responde — sem gravar o texto enviado."
                >
                  Salvar e testar a linha
                </BotaoDemo>
              </div>
            </div>
          </div>

          {/* OS TRÊS AVISOS */}
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-base">O que você precisa saber antes de colar a chave</h2>
            <ul className="mt-3 space-y-3">
              {AVISOS.map(({ Icone, texto }, i) => (
                <li key={i} className="flex gap-2.5 text-[11px] leading-relaxed text-muted-foreground">
                  <Icone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  <span>{texto}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Estes três recados estão <strong className="text-foreground">na tela do aplicativo</strong>,
              com estas palavras. Uma tela que pede a chave do médico tem de dizer onde ela fica.
            </p>
          </div>
        </section>

        {/* LINHAS CADASTRADAS */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="glass-card rounded-2xl p-4">
            <h2 className="flex items-center gap-2 text-base">
              <KeyRound className="h-4 w-4 text-primary" /> Minhas linhas ({LINHAS.length})
            </h2>
            <ul className="mt-3 space-y-2">
              {LINHAS.map((l) => (
                <li key={l.modelo} className="rounded-xl border border-border bg-card/60 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-foreground">{l.provedor}</span>
                    {l.ativo && (
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-700">
                        ativo
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">{l.modelo}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    {l.visao ? 'lê imagem' : 'só texto'}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              A lista do seletor de modelos do aplicativo une as linhas do serviço com as suas, e
              marca quais são pessoais. Cada profissional enxerga apenas as próprias.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
            <p className="text-xs text-foreground">Por que isso importa para o hospital</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              Com a chave própria, o custo da IA sai da cota compartilhada e vai para quem usa. E o
              registro de uso continua existindo — a trilha mede o que rodou, com qual modelo, sem
              guardar o conteúdo clínico.
            </p>
          </div>
        </aside>
      </div>
    </TelaDemo>
  )
}
