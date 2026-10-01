---
description: Uma stack 100% gratuita para hackathons, com arquitetura, divisão de tarefas e um cronograma de 48 horas.
order: 2
---

# 🏆 Stack Gratuita para Hackathon

Em um hackathon, o tempo é o recurso mais escasso. A regra de ouro é **não configurar infraestrutura do zero**: use serviços prontos com nível gratuito e gaste as horas no que o júri vai avaliar — o problema resolvido e a demonstração.

> ⚠️ **Faça antes do evento:** a verificação do [GitHub Student Developer Pack](../dev-tools/github-student-pack.md) pode levar dias. Crie também as contas no Firebase/Supabase e na Vercel com antecedência.

## 🟢 Nível 1 — A stack recomendada

| Camada | Ferramenta | Por quê |
| --- | --- | --- |
| Código e versionamento | GitHub (Pro grátis via Student Pack) | Repositório, issues e quadro do time no mesmo lugar |
| Editor | VS Code + GitHub Copilot ou Codespaces | Ambiente idêntico para todo o time, sem "na minha máquina funciona" |
| Front-end | Next.js ou Vite + React | Muitos exemplos prontos e deploy simples |
| Backend (BaaS) | Firebase **ou** Supabase | Login, banco e storage sem escrever servidor |
| IA | Gemini API (nível gratuito) | Dá para prototipar sem cartão de crédito |
| Hospedagem | Vercel (Hobby) ou Firebase Hosting | Deploy a cada push, com link para mostrar ao júri |
| Design | Figma (plano educacional) | Protótipo navegável para o pitch |
| Gestão | GitHub Projects | Kanban ligado às issues e PRs |

### Arquitetura típica

```
 Navegador (Next.js na Vercel)
        │
        ├──► Firebase Auth / Supabase Auth ── login do usuário
        ├──► Firestore / Postgres ─────────── dados (protegidos por regras/RLS)
        └──► Rota de API no servidor ─────── chama a Gemini API
                                               (a chave fica só no servidor)
```

## 🟡 Nível 2 — Divisão do time

Com 4 pessoas, uma divisão que funciona bem:

- **Pessoa 1 — Produto e pitch:** define o problema, escreve o roteiro da demo e monta os slides. Mantém o quadro do GitHub Projects atualizado.
- **Pessoa 2 — Design:** faz o fluxo no Figma nas primeiras horas e depois ajuda no front-end.
- **Pessoa 3 — Front-end:** telas e integração com o BaaS.
- **Pessoa 4 — Back-end e IA:** modelo de dados, regras de segurança e a rota que chama a IA.

**Fluxo de Git para não perder tempo com conflitos:**

1. A `main` sempre funciona e está publicada.
2. Cada pessoa trabalha numa branch curta (`feat/login`, `feat/tela-inicial`).
3. Pull requests pequenos, revisados por outra pessoa em minutos — não em horas.
4. Ative os deploys de preview da Vercel: cada PR ganha um link próprio para testar.

## 🔴 Nível 3 — Cronograma de 48 horas

| Horário | Entrega |
| --- | --- |
| **H0–H2** | Problema definido, repositório criado, quadro com as tarefas, contas e chaves configuradas (`.env.example` no repo) |
| **H2–H6** | Protótipo no Figma e "esqueleto" do app publicado (uma página com login funcionando) |
| **H6–H20** | Funcionalidade principal ponta a ponta — feia, mas funcionando |
| **H20–H24** | Dormir. Sério: decisões de madrugada viram bugs de manhã |
| **H24–H36** | Integração da IA, tratamento de erros e polimento das telas da demo |
| **H36–H42** | **Congelar funcionalidades.** Só correções. Gravar um vídeo da demo como plano B |
| **H42–H48** | Ensaiar o pitch, revisar o README e conferir se o link público abre em outro computador |

**Checklist técnico antes da apresentação:**

- [ ] O link público abre numa aba anônima.
- [ ] Nenhuma chave de API aparece no código do front-end nem no histórico do Git.
- [ ] As regras do banco não estão em "modo de teste" (aberto para qualquer pessoa).
- [ ] Existe um usuário de demonstração com dados de exemplo.
- [ ] O README explica o problema, a solução, como rodar e quem é o time.
- [ ] Há um vídeo de backup caso a internet do evento falhe.
