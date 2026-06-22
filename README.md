# Nortia — Landing page

Landing page single-page, estática e responsiva para validar demanda da **Nortia** —
serviço de conciliação fiscal "feito-pra-você" para escritórios de contabilidade.

Stack: **HTML + CSS + JavaScript puro** (sem framework, sem build). É só abrir e usar.

```
landing-page/
├── index.html     → estrutura e textos (a copy mora aqui)
├── styles.css     → identidade visual (cores, tipografia, espaçamento)
├── script.js      → nome da marca + animações
├── favicon.svg    → símbolo da bússola
└── README.md      → este arquivo
```

---

## (a) Como rodar / visualizar localmente

A página é estática, então há duas formas:

**Forma rápida:** dê dois cliques em `index.html` para abrir no navegador.

**Forma recomendada** (evita qualquer bloqueio de arquivos locais) — suba um servidor
local. Dentro da pasta do projeto, rode **um** destes comandos:

```bash
# Se tiver Python instalado (já vem no Mac/Linux):
python3 -m http.server 8000

# Ou, se tiver Node.js:
npx serve
```

Depois abra no navegador: **http://localhost:8000**

---

## (b) Onde editar (os pontos que você vai mexer)

Todos os pontos de edição estão marcados no código com comentários `<!-- EDITAR: ... -->`.

### 1. Trocar o link do formulário
O formulário do **Google Forms** já está integrado. Hoje os botões apontam para:

```
https://docs.google.com/forms/d/e/1FAIpQLScPJijE1CZrWSDbSmMruF56O_ziNYkAtK6cnlusNtegjIzhUQ/viewform
```

Para usar outro formulário no futuro, faça um "localizar e substituir" dessa URL em
`index.html` pela nova. São **3 links** (hero, CTA final e rodapé), todos abrindo em nova aba.

> As perguntas sugeridas para o formulário de qualificação estão anotadas como
> comentário dentro do `index.html`, logo acima da Seção 9 (CTA final).

### 2. Adicionar as dores reais (Seção 2 — a mais importante)
Em `index.html`, procure por:

```
ADICIONAR DOR REAL DO oHub AQUI
```

Lá tem um **modelo de card** pronto, comentado. Copie o bloco `<article class="pain-card">…</article>`,
cole e troque só o texto dentro do `<p>` pelas dores reais pescadas no oHub e em grupos de contador.
Cada card vira automaticamente um quadradinho com ícone, alinhado ao restante.

### 3. Trocar o nome da marca (se "Nortia" mudar)
O nome **não está escrito solto** em lugar nenhum. Ele vive numa **constante única**.
Abra `script.js` e troque **apenas esta linha** (no topo):

```js
const BRAND_NAME = "Nortia";
```

Isso atualiza o logo, o título da aba e todos os textos de uma vez.
(O símbolo da bússola e as cores ficam em `styles.css` / `favicon.svg`.)

### 4. Ajustar cores ou fontes
Tudo no topo de `styles.css`, no bloco `:root` (variáveis CSS). Trocar uma cor ali
reflete na página inteira.

---

## (c) Como publicar de graça

Qualquer uma das opções abaixo hospeda o site sem custo. **Netlify (arrastar e soltar)**
é o caminho mais simples se você não usa Git.

### Opção 1 — Netlify (mais fácil, sem terminal)
1. Crie uma conta em **app.netlify.com**.
2. Vá em **Add new site → Deploy manually**.
3. **Arraste a pasta inteira** do projeto para a área indicada.
4. Pronto — o site fica no ar em segundos, com um endereço tipo `seu-site.netlify.app`.
5. Para usar um domínio próprio (ex.: `getnortia.ai`), vá em **Domain settings**.

### Opção 2 — Vercel
1. Crie uma conta em **vercel.com** (pode logar com o GitHub).
2. **Import** o repositório (ou use o `vercel` CLI: `npm i -g vercel` e rode `vercel`).
3. Como é site estático, é só confirmar — sem configuração de build.

### Opção 3 — GitHub Pages
1. Suba este projeto para um repositório no GitHub.
2. No repositório: **Settings → Pages**.
3. Em **Source**, escolha a branch (ex.: `main`) e a pasta **/ (root)**.
4. Salve. Em ~1 min o site fica em `https://SEU-USUARIO.github.io/REPO/`.

> Dica: para domínio próprio (`getnortia.ai` / `nortia.ai` / `usenortia.com`),
> qualquer uma das três opções permite apontar o domínio depois. Compre o domínio
> num registrador (ex.: Registro.br, Namecheap) e siga o passo de "custom domain"
> da plataforma escolhida.
