# 🚀 Hub de Ferramentas Universitárias

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-green)
![Licença](https://img.shields.io/badge/License-MIT-blue)
![Contribuições](https://img.shields.io/badge/Contribuições-Bem_Vindas-brightgreen)
[![CI](https://github.com/AnneS006/hub-google-embaixadores/actions/workflows/ci.yml/badge.svg)](https://github.com/AnneS006/hub-google-embaixadores/actions/workflows/ci.yml)
[![Links](https://github.com/AnneS006/hub-google-embaixadores/actions/workflows/link-checker.yml/badge.svg)](https://github.com/AnneS006/hub-google-embaixadores/actions/workflows/link-checker.yml)
[![Deploy](https://github.com/AnneS006/hub-google-embaixadores/actions/workflows/deploy.yml/badge.svg)](https://github.com/AnneS006/hub-google-embaixadores/actions/workflows/deploy.yml)

Bem-vindo ao **Hub de Ferramentas Universitárias**! 🎓💻

Este é um repositório colaborativo e open-source criado para mapear, centralizar e manter atualizadas as melhores licenças, créditos em nuvem (Cloud) e ferramentas de produtividade gratuitas para estudantes.

O mundo da tecnologia muda rápido e os benefícios estudantis também. A ideia aqui é fugir de "PDFs estáticos" e usar o poder da comunidade para garantir que nenhum aluno deixe de construir projetos incríveis (TCCs, MVPs, Hackathons) por falta de acesso a infraestrutura e licenças de ponta.

### 🌐 [Acesse o site do Hub](https://annes006.github.io/hub-google-embaixadores/)

## 🛠️ O que mapeamos aqui?

- **☁️ Cloud & Infraestrutura:** Créditos acadêmicos, hospedagem e serviços de BaaS (Firebase, Supabase, Google Cloud).
- **⚙️ Dev Tools & CI/CD:** O ecossistema do GitHub Student Developer Pack e ferramentas de automação.
- **🤖 Inteligência Artificial:** Acessos e cotas para APIs (Gemini, Anthropic) para integração em projetos acadêmicos.
- **📊 Gestão & Design:** Licenças educacionais de design de interfaces (Figma, Canva) e organização (Notion, GitHub Projects).

## 📂 Navegue pelos Benefícios

Cada página é dividida em **🟢 Nível 1 (iniciante)**, **🟡 Nível 2 (intermediário)** e **🔴 Nível 3 (avançado)** — veja as [trilhas de aprendizado](content/guias/niveis-e-trilhas.md).

| Categoria | Páginas |
| --- | --- |
| 🧭 [Guias e Trilhas](content/guias) | [Níveis e trilhas](content/guias/niveis-e-trilhas.md) · [Stack para hackathon](content/guias/stack-gratuita-hackathon.md) · [Segurança de chaves](content/guias/seguranca-de-chaves-e-segredos.md) |
| ☁️ [Cloud e BaaS](content/cloud-e-baas) | [Firebase](content/cloud-e-baas/firebase.md) · [Supabase](content/cloud-e-baas/supabase.md) · [Firebase ou Supabase?](content/cloud-e-baas/firebase-supabase.md) · [Google Cloud](content/cloud-e-baas/google-cloud.md) · [Hospedagem gratuita](content/cloud-e-baas/hospedagem-gratuita.md) |
| ⚙️ [Dev Tools](content/dev-tools) | [GitHub Student Pack](content/dev-tools/github-student-pack.md) · [GitHub Copilot](content/dev-tools/github-copilot.md) · [GitHub Actions](content/dev-tools/github-actions.md) · [Git essencial](content/dev-tools/git-essencial.md) |
| 🤖 [APIs de IA](content/apis-de-ia) | [Gemini API](content/apis-de-ia/gemini-api.md) · [Claude API](content/apis-de-ia/claude-api.md) · [Boas práticas com IA](content/apis-de-ia/boas-praticas-ia.md) |
| 📊 [Gestão e Design](content/gestao-e-design) | [Figma](content/gestao-e-design/figma.md) · [Notion](content/gestao-e-design/notion.md) · [Canva](content/gestao-e-design/canva.md) · [GitHub Projects](content/gestao-e-design/github-projects.md) |

## 🏗️ Como o projeto funciona

Todo o conteúdo fica em Markdown na pasta [`content/`](content). A partir dela, um site estático é gerado com **Next.js 15** e publicado automaticamente no **GitHub Pages** a cada merge na `main`.

```
content/          ← páginas em Markdown (cada pasta vira uma seção do site)
src/              ← código do site: Next.js (App Router, SSG) + Tailwind CSS
.github/
├── ISSUE_TEMPLATE/   ← formulários para sugerir ferramentas e reportar mudanças
└── workflows/        ← CI (lint + build), verificador de links e deploy
```

- **Barra lateral automática** a partir das pastas de `content/`.
- **Tema claro/escuro** e layout responsivo com menu no celular.
- **"Editar no GitHub"** em cada página, para facilitar contribuições.
- **API pública** em [`/api/tools.json`](https://annes006.github.io/hub-google-embaixadores/api/tools.json) com a lista de ferramentas em JSON.
- **Verificação de links** em todo PR e toda semana, porque benefícios mudam.

Para rodar localmente:

```bash
npm install
npm run dev   # http://localhost:3000
```

## 🤝 Como contribuir

Este é um projeto **vivo**. Descobriu que a regra de acesso ao GitHub Pack mudou? Encontrou uma nova plataforma que liberou plano Pro para universitários?

- Sem programar: abra uma [issue](https://github.com/AnneS006/hub-google-embaixadores/issues/new/choose) com a sugestão ou a mudança.
- Com um PR: leia o [Guia de Contribuição](CONTRIBUTING.md) — ele tem o modelo de página e o passo a passo.

Ao participar, você concorda com o nosso [Código de Conduta](CODE_OF_CONDUCT.md).

## 🗺️ Roadmap

- [x] Estruturação base em Markdown e organização de pastas.
- [x] Templates de issue e pull request, guia de contribuição e código de conduta.
- [x] CI/CD: build, verificação de links e deploy automáticos com GitHub Actions.
- [x] Site estático em **Next.js** gerado a partir dos arquivos `.md`.
- [x] API pública (`/api/tools.json`) com os dados em JSON.
- [x] Conteúdo em três níveis (iniciante, intermediário, avançado) e trilhas de aprendizado.
- [x] Páginas de **APIs de IA** (Gemini, Claude) e **Gestão e Design** (Figma, Notion, Canva, GitHub Projects).
- [x] Índice "Nesta página" nas páginas longas.
- [ ] Páginas de gestão ágil com planos estudantis (Monday.com, ClickUp, Trello) — [contribua!](https://github.com/AnneS006/hub-google-embaixadores/issues/new/choose)
- [ ] Busca de ferramentas no site.
- [ ] Filtros por tipo de requisito (e-mail institucional, carteirinha, sem verificação).

## 📄 Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE).

---
💡 *Iniciativa nascida durante a Semana 6 do programa Embaixadores Estudantis do Google.*
