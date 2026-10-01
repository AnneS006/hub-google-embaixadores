---
description: Claude API da Anthropic para estudantes — o que existe para educação, modelos e preços, primeira chamada em TypeScript e Python, streaming, cache de prompt e tratamento de erros.
order: 2
---

# 🧠 Claude API (Anthropic)

A **Claude API** dá acesso aos modelos Claude, da Anthropic, para gerar e analisar texto, ler imagens e PDFs, usar ferramentas e construir agentes. Diferente da [Gemini API](gemini-api.md), ela **não tem um nível gratuito**: o uso é pago por token, com créditos pré-pagos no console.

> Informações conferidas em setembro de 2026 na [página de educação da Anthropic](https://claude.com/solutions/education) e na documentação da API.

## 📋 O que existe para estudantes

| Oferta | Para quem | O que inclui |
| --- | --- | --- |
| **Claude for Education** | Instituições (a faculdade contrata) | Acesso ao Claude para estudantes, professores e funcionários. Não inclui créditos de API e não dá para pedir individualmente — a instituição fala com a Anthropic |
| **Anthropic Academy** | Qualquer pessoa | Cursos gratuitos, como *AI Fluency for students* |
| **Programas de campus** | Estudantes selecionados | A Anthropic já ofereceu créditos de API por meio de programas e clubes universitários com inscrições periódicas. Acompanhe os canais oficiais — não há um programa aberto o tempo todo |

> ⚠️ Desconfie de sites que prometem "créditos grátis de Claude" em troca de cadastro ou pagamento. As únicas fontes confiáveis são os sites oficiais da Anthropic (`anthropic.com` e `claude.com`).

## 🟢 Nível 1 — Conceitos e modelos

- **Messages API:** toda chamada é uma lista de mensagens (`user` e `assistant`) enviada ao endpoint `/v1/messages`. A API não guarda o histórico: você reenvia a conversa a cada chamada.
- **`max_tokens`:** o limite de tamanho da resposta. Se a resposta bater no limite, ela é cortada.
- **System prompt:** instruções fixas sobre como o modelo deve se comportar.
- **Preço por token:** você paga separadamente pelos tokens de **entrada** (o que envia) e de **saída** (o que o modelo gera).

### Modelos atuais (preço por milhão de tokens)

| Modelo | ID na API | Entrada | Saída | Quando usar |
| --- | --- | --- | --- | --- |
| Claude Opus 5 | `claude-opus-5` | US$ 5 | US$ 25 | Melhor qualidade para tarefas complexas e agentes |
| Claude Sonnet 5 | `claude-sonnet-5` | US$ 2 | US$ 10 | Bom equilíbrio entre qualidade e custo |
| Claude Haiku 4.5 | `claude-haiku-4-5` | US$ 1 | US$ 5 | Tarefas simples e em grande volume (classificar, extrair) |

Os preços mudam: confira a [página de preços](https://platform.claude.com/docs/en/about-claude/pricing) antes de estimar custos.

### Criando a chave

1. Crie uma conta no [Claude Console](https://platform.claude.com/).
2. Adicione créditos em **Billing** e defina um **limite de gasto** baixo.
3. Em **API Keys**, crie uma chave e guarde como variável de ambiente `ANTHROPIC_API_KEY`. Veja [Segurança de chaves e segredos](../guias/seguranca-de-chaves-e-segredos.md).

## 🟡 Nível 2 — Primeiras chamadas

### TypeScript / Node.js

```bash
npm install @anthropic-ai/sdk
```

```ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // lê ANTHROPIC_API_KEY do ambiente

const resposta = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 16000,
  system: "Você é monitor de Estruturas de Dados. Responda em português, com exemplos curtos.",
  messages: [{ role: "user", content: "Qual a diferença entre pilha e fila?" }],
});

// A resposta é uma lista de blocos; mostre só os de texto
for (const bloco of resposta.content) {
  if (bloco.type === "text") console.log(bloco.text);
}
```

### Python

```bash
pip install anthropic
```

```python
import anthropic

client = anthropic.Anthropic()  # lê ANTHROPIC_API_KEY do ambiente

resposta = client.messages.create(
    model="claude-opus-5",
    max_tokens=16000,
    system="Você é monitor de Estruturas de Dados. Responda em português, com exemplos curtos.",
    messages=[{"role": "user", "content": "Qual a diferença entre pilha e fila?"}],
)

for bloco in resposta.content:
    if bloco.type == "text":
        print(bloco.text)
```

### Conversa com várias mensagens

```ts
const mensagens: Anthropic.MessageParam[] = [
  { role: "user", content: "Meu TCC é sobre filas em hospitais." },
  { role: "assistant", content: "Ótimo tema! Que parte você quer desenvolver?" },
  { role: "user", content: "Sugira três métricas para avaliar a fila." },
];

const resposta = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 16000,
  messages: mensagens,
});
```

### Streaming

Para respostas longas, use streaming — o texto aparece aos poucos e você evita timeouts:

```ts
const stream = client.messages.stream({
  model: "claude-opus-5",
  max_tokens: 64000,
  messages: [{ role: "user", content: "Escreva um plano de estudos de 8 semanas para Cálculo I." }],
});

stream.on("text", (texto) => process.stdout.write(texto));
const final = await stream.finalMessage(); // mensagem completa, com uso de tokens
console.log("\nTokens de saída:", final.usage.output_tokens);
```

```python
with client.messages.stream(
    model="claude-opus-5",
    max_tokens=64000,
    messages=[{"role": "user", "content": "Escreva um plano de estudos de 8 semanas para Cálculo I."}],
) as stream:
    for texto in stream.text_stream:
        print(texto, end="", flush=True)
    final = stream.get_final_message()
```

## 🔴 Nível 3 — Custos, erros e produção

### Cache de prompt: pague menos pelo contexto repetido

Se toda chamada envia o mesmo contexto grande (por exemplo, o regulamento do TCC ou a apostila da disciplina), marque-o para cache. As leituras do cache custam cerca de **10% do preço normal** de entrada:

```ts
const resposta = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 16000,
  system: [
    {
      type: "text",
      text: apostilaDaDisciplina, // texto grande e que não muda entre chamadas
      cache_control: { type: "ephemeral" },
    },
  ],
  messages: [{ role: "user", content: pergunta }],
});

console.log(resposta.usage.cache_read_input_tokens); // > 0 quando o cache foi aproveitado
```

O cache funciona por **prefixo**: qualquer mudança no texto marcado (até um horário ou um id gerado na hora) invalida o cache. Deixe o que é fixo primeiro e o que muda (a pergunta) por último.

### Tratamento de erros

O SDK já tenta de novo automaticamente (2 vezes, com espera crescente) em erros temporários. Trate o que sobrar, do mais específico para o mais geral:

```ts
try {
  const resposta = await client.messages.create({ /* ... */ });
} catch (erro) {
  if (erro instanceof Anthropic.RateLimitError) {
    // 429: limite de requisições — espere e tente de novo mais tarde
  } else if (erro instanceof Anthropic.InternalServerError) {
    // 5xx, incluindo 529 (API sobrecarregada) — temporário, tente de novo
  } else if (erro instanceof Anthropic.AuthenticationError) {
    // 401: chave inválida ou ausente
  } else if (erro instanceof Anthropic.APIError) {
    console.error(`Erro ${erro.status}:`, erro.message);
  } else {
    throw erro;
  }
}
```

```python
try:
    resposta = client.messages.create(...)
except anthropic.RateLimitError:
    ...  # 429: espere e tente de novo
except anthropic.InternalServerError:
    ...  # 5xx, incluindo 529 (sobrecarga): temporário
except anthropic.APIStatusError as erro:
    print(erro.status_code, erro.message)
except anthropic.APIConnectionError:
    ...  # problema de rede
```

### Verifique por que o modelo parou

```ts
if (resposta.stop_reason === "max_tokens") {
  // a resposta foi cortada: aumente max_tokens ou use streaming
} else if (resposta.stop_reason === "refusal") {
  // o modelo recusou o pedido por segurança
}
```

No Claude Opus 5, a API permite configurar **fallbacks**: se o modelo recusar um pedido por segurança, a própria API tenta de novo com outro modelo indicado pela Anthropic. Isso é um recurso beta — veja a documentação de *refusals and fallback* antes de usar.

### Checklist de produção

- [ ] A chave fica só no servidor (rota de API, Cloud Run, Edge Function) — nunca no navegador.
- [ ] Limite de gasto configurado no Console e alerta de uso.
- [ ] Limite de requisições **por usuário** no seu app.
- [ ] `max_tokens` adequado: não baixo demais (corta a resposta), nem gigante sem necessidade.
- [ ] Modelo escolhido pelo custo-benefício: teste o Haiku ou o Sonnet em tarefas simples antes de usar o Opus em tudo.
- [ ] Logs do uso de tokens (`resposta.usage`) para saber quanto cada funcionalidade custa.

## 🔗 Links oficiais

- [Claude para educação](https://claude.com/solutions/education)
- [Documentação da Claude API](https://platform.claude.com/docs)
- [Claude Console](https://platform.claude.com/)
- [Preços](https://platform.claude.com/docs/en/about-claude/pricing)
- [Anthropic Academy](https://anthropic.skilljar.com/)
