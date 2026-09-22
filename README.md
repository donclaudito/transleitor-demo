# Oren.AI — página de apresentação e demonstração do Transleitor

Site de apresentação do **Transleitor**, o produto de documentação clínica da **Oren.AI**: a capa de
marketing e uma **demonstração navegável e não-funcional** das telas do aplicativo, para que um
futuro usuário entenda o que ele faz antes de pedir acesso.

Este repositório é **separado** do aplicativo. O aplicativo guarda dado de paciente real; aqui não
existe backend, banco, login nem chave de API. É uma peça estática.

---

## Marca: Oren.AI é a mãe, Transleitor é o produto

**Decisão do Dr. Claudio.** A hierarquia aparece nos dois lugares onde importa: o cabeçalho da capa
(`MarcaOren` em `src/components/marca/OrenEmblema.jsx`) e o rodapé. Nunca os dois nomes soltos, um
substituindo o outro.

A identidade (azul-marinho profundo, ciano, traçado de pulso) vale **na capa** — e só nela:

| Escopo | Onde | O que veste |
|---|---|---|
| `.tema-oren` | `src/index.css` | A capa inteira: re-declara os tokens do Tailwind. Nenhum componente da capa precisou saber que a cor mudou. |
| `.tema-app` | `src/index.css` | A **amostra do aplicativo** dentro da moldura do herói. Devolve o tema claro real do app. |

**Por que a amostra não usa a cor da capa:** a moldura mostra uma tela real do aplicativo. Vestir
essa amostra com a identidade da capa transformaria a "amostra" em ficção — e o argumento desta
página inteira é não inventar. O bloco `.tema-app` **repete** os valores de `:root`, e essa cópia é
conferida por teste: divergiu, reprova.

### O emblema é ARQUIVO, não desenho

`public/oren-ai-{512,192,180,64,32}.png` são gerados do PNG oficial da marca (2048×2048) por
`ferramentas/gerar-icones-oren.py`:

```bash
python ferramentas/gerar-icones-oren.py CAMINHO_DO_EMBLEMA.png
```

O script **mede** o círculo em vez de adivinhar, e faz três coisas que um "salvar como" não faz:

1. **recorta justo** — no original o círculo ocupa ~58% do quadro, o resto é preto;
2. **aplica máscara circular com alfa** — o fundo é preto e a capa é azul-marinho; recorte quadrado
   deixaria um quadrado preto visível sobre o marinho;
3. **descarta a marca d'água** de geração que existe no canto inferior direito (não é marca).

**A primeira versão da capa tinha um SVG desenhado à mão**, aproximado da marca a partir de uma
imagem pequena. Aproximação de marca é erro — o traçado e a cor não eram os da marca. O SVG foi
removido e `conferir.mjs` **reprova** se um `viewBox` voltar para `OrenEmblema.jsx`: existe **um só**
emblema neste projeto.

**Cor da marca, medida e não escolhida no olho:** `#acd8c3` (menta, média de 42.691 amostras do anel).

> **[DECISÃO pendente] Menta ou ciano?** O emblema é **menta sobre azul-marinho**. O acento da capa
> hoje é **ciano**, tirado da imagem de capa que o Dr. Claudio enviou. As duas cores convivem sem
> quebrar, mas não são a mesma família. Trocar o acento para a menta do emblema é uma linha em
> `.tema-oren` (`--primary`) — falta a decisão dele.

### Tipografia: a capa inteira na serifa da marca

A capa usa uma **serifa de alto contraste** (a referência que o Dr. Claudio mandou). Escolhida a
**Instrument Serif** — a mais próxima no Google Fonts: alto contraste, ar editorial, elegante em
corpo grande. Alternativas próximas, se ele preferir: **Playfair Display** (mais "revista de moda")
e **Bodoni Moda** (Didone, serifa ainda mais fina).

**A serifa vale para a capa INTEIRA, não só para as manchetes.** Foi pedido explícito: manter a
fonte "de forma proporcional nas outras partes" — texto corrido, botões, legenda e os passos do
"Como Funciona". Como `font-family` é herdado, uma linha em `.tema-oren` veste todo o conteúdo.

| Regra | Onde | Por quê |
|---|---|---|
| `font-family: var(--font-display)` em `.tema-oren` | A capa toda | Herança: uma linha, e nada precisa saber que a fonte mudou |
| Peso **único** (`400 !important` em `.tema-oren *`) | A capa toda | A Instrument Serif só existe em 400; qualquer `font-bold` faria o navegador **fabricar** negrito e borrar as hairlines. A ênfase passa a ser por **cor** |
| Escala proporcional | `.text-[10px]`, `.text-[11px]`, `.text-xs` dentro da capa | A serifa lê **menor** que a sans no mesmo corpo; o texto pequeno sobe um degrau |
| `.fonte-marca` | O nome Oren.AI, **em qualquer tela** | O nome é a marca, não elemento de interface — não muda de tipo conforme a tela |

