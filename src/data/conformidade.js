// ============================================================================
// CONFORMIDADE — a que o aplicativo se submete, e o que ele se RECUSA a afirmar
//
// TUDO AQUI FOI LIDO DO APLICATIVO, não escrito de memória. Cada item diz DE ONDE veio, para poder
// ser conferido: nome do arquivo onde a regra vive. Se um dia a regra sair do código, o item aqui
// fica órfão — e é isso que se quer: dá para auditar.
//
// A REGRA DESTE ARQUIVO (AGENTS.md do workspace): não inventar prazo, artigo, percentual ou
// exigência. Sem fonte verificada, escreve-se [NÃO VERIFICADO] e diz-se onde confirmar. Foi por isso
// que a Res. CFM 1.331/89 NÃO aparece como norma vigente: o parecer do próprio aplicativo registra
// que ela foi REVOGADA pela 1.638/2002.
// ============================================================================

export const NORMATIVAS = [
  {
    norma: 'Res. CFM 1.638/2002, art. 5º, I',
    tema: 'O que o prontuário precisa conter',
    exige:
      'Evolução com data e hora, procedimentos discriminados, identificação dos profissionais e — no papel — assinatura com o número do CRM.',
    faz:
      'O documento é montado com a data e a hora do REGISTRO (não da impressão), a identificação só vale com CRM de verdade, há linha de assinatura, linha de identificação no texto copiado e rodapé de rastreabilidade com o apoio de IA e a revisão humana.',
    trava:
      'pendenciasDoDocumento() barra o que falta: sem data ou sem identificação, o aviso aparece ANTES de imprimir ou copiar.',
    onde: 'src/lib/documentoClinico.js · src/lib/imprimirDocumento.js',
  },
  {
    norma: 'Res. CFM 1.821/2007',
    tema: 'Guarda do prontuário',
    exige:
      'Guarda PERMANENTE do prontuário ELETRÔNICO (art. 7º) e prazo mínimo de 20 anos para o PAPEL (art. 8º). Autoriza a digitalização desde que o sistema atenda ao NGS2 do Manual de Certificação SBIS/CFM, e exige assinatura digital padrão ICP-Brasil para eliminar o papel (art. 5º).',
    faz:
      'A eliminação a pedido do titular NÃO apaga o que está sob guarda legal: o que não tem guarda é eliminado; o que tem é bloqueado ou anonimizado, com o motivo escrito.',
    trava:
      'A recusa vem com a razão anexada — e o motivo cita a norma. Nada é eliminado em silêncio, e nada é preservado em silêncio.',
    onde: 'src/lib/dsar.js · src/pages/DireitosTitular.jsx',
  },
  {
    norma: 'LGPD, arts. 33 a 36',
    tema: 'Transferência internacional',
    exige: 'Hipótese legal E mecanismo válido para o dado sair do Brasil.',
    faz:
      'A tela da chave própria avisa, na cara do usuário, que ao escolher um provedor o texto clínico vai para ele — e a imagem também, se o modelo lê imagem. A decisão é declarada como sendo do profissional.',
    trava:
      'Não há provedor externo escolhido pelo aplicativo em nome do médico: a linha pessoal é cadastrada e ativada por ele, e a anonimização em código continua valendo nas duas pontas.',
    onde: 'src/pages/MinhaLLM.jsx · shared/anonimizar.ts',
  },
  {
    norma: 'Res. CD/ANPD 19/2024',
    tema: 'Mecanismo da transferência',
    exige: 'Não basta a hipótese legal: o mecanismo precisa ser válido e declarável.',
    faz:
      'Os Termos preveem publicar a relação de operadores, o país de cada um e o mecanismo usado — é a cláusula que transforma "transferência" em algo conferível.',
    trava: 'A cláusula está escrita; publicá-la é ato do responsável, não do código.',
    onde: 'src/lib/termos.js',
  },
  {
    norma: 'Res. CD/ANPD 18/2024',
    tema: 'Encarregado (DPO)',
    exige: 'Designação, publicação e canal de comunicação do titular.',
    faz:
      'A análise jurídica do próprio aplicativo trata do Encarregado no art. 41 e desta resolução, com o que falta para a designação ficar publicada.',
    trava: '[DECISÃO do responsável] quem é o Encarregado e onde o canal é publicado.',
    onde: '.lgpd/analise-juridica-termos-2026-09-15.md',
  },
  {
    norma: 'Res. CD/ANPD 15/2024',
    tema: 'Comunicação de incidente',
    exige: 'Comunicação de incidente de segurança em 3 dias úteis.',
    faz:
      'A revisão dos Termos registrou que faltava uma linha sobre incidente de segurança — nem canal, nem comunicação — e a pendência ficou nomeada em vez de esquecida.',
    trava: '[PENDENTE no aplicativo] o texto do incidente ainda não está nos Termos.',
    onde: '.lgpd/proposta-termos-v2.md',
  },
]

