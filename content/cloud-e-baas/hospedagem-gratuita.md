---
description: Onde publicar seu site ou app de graça — GitHub Pages, Vercel, Cloudflare Pages e Firebase Hosting comparados, com passo a passo e domínio próprio.
order: 5
---

# 🌐 Hospedagem Gratuita

Todo projeto de faculdade fica melhor com um link que o professor, o júri do hackathon ou um recrutador consegue abrir. Esta página compara os principais serviços gratuitos para colocar um site no ar.

> Limites conferidos em setembro de 2026 nas páginas oficiais de cada serviço (links no fim da página).

## 🟢 Nível 1 — Site estático ou app com servidor?

- **Site estático:** só HTML, CSS, JavaScript e imagens prontos. Portfólios, documentação (como este Hub!) e apps React que falam direto com Firebase/Supabase. **Qualquer serviço da tabela abaixo serve.**
- **App com servidor:** precisa executar código a cada acesso — rotas de API, renderização no servidor, chamadas a APIs de IA com chave secreta. Use **Vercel** ou **Cloudflare**, ou um container no [Cloud Run](google-cloud.md).

## 🟡 Nível 2 — Comparação

| | GitHub Pages | Vercel (Hobby) | Cloudflare Pages (Free) | Firebase Hosting (Spark) |
| --- | --- | --- | --- | --- |
| Tipo | Só estático | Estático + funções | Estático + funções | Estático (funções exigem Blaze) |
| Transferência | 100 GB/mês (limite flexível) | 100 GB/mês | Não informado como limite | 360 MB/dia |
| Builds | 10 por hora (limite flexível) | 100 deploys/dia | 500 builds/mês | — (o build é feito por você ou pelo CI) |
| Tamanho | Site de até 1 GB | 200 projetos | Até 20 mil arquivos, 25 MiB cada | 10 GB armazenados |
| Uso comercial | ❌ Não pode ser loja/SaaS | ❌ Só uso pessoal, não comercial | ✅ Permitido | ✅ Permitido |
| Preview por PR | Não nativo | ✅ Automático | ✅ Automático | ✅ Via GitHub Action |
| Domínio próprio | ✅ | ✅ | ✅ | ✅ |

**Resumo:** portfólio e documentação → **GitHub Pages**. App Next.js com rotas de API → **Vercel**. Já usa Firebase → **Firebase Hosting**. Precisa de muita transferência ou uso comercial → **Cloudflare Pages**.

### GitHub Pages em 3 minutos (site estático simples)

1. Crie um repositório chamado `seu-usuario.github.io` com um `index.html`.
2. Em **Settings → Pages**, escolha **Deploy from a branch** e a branch `main`.
3. Pronto: o site fica em `https://seu-usuario.github.io`.

### Vercel com Next.js

1. Entre em [vercel.com](https://vercel.com/) com o GitHub e clique em **Add New → Project**.
2. Importe o repositório. A Vercel detecta o Next.js sozinha.
3. Cadastre as variáveis de ambiente (chaves secretas) na tela de configuração — nunca no código.
4. Cada push na `main` publica em produção; cada PR ganha um link de preview.

## 🔴 Nível 3 — Deploy por GitHub Actions e domínio próprio

### GitHub Pages com build (React, Next.js, Vite)

Para sites que precisam de `npm run build`, publique pelo GitHub Actions — é exatamente o que este Hub faz. O workflow resumido:

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }   # pasta gerada pelo build (dist no Vite)
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Depois, em **Settings → Pages → Source**, escolha **GitHub Actions**.

> 💡 Em sites de projeto (`usuario.github.io/repositorio`), o app precisa saber que mora num subcaminho. No Next.js, configure `basePath`; no Vite, `base`.

### Domínio próprio de graça

O [GitHub Student Developer Pack](../dev-tools/github-student-pack.md) inclui um domínio `.me` (Namecheap) e um `.tech` gratuitos por 1 ano. Para apontar:

1. No serviço de hospedagem, adicione o domínio (por exemplo, `www.seunome.me`).
2. No painel do registrador, crie o registro DNS que o serviço pedir — normalmente um `CNAME` de `www` para o endereço do site.
3. Espere a propagação do DNS e ative o **HTTPS** (todos os serviços da tabela emitem o certificado sozinhos).

> ⚠️ O domínio é gratuito só no primeiro ano. Anote a data de renovação ou o endereço pode ser comprado por outra pessoa.

## 🔗 Links oficiais

- [Limites do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Plano Hobby da Vercel](https://vercel.com/docs/plans/hobby)
- [Limites do Cloudflare Pages](https://developers.cloudflare.com/pages/platform/limits/)
- [Preços do Firebase](https://firebase.google.com/pricing)
