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
- **📊 Gestão & Design:** Licenças educacionais de plataformas de gestão ágil (Monday.com, ClickUp) e design de interfaces (Canva).

## 📂 Navegue pelos Benefícios

| Categoria | Páginas |
| --- | --- |
| ☁️ [Cloud e BaaS](content/cloud-e-baas) | [Firebase e Supabase](content/cloud-e-baas/firebase-supabase.md) |
| ⚙️ [Dev Tools](content/dev-tools) | [GitHub Student Developer Pack](content/dev-tools/github-student-pack.md) |
| 🤖 APIs de IA | Em breve — [sugira uma ferramenta](https://github.com/AnneS006/hub-google-embaixadores/issues/new/choose) |
| 📊 Gestão e Design | Em breve — [sugira uma ferramenta](https://github.com/AnneS006/hub-google-embaixadores/issues/new/choose) |

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
- [ ] Páginas de **APIs de IA** (Gemini, Anthropic) e **Gestão e Design** (Canva, Monday.com, ClickUp).
- [ ] Busca de ferramentas no site.
- [ ] Filtros por tipo de requisito (e-mail institucional, carteirinha, sem verificação).

## 📄 Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE).

---
💡 *Iniciativa nascida durante a Semana 6 do programa Embaixadores Estudantis do Google.*