// O MAPEAMENTO ARTIGO → FUNCIONALIDADE vem do próprio acervo de conformidade do projeto (as 19
// habilidades `lgpd-*`), que é onde os artigos e prazos estão codificados com fonte.
export const ARTIGOS_DA_LGPD = [
  { artigo: 'art. 5º', assunto: 'Definições de dado pessoal e dado sensível', onde: 'todo o modelo de dados' },
  { artigo: 'art. 6º, III', assunto: 'Minimização — só o dado necessário à finalidade', onde: 'campos de entidade e captura' },
  { artigo: 'art. 6º, X', assunto: 'Accountability — poder demonstrar o que foi feito', onde: 'Trilha de IA e registro de decisão' },
  { artigo: 'art. 7º e art. 11', assunto: 'Bases legais, com as hipóteses do dado sensível', onde: 'finalidade escrita em cada campo' },
  { artigo: 'art. 9º', assunto: 'Informação clara sobre o tratamento', onde: 'Termos e Aviso de Privacidade' },
  { artigo: 'art. 18', assunto: 'Direitos do titular', onde: '/direitos-titular' },
  { artigo: 'art. 19, II', assunto: 'Prazo de resposta ao titular: 15 dias', onde: 'src/lib/dsar.js' },
  { artigo: 'art. 20', assunto: 'Decisão automatizada precisa ser auditável e revisável', onde: 'Registro de decisão de IA' },
  { artigo: 'arts. 33 a 36', assunto: 'Transferência internacional', onde: 'tela da chave própria' },
  { artigo: 'art. 37', assunto: 'Registro das operações de tratamento', onde: 'trilha de uso' },
  { artigo: 'art. 38', assunto: 'Relatório de impacto (RIPD)', onde: 'acervo de conformidade' },
  { artigo: 'art. 39', assunto: 'Operador — contrato e instruções', onde: 'ficha de fornecedor' },
  { artigo: 'art. 41', assunto: 'Encarregado pelo tratamento', onde: 'análise jurídica dos Termos' },
  { artigo: 'art. 46', assunto: 'Segurança do tratamento', onde: 'Auditor de segurança' },
  { artigo: 'art. 48', assunto: 'Comunicação de incidente', onde: 'proposta dos Termos v2' },
  { artigo: 'art. 50', assunto: 'Boas práticas e governança', onde: 'política de privacidade' },
]

// ============================================================================
// CRITÉRIOS CLÍNICOS — a distinção que este módulo existe para mostrar
//
// O aplicativo usa DUAS listas que não se misturam:
//   (1) escalas que ele OFERECE como item para o médico clicar — e que ele NÃO calcula nem interpreta;
//   (2) classificações que ele se RECUSA a nomear sem trecho de fonte conferida.
//
// Confundir as duas seria o defeito mais grave possível num app que existe para defender o médico.
// ============================================================================

export const CRITERIOS_OFERECIDOS = [
  {
    criterio: 'EVA — escala de dor',
    como: 'Itens do painel: "Dor EVA 0/10", "Dor EVA leve", "moderada", "intensa".',
    regra: 'O aplicativo registra o que o médico marcou. Ele não calcula escore nem conclui controle álgico.',
  },
  {
    criterio: 'Glasgow — nível de consciência',
    como: 'Item "Glasgow 15" no estado geral, e gatilho de sinais neurológicos no painel.',
    regra: 'O valor entra como achado do exame descrito pelo médico — nunca deduzido do texto.',
  },
  {
    criterio: 'IPSS — sintomas urinários',
    como: 'A especialidade de urologia pede o escore "quando informado".',
    regra: 'Sem o escore informado, ele não é estimado nem mencionado.',
  },
]

export const CRITERIOS_RECUSADOS = {
  familias: [
    'Lung-RADS',
    'BI-RADS',
    'PI-RADS',
    'LI-RADS',
    'TI-RADS',
    'CAD-RADS',
    'NI-RADS',
    'O-RADS',
    'Bosniak',
    'Fleischner',
    'Bethesda',
    'C-RADS',
  ],
  regra:
    'Sem trecho de base conferida, é PROIBIDO nomear qualquer classificação, escore ou consenso — a instrução está escrita no pedido ao modelo e a conferência do laudo reprova quem desobedece.',
  fatoMedido:
    'A base de imaginologia deste aplicativo está VAZIA — 0 registros, medido. Ou seja: hoje o laudo sai SEM CLASSIFICAR, e diz o que faltaria em vez de arriscar um número.',
  consequencia:
    'Não existe preset de mamografia, de propósito: laudo de mama sem categoria BI-RADS conferida seria um laudo incompleto com cara de completo.',
  onde: 'shared/prompt-laudo-imagem.ts · shared/laudoImagem.ts',
}

export const FONTES = [
  'AGENTS.md do aplicativo (regras e medições, com data)',
  '.lgpd/prontuario-evolucao-robustez.md',
  '.lgpd/analise-juridica-termos-2026-09-15.md',
  '.lgpd/proposta-termos-v2.md',
  '.lgpd/integracao-hospital-plano.md',
  'src/lib/documentoClinico.js · dsar.js · termos.js',
  'shared/prompt-laudo-imagem.ts · shared/laudoImagem.ts',
  'shared/catalogoDeSintomas.ts',
]
