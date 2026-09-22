import React from 'react'
import { Building2, CheckCircle2, Lock, ShieldCheck, Upload } from 'lucide-react'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// INTEGRAÇÃO COM O SISTEMA DA INSTITUIÇÃO — genérica, sem citar fornecedor
//
// O aplicativo tem um teste que REPROVA citar fornecedor na tela (Tasy, Philips e afins): o desenho é
// genérico de propósito, e nome de fornecedor no produto envelhece e exclui os outros. Aqui se diz
// "instituição", "sistema da instituição", "dialeto" — e o exemplo é um hospital fictício.
//
// Módulo NOVO no aplicativo (tela `/integracoes`, só para administrador).
//
// A PARTE MAIS IMPORTANTE DESTA TELA É O QUE ELA NÃO FAZ: **o envio não está ligado.** O aplicativo
// cadastra destino, credencial e formato, mas não manda dado de paciente para lugar nenhum enquanto
// o Encarregado (DPO) não confirmar a base legal. Isso está escrito na tela do aplicativo, com essas
// palavras — e é o tipo de coisa que uma página de produto deve mostrar, não esconder.
//
// AS TRAVAS QUE JÁ EXISTEM EM CÓDIGO (e que a tela conta):
//   - endereço só por https, sem credencial na URL, sem loopback nem rede interna;
//   - a credencial é o NOME de um segredo — o valor nunca é gravado aqui, então ele não aparece em
//     leitura de registro, exportação de titular nem backup;
//   - o conteúdo previsto proíbe o nome do PACIENTE em qualquer profundidade, e permite o nome do
//     profissional (o prontuário exige a identificação de quem escreveu).
// ============================================================================
const TRAVAS = [
  {
    Icone: Lock,
    titulo: 'Só https, e sem credencial no endereço',
    texto:
      'O endereço do destino é recusado se não for https, se tiver usuário e senha na própria URL ou se apontar para loopback ou rede interna. Endereço de teste já foi recusado com 400 — não é promessa, é validação no servidor.',
  },
  {
    Icone: ShieldCheck,
    titulo: 'A credencial é um PONTEIRO, não o valor',
    texto:
      'Aqui se digita o NOME do segredo, nunca o valor. O token do hospital fica no cofre de segredos do aplicativo — por isso ele não aparece na leitura do registro, na exportação do titular nem num backup do banco.',
  },
  {
    Icone: CheckCircle2,
    titulo: 'O nome do paciente não sai daqui',
    texto:
      'A conferência do conteúdo proíbe identificação direta do PACIENTE em qualquer profundidade e permite a do profissional. O casamento com o hospital é por número de atendimento digitado pelo médico — nunca por nome.',
  },
]

const DESTINOS = [
  { nome: 'Hospital X — integração', endereco: 'https://integracao.hospitalx.example/api', segredo: 'HOSPITAL_X_TOKEN', formato: 'JSON', ativo: false },
]

// OS DIALETOS. O destino DECLARA em que dialeto ele fala — e a tela diz, sem enfeite, qual está
// implementado. Marcar HL7 como pronto sem implementar seria a mentira mais fácil desta tela.
const DIALETOS = [
  { id: 'json', nome: 'JSON', pronto: true, nota: 'Combinado campo a campo com a TI da instituição.' },
  { id: 'hl7v2', nome: 'HL7 v2', pronto: false, nota: 'O aplicativo ainda não fala este dialeto.' },
  { id: 'fhir', nome: 'FHIR', pronto: false, nota: 'O aplicativo ainda não fala este dialeto.' },
  { id: 'soap', nome: 'SOAP', pronto: false, nota: 'O aplicativo ainda não fala este dialeto.' },
  { id: 'arquivo', nome: 'Arquivo', pronto: false, nota: 'O aplicativo ainda não fala este dialeto.' },
]

