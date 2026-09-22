// ============================================================================
// CONTEÚDO DA DEMONSTRAÇÃO
//
// TUDO AQUI É FICTÍCIO. Este site é uma peça de apresentação do produto: não tem backend, não
// conversa com nenhuma API e não guarda nada. Nenhum dado de paciente real aparece neste arquivo
// nem em nenhuma outra parte do projeto — os pacientes são chamados de "Paciente A", "Paciente B",
// justamente para que ninguém confunda um exemplo com um registro de verdade.
//
// O conteúdo clínico que aparece nas telas vem de duas origens, e nenhuma delas é invenção minha:
//   1. `paineisEspecialidade.js` — a mesma tabela curada que o aplicativo usa (copiada do projeto);
//   2. o modelo de descrição cirúrgica que o Dr. Claudio já redigiu e usa.
// O que é texto de apoio da tela (aviso, rótulo, explicação) está escrito aqui e é só isso: apoio.
// ============================================================================

export const PRODUTO = {
  nome: 'Transleitor',
  chamada: 'Documentação clínica com IA — do plantão ao prontuário.',
};

// A frase que precisa aparecer em TODA tela da demonstração. Não é decoração: é o que impede
// alguém de achar que está diante de um sistema funcionando com dados de verdade.
export const AVISO_DEMO = {
  curto: 'Demonstração ilustrativa — funções desativadas',
  longo:
    'Você está vendo uma demonstração do Transleitor. As telas abaixo são ilustrativas: nenhuma ' +
    'função é executada, nada é gravado, nada é enviado para nenhum servidor e nenhum dado sai do ' +
    'seu navegador. Os pacientes são fictícios e aparecem sem identificação (Paciente A, Paciente B…).',
  botao:
    'Esta é uma demonstração: no aplicativo de verdade este botão executa a função. Aqui ele ' +
    'existe só para você ver onde ela fica.',
};

// ---------------------------------------------------------------------------
// Navegação entre as telas demonstradas
// ---------------------------------------------------------------------------
export const TELAS_DEMO = [
  {
    rota: '/demo/mapa',
    nome: 'Mapa do aplicativo',
    icone: '🗺️',
    resumo: 'Todas as telas de uma vez: as 34 rotas, o que cada uma faz e quais têm demonstração.',
  },
  {
    rota: '/demo/menu',
    nome: 'Menu — a central do plantão',
    icone: '🧭',
    resumo: 'A primeira tela: escolher o ambiente antes de qualquer evolução.',
  },
  {
    rota: '/demo/evolucao',
    nome: 'Evolução SOAP',
    icone: '📝',
    resumo: 'A tela principal: o painel de sinais da especialidade, a evolução e a prescrição.',
  },
  {
    rota: '/demo/captura',
    nome: 'Capturar laudo/exame',
    icone: '📄',
    resumo: 'Foto ou PDF do documento, extração dos valores e envio para a evolução.',
  },
  {
    rota: '/demo/imagem',
    nome: 'Análise de imagem médica',
    icone: '🩻',
    resumo: 'Leitura estruturada em cinco seções, com o que não foi possível afirmar.',
  },
  {
    rota: '/demo/cirurgia',
    nome: 'Descrição cirúrgica',
    icone: '🩹',
    resumo: 'Documento do ato cirúrgico e a conferência de campos que a auditoria procura.',
  },
  {
    rota: '/demo/passagem',
    nome: 'Passagem de visita',
    icone: '🔄',
    resumo: 'O resumo por leito que o próximo plantão recebe.',
  },
  {
    rota: '/demo/especialidades',
    nome: 'Painel por especialidade',
    icone: '🏷️',
    resumo: 'O conteúdo muda com a área: urologia não mostra os itens da cardiologia.',
  },
  {
    rota: '/demo/elio',
    nome: 'Elvira — assistente clínica',
    icone: '💬',
    resumo: 'Conversa em linguagem natural, usando o modelo de IA que o médico escolher.',
  },
  {
    rota: '/demo/monitoramento',
    nome: 'Monitoramento e trilha de IA',
    icone: '📊',
    resumo: 'Quanto se usou, com qual modelo, com que resultado — e o que fica registrado.',
  },
  {
    rota: '/demo/direitos',
    nome: 'Direitos do titular',
    icone: '⚖️',
    resumo: 'Exportar, corrigir e eliminar — conciliando o pedido com a guarda legal.',
  },
  {
    rota: '/demo/seguranca',
    nome: 'Auditor de segurança',
    icone: '🛡️',
    resumo: 'Como o aplicativo se examina em busca de furos e o que faz com o que encontra.',
  },
  {
    rota: '/demo/minha-llm',
    nome: 'Use a sua própria chave de IA',
    icone: '🔑',
    resumo: 'Módulo novo: o profissional usa a chave dele, sem gastar os créditos da plataforma.',
  },
  {
    rota: '/demo/integracoes',
    nome: 'Integração com a instituição',
    icone: '🏥',
    resumo: 'Módulo novo: destino, credencial e dialeto — genérico, com o envio ainda desligado.',
  },
];

