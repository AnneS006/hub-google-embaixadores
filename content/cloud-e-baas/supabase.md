---
description: Supabase do zero ao deploy — plano Free, PostgreSQL, Auth, Row Level Security, Realtime, CLI local, migrations e tipos gerados.
order: 2
---

# ⚡ Supabase

O **Supabase** é uma alternativa open-source ao Firebase construída sobre o **PostgreSQL**. Cada projeto é um banco Postgres de verdade, com autenticação, storage, funções e tempo real em volta. O plano **Free** não exige cartão de crédito nem verificação de estudante.

> Limites conferidos em setembro de 2026 na [página de preços do Supabase](https://supabase.com/pricing).

## 📋 Resumo do plano Free

| Recurso | Limite gratuito |
| --- | --- |
| Projetos ativos | 2 |
| Banco de dados | 500 MB por projeto |
| Storage de arquivos | 1 GB |
| Usuários ativos/mês (Auth) | 50 mil |
| Egress (transferência) | 5 GB + 5 GB em cache |
| Edge Functions | 500 mil invocações/mês |
| Realtime | 200 conexões simultâneas; 2 milhões de mensagens/mês |
| Requisições de API | Ilimitadas |
| Backups automáticos | ❌ Não incluídos |
| Inatividade | ⚠️ Projeto **pausa após 1 semana sem uso** (dá para reativar no painel) |

## 🟢 Nível 1 — Primeiros passos

### Conceitos

- **Tabelas e SQL:** os dados ficam em tabelas com colunas tipadas, chaves estrangeiras e restrições — o modelo relacional que você vê nas disciplinas de banco de dados.
- **API automática:** o Supabase gera uma API REST a partir das suas tabelas. A biblioteca `supabase-js` conversa com ela.
- **Chaves de API:** a chave **publishable** (antiga `anon`) pode ficar no front-end. A chave **secret** (antiga `service_role`) ignora a segurança e só pode ficar no servidor.
- **Row Level Security (RLS):** políticas em SQL que decidem quais **linhas** cada usuário pode ver ou alterar. É o equivalente às Security Rules do Firebase.

### Criando o projeto

1. Entre em [supabase.com](https://supabase.com/) com sua conta do GitHub e clique em **New project**.
2. Escolha uma senha forte para o banco e a região mais próxima (há opção em São Paulo).
3. Em **Project Settings → API Keys**, copie a URL do projeto e a chave publishable.
4. Em **Authentication → Providers**, ative E-mail e/ou GitHub.

## 🟡 Nível 2 — Mão na massa: lista de tarefas com login

### Crie a tabela com RLS

No **SQL Editor** do painel:

```sql
create table public.tarefas (
  id bigint generated always as identity primary key,
  titulo text not null check (char_length(titulo) <= 200),
  feita boolean not null default false,
  dono uuid not null default auth.uid() references auth.users (id) on delete cascade,
  criada_em timestamptz not null default now()
);

alter table public.tarefas enable row level security;

create policy "dono vê suas tarefas" on public.tarefas
  for select to authenticated using ((select auth.uid()) = dono);

create policy "dono cria tarefas" on public.tarefas
  for insert to authenticated with check ((select auth.uid()) = dono);

create policy "dono altera suas tarefas" on public.tarefas
  for update to authenticated using ((select auth.uid()) = dono);

create policy "dono apaga suas tarefas" on public.tarefas
  for delete to authenticated using ((select auth.uid()) = dono);
```

> 💡 Escrever `(select auth.uid())` em vez de `auth.uid()` faz o Postgres calcular o valor uma vez por consulta, e não uma vez por linha — recomendação da própria documentação de RLS.

### Use no front-end

```bash
npm install @supabase/supabase-js
```

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, // pública: o RLS protege os dados
);

// Login com GitHub
await supabase.auth.signInWithOAuth({ provider: "github" });

// Criar (o campo dono é preenchido pelo default auth.uid())
await supabase.from("tarefas").insert({ titulo: "Estudar SQL" });

// Listar — o RLS já filtra só as tarefas do usuário logado
const { data, error } = await supabase
  .from("tarefas")
  .select("id, titulo, feita")
  .order("criada_em", { ascending: false });

// Atualizar e apagar
await supabase.from("tarefas").update({ feita: true }).eq("id", 1);
await supabase.from("tarefas").delete().eq("id", 1);
```

### Tempo real

Ative o Realtime para a tabela (**Database → Publications**) e escute as mudanças:

```ts
const canal = supabase
  .channel("tarefas")
  .on("postgres_changes", { event: "*", schema: "public", table: "tarefas" }, (payload) => {
    console.log("Mudou:", payload);
  })
  .subscribe();

// ao sair da tela
supabase.removeChannel(canal);
```

O Realtime também respeita o RLS: cada usuário só recebe eventos das linhas que pode ver.

## 🔴 Nível 3 — Produção e boas práticas

### Desenvolvimento local com a CLI

A CLI sobe uma cópia completa do Supabase na sua máquina (precisa do Docker):

```bash
npx supabase init                 # cria a pasta supabase/ no repositório
npx supabase start                # sobe Postgres, Auth, Storage e o painel local
npx supabase migration new criar_tarefas   # cria um arquivo SQL versionado
npx supabase db reset             # recria o banco local aplicando todas as migrations
```

Coloque o SQL da tabela e das políticas dentro da migration. Assim o esquema do banco fica **versionado no Git** junto com o código.

Para aplicar no projeto da nuvem:

```bash
npx supabase login
npx supabase link --project-ref <id-do-projeto>
npx supabase db push
```

### Tipos TypeScript gerados do banco

```bash
npx supabase gen types typescript --local > src/types/database.ts
```

```ts
import type { Database } from "@/types/database";
const supabase = createClient<Database>(url, chave);
// agora .from("tarefas").select() devolve objetos tipados
```

### Checklist de segurança

- [ ] **Toda** tabela no schema `public` tem RLS ativado (o painel avisa no *Security Advisor*).
- [ ] A chave secret só existe em variáveis de ambiente do servidor.
- [ ] Políticas testadas com dois usuários diferentes.
- [ ] Índices nas colunas usadas nas políticas e nos filtros (`create index on tarefas (dono);`).

### Lidando com as limitações do Free

- **Pausa por inatividade:** para demos e portfólio, lembre de abrir o painel e reativar o projeto antes de apresentar.
- **Sem backups automáticos:** faça cópias manuais com `npx supabase db dump -f backup.sql` antes de mudanças grandes.
- **500 MB:** guarde imagens no Storage, não em colunas do banco.

## 🔗 Links oficiais

- [Supabase](https://supabase.com/)
- [Preços do Supabase](https://supabase.com/pricing)
- [Documentação](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Desenvolvimento local](https://supabase.com/docs/guides/local-development)
