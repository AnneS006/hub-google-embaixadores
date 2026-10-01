---
description: CI/CD com GitHub Actions para estudantes — conceitos, cota gratuita, primeiro workflow, matriz de testes, cache, segredos e deploy.
order: 3
---

# ⚙️ GitHub Actions (CI/CD)

O **GitHub Actions** executa tarefas automaticamente quando algo acontece no repositório: rodar testes a cada pull request, publicar o site a cada merge, verificar links toda semana. É assim que este próprio Hub é testado e publicado.

> Cotas conferidas em setembro de 2026 na [documentação de cobrança do GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

## 📋 Quanto é gratuito

| Situação | Cota |
| --- | --- |
| Repositórios **públicos** com runners hospedados pelo GitHub | **Gratuito**, sem limite de minutos |
| Repositórios privados — GitHub Free | 2.000 minutos/mês e 500 MB de artefatos |
| Repositórios privados — GitHub Pro (grátis no [Student Pack](github-student-pack.md)) | 3.000 minutos/mês e 1 GB de artefatos |
| Cache | 10 GB por repositório |

> 💡 Em repositórios privados, minutos em Windows e macOS custam bem mais que em Linux. Use `ubuntu-latest`, a não ser que precise testar outro sistema.

## 🟢 Nível 1 — Conceitos

- **Workflow:** um arquivo YAML em `.github/workflows/` que descreve uma automação.
- **Evento (`on`):** o gatilho — `push`, `pull_request`, um horário (`schedule`) ou um botão manual (`workflow_dispatch`).
- **Job:** um conjunto de passos que roda numa máquina virtual (o *runner*).
- **Step:** um comando (`run:`) ou uma action pronta (`uses:`).
- **Action:** um passo reutilizável publicado por alguém, como `actions/checkout`.

**CI** (Integração Contínua) = verificar automaticamente que o código funciona a cada mudança. **CD** (Entrega/Deploy Contínuo) = publicar automaticamente o que passou.

## 🟡 Nível 2 — Seu primeiro workflow

Crie `.github/workflows/ci.yml` num projeto Node.js:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  testes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
```

Faça commit e abra um pull request: a aba **Checks** do PR mostra o resultado. Se ficar vermelho, clique em **Details** para ver o log do passo que falhou.

**Projeto em Python?** Troque os passos de Node por:

```yaml
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - run: pip install -r requirements.txt
      - run: pytest
```

### Proteja a `main`

Em **Settings → Branches → Add branch ruleset**, exija que o workflow passe antes do merge. Assim ninguém do time junta código quebrado por engano.

## 🔴 Nível 3 — Workflows de produção

### Matriz: testar em várias versões

```yaml
jobs:
  testes:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: npm
      - run: npm ci && npm test
```

### Segredos e ambientes

```yaml
      - run: npm run deploy
        env:
          API_TOKEN: ${{ secrets.API_TOKEN }}
```

Cadastre segredos em **Settings → Secrets and variables → Actions**. Para deploy, crie um **environment** (`production`) e exija aprovação manual antes de publicar. Mais detalhes em [Segurança de chaves e segredos](../guias/seguranca-de-chaves-e-segredos.md).

### Permissões mínimas

Por padrão, dê ao token do workflow só leitura e libere o necessário em cada workflow:

```yaml
permissions:
  contents: read
  pull-requests: write   # só se o workflow comenta no PR
```

### Evite execuções desperdiçadas

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true   # um push novo cancela a execução antiga do mesmo PR

on:
  pull_request:
    paths: ["src/**", "package*.json"]   # só roda se mudou código
```

### Tarefas agendadas

```yaml
on:
  schedule:
    - cron: "0 12 * * 1"   # toda segunda às 12h UTC (9h em Brasília)
```

O verificador de links deste Hub usa exatamente isso, porque benefícios estudantis mudam de endereço com frequência.

### Segurança das actions de terceiros

- Prefira actions oficiais (`actions/*`) ou de organizações conhecidas.
- Em projetos sérios, fixe a action pelo **SHA do commit** em vez da tag (`uses: dono/action@<sha>`) — uma tag pode ser movida para código malicioso.
- Nunca use `pull_request_target` com checkout do código do PR sem entender o risco: ele roda com acesso aos segredos.

## 🔗 Links oficiais

- [Documentação do GitHub Actions](https://docs.github.com/en/actions)
- [Cobrança e cotas do GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- [Usando segredos no GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
