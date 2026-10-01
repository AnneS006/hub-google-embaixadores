---
description: GitHub Copilot para estudantes — o plano Copilot Student, como ativar, como usar bem no VS Code e como não deixar a IA aprender por você.
order: 2
---

# 🤖 GitHub Copilot

O **GitHub Copilot** é o assistente de programação com IA do GitHub: sugere código enquanto você digita, responde perguntas sobre o projeto num chat e pode executar tarefas como agente. Estudantes verificados têm acesso ao plano **Copilot Student** sem custo.

> Informações conferidas em setembro de 2026 na [página de planos do Copilot](https://docs.github.com/en/copilot/get-started/plans) e no [anúncio de mudanças para estudantes](https://github.blog/changelog/2026-03-13-updates-to-github-copilot-for-students/).

## 📋 O plano Copilot Student

| Item | Copilot Student |
| --- | --- |
| Preço | Gratuito para estudantes verificados |
| Autocompletar de código | Ilimitado |
| Chat e agente | Incluídos, consumindo uma cota mensal de **créditos de IA** (200 por mês, segundo o anúncio de 2026) |
| Escolha de modelo | Só **automática** (o Copilot escolhe o modelo para cada tarefa) |
| Agentes de terceiros | Não incluídos |

> ⚠️ Desde 2026 todos os planos do Copilot usam cobrança por uso (créditos). Tarefas longas de agente consomem a cota bem mais rápido que perguntas curtas no chat.

## 🟢 Nível 1 — Ativando e primeiros usos

1. Faça a verificação do [GitHub Student Developer Pack](github-student-pack.md).
2. Depois da aprovação, ative o Copilot em [github.com/settings/copilot](https://github.com/settings/copilot).
3. No **VS Code**, instale a extensão **GitHub Copilot** e entre com sua conta do GitHub.

**Três jeitos de usar:**

- **Sugestões inline:** comece a digitar e aperte `Tab` para aceitar a sugestão em cinza.
- **Chat:** abra o painel do Copilot e pergunte, por exemplo, "o que este arquivo faz?".
- **Comentário como instrução:** escreva um comentário descrevendo a função e deixe o Copilot propor o código.

```ts
// Retorna a média das notas, ignorando valores fora do intervalo 0 a 10
function mediaValida(notas: number[]): number {
  // o Copilot sugere a implementação a partir daqui
}
```

## 🟡 Nível 2 — Usando bem no dia a dia

### Dê contexto

O Copilot só "vê" o que está aberto e o que você referencia. Melhores resultados vêm de:

- Nomes de funções e variáveis descritivos.
- Arquivos relacionados abertos em abas.
- No chat, referenciar arquivos específicos (`#arquivo`) e colar a mensagem de erro completa.

### Bons pedidos para o chat

| Em vez de… | Peça… |
| --- | --- |
| "Corrige isso" | "Este teste falha com `TypeError: x is undefined` na linha 12. Explique a causa antes de propor a correção." |
| "Faz um CRUD" | "Crie as funções de criar e listar tarefas usando o cliente Supabase de `src/lib/supabase.ts`, com tratamento de erro." |
| "Melhora o código" | "Esta função tem três responsabilidades. Sugira como dividir, mantendo o mesmo comportamento." |

### Instruções do repositório

Crie `.github/copilot-instructions.md` com as regras do projeto — o Copilot lê esse arquivo em todas as conversas daquele repositório:

```markdown
- O projeto usa Next.js 15 com App Router e TypeScript estrito.
- Estilos só com Tailwind; não crie arquivos CSS novos.
- Textos da interface em português do Brasil.
- Nunca coloque chaves de API no código; use process.env no servidor.
```

## 🔴 Nível 3 — IA sem perder o aprendizado

### Revise como se fosse código de outra pessoa

O Copilot erra — às vezes com muita confiança. Antes de aceitar:

- **Entenda cada linha.** Se não consegue explicar, não faça commit.
- **Rode os testes.** Peça ao Copilot para escrever testes, mas confira se eles testam o comportamento certo.
- **Procure problemas de segurança:** SQL montado com concatenação de strings, chaves no código, falta de validação de entrada.
- **Desconfie de dependências sugeridas.** Confira se o pacote existe, é mantido e tem o nome certo — nomes parecidos com pacotes famosos são um golpe comum.

### Na faculdade

- Leia as **regras da disciplina** sobre uso de IA. Muitos professores permitem para estudo e proíbem em avaliações.
- Use a IA para **explicar** e **revisar**, não só para gerar. Pedir "explique este erro" ensina mais que "corrija este erro".
- Para fixar conteúdo novo, tente primeiro sozinho e use o Copilot para comparar a sua solução com outra.

### Economizando créditos

- Use o autocompletar (ilimitado) para código repetitivo e deixe o chat para dúvidas reais.
- Faça pedidos específicos: perguntas vagas geram respostas longas e mais idas e voltas.
- Divida tarefas grandes de agente em etapas menores e revise cada uma.

## 🔗 Links oficiais

- [Planos do GitHub Copilot](https://docs.github.com/en/copilot/get-started/plans)
- [Mudanças no Copilot para estudantes (2026)](https://github.blog/changelog/2026-03-13-updates-to-github-copilot-for-students/)
- [Documentação do GitHub Copilot](https://docs.github.com/en/copilot)
