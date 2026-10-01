---
description: Como funcionam os níveis 1, 2 e 3 do Hub e três trilhas de estudo prontas, do primeiro repositório ao deploy com CI/CD.
order: 1
---

# 🧭 Níveis e Trilhas de Aprendizado

Todas as páginas de ferramentas do Hub são divididas em **três níveis**. Assim, quem está no primeiro semestre e quem já faz estágio em desenvolvimento conseguem usar a mesma página — cada um lê até onde faz sentido.

| Nível | Para quem | O que você encontra |
| --- | --- | --- |
| 🟢 **Nível 1 — Iniciante** | Nunca usou a ferramenta | O que é, para que serve, como conseguir o benefício e os conceitos básicos |
| 🟡 **Nível 2 — Intermediário** | Já criou uma conta e quer construir algo | Passo a passo com código, comandos de terminal e um projeto pequeno |
| 🔴 **Nível 3 — Avançado** | Vai colocar um projeto no ar para outras pessoas | Segurança, custos, automação, arquitetura e boas práticas de produção |

> 💡 **Dica:** não precisa terminar o Nível 3 de uma ferramenta para começar outra. O mais produtivo é fazer o Nível 1 de várias, escolher uma stack e só então aprofundar.

## 🟢 Trilha 1 — Primeiros passos (1 a 2 semanas)

Objetivo: ter um GitHub organizado, as licenças estudantis ativas e um primeiro projeto publicado.

1. **Verifique seu status de estudante** no [GitHub Student Developer Pack](../dev-tools/github-student-pack.md). A aprovação pode levar dias, então comece por aqui.
2. **Aprenda o básico de Git** com o guia [Git essencial](../dev-tools/git-essencial.md): `clone`, `add`, `commit`, `push` e branches.
3. **Organize seus estudos** no [Notion](../gestao-e-design/notion.md) com o plano educacional gratuito.
4. **Desenhe uma tela** no [Figma](../gestao-e-design/figma.md) antes de programar.
5. **Publique uma página estática** (um portfólio simples) no GitHub Pages — veja [Hospedagem gratuita](../cloud-e-baas/hospedagem-gratuita.md).

**Você terminou a trilha quando:** tem um repositório público com README, pelo menos 5 commits com mensagens claras e um link de site funcionando.

## 🟡 Trilha 2 — Construindo um app full stack (3 a 4 semanas)

Objetivo: um app com login, banco de dados e deploy automático.

1. **Escolha o backend** lendo a comparação [Firebase ou Supabase](../cloud-e-baas/firebase-supabase.md).
2. Faça o **Nível 2** da ferramenta escolhida ([Firebase](../cloud-e-baas/firebase.md) ou [Supabase](../cloud-e-baas/supabase.md)): autenticação + uma tabela/coleção com CRUD.
3. **Proteja suas chaves** seguindo [Segurança de chaves e segredos](seguranca-de-chaves-e-segredos.md).
4. **Ative o Copilot** e aprenda a revisar o que ele sugere — veja [GitHub Copilot](../dev-tools/github-copilot.md).
5. **Automatize o build** com um workflow simples de [GitHub Actions](../dev-tools/github-actions.md).
6. **Faça o deploy** na Vercel ou no Firebase Hosting.

**Você terminou a trilha quando:** outra pessoa consegue criar conta no seu app, salvar dados e não consegue ver os dados de ninguém além dos dela.

## 🔴 Trilha 3 — Pronto para produção e IA (4+ semanas)

Objetivo: um projeto que aguenta usuários reais, com custos controlados e uma funcionalidade de IA.

1. **Regras de segurança de verdade:** Security Rules no Firebase ou RLS no Supabase, com testes automatizados no emulador/banco local.
2. **CI/CD completo:** lint, testes e deploy a cada merge, com segredos guardados no GitHub Actions.
3. **Integre uma API de IA** — [Gemini API](../apis-de-ia/gemini-api.md) (tem nível gratuito) ou [Claude API](../apis-de-ia/claude-api.md) — sempre pelo backend, nunca expondo a chave no navegador.
4. **Leia [Boas práticas com IA](../apis-de-ia/boas-praticas-ia.md)** para controlar custos, privacidade e respostas erradas.
5. **Explore o [Google Cloud](../cloud-e-baas/google-cloud.md)** para rodar um container no Cloud Run, com alerta de orçamento configurado antes de tudo.
6. **Organize o time** com o [GitHub Projects](../gestao-e-design/github-projects.md): issues, quadro kanban e milestones.

**Você terminou a trilha quando:** o deploy é automático, você recebe alerta se o gasto passar de um valor definido e consegue explicar a arquitetura do projeto em um diagrama.

## 🏁 Indo para um hackathon?

Pule direto para o guia [Stack gratuita para hackathon](stack-gratuita-hackathon.md): ele junta as ferramentas das três trilhas num plano de 48 horas.
