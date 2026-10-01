---
description: Gemini API para estudantes — nível gratuito do Google AI Studio, primeira chamada em TypeScript e Python, streaming, saída em JSON e uso seguro em produção.
order: 1
---

# ✨ Gemini API

A **Gemini API** dá acesso aos modelos de IA do Google para gerar texto, entender imagens, áudio e vídeo, criar embeddings e mais. Ela tem um **nível gratuito** que não pede cartão de crédito — ótimo para TCCs, protótipos e hackathons.

> Informações conferidas em setembro de 2026 na [página de preços da Gemini API](https://ai.google.dev/gemini-api/docs/pricing).

## 📋 O nível gratuito

| Item | Como funciona |
| --- | --- |
| Custo | Gratuito, dentro dos limites de requisições |
| Modelos | Vários modelos têm nível gratuito, principalmente as famílias **Flash** e **Flash-Lite**, além de embeddings e TTS. A lista muda com frequência — confira na página de preços |
| Limites | Requisições por minuto e por dia, que variam por modelo. Veja seus limites atuais em [Rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) |
| Privacidade | ⚠️ No nível gratuito, o conteúdo enviado **pode ser usado pelo Google para melhorar os produtos**. Não envie dados pessoais nem sensíveis |
| Nível pago | Ao ativar o faturamento, os limites aumentam e os dados deixam de ser usados para melhorar os produtos |

## 🟢 Nível 1 — Conceitos e chave de API

- **Prompt:** o texto (e opcionalmente imagens, áudio, PDFs) que você envia ao modelo.
- **Token:** o pedaço de texto que o modelo processa. Limites e preços são contados em tokens.
- **Modelo Flash x Pro:** os modelos Flash são mais rápidos e baratos; os Pro raciocinam melhor em tarefas difíceis.
- **Temperatura:** controla quanta variação existe nas respostas. Valores baixos deixam as respostas mais previsíveis.

### Pegando a chave

1. Acesse o [Google AI Studio](https://aistudio.google.com/) com sua conta Google.
2. Teste prompts direto na interface — é o jeito mais rápido de experimentar.
3. Clique em **Get API key** e crie uma chave.
4. Guarde a chave como variável de ambiente `GEMINI_API_KEY` — **nunca** no código. Veja [Segurança de chaves e segredos](../guias/seguranca-de-chaves-e-segredos.md).

## 🟡 Nível 2 — Primeiras chamadas

### TypeScript / Node.js

```bash
npm install @google/genai
```

```ts
import { GoogleGenAI } from "@google/genai";

// Lê a chave da variável de ambiente GEMINI_API_KEY
const ai = new GoogleGenAI({});

// Confira os modelos atuais em ai.google.dev/gemini-api/docs/models
const MODELO = "gemini-2.5-flash";

const resposta = await ai.models.generateContent({
  model: MODELO,
  contents: "Explique o que é uma API REST para um estudante do primeiro semestre, em 3 frases.",
});

console.log(resposta.text);
```

### Python

```bash
pip install google-genai
```

```python
from google import genai

client = genai.Client()  # lê GEMINI_API_KEY do ambiente

resposta = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explique o que é uma API REST para um estudante do primeiro semestre, em 3 frases.",
)
print(resposta.text)
```

### Instruções de sistema

Defina o "papel" do modelo uma vez, separado da pergunta do usuário:

```ts
const resposta = await ai.models.generateContent({
  model: MODELO,
  contents: "O que é recursão?",
  config: {
    systemInstruction:
      "Você é monitor de Algoritmos. Responda em português, com um exemplo em Python, sem resolver exercícios de prova.",
  },
});
```

### Streaming (resposta aparecendo aos poucos)

```ts
const stream = await ai.models.generateContentStream({
  model: MODELO,
  contents: "Escreva um roteiro de estudos de 4 semanas para aprender SQL.",
});

for await (const pedaco of stream) {
  process.stdout.write(pedaco.text ?? "");
}
```

## 🔴 Nível 3 — Usando em um app de verdade

### Saída estruturada em JSON

Para usar a resposta no código, peça JSON com um esquema — bem mais confiável do que pedir "responda em JSON" no prompt:

```ts
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({});

const resposta = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Crie 3 perguntas de múltipla escolha sobre o modelo OSI.",
  config: {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          pergunta: { type: Type.STRING },
          alternativas: { type: Type.ARRAY, items: { type: Type.STRING } },
          correta: { type: Type.INTEGER },
        },
        required: ["pergunta", "alternativas", "correta"],
      },
    },
  },
});

const quiz = JSON.parse(resposta.text ?? "[]");
```

Mesmo com esquema, **valide** o resultado (com Zod, por exemplo) antes de salvar no banco.

### A chave nunca vai para o navegador

Num app Next.js, crie uma rota no servidor e chame a API de lá:

```ts
// src/app/api/resumo/route.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({}); // GEMINI_API_KEY só existe no servidor

export async function POST(request: Request) {
  const { texto } = await request.json();

  if (typeof texto !== "string" || texto.length > 10_000) {
    return Response.json({ erro: "Texto inválido" }, { status: 400 });
  }

  try {
    const resposta = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Resuma em tópicos curtos:\n\n${texto}`,
    });
    return Response.json({ resumo: resposta.text });
  } catch (erro) {
    console.error(erro);
    return Response.json({ erro: "Falha ao gerar o resumo" }, { status: 502 });
  }
}
```

### Lidando com os limites do nível gratuito

- **Erro 429 (limite atingido):** espere e tente de novo com intervalos crescentes (1 s, 2 s, 4 s…), e mostre uma mensagem amigável para o usuário.
- **Cache de respostas:** se muitos usuários fazem a mesma pergunta, salve a resposta no banco e reaproveite.
- **Limite por usuário:** conte quantas chamadas cada usuário fez no dia e bloqueie o excesso — senão um único usuário gasta a cota do app inteiro.
- **Escolha o modelo pelo custo:** comece pelo Flash-Lite ou Flash e só passe para um modelo maior se a qualidade não for suficiente.

Para mais cuidados (respostas erradas, privacidade, custos), veja [Boas práticas com IA](boas-praticas-ia.md).

## 🔗 Links oficiais

- [Google AI Studio](https://aistudio.google.com/)
- [Documentação da Gemini API](https://ai.google.dev/gemini-api/docs)
- [Preços e nível gratuito](https://ai.google.dev/gemini-api/docs/pricing)
- [Limites de requisições](https://ai.google.dev/gemini-api/docs/rate-limits)
