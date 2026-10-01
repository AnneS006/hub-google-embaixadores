---
title: Firebase ou Supabase?
description: Comparação técnica entre Firebase e Supabase para projetos estudantis — modelo de dados, segurança, limites gratuitos e quando escolher cada um.
order: 3
---

# ⚖️ Firebase ou Supabase? (Backend as a Service)

Para quem desenvolve aplicações web (como projetos em Next.js e TypeScript), ter banco de dados, autenticação e storage sem precisar configurar servidores do zero é essencial — especialmente em hackathons. Firebase e Supabase são as duas opções mais usadas, e ambas têm um plano gratuito que **não exige verificação de estudante**.

Esta página compara as duas. Para o passo a passo de cada uma, veja as páginas do [Firebase](firebase.md) e do [Supabase](supabase.md).

> Limites conferidos em setembro de 2026 nas páginas oficiais de preços do [Firebase](https://firebase.google.com/pricing) e do [Supabase](https://supabase.com/pricing).

## 🟢 Nível 1 — A diferença em uma frase

- **Firebase** (Google): banco **NoSQL** de documentos (Firestore). Você guarda objetos JSON em coleções e acessa direto do front-end, protegido por *Security Rules*.
- **Supabase** (open-source): um banco **PostgreSQL** completo. Você usa tabelas e SQL, acessa direto do front-end, protegido por *Row Level Security* (RLS).

## 🟡 Nível 2 — Comparação lado a lado

| Critério | 🔥 Firebase (plano Spark) | ⚡ Supabase (plano Free) |
| --- | --- | --- |
| Banco de dados | Firestore (NoSQL, documentos) | PostgreSQL (relacional, SQL) |
| Armazenamento do banco | 1 GiB | 500 MB por projeto |
| Leituras/escritas | 50 mil leituras, 20 mil escritas e 20 mil exclusões por dia | Requisições de API ilimitadas |
| Autenticação | 50 mil usuários ativos/mês | 50 mil usuários ativos/mês |
| Arquivos (storage) | 5 GB em buckets legados `*.appspot.com`; buckets novos exigem o plano Blaze | 1 GB |
| Funções no servidor | Cloud Functions **só no plano Blaze** (pago) | Edge Functions: 500 mil invocações/mês |
| Tempo real | Nativo no Firestore e no Realtime Database | Realtime: 200 conexões simultâneas, 2 milhões de mensagens/mês |
| Hospedagem de site | Firebase Hosting: 10 GB, 360 MB/dia de transferência | Não tem — use Vercel, Cloudflare Pages etc. |
| Pegadinhas do gratuito | Precisa de Blaze (com cartão) para Functions e Storage novo | Projeto **pausa após 1 semana sem uso**; sem backups automáticos; máximo de 2 projetos ativos |
| Rodar localmente | Firebase Emulator Suite | Supabase CLI (usa Docker) |
| Open-source / sem lock-in | Não | Sim, dá para hospedar por conta própria |

## 🔴 Nível 3 — Como decidir

**Escolha Firebase se:**

- Seus dados são naturalmente "documentos" (perfis, posts, mensagens de chat) e você não precisa de consultas com muitos `JOIN`s.
- Você quer um app mobile (Android/iOS/Flutter) — os SDKs do Firebase são muito maduros.
- O projeto vai ficar parado por semanas (por exemplo, um portfólio) e precisa continuar no ar sem pausar.

**Escolha Supabase se:**

- Seus dados têm muitas relações (alunos ↔ turmas ↔ disciplinas ↔ notas) e você quer SQL, chaves estrangeiras e transações.
- Você quer aprender PostgreSQL, que é exigido em muitas vagas.
- Você precisa de funções no servidor sem cadastrar cartão de crédito.

**Erros comuns nos dois:**

1. **Deixar o banco aberto.** O "modo de teste" do Firestore e uma tabela sem RLS no Supabase deixam qualquer pessoa ler e apagar tudo.
2. **Modelar como se fosse o outro.** No Firestore, duplicar dados para evitar consultas é normal; no Postgres, normalize e use `JOIN`.
3. **Ignorar os limites diários.** Um `onSnapshot` dentro de um loop no Firestore pode consumir as 50 mil leituras diárias em minutos.

> **💡 Dica da Comunidade:** se o seu projeto acadêmico passar dos limites gratuitos, veja os créditos de nuvem do [GitHub Student Developer Pack](../dev-tools/github-student-pack.md) (Azure, DigitalOcean, Heroku, MongoDB) e o período de avaliação do [Google Cloud](google-cloud.md).