// ---------------------------------------------------------------------------
// Especialidades (nomes e ícones são os reais do aplicativo)
// ---------------------------------------------------------------------------
export const ESPECIALIDADES_DEMO = [
  { slug: 'clinica-medica', nome: 'Clínica Médica', icone: '🩺' },
  { slug: 'urologia', nome: 'Urologia', icone: '💧' },
  { slug: 'cardiologia', nome: 'Cardiologia', icone: '❤️' },
  { slug: 'pneumologia', nome: 'Pneumologia', icone: '🫁' },
  { slug: 'gastro-endoscopia', nome: 'Gastro/Endoscopia', icone: '🔬' },
  { slug: 'dermatologia', nome: 'Dermatologia', icone: '✨' },
  { slug: 'ortopedia', nome: 'Ortopedia', icone: '🦴' },
  { slug: 'pediatria', nome: 'Pediatria', icone: '👶' },
  { slug: 'oftalmologia', nome: 'Oftalmologia', icone: '👁️' },
  { slug: 'endocrino', nome: 'Endocrinologia', icone: '🧪' },
  { slug: 'ginecologia', nome: 'Ginecologia', icone: '🌸' },
  { slug: 'cirurgia-ambulatorial', nome: 'Cirurgia', icone: '🩹' },
];

// ---------------------------------------------------------------------------
// Pacientes fictícios — SEM identificação, de propósito
// ---------------------------------------------------------------------------
export const PACIENTES_DEMO = [
  { id: 'A', nome: 'Paciente A', setor: 'Enfermaria — 3º andar', leito: '04', idade: '58 anos', dia: '3º dia de internação' },
  { id: 'B', nome: 'Paciente B', setor: 'Enfermaria — 3º andar', leito: '07', idade: '71 anos', dia: '1º dia de internação' },
  { id: 'C', nome: 'Paciente C', setor: 'Unidade de terapia intensiva', leito: 'UTI-02', idade: '64 anos', dia: '6º dia de internação' },
  { id: 'D', nome: 'Paciente D', setor: 'Pronto-socorro — observação', leito: 'PS-11', idade: '39 anos', dia: 'Em observação' },
];

// ---------------------------------------------------------------------------
// Evolução — a demonstração monta a PRÉ-VISUALIZAÇÃO com os itens que o visitante clicar.
// Não existe texto clínico inventado aqui: o que aparece na tela é o que ele escolheu.
// ---------------------------------------------------------------------------
export const ESTRUTURA_EVOLUCAO = [
  {
    chave: 'S',
    titulo: 'Subjetivo',
    ajuda: 'O que o paciente relata. No aplicativo, sai escrito em prosa a partir dos itens escolhidos.',
  },
  {
    chave: 'O',
    titulo: 'Objetivo',
    ajuda: 'Exame físico e exames do dia. Só entra o que foi registrado — nada é presumido.',
  },
  {
    chave: 'A',
    titulo: 'Avaliação',
    ajuda: 'A leitura do caso. O aplicativo não escolhe conduta: quem escreve e assina é o médico.',
  },
  {
    chave: 'P',
    titulo: 'Plano',
    ajuda: 'Conduta, prescrição e seguimento, com o que ficou pendente explicitado.',
  },
];

// Prescrição de exemplo para a folha em paisagem. É a demonstração do FORMATO da folha
// (um medicamento por item, com dose, via, intervalo e diluição no mesmo item) — não é orientação.
export const PRESCRICAO_DEMO = [
  'Dipirona 1 g — Endovenosa — 6/6 h',
  'Ondansetrona 8 mg — Endovenosa — 8/8 h — ACM',
  'Soro Fisiológico 0,9% 500 mL — Endovenoso — contínuo',
  'Enoxaparina 40 mg — Subcutânea — 1x/dia',
  'Dieta geral',
  'Deambulação livre',
];

