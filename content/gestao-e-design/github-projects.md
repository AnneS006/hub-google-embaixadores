---
description: Gestão ágil grátis com GitHub Projects — issues, quadro kanban, campos personalizados, iterações, milestones e automações ligadas ao código.
order: 4
---

# 📊 GitHub Projects

O **GitHub Projects** é a ferramenta de gestão de tarefas que já vem com o GitHub: quadros kanban, tabelas e cronogramas ligados diretamente às **issues** e **pull requests** do seu repositório. Para times de desenvolvimento estudantis, costuma ser a opção mais prática — é gratuito e fica no mesmo lugar do código.

## 🟢 Nível 1 — Issues e o primeiro quadro

### Issues

Uma **issue** é um cartão de tarefa: um bug, uma funcionalidade, uma dúvida. Cada uma tem título, descrição, responsáveis (*assignees*), etiquetas (*labels*) e comentários.

Boas issues respondem a três perguntas:

```markdown
## O que precisa ser feito
Criar a tela de login com e-mail e senha.

## Por quê
Hoje qualquer pessoa vê as tarefas de todo mundo.

## Pronto quando
- [ ] Usuário consegue criar conta e entrar
- [ ] Mensagem de erro para senha errada
- [ ] Só vê as próprias tarefas
```

### Criando o projeto

1. No seu perfil ou organização, vá em **Projects → New project**.
2. Escolha o modelo **Board** (quadro kanban).
3. Adicione issues ao quadro e arraste entre as colunas **Todo → In Progress → Done**.

## 🟡 Nível 2 — Organizando o time

### Campos personalizados

Adicione campos ao projeto para planejar melhor:

| Campo | Tipo | Exemplo |
| --- | --- | --- |
| Prioridade | Seleção única | Alta / Média / Baixa |
| Estimativa | Número | Pontos ou horas |
| Área | Seleção única | Front-end / Back-end / Design |
| Sprint | Iteração | Sprint 1 (2 semanas), Sprint 2… |

### Visualizações

- **Board** agrupado por Status — o dia a dia do time.
- **Table** filtrada por `assignee:@me` — "o que é meu?".
- **Roadmap** pelo campo de datas ou de iteração — a visão da entrega final.

### Ligando código e tarefas

Na descrição de um pull request, escreva:

```markdown
Closes #12
```

Quando o PR for juntado, a issue #12 é fechada automaticamente e o cartão vai para **Done**. Também funcionam `Fixes #12` e `Resolves #12`.

### Milestones

Agrupe issues em **milestones** com data — por exemplo, "Entrega parcial — 15/10". A barra de progresso mostra quanto falta.

## 🔴 Nível 3 — Automação e rotina ágil

### Automações nativas (workflows do projeto)

Em **Projects → ••• → Workflows**, ative:

- **Item added to project** → Status "Todo".
- **Pull request merged** → Status "Done".
- **Auto-add to project:** toda issue nova de um repositório (com um filtro, como `label:bug`) entra no projeto sozinha.
- **Auto-archive items:** arquiva cartões concluídos há mais de 2 semanas.

### Templates de issue

Formulários em `.github/ISSUE_TEMPLATE/` padronizam o que as pessoas escrevem — este Hub usa um para sugestões de ferramentas e outro para benefícios desatualizados. Exemplo mínimo (`bug.yml`):

```yaml
name: 🐛 Bug
description: Algo não está funcionando
labels: ["bug"]
body:
  - type: textarea
    id: passos
    attributes:
      label: Como reproduzir
      placeholder: "1. Abrir a tela...\n2. Clicar em..."
    validations:
      required: true
  - type: textarea
    id: esperado
    attributes:
      label: O que deveria acontecer
```

### Uma rotina ágil leve para trabalhos em grupo

| Quando | O quê | Duração |
| --- | --- | --- |
| Início da sprint | Escolher as issues da sprint, estimar e dividir | 30 min |
| 2 a 3 vezes por semana | *Daily* rápida: o que fiz, o que vou fazer, o que está travando | 10 min |
| Fim da sprint | Demonstrar o que ficou pronto e combinar uma melhoria para a próxima | 30 min |

O quadro do GitHub Projects é a fonte da verdade: se não está no quadro, não está combinado.

### Gerando relatórios

Use **Insights** no projeto para gráficos de itens por status ou por pessoa — útil para mostrar ao professor a divisão de trabalho do grupo.

## 🔗 Links oficiais

- [Sobre o GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- [Vinculando um PR a uma issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)
