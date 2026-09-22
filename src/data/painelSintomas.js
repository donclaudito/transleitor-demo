// ============================================================
//  DADOS DO PAINEL "SINAIS & SINTOMAS" (S/O/P) — dado puro, sem React.
//
//  Vive aqui (e não dentro do componente) porque o teste em Node precisa dos DADOS REAIS:
//  é sobre eles que se prova que nenhum item aparece duas vezes depois de o painel somar a
//  seção da especialidade. Importar o componente traria lucide-react e hooks junto.
//
//  São OPÇÕES para o médico clicar e inserir na descrição — nunca achado do paciente.
// ============================================================
export const SYMPTOMS_DATA = {
  subjetivo: {
    label: 'S — Subjetivo',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    ring: 'ring-blue-400/40',
    groups: [
      {
        label: 'Queixa Principal',
        items: ['Dor torácica', 'Dispneia', 'Palpitações', 'Síncope / pré-síncope', 'Cefaleia', 'Tontura', 'Náuseas / vômitos', 'Dor abdominal', 'Febre', 'Calafrios', 'Astenia / fraqueza', 'Perda de peso', 'Edema de MMII', 'Tosse', 'Expectoração', 'Hemoptise', 'Disfagia', 'Hematêmese', 'Hematoquezia', 'Melena', 'Disúria', 'Hematúria', 'Alteração do nível de consciência',
          // opções acrescentadas a pedido do Dr. Claudio (16/09/2026)
          'Dor lombar', 'Dor articular', 'Parestesias', 'Insônia', 'Perda de apetite', 'Dor de garganta'],
      },
      {
        label: 'Caracterização da Dor',
        items: ['Dor em aperto', 'Dor em queimação', 'Dor em facada', 'Dor em cólica', 'Dor em peso', 'Dor irradiada para MSE', 'Dor irradiada para mandíbula', 'Dor pleurítica (piora à inspiração)', 'Dor postural', 'Início súbito', 'Início gradual', 'Melhora com repouso', 'Piora ao esforço', 'Piora ao decúbito', 'Melhora com posição fetal',
          'Dor contínua', 'Dor intermitente', 'Dor à palpação', 'Piora à noite', 'Melhora com analgésico'],
      },
      {
        label: 'Sintomas Associados',
        items: ['Sudorese fria', 'Palidez relatada', 'Cianose', 'Ortopneia', 'DPN (dispneia paroxística noturna)', 'Intolerância ao exercício', 'Hiporexia / anorexia', 'Polidipsia', 'Poliúria', 'Constipação', 'Diarreia', 'Icterícia', 'Prurido', 'Artralgia', 'Mialgia', 'Rash cutâneo', 'Confusão mental / desorientação', 'Afasia',
          'Sudorese noturna', 'Xerostomia', 'Oligúria', 'Dispneia aos esforços'],
      },
      {
        label: 'Evolução (retorno)',
        items: ['Melhora dos sintomas', 'Piora dos sintomas', 'Sem alteração clínica', 'Novo sintoma desde última consulta', 'Boa adesão medicamentosa', 'Baixa adesão medicamentosa', 'Efeitos adversos referidos',
          'Sintomas controlados com o tratamento atual', 'Necessidade de ajuste terapêutico', 'Solicitou esclarecimento sobre o diagnóstico'],
      },
    ],
  },
  objetivo: {
    label: 'O — Objetivo',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    ring: 'ring-emerald-400/40',
    groups: [
      {
        label: 'Estado Geral',
        items: ['BEG (bom estado geral)', 'REG (regular estado geral)', 'MEG (mau estado geral)', 'Consciente e orientado (4/4)', 'Sonolento', 'Torporoso', 'Agitado', 'Glasgow 15', 'Cooperativo', 'Eupneico', 'Taquipneico', 'Bradipneico', 'Em uso de O₂',
          'Vigil', 'Descorado +/4+', 'Ictérico +/4+', 'Desidratado', 'Emagrecido'],
      },
      {
        label: 'Sinais Vitais',
        items: ['Afebril', 'Febril (T > 37,8°C)', 'Hipotenso', 'Normotenso', 'Hipertenso', 'Taquicárdico', 'Bradicárdico', 'FC regular', 'FC irregular', 'SpO₂ adequada', 'SpO₂ reduzida', 'FR aumentada', 'Dor EVA 0/10', 'Dor EVA moderada', 'Dor EVA intensa',
          'Normocárdico', 'Dor EVA leve', 'Afebril nas últimas 24h', 'PA controlada'],
      },
      {
        label: 'Exame Cardiovascular',
        items: ['RCR 2T sem sopros', 'RCR 2T com sopro sistólico', 'RCR 3T', 'B3 presente', 'B4 presente', 'Turgência jugular (TJ) ausente', 'TJ presente (+/++/+++)', 'Pulsos periféricos cheios', 'Pulsos periféricos finos', 'Perfusão capilar < 2s', 'Perfusão capilar > 3s', 'Edema MMII (+/++/++/++++)', 'Ausência de edema', 'Pressão de pulso convergente', 'Pressão de pulso divergente',
          'Ritmo irregular', 'Sopro diastólico', 'Reflexo hepatojugular presente', 'Pulsos assimétricos'],
      },
      {
        label: 'Exame Respiratório',
        items: ['MV universalmente presente', 'MV diminuído à direita', 'MV diminuído à esquerda', 'Crepitantes bibasais', 'Crepitantes à direita', 'Crepitantes à esquerda', 'Sibilos difusos', 'Roncos', 'Egofonia presente', 'FTV aumentado', 'FTV diminuído', 'Submacicez à percussão', 'Macicez à percussão', 'Taquipneia (FR > 20 irpm)', 'Uso de musculatura acessória', 'Tiragem intercostal',
          'Tórax em tonel', 'Cianose central', 'Batimento de asa nasal', 'Expansibilidade reduzida à direita'],
      },
      {
        label: 'Exame Abdominal',
        items: ['Abdome plano', 'Abdome globoso', 'Abdome escavado', 'RHA presentes e normais', 'RHA aumentados', 'RHA ausentes', 'Flácido e indolor à palpação', 'Dor à palpação em FID', 'Dor à palpação em HD', 'Dor à palpação em epigástrio', 'Sinal de Blumberg positivo', 'Sinal de Murphy positivo', 'Hepatomegalia palpável', 'Esplenomegalia palpável', 'Macicez de flancos', 'Sinal do piparote positivo', 'Peristaltismo visível',
          'Dor à palpação difusa', 'Dor à palpação em FIE', 'Cicatriz cirúrgica prévia', 'RHA diminuídos', 'Ascite (onda de fluido)'],
      },
      {
        label: 'Exame Neurológico',
        items: ['Pupilas isocóricas e fotorreagentes', 'Anisocoria', 'Força preservada em 4 membros', 'Hemiparesia direita', 'Hemiparesia esquerda', 'Paraparesia', 'Reflexos presentes e simétricos', 'Babinski ausente', 'Babinski presente à direita', 'Babinski presente à esquerda', 'Sensibilidade preservada', 'Rigidez de nuca ausente', 'Rigidez de nuca presente', 'Ataxia presente', 'Disdiadococinesia',
          'Desorientado no tempo e espaço', 'Disartria', 'Nistagmo', 'Marcha atáxica', 'Força reduzida em membro inferior direito'],
      },
    ],
  },
  observacoes: {
    label: 'P — Observações de Visita',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    ring: 'ring-amber-400/40',
    groups: [
      {
        label: 'Drenos',
        items: [
          'Dreno em sítio cirúrgico — funcionante', 'Dreno com débito seroso', 'Dreno com débito serossanguinolento', 'Dreno com débito sanguinolento', 'Dreno com débito bilioso', 'Dreno com débito purulento', 'Dreno com débito reduzido', 'Dreno sem débito nas últimas 24h', 'Dreno retirado sem intercorrências', 'Dreno de tórax (dreno pleural) — funcionante', 'Dreno de tórax — borbulhamento presente', 'Dreno de tórax — sem borbulhamento', 'Dreno de tórax retirado — RX solicitado',
        ],
      },
      {
        label: 'Sondas',
        items: [
          'SVD (sonda vesical de demora) — pervie e funcionante', 'SVD com diurese clara', 'SVD com diurese turva', 'SVD com hematúria', 'SVD retirada', 'SNE (sonda nasoenteral) — em posição e funcionante', 'SNE com dieta em andamento', 'SNE com resíduo gástrico aumentado', 'SNE retirada', 'SNG (sonda nasogástrica) — em posição', 'SNG em drenagem', 'SNG com débito bilioso', 'SNG retirada',
        ],
      },
      {
        label: 'Curativos',
        items: [
          'Curativo realizado — ferida limpa e seca', 'Curativo realizado — ferida com secreção serosa', 'Curativo realizado — ferida com secreção purulenta', 'Curativo realizado — ferida com deiscência parcial', 'Curativo realizado — ferida com deiscência total', 'Curativo realizado — sinais flogísticos presentes', 'Ferida cirúrgica com bom aspecto', 'Ferida com necrose presente', 'Ferida com tecido de granulação', 'Ferida com epitelização em curso', 'Úlcera por pressão — avaliada e tratada', 'Curativo de acesso vascular periférico — sem sinais flogísticos', 'Curativo de CVC — sem sinais de infecção',
        ],
      },
      {
        label: 'Retirada de Pontos',
        items: [
          'Retirada de pontos realizada — ferida com boa cicatrização', 'Retirada de pontos parcial', 'Retirada de pontos adiada — ferida com deiscência', 'Retirada de pontos adiada — sinais flogísticos presentes', 'Retirada de grampos cirúrgicos realizada', 'Pontos mantidos por mais 48h', 'Pontos retirados sem intercorrências',
        ],
      },
      {
        label: 'Fisioterapia',
        items: [
          'Fisioterapia motora realizada', 'Fisioterapia respiratória realizada', 'Paciente em deambulação assistida', 'Paciente deambulando sem auxílio', 'Paciente em uso de bipap para fisioterapia', 'Paciente realizando exercícios ativos', 'Paciente realizando exercícios passivos', 'Sem condições de fisioterapia no momento', 'Fisioterapia suspensa por piora clínica', 'Transferência de leito realizada com auxílio',
        ],
      },
      {
        label: 'Interconsultas',
        items: [
          'Interconsulta com Cardiologia — solicitada', 'Interconsulta com Cardiologia — realizada', 'Interconsulta com Neurologia — solicitada', 'Interconsulta com Neurologia — realizada', 'Interconsulta com Nefrologia — solicitada', 'Interconsulta com Infectologia — solicitada', 'Interconsulta com Infectologia — realizada', 'Interconsulta com Cirurgia — solicitada', 'Interconsulta com Cirurgia — realizada', 'Interconsulta com Gastroenterologia — solicitada', 'Interconsulta com Psiquiatria — solicitada', 'Interconsulta com Nutrição — realizada', 'Interconsulta com Serviço Social — realizada', 'Aguardando retorno de interconsulta',
        ],
      },
      {
        label: 'Alta Hospitalar',
        items: [
          'Critérios de alta preenchidos', 'Alta prevista para hoje', 'Alta adiada — aguardando resultado de exame', 'Alta adiada — instabilidade clínica', 'Alta com encaminhamento para UBS', 'Alta com retorno ambulatorial agendado', 'Alta com prescrição domiciliar realizada', 'Orientações de alta fornecidas ao paciente e familiar', 'Paciente transferido para enfermaria', 'Paciente transferido para UTI', 'Paciente transferido para outro serviço', 'Solicitação de vaga em outro hospital em andamento',
        ],
      },
      {
        label: 'Acesso Vascular',
        items: [
          'AVP (acesso venoso periférico) — pérvio', 'AVP trocado por flebite', 'CVC (cateter venoso central) — em posição e pérvio', 'CVC com sinais de infecção — reavaliado', 'CVC retirado sem intercorrências', 'PICC em posição e funcionante', 'PAI (pressão arterial invasiva) — monitorando', 'PAI retirada', 'Acesso arterial — coletado gasometria',
        ],
      },
      {
        label: 'Dieta e Nutrição',
        items: [
          'Dieta oral liberada', 'Dieta oral suspensa — risco de broncoaspiração', 'Dieta enteral em andamento', 'Dieta parenteral em andamento', 'Paciente em jejum', 'Jejum pré-operatório', 'Paciente com boa aceitação da dieta', 'Paciente com baixa aceitação da dieta', 'Nutrição parenteral total iniciada', 'Avaliação nutricional realizada pela equipe',
        ],
      },
      {
        label: 'Solicitação de Exames Laboratoriais',
        items: [
          'Hemograma completo', 'PCR (proteína C reativa)', 'VHS', 'Procalcitonina', 'Lactato sérico', 'Hemocultura — 2 amostras coletadas', 'Urocultura com antibiograma', 'Cultura de secreção de ferida', 'Gasometria arterial', 'Gasometria venosa', 'Eletrólitos (Na, K, Cl, Mg, Ca, P)', 'Função renal (ureia e creatinina)', 'TFGe calculada', 'Função hepática (TGO, TGP, GGT, FA, bilirrubinas)', 'Coagulograma (TP, TTPA, INR)', 'Fibrinogênio', 'D-dímero', 'Troponina I / T', 'CK e CK-MB', 'BNP / NT-proBNP', 'TSH e T4 livre', 'Glicemia de jejum', 'HbA1c', 'Lipidograma completo', 'Ácido úrico', 'Albumina sérica', 'Proteínas totais e frações', 'Amilase e lipase', 'Urina rotina (EAS)', 'β-HCG sérico', 'Sorologias (HIV, HBsAg, HCV, VDRL)', 'Nível sérico de medicamento (digoxina, fenitoína, vancomicina)', 'Toxicológico sérico e urinário',
        ],
      },
      {
        label: 'Solicitação de Exames de Imagem',
        items: [
          'Radiografia de tórax PA e perfil', 'Radiografia de tórax portátil (AP)', 'Radiografia de abdome em pé e deitado', 'Radiografia de osso — especificar região', 'Ultrassonografia de abdome total', 'Ultrassonografia de vias urinárias', 'Ultrassonografia Doppler venoso de MMII', 'Ultrassonografia Doppler arterial', 'Ultrassonografia à beira do leito (POCUS)', 'Ecocardiograma transtorácico', 'Ecocardiograma transesofágico', 'TC de crânio sem contraste', 'TC de crânio com contraste', 'TC de tórax sem contraste', 'TC de tórax com contraste (angiotomografia)', 'TC de abdome e pelve com contraste', 'TC de coluna (cervical / torácica / lombar)', 'Angiotomografia de aorta', 'RM de crânio / encéfalo', 'RM de coluna', 'RM de abdome', 'Cintilografia óssea', 'PET-CT solicitado', 'ECG de 12 derivações', 'Holter 24h', 'MAPA 24h', 'Endoscopia digestiva alta (EDA)', 'Colonoscopia', 'Broncoscopia',
        ],
      },
      {
        label: 'Procedimentos Administrativos',
        items: [
          'Solicitação de transferência para hospital de referência', 'Inserção no sistema CROSS — solicitada', 'Inserção no CROSS — aguardando vaga', 'Vaga no CROSS confirmada — aguardando transporte', 'Solicitação de vaga em UTI', 'Solicitação de vaga em enfermaria especializada', 'Regulação médica acionada', 'Transporte médico solicitado (SAMU / regulação)', 'Guia de internação emitida', 'Resumo de alta / Declaração de internação elaborada', 'Solicitação de autorização de procedimento (OPME)', 'Solicitação de autorização de medicamento de alto custo', 'Solicitação de segunda opinião / telemetria', 'Comunicação com plano de saúde realizada', 'Declaração de óbito emitida', 'Comunicado ao NÚCLEO (NIS / Regulação interna)', 'Solicitação de cirurgia agendada / eletiva', 'Cirurgia de urgência agendada', 'Notificação compulsória realizada (SINAN)', 'Comunicação ao MP / conselho tutelar (vulnerabilidade)', 'Avaliação de Serviço Social solicitada', 'Alta a pedido — termo assinado', 'Recusa de procedimento — TCLE documentado',
        ],
      },
      {
        label: 'Orientações de Enfermagem',
        items: [
          'Troca de curativo diária — com registro fotográfico', 'Troca de curativo em dias alternados', 'Curativo oclusivo — manter até nova avaliação', 'Controle de sinais vitais de 4/4h', 'Controle de sinais vitais de 6/6h', 'Controle de sinais vitais de 8/8h', 'Controle de sinais vitais contínuo (monitorização)', 'Controle rigoroso de diurese — medir e anotar', 'Balanço hídrico rigoroso', 'Controle de débito de drenos — anotar volume e aspecto', 'Deambulação assistida 2x ao dia', 'Deambulação livre liberada', 'Repouso relativo no leito', 'Repouso absoluto no leito', 'Mudança de decúbito de 2/2h — prevenção de UPP', 'Elevação do membro inferior para controle de edema', 'Cabeceira elevada a 30–45°', 'Higiene oral rigorosa — 3x ao dia', 'Cuidados com acesso venoso — observar sinais de flebite', 'Aspiração de vias aéreas superiores se necessário', 'Oxigenoterapia conforme saturação — alvo SpO₂ > 94%', 'Glicemia capilar de 6/6h', 'Glicemia capilar pré e pós-prandial', 'Controle de temperatura — antitérmico se T > 37,8°C', 'Comunicar equipe médica se PA < 90x60 ou > 180x110 mmHg', 'Comunicar equipe médica se FC < 50 ou > 120 bpm', 'Comunicar equipe médica se SpO₂ < 92%', 'Comunicar equipe médica se débito urinário < 0,5 mL/kg/h', 'Manter prescrição vigente — sem alterações', 'Administrar medicações conforme prescrição',
        ],
      },
    ],
  },
};