// ---------------------------------------------------------------------------
// Captura de laudo/exame — valores de laboratório de exemplo
// ---------------------------------------------------------------------------
export const CAPTURA_DEMO = {
  tituloDocumento: 'HEMOGRAMA + BIOQUÍMICA — exemplo',
  nota:
    'O aplicativo extrai os valores do documento para a evolução e descarta a identificação: nome, ' +
    'prontuário, CRM e endereço NÃO são copiados. No exemplo abaixo isso já está aplicado.',
  valores: [
    { nome: 'Hemoglobina', valor: '11,2 g/dL', referencia: '13,0 – 17,0' },
    { nome: 'Leucócitos', valor: '12.400 /mm³', referencia: '4.000 – 11.000' },
    { nome: 'Plaquetas', valor: '210.000 /mm³', referencia: '150.000 – 450.000' },
    { nome: 'PCR', valor: '48 mg/L', referencia: '< 5' },
    { nome: 'Creatinina', valor: '1,1 mg/dL', referencia: '0,7 – 1,3' },
    { nome: 'Ureia', valor: '42 mg/dL', referencia: '15 – 45' },
    { nome: 'Sódio', valor: '138 mEq/L', referencia: '135 – 145' },
    { nome: 'Potássio', valor: '4,2 mEq/L', referencia: '3,5 – 5,1' },
  ],
  identificacoesRestantes: [],
};

// ---------------------------------------------------------------------------
// Análise de imagem — o laudo tem SEMPRE as mesmas cinco seções.
// A classificação (BI-RADS, Lung-RADS…) nunca vem da memória do modelo: sem fonte conferida na
// base, o laudo registra a ausência em vez de arriscar um número.
// ---------------------------------------------------------------------------
export const LAUDO_DEMO = {
  aviso:
    'EXEMPLO DE FORMATO. Não é laudo, não é diagnóstico e não é orientação clínica — serve para ' +
    'mostrar como a tela organiza a saída e o que ela se recusa a afirmar.',
  secoes: [
    {
      titulo: 'EXAME E TÉCNICA',
      texto: 'Radiografia de tórax, incidência frontal. Imagem de exemplo, sem paciente.',
    },
    {
      titulo: 'ACHADOS',
      texto:
        'Exemplo de descrição: campos pulmonares com transparência preservada; seios costofrênicos ' +
        'livres; área cardíaca de dimensões normais. Este texto é fixo, escrito para a demonstração.',
    },
    {
      titulo: 'IMPRESSÃO',
      texto:
        'A tela mostra a impressão do modelo como sugestão e registra que a interpretação final é do ' +
        'médico. No exemplo, nada é afirmado como diagnóstico.',
    },
    {
      titulo: 'LIMITAÇÕES DESTA ANÁLISE',
      texto:
        'O que a leitura por IA não consegue afirmar: correlação com o quadro clínico, comparação ' +
        'com exames anteriores e limitação técnica do próprio exame.',
    },
    {
      titulo: 'FONTES CONFERIDAS',
      texto:
        'Nenhuma. Como não há trecho de fonte na base de imaginologia deste exemplo, a tela diz ' +
        'exatamente isso e não emite classificação.',
    },
  ],
  semClassificacao:
    'Sem classificação: não há trecho de fonte conferida na base para sustentar uma categoria. ' +
    'O aplicativo prefere dizer o que falta a inventar um número.',
};

