// ============================================================================
// INVENTÁRIO REAL DO APLICATIVO
//
// LIDO DO APP, NÃO INVENTADO. As rotas abaixo são as declaradas em
// `transleitor9/src/App.jsx` (as 12 de especialidade são geradas por
// `ESPECIALIDADES_CONFIG.map(...)`), e os números vêm da contagem dos arquivos em
// `src/pages`, `base44/entities` e `base44/functions` — medidos, não estimados.
//
// POR QUE ISTO EXISTE: a demonstração mostra 14 telas; o aplicativo tem 34 rotas. Sem este mapa, quem
// visita conclui que o produto é o que está na vitrine. Com ele, vê a largura real — e vê com honestidade
// o que NÃO está demonstrado.
//
// `demo` aponta para a tela equivalente NESTA demonstração. `null` significa "esta tela não tem
// demonstração navegável" — e o mapa diz isso na cara, em vez de esconder.
// ============================================================================

export const NUMEROS_DO_APP = [
  { valor: '24', rotulo: 'páginas', detalhe: 'arquivos em src/pages' },
  { valor: '34', rotulo: 'rotas', detalhe: '22 fixas + 12 geradas, uma por especialidade' },
  { valor: '35', rotulo: 'entidades', detalhe: 'base de dados do aplicativo' },
  { valor: '17', rotulo: 'funções de backend', detalhe: 'IA, captura, auditoria e integração' },
]

export const MAPA_DO_APP = [
  {
    grupo: 'No plantão',
    icone: '🩺',
    descricao: 'O caminho do atendimento, do menu até o documento no prontuário.',
    telas: [
      { rota: '/menu', nome: 'Menu — escolha do ambiente', o_que: 'Hospitalar ou ambulatorial. Define setor, leito e formato do documento.', demo: '/demo/menu' },
      { rota: '/especialidades', nome: 'Especialidades do ambiente', o_que: 'As áreas disponíveis naquele ambiente e a criação da área própria do médico.', demo: null },
      { rota: '/transleitor', nome: 'Transleitor — a evolução', o_que: 'O painel de sinais da especialidade, a geração e a revisão antes de assinar.', demo: '/demo/evolucao' },
      { rota: '/especialidade/:slug', nome: 'Transleitor da minha especialidade', o_que: 'O mesmo fluxo, na área que o próprio médico criou.', demo: null },
      { rota: '/capturas', nome: 'Capturar laudo/exame', o_que: 'Foto ou PDF do documento, extração dos valores e descarte da identificação.', demo: '/demo/captura' },
      { rota: '/imagem-medica', nome: 'Análise de imagem médica', o_que: 'Leitura estruturada em cinco seções, com o que não foi possível afirmar.', demo: '/demo/imagem' },
      { rota: '/descricao-cirurgia', nome: 'Descrição cirúrgica', o_que: 'O documento do ato cirúrgico e a conferência dos campos que a auditoria procura.', demo: '/demo/cirurgia' },
      { rota: '/passagem', nome: 'Passagem de visita', o_que: 'O resumo por leito que o próximo plantão recebe, com as pendências ditas.', demo: '/demo/passagem' },
      { rota: '/elio', nome: 'Elvira — assistente clínica', o_que: 'Conversa em linguagem natural, com o modelo de IA que o médico escolher.', demo: '/demo/elio' },
      { rota: '/urologia (e mais 11)', nome: 'As variantes por especialidade', o_que: 'Cada área tem a sua rota e o seu raciocínio clínico próprio — 12 no total.', demo: '/demo/especialidades' },
    ],
  },
  {
    grupo: 'Conformidade e controle',
    icone: '⚖️',
    descricao: 'O que responde por você depois: direito do titular, trilha de IA e auditoria de segurança.',
    telas: [
      { rota: '/direitos-titular', nome: 'Direitos do titular', o_que: 'Exportar, corrigir e eliminar — conciliando o pedido com a guarda legal de 20 anos.', demo: '/demo/direitos' },
      { rota: '/monitoramento', nome: 'Monitoramento e trilha de IA', o_que: 'Quanto se usou, com qual modelo, com que resultado — sem guardar uma linha clínica.', demo: '/demo/monitoramento' },
      { rota: '/seguranca', nome: 'Auditor de segurança', o_que: 'O aplicativo se examina em busca de furos e só registra com a sua permissão.', demo: '/demo/seguranca' },
    ],
  },
  {
    grupo: 'IA e chaves',
    icone: '🔑',
    descricao: 'Qual modelo atende, com a chave de quem, e como trocar isso.',
    telas: [
      { rota: '/minha-llm', nome: 'Use a sua própria chave de IA', o_que: 'O profissional cadastra a chave dele e usa sem gastar créditos da plataforma.', demo: '/demo/minha-llm' },
      { rota: '/admin-llms', nome: 'Admin dos modelos de IA', o_que: 'Onde o dono do aplicativo cadastra provedor, modelo e chave do serviço.', demo: null },
    ],
  },
  {
    grupo: 'Administração e integração',
    icone: '🏥',
    descricao: 'O que conecta o aplicativo ao resto do hospital — e o que ainda não está ligado.',
    telas: [
      { rota: '/integracoes', nome: 'Integração com a instituição', o_que: 'Destino, credencial e DIALETO (JSON, HL7, FHIR…) — genérico, só admin, e o envio ainda não está ligado.', demo: '/demo/integracoes' },
      { rota: '/gerenciar-apps', nome: 'Gerenciar apps', o_que: 'Os aplicativos vinculados à mesma conta.', demo: null },
      { rota: '/dev-docs', nome: 'Documentação técnica', o_que: 'As rotas e os contratos das funções, para quem for integrar.', demo: null },
    ],
  },
  {
    grupo: 'Acesso',
    icone: '🔒',
    descricao: 'Como o profissional entra — e o que a plataforma exige antes de qualquer tela interna.',
    telas: [
      { rota: '/login', nome: 'Entrar', o_que: 'Acesso por conta do provedor de identidade.', demo: null },
      { rota: '/register', nome: 'Criar conta', o_que: 'Cadastro — e o pedido de autorização vai para o dono do aplicativo.', demo: null },
      { rota: '/forgot-password', nome: 'Esqueci a senha', o_que: 'Recuperação de acesso.', demo: null },
      { rota: '/reset-password', nome: 'Redefinir a senha', o_que: 'A troca da senha em si.', demo: null },
      { rota: '(sem rota no app)', nome: 'Consentimento OAuth', o_que: 'Tela do provedor de identidade. Existe no código, mas o aplicativo não declara rota para ela.', demo: null },
    ],
  },
]

// A verdade sobre a vitrine: nem toda tela do aplicativo tem demonstração navegável — e nem toda
// tela da demonstração corresponde a uma tela do aplicativo.
export const COBERTURA = {
  telasDoApp: 34,
  comDemonstracao: MAPA_DO_APP.flatMap((g) => g.telas).filter((t) => t.demo).length,
}

// MÓDULOS QUE SÓ EXISTEM AQUI. São documentação do produto, não tela do aplicativo — e por isso
// ficam FORA da conta de cobertura. Somá-los faria a porcentagem parecer maior do que é.
export const MODULOS_SO_DA_DEMONSTRACAO = [
  {
    nome: 'Conformidade e critérios',
    rota: '/demo/conformidade',
    o_que:
      'Normativas, artigos da LGPD e os critérios clínicos que o aplicativo oferece ou se recusa a afirmar. É leitura do aplicativo, não tela dele.',
  },
]