export default function DemoIntegracoes() {
  return (
    <TelaDemo
      titulo="🏥 Integração com o sistema da instituição"
      descricao="O lugar onde se cadastra o destino e a credencial para o Transleitor conversar com o sistema da instituição — qualquer uma. O desenho é genérico de propósito: o destino declara o dialeto, e adaptar a um sistema específico depois é configuração, não reescrita."
      acoes={<EtiquetaExemplo>módulo novo do aplicativo</EtiquetaExemplo>}
    >
      {/* O AVISO QUE MANDA NESTA TELA */}
      <section className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 p-5">
        <h2 className="flex items-center gap-2 text-base text-foreground">
          <Upload className="h-4 w-4 text-amber-600" /> O envio ainda não está ligado
        </h2>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Esta tela <strong className="text-foreground">administra</strong> a integração: destino,
          credencial e formato ficam cadastrados e conferidos. Mas o aplicativo{' '}
          <strong className="text-foreground">não envia dado de paciente para lugar nenhum</strong>{' '}
          enquanto o Encarregado (DPO) não confirmar a base legal do envio. A parte que movimenta dado
          de paciente foi deixada para depois, de propósito — e está escrito assim na tela do
          aplicativo.
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          O que já existe é a metade chata e segura: cadastro, validação de endereço, ponteiro de
          segredo e conferência do conteúdo. O que falta é uma decisão, não um código.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* FORMULÁRIO */}
        <section className="glass-card rounded-2xl p-5">
          <h2 className="text-base">Novo destino</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Só o administrador. Cadastro do destino — o envio ainda não está ligado.
          </p>

          <div className="mt-4 space-y-4">
            {[
              { rotulo: 'Nome do destino', valor: 'Hospital X — sistema assistencial' },
              { rotulo: 'Endereço do sistema do hospital', valor: 'https://integracao.hospitalx.example/api' },
              { rotulo: 'Nome do segredo', valor: 'HOSPITAL_X_TOKEN', mono: true },
            ].map((c) => (
              <div key={c.rotulo}>
                <p className="text-[11px] text-muted-foreground">{c.rotulo}</p>
                <div
                  className={`mt-1.5 rounded-xl border border-border bg-card/60 px-3 py-2.5 text-sm text-muted-foreground ${
                    c.mono ? 'font-mono text-xs' : ''
                  }`}
                >
                  {c.valor}
                </div>
              </div>
            ))}

            <div>
              <p className="text-[11px] text-muted-foreground">Dialeto do destino</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {DIALETOS.map((d) => (
                  <span
                    key={d.id}
                    className={
                      d.pronto
                        ? 'rounded-xl border border-primary/40 bg-primary/10 px-3 py-1.5 text-[11px] text-primary'
                        : 'rounded-xl border border-border bg-card/60 px-3 py-1.5 text-[11px] text-muted-foreground'
                    }
                  >
                    {d.nome}
                    {!d.pronto && ' · não implementado'}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                O destino <strong className="text-foreground">declara o dialeto</strong> e a tela diz
                qual está implementado. Só o <strong className="text-foreground">JSON</strong> está:
                os outros aparecem na lista para o cadastro ser honesto — marcar HL7 como pronto sem
                implementar seria a mentira mais fácil desta tela. Dialeto desconhecido o servidor
                recusa.
              </p>
            </div>

            <div>
              <p className="text-[11px] text-muted-foreground">
                Observação (contato da TI, ambiente, contrato)
              </p>
              <div className="mt-1.5 rounded-xl border border-border bg-card/60 px-3 py-2.5 text-xs text-muted-foreground">
                Ambiente de homologação · contato: TI da instituição
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <BotaoDemo
                size="sm"
                motivo="No aplicativo, este botão grava o destino depois de validar o endereço e o nome do segredo no servidor."
              >
                Salvar destino
              </BotaoDemo>
              <BotaoDemo
                variant="outline"
                size="sm"
                motivo="No aplicativo, este botão pergunta ao backend se o segredo EXISTE — ele nunca devolve o valor. Segredo recém-criado só aparece depois de republicar as funções."
              >
                <ShieldCheck className="h-3.5 w-3.5" /> Conferir segredo
              </BotaoDemo>
            </div>
          </div>
        </section>

        {/* DESTINOS E TRAVAS */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="glass-card rounded-2xl p-4">
            <h2 className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-primary" /> Destinos cadastrados
            </h2>
            <ul className="mt-3 space-y-2">
              {DESTINOS.map((d) => (
                <li key={d.nome} className="rounded-xl border border-border bg-card/60 p-3">
                  <p className="text-xs text-foreground">{d.nome}</p>
                  <p className="mt-1 break-all font-mono text-[11px] text-muted-foreground">{d.endereco}</p>
                  <p className="mt-1 font-mono text-[11px] text-primary">{d.segredo}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">dialeto: {d.formato}</p>
                  <span className="mt-2 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-700">
                    cadastrado · envio desligado
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Esta tela <strong className="text-foreground">não guarda dado de paciente</strong>: só o
              endereço do sistema do hospital e o nome do segredo.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-4">
            <h2 className="text-base">O que já está travado em código</h2>
            <ul className="mt-3 space-y-3">
              {TRAVAS.map(({ Icone, titulo, texto }) => (
                <li key={titulo} className="flex gap-2.5">
                  <Icone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  <span>
                    <span className="block text-[11px] text-foreground">{titulo}</span>
                    <span className="mt-0.5 block text-[11px] leading-relaxed text-muted-foreground">
                      {texto}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <p className="rounded-2xl border border-border bg-card/60 p-4 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Por que mostrar uma tela que não faz tudo:</strong> porque
        a alternativa seria esconder o que falta. Um produto que diz "integra com o seu hospital" e não
        conta que o envio depende de uma decisão do Encarregado — ou que só entende um dos dialetos —
        está vendendo o que não tem. Esta tela mostra o que existe, o que está travado e o que ainda
        depende de uma pessoa.
      </p>
    </TelaDemo>
  )
}
