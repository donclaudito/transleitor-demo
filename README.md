# Transleitor — página de apresentação e demonstração

Site de apresentação do produto Transleitor: a capa de marketing e uma **demonstração navegável e
não-funcional** das telas do aplicativo, para que um futuro usuário entenda o que ele faz antes de
pedir acesso.

Este repositório é **separado** do aplicativo. O aplicativo guarda dado de paciente real; aqui não
existe backend, banco, login nem chave de API. É uma peça estática.

---

## O que este site é — e o que ele não é

**É:** a capa de apresentação do produto e dez telas ilustrativas do aplicativo, navegáveis de
verdade, com conteúdo fixo escrito para a demonstração.

**Não é:** o aplicativo. Nada aqui grava, consulta, envia ou recebe nada.

| Garantia | Como ela é sustentada no código |
|---|---|
| Nenhuma função executa | Botões de ação usam `BotaoDemo`, que explica o que a função faria em vez de fingir que fez |
| Nenhum dado de paciente | Os pacientes da demonstração são "Paciente A", "Paciente B"… — sem nome, sem iniciais, sem prontuário |
| Nada sai do navegador | Conferência automática proíbe `fetch`, `XMLHttpRequest`, `localStorage` e cliente de backend em `src/` |
| Toda tela avisa que é demonstração | Faixa fixa no topo + bloco "o que esta tela não faz", com uma conferência que reprova tela sem aviso |
| Nada é medido nem rastreado | Não há analytics, pixel, cookie ou telemetria neste projeto |

---

## Como rodar

```bash
npm install
npm run dev        # servidor local
```

## Verificações

```bash
npm run lint       # ESLint (no-undef ligado de propósito)
npm run conferir   # 533 asserções: imports, avisos, rotas, mojibake, proibições de rede
npm run smoke      # renderiza as 14 telas e confere marcas de texto
npm run build      # build de produção
npm run servir     # serve dist/ num servidor Node puro, para conferir o que é SERVIDO
npm run provar     # tudo acima, em ordem
```

`npm run servir` existe porque `vite preview` também carrega o `vite.config.js` — e isso passa pelo
esbuild. O servidor de `testes/servir-dist.mjs` só entrega arquivos de `dist/`, do mesmo jeito que o
GitHub Pages entrega, sem depender de nada disso.

### Por que a prova de renderização existe

No projeto de onde esta demonstração saiu, três telas morreram em produção pelo mesmo motivo: um
import que não resolve. Em JavaScript, `import { coisa } from './modulo'` onde `coisa` não é
exportado **não é erro de build** — o identificador vira `undefined` e a tela só quebra na hora de
desenhar. Build verde, lint verde, tela morta.

Por isso `npm run smoke` não lê o fonte: ele **renderiza** cada tela com `react-dom/server` e
confere marcas de **texto de tela** no HTML resultante (o que o usuário lê, não nome de função), com
controle negativo para garantir que o conferidor não aceita tudo.

---

## Estrutura

```
src/
  App.jsx                      rotas: capa em /, demonstração em /demo/*
  data/
    demo.js                    TODO o conteúdo fixo da demonstração (100% fictício)
    paineisEspecialidade.js    tabela curada de conteúdo por área (vinda do aplicativo)
    painelSintomas.js          painel geral, para área sem tabela própria
  components/
    landing/                   a capa (mesma do aplicativo, com CTA para a demonstração)
    demo/                      molde, botão que não executa e avisos
    ui/                        design system (shadcn/ui copiado do aplicativo)
  pages/
    LandingPage.jsx            capa
    demo/                      as dez telas demonstradas
testes/
  conferir.mjs                 conferências estáticas
  smoke/entrada.jsx            prova de renderização das 14 telas
```

### As dez telas

