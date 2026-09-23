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

**E a marca é o SUJEITO da ação, não "a IA".** Segundo pedido dele: *"em todas as partes onde a IA
aparece dando força à marca"*. Onde a frase dizia quem **faz**, agora quem faz é a Oren.AI:

| Antes | Depois |
|---|---|
| A IA muda conforme o setor do paciente | **A Oren.AI** muda conforme o setor do paciente |
| A IA processa e correlaciona | **A Oren.AI** processa e correlaciona |
| Escolha o formato, a IA cuida do resto | Escolha o formato, **a Oren.AI** cuida do resto |
| IA que entende o setor, analisa… | **A Oren.AI** entende o setor, analisa… |
| a IA transcreve e anonimiza o documento | **a Oren.AI** transcreve e anonimiza o documento |
| alergias entram no raciocínio da IA | alergias entram no raciocínio **da Oren.AI** |
| o uso da IA é monitorado | o uso **da Oren.AI** é monitorado |

**A regra é sobre o SUJEITO, não sobre a palavra.** "Multi-modelo **de** IA", "trilha **de** IA" e
"extração de texto **por** IA" descrevem a **categoria** da tecnologia — trocar ali produziria frase
errada. Por isso a conferência exige o artigo antes (`a IA` / `o IA`) e tem **controle negativo dos
dois lados**: a categoria continua permitida, e o sujeito continua sendo detectado. Medido no bundle
servido: **0 ocorrências** do sujeito genérico.

**O rodapé tem três linhas** (pedido dele): as duas leituras da marca — *Médica*, a ampla, e
*Cirúrgica*, a específica — e a linha do produto:

```
Oren.AI — Inteligência Médica
Oren.AI — Inteligência Cirúrgica
Transleitor · Clínica Adaptativa · Documentação médica inteligente
```

Repare que **não há peso separando as linhas**: a capa inteira usa peso único (400) porque a serifa
display não tem outro. A hierarquia do rodapé vem de **tamanho e cor**. O "IA" saiu de "IA Clínica
Adaptativa" — a marca já está dita na linha.

O título da seção de agentes mudou duas vezes — hoje ele nomeia quem trabalha com você:
**"Nossos profissionais e nossos Assistentes da Oren.AI que trabalham com você"**.

