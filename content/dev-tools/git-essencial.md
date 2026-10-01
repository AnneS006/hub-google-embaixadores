---
description: Git do primeiro commit ao trabalho em equipe — comandos essenciais, branches, pull requests, conflitos, commits semânticos e como desfazer erros.
order: 4
---

# 🌱 Git Essencial

O **Git** guarda o histórico de cada mudança do seu código e permite que várias pessoas trabalhem no mesmo projeto sem sobrescrever o trabalho umas das outras. O **GitHub** é onde esse histórico fica hospedado e onde acontecem as revisões. É o primeiro passo para contribuir com este Hub — e com qualquer projeto open-source.

## 🟢 Nível 1 — Os comandos que você usa todo dia

### Configuração (uma vez por computador)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"   # o mesmo e-mail da conta do GitHub
git config --global init.defaultBranch main
```

### O ciclo básico

```bash
git clone https://github.com/usuario/projeto.git   # baixa o repositório
cd projeto

# ... edite os arquivos ...

git status                    # o que mudou?
git add arquivo.md            # prepara (stage) a mudança
git commit -m "docs: corrige link do Firebase"   # salva no histórico local
git push                      # envia para o GitHub
git pull                      # traz as mudanças de outras pessoas
```

### As três áreas

```
 Pasta de trabalho ──git add──► Área de preparo ──git commit──► Histórico local ──git push──► GitHub
```

Pense no `add` como colocar itens numa caixa e no `commit` como fechar e etiquetar a caixa.

## 🟡 Nível 2 — Branches e pull requests

Uma **branch** é uma linha paralela de trabalho. A `main` fica sempre estável; cada funcionalidade nova nasce numa branch própria.

```bash
git switch -c feat/pagina-notion    # cria a branch e muda para ela
# ... commits ...
git push -u origin feat/pagina-notion
```

Depois, no GitHub, abra um **Pull Request** (PR) da sua branch para a `main`. Outra pessoa revisa, comenta e aprova; então o PR é juntado (*merge*).

### Contribuindo com um projeto de outra pessoa (fork)

1. Clique em **Fork** no repositório original — você ganha uma cópia na sua conta.
2. Clone o **seu** fork, crie uma branch, faça commits e dê push.
3. Abra o PR do seu fork para o repositório original.
4. Para atualizar seu fork com as novidades do original:

```bash
git remote add upstream https://github.com/AnneS006/hub-google-embaixadores.git
git fetch upstream
git switch main
git merge upstream/main
```

### Commits semânticos

Este Hub segue os [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

| Prefixo | Quando usar | Exemplo |
| --- | --- | --- |
| `feat:` | Conteúdo ou funcionalidade nova | `feat: adiciona página do Figma` |
| `fix:` | Correção | `fix: atualiza limite do Supabase` |
| `docs:` | Documentação do projeto | `docs: melhora o CONTRIBUTING` |
| `ci:` | Automação e workflows | `ci: adiciona cache no build` |
| `refactor:` | Mudança de código sem mudar o comportamento | `refactor: separa leitura do markdown` |

### Resolvendo conflitos

Um **conflito** acontece quando duas branches mudam a mesma linha. O Git marca o trecho:

```
<<<<<<< HEAD
- **Banco de dados:** 500 MB
=======
- **Banco de dados:** 500 MB por projeto
>>>>>>> feat/atualiza-supabase
```

Edite o arquivo deixando a versão certa (sem as marcações), depois:

```bash
git add content/cloud-e-baas/supabase.md
git commit        # ou git rebase --continue, se estiver num rebase
```

O VS Code mostra botões "Accept Current / Incoming / Both" que facilitam muito.

## 🔴 Nível 3 — Desfazendo erros e histórico limpo

### "Ops!" — tabela de salvamento

| Situação | Comando |
| --- | --- |
| Quero descartar mudanças de um arquivo não commitado | `git restore arquivo` |
| Fiz `git add` sem querer | `git restore --staged arquivo` |
| Errei a mensagem do último commit (ainda não dei push) | `git commit --amend` |
| Quero desfazer um commit que **já está no GitHub** | `git revert <hash>` (cria um commit que desfaz o outro) |
| Commitei na branch errada (sem push) | `git switch -c branch-certa` e depois `git switch main && git reset --hard origin/main` |
| Apaguei algo e quero recuperar | `git reflog` mostra tudo o que você fez; volte com `git switch -c resgate <hash>` |

> ⚠️ `git reset --hard` e `git push --force` reescrevem o histórico e podem apagar trabalho. Em branches compartilhadas, prefira `git revert`. Se precisar forçar o push na sua própria branch, use `git push --force-with-lease`, que se recusa a sobrescrever commits que você ainda não viu.

### Rebase para um histórico linear

```bash
git switch feat/minha-branch
git fetch origin
git rebase origin/main        # reaplica seus commits em cima da main atual
```

Use rebase **nas suas branches** antes de abrir o PR. Nunca faça rebase de uma branch em que outras pessoas também estão trabalhando.

### Boas práticas de equipe

- **Commits pequenos e frequentes**, cada um com uma intenção clara.
- **PRs pequenos** (até ~300 linhas) são revisados mais rápido e com mais cuidado.
- **Nunca commite segredos** — veja [Segurança de chaves e segredos](../guias/seguranca-de-chaves-e-segredos.md).
- **`.gitignore` desde o primeiro commit:** `node_modules/`, `.env`, pastas de build.
- **Proteja a `main`** exigindo PR e CI verde — veja [GitHub Actions](github-actions.md).

## 🔗 Links oficiais

- [Livro Pro Git (em português)](https://git-scm.com/book/pt-br/v2)
- [Conventional Commits (em português)](https://www.conventionalcommits.org/pt-br/)
- [GitHub Docs: sobre pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