// ---------------------------------------------------------------------------
// Descrição cirúrgica — o texto é o modelo do próprio Dr. Claudio, condensado.
// ---------------------------------------------------------------------------
export const CIRURGIA_DEMO = {
  cabecalho: [
    ['Procedimento', 'Herniorrafia inguinal direita com tela — técnica de Lichtenstein (tension-free)'],
    ['Diagnóstico', 'Hérnia inguinal direita'],
    ['Anestesia', 'Raquianestesia'],
    ['Tempo cirúrgico', 'Início 08:10 — término 09:05'],
    ['Cirurgião', '— CRM preenchido no aplicativo —'],
    ['Paciente', 'Paciente B · 71 anos · leito 07'],
  ],
  tempos: [
    {
      titulo: 'Incisão e acesso',
      texto:
        'Incisão oblíqua de aproximadamente 6 cm, paralela e 2 cm acima do ligamento inguinal, da ' +
        'espinha ilíaca ântero-superior em direção ao tubérculo púbico. Hemostasia com eletrocautério. ' +
        'Abertos os planos até a aponeurose do músculo oblíquo externo.',
    },
    {
      titulo: 'Abertura da aponeurose e isolamento do funículo',
      texto:
        'Aponeurose do oblíquo externo aberta na direção de suas fibras, do anel inguinal superficial ' +
        'até 3 cm além do anel profundo, preservando o nervo ílio-inguinal. Funículo espermático ' +
        'isolado com cadarço de silicone, com preservação dos nervos ílio-inguinal, ílio-hipogástrico ' +
        'e do ramo genital.',
    },
    {
      titulo: 'Tratamento do saco herniário',
      texto:
        'Identificado saco herniário protruindo pelo anel profundo (hérnia indireta), contendo omento, ' +
        'reduzido à cavidade. Saco dissecado até o colo, ligado e transfixado com fio inabsorvível 2-0 ' +
        'e excisado distalmente.',
    },
    {
      titulo: 'Avaliação do defeito e preparo da tela',
      texto:
        'Constatada deficiência da fáscia transversalis, indicando reforço protético. Tela de ' +
        'polipropileno 7,5 × 15 cm, recortada conforme a técnica de Lichtenstein, com extremidade ' +
        'medial arredondada e lateral aberta em dois ramos.',
    },
    {
      titulo: 'Fixação da tela (tension-free)',
      texto:
        'Tela posicionada onlay, sem tensão. Fixações com pontos separados de fio inabsorvível 2-0: ' +
        'borda inferomedial no periósteo do tubérculo púbico; borda inferior no ligamento inguinal; ' +
        'borda superior na bainha anterior do reto abdominal e na aponeurose do oblíquo externo. ' +
        'Cauda lateral passada abaixo do funículo e sobreposta, reconstruindo o anel profundo.',
    },
    {
      titulo: 'Fechamento e síntese',
      texto:
        'Aponeurose do oblíquo externo fechada sobre a tela com sutura contínua de fio absorvível 2-0, ' +
        'reconstituindo o anel inguinal superficial. Subcutâneo com pontos separados de absorvível 3-0 ' +
        'e pele com sutura intradérmica de absorvível 4-0.',
    },
    {
      titulo: 'Contagens e conduta final',
      texto:
        'Contagem de compressas, gazes e instrumentais completa, conferida antes do fechamento e ' +
        'repetida ao final. Sangramento estimado: 50 mL. Sem intercorrências intraoperatórias. ' +
        'Recuperação com testes de cremaster e sensibilidade testicular preservados à direita.',
    },
  ],
  material: [
    'Tela de polipropileno 7,5 × 15 cm',
    'Fio inabsorvível 2-0 (saco e fixação da tela)',
    'Fio absorvível 2-0 (aponeurose)',
    'Fio absorvível 3-0 (subcutâneo)',
    'Fio absorvível 4-0 (intradérmico)',
    'Cadarço de silicone',
    'Eletrocautério e aspirador',
  ],
};

// Campos que a conferência de CÓDIGO procura no registro cirúrgico. O aplicativo diz
// "não encontrei menção a X" — nunca "faltou X": quem sabe se foi feito é o cirurgião.
export const AUDITORIA_DEMO = {
  aviso:
    'A frase é sempre "não encontrei menção a". O aplicativo não afirma que algo deixou de ser ' +
    'feito — só que não está escrito. Quem sabe é quem operou.',
  encontrados: [
    'Equipe cirúrgica identificada',
    'Procedimento nomeado',
    'Anestesia descrita',
    'Via de acesso descrita',
    'Achados intraoperatórios',
    'Descrição do ato cirúrgico',
    'Sangramento estimado',
    'Tempo cirúrgico',
    'Contagem de compressas e instrumentais',
    'Material implantado descrito',
    'Destino do paciente',
  ],
  naoEncontrados: [
    'Antibioticoprofilaxia com droga e horário',
    'Registro de lote e número de registro da tela',
    'Envio de peça para anatomia patológica',
    'Conversão de via de acesso (se houve)',
  ],
  perguntas: [
    'O registro identifica o cirurgião e os auxiliares?',
    'O registro menciona a antibioticoprofilaxia com droga e hora?',
    'O material implantado está identificado com lote e registro?',
  ],
};

