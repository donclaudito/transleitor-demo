import React from 'react'
import { Camera, FileUp, ScanLine, Send, ShieldCheck } from 'lucide-react'
import { CAPTURA_DEMO } from '@/data/demo'
import TelaDemo from '@/components/demo/TelaDemo'
import BotaoDemo from '@/components/demo/BotaoDemo'
import { EtiquetaExemplo } from '@/components/demo/AvisoDemo'

// ============================================================================
// CAPTURA DE LAUDO/EXAME
//
// A tela existe para resolver um problema concreto do plantão: chega um exame em papel (ou um PDF)
// e alguém precisa passar aquilo para a evolução. O aplicativo fotografa, extrai os VALORES e
// descarta a IDENTIFICAÇÃO — nome, prontuário, CRM e endereço não entram no texto.
//
// Nada disso roda nesta demonstração: não há arquivo, não há câmera e não há extração.
// ============================================================================
export default function DemoCaptura() {
  return (
    <TelaDemo
      titulo="📄 Capturar laudo/exame"
      descricao="No aplicativo esta é a tela que abre quando o médico entra pelo celular: ele fotografa o documento, o texto clínico é extraído e vai para a evolução — sem a identificação do paciente."
      acoes={<EtiquetaExemplo>valores fixos</EtiquetaExemplo>}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* PASSO 1 e 2 — capturar */}
        <section className="space-y-4">
          <div className="glass-card rounded-2xl p-4">
            <p className="mb-3 text-sm font-bold">1. Entrada do documento</p>
            <div className="rounded-2xl border-2 border-dashed border-border bg-card/40 p-6 text-center">
              <Camera className="mx-auto mb-3 h-6 w-6 text-primary" />
              <p className="text-sm font-semibold">Fotografar o documento</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                No celular, o aplicativo abre a câmera sozinho ao entrar nesta tela. No computador ele
                não abre nada: documento no desktop costuma chegar por arquivo ou PDF.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <BotaoDemo size="sm" motivo="Nesta demonstração nenhuma câmera é aberta — não há captura de imagem aqui.">
                  <Camera className="h-3.5 w-3.5" /> Abrir a câmera
                </BotaoDemo>
                <BotaoDemo variant="outline" size="sm" motivo="Nesta demonstração nenhum arquivo é lido e nada é enviado para servidor nenhum.">
                  <FileUp className="h-3.5 w-3.5" /> Enviar um PDF
                </BotaoDemo>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4">
            <p className="mb-3 text-sm font-bold">2. O que o aplicativo faz com o documento</p>
            <ul className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <li className="flex gap-2">
                <ScanLine className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Extrai, não transcreve.</strong> O que interessa é
                  o valor clínico que entra na evolução — não uma cópia do laudo inteiro.
                </span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Descarta a identificação.</strong> Nome,
                  prontuário, CRM, endereço e telefone não são copiados para o texto. E a tela
                  <em> mede </em> o texto final para conferir que não sobrou nenhum identificador — o
                  aviso não é uma promessa, é uma verificação.
                </span>
              </li>
              <li className="flex gap-2">
                <Camera className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">Uma exceção combinada:</strong> só o{' '}
                  <strong>primeiro nome</strong> do paciente pode ser guardado, para o médico achar a
                  captura na própria fila — uma palavra, sem sobrenome, e nunca deduzida. Se não
                  estiver legível, o campo fica vazio.
                </span>
              </li>
            </ul>
            <div className="mt-4 rounded-xl border border-border bg-card/60 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Primeiro nome (campo do registro)
              </p>
              <p className="mt-1 text-xs italic text-muted-foreground">
                — vazio na demonstração —
              </p>
            </div>
          </div>
        </section>

        {/* PASSO 3 — o que entrou */}
        <section className="space-y-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold">3. O que foi extraído</p>
              <EtiquetaExemplo>{CAPTURA_DEMO.tituloDocumento}</EtiquetaExemplo>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-3 font-bold">Exame</th>
                    <th className="py-2 pr-3 font-bold">Resultado</th>
                    <th className="py-2 font-bold">Referência</th>
                  </tr>
                </thead>
                <tbody>
                  {CAPTURA_DEMO.valores.map((v) => (
                    <tr key={v.nome} className="border-b border-border/60 last:border-0">
                      <td className="py-2 pr-3 text-foreground/85">{v.nome}</td>
                      <td className="py-2 pr-3 font-bold text-foreground">{v.valor}</td>
                      <td className="py-2 text-muted-foreground">{v.referencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{CAPTURA_DEMO.nota}</p>
          </div>

          <div className="glass-card rounded-2xl p-4">
            <p className="mb-2 text-sm font-bold">4. Conferência de identificação</p>
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Identificadores restantes no texto: nenhum.</strong>{' '}
                Esta é a checagem que o aplicativo roda antes de guardar — e que a tela mostra. Se
                sobrasse algum, ele apareceria aqui em vez de sair em silêncio.
              </p>
            </div>
            <div className="mt-3">
              <BotaoDemo size="sm" motivo="No aplicativo, este botão leva os valores extraídos para a evolução em edição. Aqui não existe evolução em edição para receber nada.">
                <Send className="h-3.5 w-3.5" /> Enviar para a evolução
              </BotaoDemo>
            </div>
          </div>
        </section>
      </div>
    </TelaDemo>
  )
}