A mesma palavra saiu do **site inteiro**, não só do título: onde ela aparecia no texto corrido, hoje
se lê **"assistente"** (a Ellah, três vezes) e **"profissional"** (a metáfora do auditor, duas vezes).
"Assistente" não é sinônimo de dicionário — é a palavra que o site já usava para ela ("Assistente
clínica de plantão, 24h"). E "revisor" foi evitado de propósito nas frases do auditor, porque já é o
nome de outro agente (`Revisor da evolução`).

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

### As páginas da demonstração: Poppins

Segunda referência do Dr. Claudio, agora para as **páginas da demonstração**: uma **sans
geométrica** (letras redondas, "a" de um só andar, e a diferença de peso entre o texto pesado em
caixa alta e o corpo regular). Escolhida a **Poppins**. As três variáveis de fonte (`--font-heading`,
`--font-body`, `--font-display`) apontam para ela porque a referência usa **uma** família em pesos
diferentes — não duas.

> **CONSEQUÊNCIA, REGISTRADA:** o **aplicativo de verdade** usa **Sora** (títulos) e **Inter**
> (texto). Com esta mudança, **a demonstração deixa de ser fiel à tipografia do aplicativo** — ela
> passa a mostrar as telas na Poppins. Inter e Sora saíram do pedido de fonte porque nada mais as
> usa. Se a intenção for preservar a fidelidade ao app, o caminho é a Poppins **só nos títulos** e o
> corpo de volta na Inter: é uma variável.

Resultado: **duas famílias, e só duas** no carregamento — Instrument Serif (capa) e Poppins
(demonstração). `conferir.mjs` reprova se Inter ou Sora voltarem a ser pedidas sem uso.

#### No celular: piso de leitura e alvo de toque

Revisão de 22/09/2026, feita **medindo as classes**, não olhando — não há navegador neste ambiente.

**O que já estava certo** (medido, não suposto): o `viewport` está no `index.html`; todas as grades
estão ancoradas na base (`grid gap-6 lg:grid-cols-2` = uma coluna no celular, sem exceção); a
navegação da demonstração vira barra horizontal com `overflow-x-auto` no celular e coluna fixa no
computador; o cabeçalho da capa troca os links por menu sanfona abaixo de `lg`; e as tabelas de
captura, monitoramento e conformidade já estavam dentro de contêiner de rolagem. Nenhuma largura fixa
em pixels escapa de um `overflow-hidden` — as únicas que existem são os brilhos decorativos do herói,
e o `<section>` que os contém tem `overflow-hidden`.

**O defeito encontrado:** a tabela do documento cirúrgico (`DemoCirurgia`) estava dentro de
`overflow-hidden`. Em tela estreita ela era **cortada** — o valor do campo desaparecia, sem barra de
rolagem e sem aviso nenhum. Trocado por `overflow-x-auto`, e a coluna de rótulo passou a
`w-32 sm:w-40` para devolver largura ao valor.

**Duas medições que viraram decisão:**

| O que | Medido | Decisão |
|---|---|---|
| Rótulos de 10px e 11px | 31 + 90 ocorrências, quase todas na demonstração | sobem para 12px **abaixo de 640px** |
| Alvo de toque das telas interativas | `py-1` / `py-1.5` = 24 a 30px de altura | `py-2` no celular, valor do aplicativo em 640px+ |

A regra que governa as duas: **só o celular muda; de 640px para cima nada é alterado.** A
demonstração existe para mostrar o aplicativo fielmente, e num monitor isso é possível; num celular
de 375px a comparação não é possível de qualquer forma, e aí a legibilidade ganha. O `text-xs` (12px,
123 ocorrências) **não** sobe: é o corpo de texto do próprio aplicativo, e mexer nele empurraria o
layout em vez de consertar a leitura.

**A trava (§13 do `conferir.mjs`)** reprova `<table>` de página sem `overflow-x-auto` por perto e
dentro de `overflow-hidden`, exige a classe e a media query do piso de leitura e exige os alvos de
toque maiores. A primeira execução dela **reprovou a si mesma**: o comentário que explica por que o
`overflow-hidden` saiu contém a palavra `overflow-hidden`, e o medidor de fonte crua leu a explicação
como se fosse código. Daí o `semComentario()` dentro da regra e o controle negativo dos dois lados.
É a quinta vez que este projeto tropeça em medir fonte crua; a lição está escrita no lugar onde ela
morde.

**O que continua não verificado:** a aparência num celular de verdade. O que está provado é o
código, o CSS construído (a media query está no bundle) e o render das 19 telas + 23 áreas. Um
aparelho na mão não foi usado, porque não há um aqui.

#### O defeito que essa mudança revelou

A moldura do herói (a "amostra da tela real do aplicativo") fica **dentro** de `.tema-oren`, que
troca a tipografia da capa inteira — e `font-family` é **herdado**. Sem um reset, a amostra aparecia
escrita na **serifa da capa**: uma amostra mentirosa, justamente o que a seção "O emblema é ARQUIVO"
diz que não pode acontecer. O `.tema-app` agora devolve `var(--font-body)`.

**Isso passou por dois deploys sem ninguém notar**, porque o conferidor de marcas só olha **texto** —
e o texto estava certo. Agora há asserção para a fonte da amostra.


> **[DECISÃO pendente] Fonte de terceiro e IP do visitante.** As fontes vêm do **Google Fonts**: o
> navegador de quem visita faz um pedido a `fonts.googleapis.com` / `fonts.gstatic.com`, e o IP do
> visitante chega ao Google. Isto **já existia** neste projeto antes da serifa (Inter e Sora), e não
> é telemetria nossa — mas numa página de marca médica é o tipo de transferência que se decide
> conscientemente, não por herança. A saída é **auto-hospedar** as três famílias (`public/fontes/` +
> `@font-face`), o que remove o terceiro do caminho e ainda tira uma conexão externa do carregamento
> crítico. Instrument Serif é **SIL OFL 1.1**, que permite redistribuir. Falta a decisão dele.


---

## O que este site é — e o que ele não é

**É:** a capa de apresentação do produto e quinze telas ilustrativas do aplicativo, navegáveis de
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
npm run conferir   # 1177 asserções: imports, avisos, rotas, mojibake, espelho de tema, ícones, tipografia, proibições de rede
npm run smoke      # renderiza as 19 telas + as 12 áreas nas 2 telas de painel (23 renders) e confere 224 marcas de texto
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

#### O defeito que a prova de renderização não pegava

Em 22/09/2026 o site foi publicado com um crash: **clicar em "Pediatria" derrubava a tela**, com

```
TypeError: Cannot read properties of undefined (reading 'map')
```

A causa não foi digitação. Uma área **pode não ter todas as seções** — no aplicativo isso é
legítimo, e o código de lá itera o que existe (`Object.entries(cfg.secoes)`) e lê cada seção com
`?.groups || []`. A demonstração reescreveu isso como **quatro chaves fixas** numa lista, em dois
arquivos diferentes:

```js
{ chave: 'exames', ...curado.secoes.exames },   // Pediatria não tem `exames`
```

Espalhar `undefined` não dá erro: dá um objeto `{ chave: 'exames' }`, **sem `groups`**. E aí
`s.groups.map(...)` morre. Pediatria é a única das 11 áreas curadas nessa situação — tem queixa,
exame e conduta (49 itens, 3 seções) e não tem exames.

**Por que o smoke não pegou:** ele renderiza cada tela no **estado inicial**, e a tela de evolução
abre em urologia. O crash só existe **depois do clique**. A prova estava correta e insuficiente —
renderizar uma tela não é o mesmo que renderizar todos os **estados** dela. É a mesma lição que
originou este arquivo, um nível mais fundo.

**O conserto, em três partes:**

1. `src/lib/painelDaArea.js` passa a ser a **única** fonte da montagem do painel. As duas telas que
   mostram o painel e a prova de renderização chamam a mesma função, então nenhuma pode divergir da
   outra. Uma seção só entra se existir **e** tiver `groups` em lista.
2. As duas telas aceitam `slugInicial`, para a prova poder montá-las em cada área.
3. O smoke ganha dois blocos: mede a **forma** de cada config (seção presente tem de ter `groups` —
   sem isso a tolerância esconderia a seção malformada em silêncio, que é pior do que quebrar) e
   **renderiza as 12 áreas** nas 2 telas, em 23 renders.

**Nenhum item clínico foi inventado.** Os itens de Pediatria são os que o Dr. Claudio escreveu. O
que mudou é a tela saber mostrar uma área de 3 seções em vez de 4 — e dizer isso ao visitante, em
texto derivado dos dados, com a explicação de que não é falha de carregamento.

O `transleitor9` **não** tem esse defeito: lá a leitura é `?.groups || []` e a lista de seções vem de
`Object.entries(cfg.secoes)`, então a seção ausente simplesmente não existe. É defeito de
portabilidade, nascido na demonstração.

**Controle negativo do conserto:** a lógica antiga, transcrita palavra por palavra, reproduz o erro
do navegador em **1 de 11 áreas** — Pediatria — e em nenhuma outra. Sem isso, "consertado" poderia
ser só "não consegui reproduzir".

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
    demo/                      as quinze telas demonstradas
testes/
  conferir.mjs                 conferências estáticas
  conferir-no-ar.mjs           confere o que está NO AR
  servir-dist.mjs              serve dist/ imitando o host (rewrite + cache dos assets)
  smoke/entrada.jsx            prova de renderização das 19 telas
ferramentas/
  gerar-icones-oren.py         recorta o PNG da marca e gera o conjunto de ícones
public/
  oren-ai-*.png                ícones da marca — GERADOS, não editar à mão
```

### As quinze telas

| Rota | Tela |
|---|---|
| `/demo/mapa` | **Mapa do aplicativo** — as 34 rotas reais, com o que cada uma faz |
| `/demo/menu` | Menu — a central do plantão (escolher o ambiente) |
| `/demo/evolucao` | Evolução SOAP com o painel de sinais da especialidade |
| `/demo/captura` | Captura de laudo/exame por foto ou PDF |
| `/demo/imagem` | Análise de imagem médica em cinco seções |
| `/demo/cirurgia` | Descrição cirúrgica e conferência do registro |
| `/demo/passagem` | Passagem de visita por leito |
| `/demo/especialidades` | Painel por especialidade |
| `/demo/elio` | Ellah, a assistente clínica |
| `/demo/monitoramento` | Uso e trilha de IA |
| `/demo/direitos` | Direitos do titular |
| `/demo/seguranca` | Auditor de segurança |
| `/demo/conformidade` | **Conformidade e critérios** — normativas, artigos da LGPD e o que o app se recusa a afirmar |
| `/demo/minha-llm` | **Use a sua própria chave de IA** — módulo novo do aplicativo |
| `/demo/integracoes` | **Integração com a instituição** — módulo novo, genérico, envio desligado |

### O mapa do aplicativo, e por que ele é honesto

A demonstração cobre **14 das 34 rotas** do aplicativo. O mapa (`/demo/mapa`) lista **todas**, e cada
linha diz uma de duas coisas: *tem demonstração* (com o link) ou **não demonstrada**. A barra de
cobertura diz 41%.

**Um módulo fica FORA dessa conta, de propósito:** `Conformidade e critérios` é documentação do
produto, não tela do aplicativo. Somá-lo faria a porcentagem parecer maior do que é — e o mapa diz
isso, em vez de inflar o número.

### Conformidade e critérios — a tela que quase nenhum produto mostra

`/demo/conformidade` foi montada a partir de outra pesquisa no aplicativo, e a tela é **auditável**:
o bloco de Fontes, no fim, lista os arquivos de origem de cada afirmação, e a tabela de artigos da
LGPD diz onde cada um é implementado.

**O campo "Onde vive" saiu dos cartões de Normativas** (pedido do Dr. Claudio, 22/09/2026). Ele
mostrava o caminho do arquivo dentro do aplicativo — detalhe de implementação, que numa página de
apresentação não ajuda quem lê. O **dado continua** em `src/data/conformidade.js`; o que saiu foi só
a exibição. O bloco de Fontes e a coluna "Onde o aplicativo implementa" da tabela de LGPD **não**
foram tocados — são eles que sustentam a auditabilidade —, e a §14 do `conferir.mjs` reprova tanto o
retorno do rótulo quanto a remoção desses dois por arrasto.

| Bloco | O que traz |
|---|---|
| **Normativas** | Res. CFM 1.638/2002 (documento com data, hora, identificação e CRM), Res. CFM 1.821/2007 (guarda de 20 anos), LGPD arts. 33–36, Res. CD/ANPD 19/2024, 18/2024 e 15/2024 — cada uma com o que **exige**, o que o app **faz** e qual é a **trava** em código |
| **Critérios oferecidos** | EVA, Glasgow e IPSS entram como **item que o médico registra** — o aplicativo não calcula escore nem interpreta |
| **Critérios recusados** | **12 famílias** (Lung-RADS, BI-RADS, PI-RADS, LI-RADS, TI-RADS, CAD-RADS, NI-RADS, O-RADS, Bosniak, Fleischner, Bethesda, C-RADS) que o aplicativo **se recusa a nomear** sem trecho de fonte conferida — e o fato medido: **a base está vazia (0 registros), então hoje o laudo sai sem classificar, de propósito** |
| **Artigos da LGPD** | 16 artigos, cada um com a funcionalidade que o implementa |
| **Fontes** | A lista dos arquivos de onde saiu cada afirmação, para a tela poder ser **auditada** |

**Uma norma ficou de fora, e é um acerto:** a **Res. CFM 1.331/89 não aparece como vigente** — o
parecer do próprio aplicativo registra que ela foi **revogada** pela 1.638/2002. A regra deste
projeto é não inventar exigência; listar uma norma revogada como se valesse seria inventar.

> **Isto não é parecer jurídico.** A tela é a leitura que eu fiz do aplicativo, com o arquivo de
> origem de cada item — e é a própria tela que diz isso.

**A lista é lida do aplicativo, não escrita de memória:** as rotas vêm do roteador (`App.jsx`), e os
números — **24 páginas, 34 rotas, 35 entidades, 17 funções de backend** — da contagem dos arquivos.
É por isso que o mapa inclui uma tela que existe no código mas **não tem rota** (`OAuthConsent`, do
provedor de identidade): esconder isso seria maquiar o inventário.

`conferir.mjs` **reprova link morto** no mapa: todo `demo:` tem de apontar para uma tela que existe.

### Os dois módulos novos do aplicativo (22/09/2026)

| Módulo | O que ele faz | O que ele **não** faz |
|---|---|---|
| **Use a sua própria chave de IA** (`/minha-llm`) | O profissional cadastra a chave do provedor que ele já paga e usa sem gastar os créditos da plataforma — no texto e na leitura de imagem. Entidade própria com acesso **por dono do registro** | Não promete qual modelo é melhor: a lista é a que **o provedor** devolve para aquela chave. E avisa, na tela, que o texto clínico vai para o provedor escolhido — **transferência internacional é decisão do médico** |
| **Integração com a instituição** (`/integracoes`) | Cadastra destino, credencial e **dialeto** (`json`, `hl7v2`, `fhir`, `soap`, `arquivo`). Genérico de propósito — o teste do aplicativo **reprova citar fornecedor** na tela, e aqui também. Só administrador. Valida o endereço em código: **só https**, sem credencial na URL, sem loopback nem rede interna | **O envio não está ligado** — e a tela diz isso em letra grande. Falta a confirmação do Encarregado (DPO) sobre a base legal. **Só o dialeto JSON está implementado**; os outros aparecem na lista marcados como "não implementado", porque marcar HL7 como pronto sem implementar seria a mentira mais fácil da tela. A credencial é o **nome de um segredo** (ponteiro, nunca o valor), e a conferência do conteúdo **proíbe o nome do paciente**, permitindo o do profissional |

> **Por que o exemplo medido (Tasy) aparece no README e não na tela:** o aplicativo tem teste que
> reprova citar fornecedor na interface — nome de fornecedor no produto envelhece, exclui os outros e
> transforma decisão de arquitetura em preferência comercial. `conferir.mjs` **reprova** se um nome de
> fornecedor voltar para `DemoIntegracoes.jsx`, e tem controle negativo: o comentário que explica a
> regra **pode** citar (e cita), porque comentário não é tela.

Os dois entraram na demonstração no mesmo dia em que foram encontrados na pesquisa — a demonstração
estava desatualizada em relação ao aplicativo, e isso é o tipo de coisa que envelhece calada.

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

**No ar em https://orenai.med.br** — o endereço próprio da marca. `https://www.orenai.med.br`
redireciona para o apex (308), e o HTTP redireciona para HTTPS (308). O endereço antigo,
`https://transleitor-demo.vercel.app`, continua funcionando e serve exatamente a mesma coisa.

O arquivo `vercel.json` já resolve tudo o que o Vercel precisa saber:

| Configuração | Por quê |
|---|---|
| `rewrites: /(.*) → /index.html` | Rota do React no cliente. Sem isto, um F5 em `/demo/evolucao` daria 404. No Vercel isto **substitui** o truque do `404.html`, que é do Pages. |
| `outputDirectory: dist` | Saída do Vite. |
| `framework: vite` | Detecção explícita, em vez de depender do palpite da plataforma. |
| `Cache-Control` imutável em `/assets/` | O nome do arquivo tem hash do conteúdo: se mudar, muda o nome. Segurar em cache é seguro. |
| `buildCommand` com as verificações | O deploy **não publica código não conferido**: lint, 1177 asserções e prova de renderização rodam antes do build. |

**No Vercel o site fica na raiz**, então `VITE_BASE_PATH` **não** deve ser definida (o padrão do
`vite.config.js` é `/`).

#### O domínio próprio: `orenai.med.br`

Registrado no Registro.br, com a zona editada **lá mesmo** — o domínio usa os servidores do
Registro.br, não os do Vercel. Trocar os nameservers para `ns1`/`ns2.vercel-dns.com` **é recusado**
(`Pesquisa recusada`): o Vercel atende o domínio, mas não hospeda zona para ele, e a validação do
Registro.br consulta o servidor antes de aceitar a troca.

Três registros na zona, e **nenhum deles é dispensável**:

| Tipo | Nome | Dados | Por quê |
|---|---|---|---|
| `A` | *(vazio)* | `76.76.21.21` | O apex. |
| `CNAME` | `www` | `cname.vercel-dns.com` | O `www`. |
| `TXT` | *(vazio)* | `v=spf1 -all` | Ninguém envia e-mail por este domínio. Sem isto, qualquer um pode falsificar `@orenai.med.br`. |

**Duas armadilhas do editor de zona do Registro.br, as duas medidas na prática:**

1. **O campo Nome recusa `@`.** A própria tela avisa que não aceita `@`, `*` nem entrada SRV. O apex
   se escreve com o campo **vazio**; o subdomínio, com o nome sem o domínio (`www`).
2. **O editor recusa MX nulo.** `servidor ., prioridade 0` é a forma correta de declarar "este domínio
   não recebe e-mail" no protocolo DNS, mas o formulário exige um nome de servidor de verdade:
   *"O valor servidor ., prioridade 0 dos dados do record é inválido"*. E o erro **bloqueia o
   salvamento da zona inteira**, não só daquela linha — enquanto ela estiver lá, nenhum registro
   sobe. O `TXT v=spf1 -all` cobre o efeito prático.

**E uma armadilha do Vercel, que custou mais tempo:** o certificado do apex não saiu sozinho. O
domínio estava `verified: true` e `misconfigured: false`, com o DNS correto, e mesmo assim nenhum
certificado — enquanto o `www`, anexado minutos antes, recebeu o dele em cerca de 2 minutos. O
pedido do apex era **velho** (feito quando o DNS ainda não apontava para o Vercel) e a plataforma não
refaz na hora. O conserto é forçar um pedido novo, e **a ordem importa**:

1. soltar o redirecionamento do `www` — o Vercel recusa remover um domínio que é alvo de
   redirecionamento (`domain_is_redirect`);
2. remover e reanexar o apex (isto dispara o pedido limpo);
3. repor o redirecionamento do `www` para o apex (308).

O certificado novo saiu em menos de 2 minutos. Sem o passo 1, o passo 2 falha.

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

`node testes/conferir-no-ar.mjs https://orenai.med.br` → **0 falhas**:

| Conferência | Resultado |
|---|---|
| `GET /` | HTTP 200, é o nosso `index.html` |
| Bundle que **a página servida** referencia | `/assets/index-A3ERaZbO.js`, 545.555 bytes — **mesmo hash do build conferido localmente** |
| Marcas de texto de tela no bundle baixado | **18/18** |
| Ícone da marca servido | `/oren-ai-192.png` → 200, `image/png`, 47.032 bytes, **sha256 idêntico ao arquivo local** (`c3dac23ee203ac80…`) |
| `Cache-Control` dos assets | `public, max-age=31536000, immutable` |
| `GET /demo/menu`, `/demo/evolucao`, `/demo/cirurgia`, `/demo/seguranca` | HTTP 200, devolvem o app (rewrite funcionando) |
| `base44` e chave de serviço no bundle servido | ausentes |
| Controle negativo do conferidor | reprova marca inexistente |

Certificado Let's Encrypt emitido para `orenai.med.br` e para `www.orenai.med.br` (válidos até
22/12/2026), com a cadeia de redirecionamento fechada: `http://` → `https://` → apex, tudo 308 e sem
laço.

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

- **Não verificado em navegador.** O que está provado é: lint sem erros, 1177 asserções de
  conferência, renderização das 19 telas + das 12 áreas nas 2 telas de painel (23 renders, 224 marcas
  de texto) e build `exit 0`. A aparência na tela (layout, toque no iPad, comportamento de rolagem)
  não foi medida: não há navegador no ambiente onde isto foi construído.
- **Só um caminho de clique está provado.** O smoke renderiza cada tela no estado inicial e, agora,
  cada área do seletor de especialidade — foi assim que o crash de Pediatria apareceu e foi
  consertado. Os OUTROS cliques (marcar um item do painel, trocar de aba, abrir um `<details>`) não
  são simulados: um defeito que só apareça depois deles continua invisível para a prova.
- **A demonstração não demonstra o aplicativo funcionando.** Ela mostra o formato das telas e o
  fluxo. Nenhuma IA é chamada, nenhum cálculo é feito, nenhum arquivo é lido.
- **Os números do monitoramento são de exemplo.** Servem para mostrar o que a trilha registra — não
  são medições reais de uso.
