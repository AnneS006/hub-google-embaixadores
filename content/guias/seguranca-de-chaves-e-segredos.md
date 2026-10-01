---
description: Como guardar chaves de API e senhas com segurança em projetos estudantis — .env, GitHub Secrets, chaves públicas x secretas e o que fazer se vazar.
order: 3
---

# 🔐 Segurança de Chaves e Segredos

Bots varrem o GitHub o tempo todo procurando chaves de API publicadas por engano. Uma chave vazada de um serviço de nuvem ou de IA pode gerar cobranças em poucas horas. Este guia mostra como evitar isso.

## 🟢 Nível 1 — O que é um segredo?

Um **segredo** é qualquer valor que dá acesso a algo em seu nome: chaves de API, senhas de banco, tokens de acesso, chaves privadas.

Nem toda "chave" é secreta. Alguns serviços têm chaves feitas para ficar no navegador:

| Chave | Pode ir para o front-end? | Por quê |
| --- | --- | --- |
| Configuração web do Firebase (`apiKey`, `projectId`…) | ✅ Sim | Só identifica o projeto. Quem protege os dados são as **Security Rules** |
| Chave *publishable* (antiga `anon`) do Supabase | ✅ Sim | Quem protege os dados é o **Row Level Security (RLS)** |
| Chave *secret* (antiga `service_role`) do Supabase | ❌ Nunca | Ignora o RLS: dá acesso total ao banco |
| Chave da Gemini API, da Claude API e afins | ❌ Nunca | Qualquer pessoa poderia usar sua cota ou gerar cobranças |
| Token pessoal do GitHub | ❌ Nunca | Dá acesso aos seus repositórios |

**Regra prática:** se a documentação do serviço não diz explicitamente que a chave é pública, trate como secreta.

## 🟡 Nível 2 — Usando arquivos `.env`

1. Crie um arquivo `.env.local` (ou `.env`) na raiz do projeto:

   ```bash
   GEMINI_API_KEY=cole-sua-chave-aqui
   SUPABASE_SECRET_KEY=cole-sua-chave-aqui
   ```

2. Garanta que ele **está no `.gitignore`** antes do primeiro commit:

   ```bash
   # .gitignore
   .env
   .env.local
   .env*.local
   ```

3. Faça commit de um **`.env.example`** só com os nomes das variáveis, para o time saber o que configurar:

   ```bash
   GEMINI_API_KEY=
   SUPABASE_SECRET_KEY=
   ```

4. Leia a variável no código do **servidor**:

   ```ts
   const apiKey = process.env.GEMINI_API_KEY;
   if (!apiKey) throw new Error("Defina GEMINI_API_KEY no .env.local");
   ```

> ⚠️ **Atenção no Next.js:** variáveis com o prefixo `NEXT_PUBLIC_` são embutidas no JavaScript enviado ao navegador. Nunca coloque uma chave secreta numa variável `NEXT_PUBLIC_*`. O mesmo vale para `VITE_*` no Vite.

Antes de cada commit, confira o que está indo:

```bash
git status          # o .env aparece aqui? então não está no .gitignore
git diff --staged   # revise o conteúdo antes de confirmar
```

## 🔴 Nível 3 — Segredos em CI/CD e em produção

### GitHub Actions

Guarde segredos em **Settings → Secrets and variables → Actions** e use no workflow:

```yaml
- name: Build
  run: npm run build
  env:
    GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

O GitHub mascara o valor nos logs, mas não imprima segredos de propósito (`echo $GEMINI_API_KEY`). Workflows disparados por PRs vindos de forks não recebem segredos — isso é uma proteção, não um bug.

### Proteções do próprio GitHub

- **Secret scanning e push protection:** o GitHub detecta padrões de chaves conhecidas e pode bloquear o push antes que a chave chegue ao repositório. Confira em **Settings → Code security**.
- **Dependabot:** avisa sobre dependências com falhas de segurança conhecidas.

### Na hospedagem

Vercel, Firebase, Cloud Run e similares têm uma tela de **variáveis de ambiente**. Configure lá — nunca dentro do código.

### Arquitetura segura para IA

O navegador nunca fala direto com a API de IA. Ele chama uma rota sua, que valida o usuário e só então chama a API com a chave:

```
Navegador ──► /api/resumo (seu servidor) ──► API de IA
               │ verifica login
               │ limita requisições por usuário
               └ a chave fica aqui
```

## 🚨 Vazou uma chave. E agora?

1. **Revogue/rotacione a chave imediatamente** no painel do serviço. Este é o passo que resolve — o resto é limpeza.
2. Gere uma nova chave e atualize o `.env` e os segredos do CI/hospedagem.
3. Verifique o painel de uso/cobrança do serviço em busca de atividade estranha.
4. Apagar o arquivo num commit novo **não basta**: a chave continua no histórico do Git. Como ela já foi revogada, isso deixa de ser um risco — reescrever o histórico é opcional.

## 🔗 Links oficiais

- [Sobre secret scanning — GitHub Docs](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning)
- [Usando segredos no GitHub Actions — GitHub Docs](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- [Variáveis de ambiente no Next.js](https://nextjs.org/docs/app/guides/environment-variables)