// ---------------------------------------------------------------------------
// Passagem de visita
// ---------------------------------------------------------------------------
export const PASSAGEM_DEMO = {
  setor: 'Enfermaria — 3º andar',
  turno: 'Passagem do plantão diurno para o noturno',
  leitos: [
    {
      paciente: 'Paciente A',
      leito: '04',
      resumo:
        '3º dia de internação. Sem febre nas últimas 24 h. Aceitando dieta. Diurese presente, ' +
        'evacuou. Ferida operatória limpa, sem secreção. Pendente: resultado da cultura colhida.',
      pendencia: 'Aguardando cultura',
    },
    {
      paciente: 'Paciente B',
      leito: '07',
      resumo:
        '1º dia de pós-operatório de herniorrafia inguinal. Dor controlada com analgesia simples. ' +
        'Deambulou com apoio. Curativo seco, sem sangramento.',
      pendencia: 'Revisão do curativo amanhã',
    },
    {
      paciente: 'Paciente C',
      leito: 'UTI-02',
      resumo:
        '6º dia de UTI. Estável hemodinamicamente, sem droga vasoativa. Ventilação espontânea em ' +
        'cateter nasal. Balanço hídrico levemente positivo.',
      pendencia: 'Avaliar redução de suporte de oxigênio',
    },
    {
      paciente: 'Paciente D',
      leito: 'PS-11',
      resumo:
        'Em observação no pronto-socorro. Dor abdominal em investigação. Exames laboratoriais ' +
        'colhidos, aguardando resultado.',
      pendencia: 'Aguardando exames',
    },
  ],
};

// ---------------------------------------------------------------------------
// Monitoramento — números de exemplo, com a trilha do que fica registrado
// ---------------------------------------------------------------------------
export const MONITORAMENTO_DEMO = {
  aviso:
    'Números de exemplo. O ponto desta tela não é o número: é o que a trilha registra e o que ela ' +
    'se recusa a registrar.',
  cartoes: [
    { rotulo: 'Evoluções geradas', valor: '128', detalhe: 'nos últimos 30 dias (exemplo)' },
    { rotulo: 'Tempo médio de geração', valor: '6,4 s', detalhe: 'da tecla ao texto na tela (exemplo)' },
    { rotulo: 'Trocas de linha de IA', valor: '7', detalhe: 'quando o provedor recusou por tamanho' },
    { rotulo: 'Conteúdo clínico registrado', valor: 'Nenhum', detalhe: 'a trilha guarda medidas, não texto' },
  ],
  serie: [
    { dia: 'Seg', geradas: 14 },
    { dia: 'Ter', geradas: 22 },
    { dia: 'Qua', geradas: 18 },
    { dia: 'Qui', geradas: 27 },
    { dia: 'Sex', geradas: 31 },
    { dia: 'Sáb', geradas: 9 },
    { dia: 'Dom', geradas: 7 },
  ],
  trilha: [
    { quando: '22/09 14:32', fluxo: 'evolução', provedor: 'DeepSeek', modelo: 'deepseek-flash', tokens: '1.204', ms: '4.120 ms', status: 'sucesso' },
    { quando: '22/09 14:05', fluxo: 'captura de laudo', provedor: 'DeepSeek Vision', modelo: 'deepseek-v4-flash-vision-exp', tokens: '3.480', ms: '12.900 ms', status: 'sucesso' },
    { quando: '22/09 13:48', fluxo: 'evolução', provedor: 'Groq', modelo: 'openai/gpt-oss-120b', tokens: '20.912', ms: '417 ms', status: 'recusado por tamanho (413)' },
    { quando: '22/09 13:48', fluxo: 'evolução', provedor: 'DeepSeek', modelo: 'deepseek-flash', tokens: '24.048', ms: '4.345 ms', status: 'sucesso após troca de linha' },
    { quando: '22/09 11:20', fluxo: 'revisão da evolução', provedor: 'Groq', modelo: 'llama-3.3-70b', tokens: '2.015', ms: '2.870 ms', status: 'sucesso' },
    { quando: '22/09 09:14', fluxo: 'análise de imagem', provedor: 'Gemini', modelo: 'gemini-flash', tokens: '4.102', ms: '9.300 ms', status: 'sucesso' },
  ],
  oQueNaoEntra: [
    'O texto do prompt',
    'O texto da resposta',
    'Nome do paciente, iniciais, prontuário ou leito',
    'Nome, CRM, e-mail ou telefone do médico',
    'Qualquer imagem enviada',
  ],
  oQueEntra: [
    'Qual fluxo rodou (evolução, captura, revisão…)',
    'Qual provedor e qual modelo atenderam de fato',
    'Quantidade de tokens, tempo em milissegundos e o resultado',
  ],
};