| Rota | Tela |
|---|---|
| `/demo/evolucao` | Evolução SOAP com o painel de sinais da especialidade |
| `/demo/captura` | Captura de laudo/exame por foto ou PDF |
| `/demo/imagem` | Análise de imagem médica em cinco seções |
| `/demo/cirurgia` | Descrição cirúrgica e conferência do registro |
| `/demo/passagem` | Passagem de visita por leito |
| `/demo/especialidades` | Painel por especialidade |
| `/demo/elio` | Elvira, a assistente clínica |
| `/demo/monitoramento` | Uso e trilha de IA |
| `/demo/direitos` | Direitos do titular |
| `/demo/seguranca` | Auditor de segurança |

---

## Conteúdo clínico de onde vem

Nada de conteúdo clínico foi inventado para este site. O que aparece nas telas vem de:

1. **`data/paineisEspecialidade.js`** — a mesma tabela curada que o aplicativo usa, área por área;
2. **o modelo de descrição cirúrgica** já redigido pelo Dr. Claudio (herniorrafia inguinal pela
   técnica de Lichtenstein), condensado para a demonstração.

O que sobra é texto de apoio de tela — aviso, rótulo, explicação. E o bloco de **Avaliação** da
evolução fica deliberadamente **em branco**: preenchê-lo com um exemplo seria inventar conduta
clínica numa página de apresentação, que é exatamente o que o aplicativo não faz.

---

## Publicação

O build aceita o prefixo do site por variável de ambiente, porque o GitHub Pages serve o projeto em
`/<nome-do-repo>/`:

```bash
VITE_BASE_PATH=/transleitor-demo/ npm run build
```

O workflow `.github/workflows/deploy-pages.yml` já define isso a partir do nome do repositório e
publica o conteúdo de `dist/`.

**Rota profunda no GitHub Pages:** o Pages não reescreve rota de aplicação de página única. Um F5 em
`/demo/evolucao` não encontra arquivo e cai em `public/404.html`, que devolve o caminho para o
`index.html` em `?r=`; o `index.html` restaura a rota antes de o React montar. Sem esse par de
arquivos, recarregar uma tela da demonstração daria 404.

### Repositório privado × GitHub Pages — medido

O GitHub Pages em repositório **privado** exige plano pago (Pro/Team/Enterprise). Medido nesta
conta, no repositório privado `donclaudito/transleitor-demo`:

```
POST /repos/donclaudito/transleitor-demo/pages
→ 422 {"message":"Your current plan does not support GitHub Pages for this repository."}
```

Por isso o workflow é **condicional**: ele sempre roda lint, conferências, prova de renderização e
build — e só publica se o Pages aceitar o repositório. Quando não aceita, a execução passa **verde**
e escreve no resumo o motivo e as duas saídas. Um X vermelho ali pareceria defeito do site, quando é
limitação de plano.

Para publicar, uma das duas:

1. **Tornar o repositório público** — Settings → General → Danger Zone → Change visibility. Depois
   rode o workflow de novo (Actions → *Conferir e publicar a demonstração* → Run workflow), ou apenas
   faça um push em `main`.
2. **Publicar a pasta `dist/` em Vercel, Netlify ou Cloudflare Pages**, que aceitam repositório
   privado. O projeto é estático e não muda nada para isso — só não defina `VITE_BASE_PATH` (o site
   fica na raiz).


---

## Limites declarados

- **Não verificado em navegador.** O que está provado é: lint sem erros, 533 asserções de
  conferência, renderização das 14 telas com 44 marcas de texto e build `exit 0`. A aparência na
  tela (layout, toque no iPad, comportamento de rolagem) não foi medida: não há navegador no
  ambiente onde isto foi construído.
- **A demonstração não demonstra o aplicativo funcionando.** Ela mostra o formato das telas e o
  fluxo. Nenhuma IA é chamada, nenhum cálculo é feito, nenhum arquivo é lido.
- **Os números do monitoramento são de exemplo.** Servem para mostrar o que a trilha registra — não
  são medições reais de uso.