**A escala é `!important` e mora num lugar só, de propósito.** Sobrescrever `text-sm`/`text-base`/
`text-lg` globalmente mataria a responsividade (a versão sem variante venceria `md:text-lg` por
especificidade, em todos os tamanhos de tela). Por isso só as três classes **sem variante
responsiva** na capa entram na escala; o resto foi ajustado direto no componente.

**Fonte carregada por `<link>`, não por `@import`.** O projeto carregava as fontes com `@import`
dentro do CSS, que é **render-blocking e serializa a descoberta**: o navegador precisa baixar o nosso
CSS para só então descobrir que existe outro CSS de fonte para baixar. Agora vão no `index.html`,
com `preconnect`. `conferir.mjs` reprova se um `@import url(` voltar ao CSS.

**A linha "Inteligência Cirúrgica por Oren.AI" foi REMOVIDA** a pedido dele. A capa fica com a marca
(Oren.AI) e a manchete (Inteligência Médica). `conferir.mjs` **reprova** se a frase voltar — o
conferidor de marcas do render não pegaria, porque ele só confere o que **tem** de aparecer.

> **[DECISÃO pendente] Fonte de terceiro e IP do visitante.** As fontes vêm do **Google Fonts**: o
> navegador de quem visita faz um pedido a `fonts.googleapis.com` / `fonts.gstatic.com`, e o IP do
> visitante chega ao Google. Isto **já existia** neste projeto antes da serifa (Inter e Sora), e não
> é telemetria nossa — mas numa página de marca médica é o tipo de transferência que se decide
> conscientemente, não por herança. A saída é **auto-hospedar** as três famílias (`public/fontes/` +
> `@font-face`), o que remove o terceiro do caminho e ainda tira uma conexão externa do carregamento
> crítico. Instrument Serif é **SIL OFL 1.1**, que permite redistribuir. Falta a decisão dele.


---

## O que este site é — e o que ele não é

**É:** a capa de apresentação do produto e onze telas ilustrativas do aplicativo, navegáveis de
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
npm run conferir   # 645 asserções: imports, avisos, rotas, mojibake, espelho de tema, ícones, tipografia, proibições de rede
npm run smoke      # renderiza as 15 telas e confere marcas de texto
npm run build      # build de produção
npm run servir     # serve dist/ num servidor Node puro, para conferir o que é SERVIDO
npm run no-ar https://SEU-SITE.vercel.app   # confere o que está NO AR (não o que foi enviado)
npm run provar     # tudo acima, em ordem
```

`npm run servir` existe porque `vite preview` também carrega o `vite.config.js` — e isso passa pelo
esbuild. O servidor de `testes/servir-dist.mjs` só entrega arquivos de `dist/`, sem depender disso — e
ele **imita o Vercel**, que é o host de produção: rota sem extensão devolve o `index.html` (é o que o
`rewrites` faz) e `/assets/` sai com cache imutável (é o que os `headers` fazem). Assim
`npm run servir` + `npm run no-ar http://127.0.0.1:4173` é um **ensaio local da produção**. Ressalva: o
GitHub Pages **não** reescreve rota — lá quem resolve rota profunda é o par `public/404.html` + o
despertador no `index.html`.

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
    marca/                     emblema e marca Oren.AI
    landing/                   a capa (mesma do aplicativo, com CTA para a demonstração)
    demo/                      molde, botão que não executa, avisos, moldura e o menu do app
    ui/                        design system (shadcn/ui copiado do aplicativo)
  pages/
    LandingPage.jsx            capa
    demo/                      as onze telas demonstradas
testes/
  conferir.mjs                 conferências estáticas
  conferir-no-ar.mjs           confere o que está NO AR
  servir-dist.mjs              serve dist/ imitando o host (rewrite + cache dos assets)
  smoke/entrada.jsx            prova de renderização das 15 telas
ferramentas/
  gerar-icones-oren.py         recorta o PNG da marca e gera o conjunto de ícones
public/
  oren-ai-*.png                ícones da marca — GERADOS, não editar à mão
