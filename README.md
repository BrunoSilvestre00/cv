# Currículo — Bruno Ap. Silvestre

Currículo pessoal como site estático: bilíngue (PT/EN), com tema claro e escuro,
e uma saída em PDF pensada para ser lida na tela — texto selecionável e links
clicáveis, não uma imagem.

**No ar:** https://brunosilvestre00.github.io/cv/

Sem build, sem dependências, sem framework. Três arquivos de código e nenhuma
etapa de compilação: dá para abrir o `index.html` direto no navegador.

---

## Como rodar

```bash
# qualquer servidor estático serve
python -m http.server 5500
# ou a extensão Live Server do VS Code
```

Abrir `file://` também funciona — o `i18n.js` expõe as traduções em
`window.translations` justamente para não depender de `fetch` e cair em CORS.

---

## Estrutura

```
index.html        estrutura + texto em português (ver "fallback" abaixo)
css/style.css     design tokens, temas, layout de tela
css/print.css     layout de impressão — deliberadamente diferente do de tela
js/i18n.js        todo o texto, em PT e EN
js/main.js        idade, tema, i18n, regra de @page
assets/img/       bandeiras do seletor de idioma
```

---

## Editando o conteúdo

`js/i18n.js` é a fonte de verdade dos textos. As árvores `pt` e `en` precisam
ser **idênticas chave por chave** — quando falta uma, o `main.js` imprime o
caminho da chave na página, o que é feio mas visível de propósito.

Três atributos ligam o HTML às traduções:

| atributo | efeito | quando usar |
|---|---|---|
| `data-i18n` | `textContent` | texto puro |
| `data-i18n-html` | `innerHTML` | texto com `<strong>` ou `<span>` inline |
| `data-i18n-aria` | `aria-label` | rótulos acessíveis |

`data-i18n-html` usa `innerHTML`: só para strings escritas neste repositório,
nunca para entrada de usuário.

### O fallback em português (não remova)

Todo elemento com `data-i18n` carrega **também** seu texto em português inline
no `index.html`. O `main.js` sobrescreve no load, então na prática você nunca vê
esse texto — mas sem ele qualquer leitor que não execute JavaScript (parte dos
ATS, scrapers, `curl`, preview de link em rede social) receberia um currículo
com títulos de seção e nada dentro.

O custo é que cada string PT existe em dois lugares. **Ao editar um texto em
português, edite nos dois** — `js/i18n.js` e `index.html`.

### Números que envelhecem sozinhos

Nada de tempo decorrido é escrito à mão. `{experienceYears}` é substituído em
tempo de renderização a partir de `CAREER_START` no `main.js`, e a idade sai de
`BIRTHDATE`. Para adicionar outro número derivado, inclua a chave em
`i18nVars()` e use `{nome}` no texto.

---

## Temas

O tema escuro é a base (`:root`); o claro **sobrescreve apenas os tokens**
(`:root[data-theme="light"]`) — nenhuma regra de componente é duplicada. Por
isso o PDF acompanha o tema de graça: todas as cores resolvem pelos mesmos
tokens.

Detalhes que importam:

- O tema é resolvido por um script inline no `<head>`, antes da primeira
  pintura. O `main.js` carrega no fim do `<body>` e piscaria o tema errado.
- A preferência do sistema vale como padrão; uma escolha explícita no botão
  passa a vencer para sempre (`localStorage`).
- No claro, o azul de acento é mais escuro (`#1e46b8`). O `#4f7ef7` do escuro
  só atinge ~3.3:1 contra branco, insuficiente para os títulos pequenos em
  caixa alta.

---

## O PDF

O layout de impressão é **propositalmente diferente** do de tela.

**Coluna única.** O grid "sidebar + conteúdo" não pagina: quando os cards da
sidebar acabam, toda página seguinte carrega uma coluna esquerda vazia. No
print, `display: contents` dissolve os dois containers, cada card vira item
direto do flex e recebe uma `order` própria. De quebra, o texto em largura total
ocupa menos linhas — as tags de skill caem de 623px para ~254px.

**Quebras.** `break-inside: avoid` em tudo faz o oposto do esperado: empurra
para a página seguinte qualquer bloco que não caiba inteiro e deixa o buraco
atrás. Aqui os containers fluem e só os átomos são protegidos — cada `.entry`,
cada bullet, cada linha de tags — com `break-after: avoid` nos títulos e
`orphans`/`widows`. A entrada da DIO é exceção explícita: passa de meia página,
então divide entre os bullets.

**O que fica fora.** Os dois parágrafos de resumo da dissertação
(`.entry-note.abstract`) são escondidos no print — a entrada já linka o
documento completo, e eles eram o que empurrava para uma terceira página quase
vazia. Seguem no site; a regra é uma só e está comentada no `print.css`.

**Margem por tema.** `@page` não participa do cascade de elementos, então
`[data-theme]` nunca consegue selecioná-lo. O `main.js` injeta a regra: `12mm`
no claro (branco sobre branco, invisível) e `0` no escuro, para o fundo escuro
sangrar até a borda em vez de ganhar uma moldura branca.

### ⚠️ Salvando o PDF

No diálogo de impressão, o destino precisa ser **"Salvar como PDF"** — a opção
nativa do Chrome.

Se você escolher **"Microsoft Print to PDF"** (ou "Imprimir usando caixa de
diálogo do sistema"), o arquivo sai como uma imagem chapada: sem seleção de
texto e sem links clicáveis. Isso é o driver de impressão do Windows
rasterizando a página, e nenhum CSS aqui pode evitar.

---

## Verificando uma alteração

Dá para gerar o PDF pelo mesmo motor do "Salvar como PDF" e inspecionar o
resultado, sem abrir diálogo nenhum:

```bash
chrome --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="cv.pdf" "http://127.0.0.1:5500/index.html"
```

E conferir que continua sendo texto de verdade:

```bash
grep -aoE "/Type[ ]*/Font"    cv.pdf | wc -l   # > 0  → texto vetorial
grep -aoE "/Subtype[ ]*/Image" cv.pdf | wc -l  # = 0  → nada rasterizado
grep -aoE "/Subtype[ ]*/Link"  cv.pdf | wc -l  # > 0  → links clicáveis
grep -aoE "/Count [0-9]+"      cv.pdf | head -1 # número de páginas
```

Estado atual: 2 páginas, 56 objetos de fonte, **0 imagens**, 17 links.
O tema claro está com 98% de aproveitamento de página (2023px de 2064), ou seja
no teto — a próxima adição de conteúdo empurra para uma terceira página.
