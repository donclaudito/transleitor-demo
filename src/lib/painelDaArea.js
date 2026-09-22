// ============================================================================
// DE ONDE VEM O PAINEL DE UMA ÁREA — e por que uma seção pode não existir
//
// Uma área PODE NÃO TER TODAS AS SEÇÕES. Isso é legítimo, não config quebrada: no aplicativo o
// código lê cada seção com `?.groups || []` e a tela de especialidade itera `Object.entries(cfg.secoes)`
// — ou seja, desenha o que existe e não sente falta do que não existe. Há teste lá que exige que
// uma config SEM `exame` continue válida.
//
// Na demonstração isso foi reescrito como quatro chaves fixas numa lista, em dois arquivos. Quando
// a área não tinha uma delas, o espalhamento produzia `{ chave: 'exames' }` — um objeto sem
// `groups` — e a tela morria em `s.groups.map(...)` com
// "Cannot read properties of undefined (reading 'map')". Pediatria é exatamente esse caso: tem
// queixa, exame e conduta, e não tem exames.
//
// Este módulo é a ÚNICA fonte dessa montagem. As duas telas que mostram o painel e a prova de
// renderização chamam a mesma função, então nenhuma delas pode divergir da outra.
// ============================================================================
import { PANELS_ESPECIALIDADE } from '@/data/paineisEspecialidade'
import { SYMPTOMS_DATA } from '@/data/painelSintomas'

// A ordem em que as seções aparecem QUANDO a área as tem.
export const CHAVES_DE_SECAO = ['queixa', 'exame', 'exames', 'conduta']

// O painel geral, usado pela área que ainda não tem config própria.
const CHAVES_DO_GENERICO = ['subjetivo', 'objetivo', 'observacoes']

// Como nomear, em português, a seção que a área não traz. Só é usado no texto que explica a
// ausência — que é derivado dos dados, nunca escrito à mão por área.
const NOME_DA_SECAO = {
  queixa: 'queixa e sintomas',
  exame: 'exame físico',
  exames: 'exames complementares',
  conduta: 'conduta',
}

// Só entra no painel a seção que dá para desenhar: precisa existir E ter `groups` em lista. Assim
// uma config incompleta deixa de derrubar a tela — a seção simplesmente não aparece. O silêncio
// seria perigoso, então a prova de renderização confere que nenhuma seção PRESENTE na config
// chega aqui malformada; se chegar, ela reprova em vez de sumir sem avisar.
function aproveitavel(secao) {
  return Boolean(secao) && Array.isArray(secao.groups)
}

export function montarPainelDaArea(slug) {
  const curado = PANELS_ESPECIALIDADE[slug]

  if (!curado) {
    return {
      origem: 'generico',
      secoes: CHAVES_DO_GENERICO.map((chave) => ({ chave, ...SYMPTOMS_DATA[chave] })),
      semSecao: [],
    }
  }

  const secoes = CHAVES_DE_SECAO
    .filter((chave) => aproveitavel(curado.secoes?.[chave]))
    .map((chave) => ({ chave, ...curado.secoes[chave] }))

  return {
    origem: 'curado',
    secoes,
    semSecao: CHAVES_DE_SECAO.filter((chave) => !secoes.some((s) => s.chave === chave)),
  }
}

// O texto que explica por que a área mostra menos seções do que as outras. Devolve `null` quando
// não falta nada — quem chama não precisa saber a regra.
export function explicarAusencia(semSecao) {
  if (!semSecao.length) return null

  const nomes = semSecao.map((chave) => NOME_DA_SECAO[chave]).join(', ')
  const quantas = CHAVES_DE_SECAO.length - semSecao.length

  if (semSecao.length === 1) {
    return `Esta área usa ${quantas} das ${CHAVES_DE_SECAO.length} seções do painel: ela não traz a de ${nomes}. Não é falha de carregamento — a configuração desta área no aplicativo é assim.`
  }
  return `Esta área não traz as seções de ${nomes}. Não é falha de carregamento — a configuração desta área no aplicativo é assim.`
}