```

### As onze telas

| Rota | Tela |
|---|---|
| `/demo/menu` | Menu — a central do plantão (escolher o ambiente) |
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

**A tela de Menu é fonte única.** O mesmo componente (`components/demo/PainelMenu.jsx`) desenha a
tela da demonstração **e** a amostra dentro da moldura do herói da capa. Duas cópias divergiriam na
primeira mudança, e a capa passaria a mostrar uma tela que não existe.

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

Duas hospedagens estão preparadas: **Vercel** (a escolhida) e GitHub Pages (que este plano recusou).

### Vercel — a hospedagem escolhida

**No ar em https://transleitor-demo.vercel.app**

O arquivo `vercel.json` já resolve tudo o que o Vercel precisa saber:

| Configuração | Por quê |
|---|---|
| `rewrites: /(.*) → /index.html` | Rota do React no cliente. Sem isto, um F5 em `/demo/evolucao` daria 404. No Vercel isto **substitui** o truque do `404.html`, que é do Pages. |
| `outputDirectory: dist` | Saída do Vite. |
| `framework: vite` | Detecção explícita, em vez de depender do palpite da plataforma. |
| `Cache-Control` imutável em `/assets/` | O nome do arquivo tem hash do conteúdo: se mudar, muda o nome. Segurar em cache é seguro. |
| `buildCommand` com as verificações | O deploy **não publica código não conferido**: lint, 645 asserções e prova de renderização rodam antes do build. |

**No Vercel o site fica na raiz**, então `VITE_BASE_PATH` **não** deve ser definida (o padrão do
`vite.config.js` é `/`).

#### Publicação automática — e o que a bloqueava (medido)

O projeto está **ligado** a `github:donclaudito/transleitor-demo`: cada push em `main` dispara um
deploy de produção sozinho. Não é preciso rodar `vercel deploy` a cada mudança.

**O bloqueio, e a lição:** os primeiros pushes automáticos ficaram parados em `BLOCKED`:

```
The deployment was blocked because the commit author doesn't have permission
to create deployments for this project.
```

O autor dos commits era `donclaudito <seu-email@gmail.com>` — um e-mail de exemplo, que não é o da
conta Vercel (`clauorenstein@gmail.com`). A Vercel recusa commit de autor que não seja membro da
equipe: é proteção contra alguém que consiga dar push publicar em seu nome. **O mesmo bloqueio
atingiu o deploy pela linha de comando**, porque a CLI anexa o autor do commit local ao enviar.

Correção aplicada, **só neste repositório** (o `git config --global` ficou intocado):

```bash
git config user.email "clauorenstein@gmail.com"
```

Quem for publicar este repositório precisa do mesmo ajuste — ou de ser membro da equipe
`donclauditos-projects`.

**Como diagnosticar de novo**, sem depender da CLI (que mostra `UNKNOWN` nesses casos): a API do
Vercel devolve o estado e o motivo. `GET /v6/deployments` traz `readyState`, `meta.githubCommitSha`
e `errorMessage`.

#### Verificação feita na produção (medida)

`node testes/conferir-no-ar.mjs https://transleitor-demo.vercel.app` → **0 falhas**:

| Conferência | Resultado |
|---|---|
| `GET /` | HTTP 200, é o nosso `index.html` |
| Bundle que **a página servida** referencia | `/assets/index-u3iSRXXv.js`, 504.338 bytes — **mesmo hash do build conferido localmente** |
| Marcas de texto de tela no bundle baixado | **18/18** |
| Ícone da marca servido | `/oren-ai-192.png` → 200, `image/png`, 47.032 bytes, **sha256 idêntico ao arquivo local** (`c3dac23ee203ac80…`) |
| `Cache-Control` dos assets | `public, max-age=31536000, immutable` |
| `GET /demo/menu`, `/demo/evolucao`, `/demo/cirurgia`, `/demo/seguranca` | HTTP 200, devolvem o app (rewrite funcionando) |
| `base44` e chave de serviço no bundle servido | ausentes |
| Controle negativo do conferidor | reprova marca inexistente |

Esta verificação foi o que pegou o rebrand **não publicado**: o conferidor acusou 4 marcas ausentes
no ar enquanto o build local estava correto — o que levou ao diagnóstico do bloqueio de autor.
Conferir o que está NO AR, e não o que foi enviado, é o que separa "publiquei" de "está publicado".


### GitHub Pages — o caminho que este plano não permitiu

O build aceita o prefixo do site por variável de ambiente, porque o Pages serve o projeto em
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

- **Não verificado em navegador.** O que está provado é: lint sem erros, 645 asserções de
  conferência, renderização das 15 telas com 54 marcas de texto e build `exit 0`. A aparência na
  tela (layout, toque no iPad, comportamento de rolagem) não foi medida: não há navegador no
  ambiente onde isto foi construído.
- **A demonstração não demonstra o aplicativo funcionando.** Ela mostra o formato das telas e o
  fluxo. Nenhuma IA é chamada, nenhum cálculo é feito, nenhum arquivo é lido.
- **Os números do monitoramento são de exemplo.** Servem para mostrar o que a trilha registra — não
  são medições reais de uso.