// ---------------------------------------------------------------------------
// Direitos do titular — as cinco etapas reais da tela
// ---------------------------------------------------------------------------
export const DIREITOS_DEMO = {
  etapas: [
    {
      titulo: '1. Titular',
      texto:
        'Quem pede e como foi identificado. O pedido de um titular não pode ser atendido às cegas, e ' +
        'a identificação também não pode virar uma coleta a mais.',
    },
    {
      titulo: '2. Pedido',
      texto:
        'O que foi pedido: confirmação de tratamento, acesso, correção, portabilidade ou eliminação. ' +
        'Prazo de resposta: 15 dias (art. 19, II).',
    },
    {
      titulo: '3. O que foi encontrado',
      texto:
        'Tudo o que o aplicativo guarda sobre aquela pessoa, listado de forma que ela entenda — não um ' +
        'despejo de tabelas do banco.',
    },
    {
      titulo: '4. Eliminação (só o que a lei permite)',
      texto:
        'O que não tem guarda legal é eliminado. O que tem — o prontuário, com guarda de 20 anos ' +
        '(Res. CFM 1.821/2007) — é bloqueado ou anonimizado, com o motivo escrito. Eliminar prontuário ' +
        'por pedido não é direito do titular: é infração do médico.',
    },
    {
      titulo: '5. Registro do atendimento (prova)',
      texto:
        'O atendimento do pedido fica registrado: quem pediu, o que foi decidido, o que foi eliminado ' +
        'e o que foi preservado — com data. É o que responde à ANPD se ela perguntar.',
    },
  ],
  nota:
    'A tela existe porque direito do titular é requisito de funcionalidade, não cortesia. Exportação ' +
    'e eliminação nascem junto com o cadastro que as cria.',
};

// ---------------------------------------------------------------------------
// Elvira — conversa de exemplo
// ---------------------------------------------------------------------------
export const ELIO_DEMO = {
  avisoConversa:
    'Conversa de exemplo, escrita para a demonstração. Nenhum modelo de IA é chamado nesta página.',
  mensagens: [
    {
      de: 'medico',
      texto:
        'Paciente de 58 anos, 3º dia de pós-operatório de colecistectomia por videolaparoscopia. ' +
        'Hoje refere dor em hipocôndrio direito, 4/10, sem febre. Aceitando dieta. Ajude a organizar ' +
        'a evolução.',
    },
    {
      de: 'elvira',
      texto:
        'Organizei assim, usando apenas o que você trouxe:\n\n' +
        '• Subjetivo — dor em hipocôndrio direito, 4/10, 3º dia de pós-operatório; nega febre.\n' +
        '• Objetivo — exame abdominal e curativos: a preencher.\n' +
        '• Avaliação — pós-operatório de colecistectomia videolaparoscópica, com dor controlável; ' +
        'sem sinal de infecção referido.\n' +
        '• Plano — analgesia conforme prescrição; reavaliar dor e ferida.\n\n' +
        'Dois pontos que eu precisaria saber para o registro ficar completo: como está o abdome ao ' +
        'exame e se houve eliminação de gases ou evacuação.',
    },
    {
      de: 'medico',
      texto: 'Abdome flácido, doloroso à palpação em hipocôndrio direito, sem sinais de irritação peritoneal. Já eliminou gases.',
    },
    {
      de: 'elvira',
      texto:
        'Registrado. Com esses dois dados a evolução fica completa pelo critério da Res. CFM ' +
        '1.638/2002, art. 5º, I: data e hora, procedimento discriminado, identificação do profissional ' +
        'e evolução do quadro. Nada aqui vira diagnóstico ou conduta sem a sua revisão — quem assina ' +
        'é você.',
    },
  ],
  modelos: [
    { nome: 'DeepSeek', modelo: 'deepseek-flash', capacidade: 'texto', marcado: true },
    { nome: 'Gemini', modelo: 'gemini-flash', capacidade: 'texto e imagem', marcado: false },
    { nome: 'Groq', modelo: 'llama-3.3-70b', capacidade: 'texto', marcado: false },
  ],
};

