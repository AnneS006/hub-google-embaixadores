---
description: Notion grátis para universitários — plano Education Plus, como ativar, bancos de dados, templates para estudos e TCC e automações com a API.
order: 2
---

# 📒 Notion

O **Notion** junta anotações, tarefas, wikis e bancos de dados num só lugar. Universitários com e-mail institucional ganham o plano **Education Plus** de graça — a versão do plano pago Plus para estudantes.

> Informações conferidas em setembro de 2026 na [página do Notion para Educação](https://www.notion.com/product/notion-for-education).

## 📋 O plano Education Plus

| Item | Detalhe |
| --- | --- |
| Quem pode | Estudantes e professores de **faculdades e universidades** credenciadas (não vale para ensino fundamental e médio) |
| Requisito | E-mail da instituição |
| O que libera | Páginas e blocos ilimitados, upload de arquivos, mais recursos para personalizar e publicar sites e histórico de versões de 30 dias |
| Notion AI | Não faz parte do benefício educacional — confira as condições atuais no site |

## 🟢 Nível 1 — Ativando e entendendo o básico

1. Crie a conta (ou entre) com o **e-mail da faculdade**.
2. Vá em **Settings → Upgrade plan** e procure a opção do **plano educacional gratuito**. Ela só aparece se o domínio do e-mail for reconhecido como de uma instituição.

### Conceitos

- **Página:** tudo é página, e páginas podem conter outras páginas.
- **Bloco:** cada parágrafo, título, imagem, lista ou tabela é um bloco. Digite `/` para ver todos.
- **Banco de dados:** uma tabela "inteligente" em que cada linha é uma página. Pode ser vista como tabela, quadro (kanban), calendário, lista ou galeria.

## 🟡 Nível 2 — Montando seu sistema de estudos

### Banco de dados de disciplinas e tarefas

Crie dois bancos de dados relacionados:

**Disciplinas**

| Propriedade | Tipo |
| --- | --- |
| Nome | Título |
| Professor | Texto |
| Dia e horário | Texto |
| Tarefas | Relação → Tarefas |
| Pendentes | Rollup (contagem de tarefas não concluídas) |

**Tarefas**

| Propriedade | Tipo |
| --- | --- |
| Tarefa | Título |
| Disciplina | Relação → Disciplinas |
| Entrega | Data |
| Status | Status (A fazer / Fazendo / Feito) |
| Tipo | Seleção (Prova, Trabalho, Leitura) |

Depois crie **visualizações**:

- **Quadro** agrupado por Status — o kanban da semana.
- **Calendário** pela data de entrega — para ver as provas do mês.
- **Tabela filtrada** "Entrega nos próximos 7 dias", ordenada por data.

### Template para o TCC

Uma página "TCC" com:

- **Cronograma:** banco de dados com etapas, prazos e status.
- **Referências:** banco de dados com título, autores, ano, link, tags de tema e um campo "Já li?".
- **Reuniões com o orientador:** uma página por encontro, com data, o que foi discutido e os próximos passos.
- **Rascunhos:** capítulos como subpáginas, com o histórico de versões para recuperar trechos.

## 🔴 Nível 3 — Fórmulas, API e trabalho em equipe

### Fórmulas úteis

Dias até a entrega:

```
dateBetween(prop("Entrega"), now(), "days")
```

Aviso de atraso:

```
if(prop("Status") != "Feito" and prop("Entrega") < now(), "⚠️ Atrasada", "")
```

### Automatizando com a API do Notion

Crie uma integração em [notion.so/my-integrations](https://www.notion.so/my-integrations), copie o token e **compartilhe** a página do banco de dados com a integração (menu `•••` → *Connections*). Exemplo em Node.js que cria uma tarefa:

```ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

await notion.pages.create({
  parent: { database_id: process.env.NOTION_DATABASE_ID! },
  properties: {
    Tarefa: { title: [{ text: { content: "Lista de exercícios 3" } }] },
    Entrega: { date: { start: "2026-10-15" } },
  },
});
```

Ideias de automação: criar tarefas a partir de issues do GitHub, mandar um resumo semanal das entregas, importar o calendário acadêmico.

> ⚠️ O token da integração é um segredo. Guarde em variável de ambiente — veja [Segurança de chaves e segredos](../guias/seguranca-de-chaves-e-segredos.md).

### Em equipe

- Crie um **teamspace** para o grupo do trabalho, com permissões de edição para todos.
- Use **menções** (`@pessoa`) e **comentários** em vez de mensagens soltas no WhatsApp: a decisão fica registrada junto do conteúdo.
- Para times de desenvolvimento, combine o Notion (documentação e decisões) com o [GitHub Projects](github-projects.md) (tarefas ligadas ao código).

## 🔗 Links oficiais

- [Notion para Educação](https://www.notion.com/product/notion-for-education)
- [Documentação da API do Notion](https://developers.notion.com/)