// ---------------------------------------------------------------------------
// Auditor de segurança — o FORMATO do achado, não uma auditoria do produto.
// Este site não afirma nada sobre a segurança real do aplicativo; ele mostra como o
// relatório é escrito e qual é a regra (nada é registrado sem permissão).
// ---------------------------------------------------------------------------
export const SEGURANCA_DEMO = {
  aviso:
    'A ficha abaixo é um EXEMPLO DE FORMATO. Esta demonstração não audita o aplicativo e não ' +
    'afirma nada sobre o estado real da segurança dele.',
  categorias: [
    { nome: 'Chaves e segredos', descricao: 'Chave de API em código, em log ou em repositório.' },
    { nome: 'Permissão de acesso', descricao: 'Quem consegue ler o dado de paciente, e com que filtro.' },
    { nome: 'Dependências', descricao: 'Biblioteca desatualizada com falha conhecida.' },
    { nome: 'Exposição de dado', descricao: 'Arquivo de exame em URL pública, rastreio com dado clínico.' },
    { nome: 'Configuração', descricao: 'Regra de privacidade ausente, rota aberta sem autenticação.' },
  ],
  achadoExemplo: {
    severidade: 'Alta',
    titulo: 'Exemplo: chave de API presente em arquivo versionado',
    evidencia: 'O achado só aparece com evidência real — arquivo e linha. Sem evidência, não entra.',
    correcao: 'Mover para o cofre de segredos do aplicativo e revogar a chave exposta.',
    registro: 'Só é registrado com a sua permissão explícita.',
  },
  regra:
    'O auditor nunca altera nada por conta própria e nunca cita evidência que não possa verificar.',
};

// ---------------------------------------------------------------------------
// Avisos por tela (o que a demonstração NÃO faz naquela tela específica)
// ---------------------------------------------------------------------------
export const LIMITES_POR_TELA = {
  '/demo/mapa': 'As rotas listadas são as reais do aplicativo, mas nenhuma delas é navegável aqui: o mapa aponta para a demonstração quando ela existe, e diz "não demonstrada" quando não existe. Nada é contado ou medido nesta página.',
  '/demo/menu': 'Os cartões de ambiente não navegam nesta demonstração. A tela desenhada é a real do aplicativo, mas a moldura e o brilho em volta são da página de apresentação.',
  '/demo/evolucao': 'Nenhuma IA é chamada aqui: o texto da pré-visualização é montado com os itens que você clicar. Nada é gravado.',
  '/demo/captura': 'Nenhum arquivo é lido, nenhuma câmera é aberta e nenhum texto é extraído. Os valores mostrados são fixos.',
  '/demo/imagem': 'Nenhuma imagem é analisada. O conteúdo das cinco seções é fixo e está marcado como exemplo.',
  '/demo/cirurgia': 'O documento é um modelo já escrito, não um registro de cirurgia. A conferência de campos roda sobre esse texto fixo.',
  '/demo/passagem': 'Os resumos são fixos. Não existe integração com nenhum sistema hospitalar nesta demonstração.',
  '/demo/especialidades': 'O conteúdo clínico é o mesmo do aplicativo; o que você clicar não é gravado em lugar nenhum.',
  '/demo/elio': 'Nenhum modelo é consultado. A conversa é um roteiro fixo, escrito para a apresentação.',
  '/demo/monitoramento': 'Os números e a trilha são de exemplo. Nada é medido nesta página.',
  '/demo/direitos': 'Nenhuma exportação e nenhuma eliminação acontecem. A tela mostra as cinco etapas do procedimento.',
  '/demo/seguranca': 'Nenhuma varredura é executada. A tela mostra as categorias verificadas e o formato do relatório.',
  '/demo/minha-llm': 'Nenhuma chave é digitada e nenhum provedor é consultado. A lista de modelos e as linhas cadastradas são fixas.',
  '/demo/integracoes': 'Nenhum destino é gravado e nenhum segredo é consultado. O envio ao hospital não existe nesta demonstração — e, no aplicativo, também não está ligado.',
};
