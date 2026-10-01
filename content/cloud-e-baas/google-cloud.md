---
description: Google Cloud para estudantes — crédito de avaliação, nível Always Free, gcloud CLI, deploy no Cloud Run e como não levar susto na fatura.
order: 4
---

# ☁️ Google Cloud

O **Google Cloud** é a nuvem completa do Google: máquinas virtuais, containers, bancos gerenciados, BigQuery, IA e muito mais. O Firebase roda em cima dele — todo projeto Firebase também é um projeto Google Cloud.

> Valores conferidos em setembro de 2026 na [documentação do programa gratuito](https://docs.cloud.google.com/free/docs/free-cloud-features).

## 📋 O que é gratuito

### Avaliação para novos clientes

- **US$ 300 em créditos para usar em 90 dias**, para contas novas.
- É preciso cadastrar uma forma de pagamento para verificar a identidade, mas a cobrança automática **não** começa quando os créditos acabam: você precisa ativar uma conta paga manualmente.

### Always Free (vale sempre, todo mês, dentro dos limites)

| Produto | Limite mensal gratuito |
| --- | --- |
| Compute Engine | 1 VM `e2-micro` não preemptiva em `us-west1`, `us-central1` ou `us-east1`, com 30 GB-mês de disco padrão |
| Cloud Storage | 5 GB-mês de armazenamento regional (só em regiões dos EUA) |
| Cloud Run | 2 milhões de requisições; 360 mil GB-segundos de memória; 180 mil vCPU-segundos |
| Cloud Run functions | 2 milhões de invocações; 400 mil GB-segundos; 200 mil GHz-segundos |
| BigQuery | 1 TiB de consultas e 10 GiB de armazenamento |
| Firestore | 1 GiB por projeto; 50 mil leituras, 20 mil escritas e 20 mil exclusões por dia |

### Créditos acadêmicos

Professores podem solicitar créditos do Google Cloud para usar em disciplinas. Se a sua turma vai usar nuvem num projeto, vale perguntar ao professor ou à coordenação — veja [Google Cloud para Educação](https://cloud.google.com/edu).

## 🟢 Nível 1 — Conceitos e primeiros passos

- **Projeto:** onde ficam todos os recursos. Cada projeto tem um ID único (`meu-tcc-2026`).
- **Conta de faturamento:** ligada ao projeto; é ela que recebe créditos e cobranças.
- **Região e zona:** onde o recurso roda fisicamente. `southamerica-east1` é São Paulo — mas atenção, o Always Free de VM e de Storage só vale em regiões dos EUA.
- **IAM:** quem pode fazer o quê. Dê a cada pessoa e serviço só as permissões de que precisa.

**Antes de criar qualquer recurso:**

1. Acesse o [console do Google Cloud](https://console.cloud.google.com/) e crie um projeto.
2. Vá em **Faturamento → Orçamentos e alertas** e crie um orçamento (por exemplo, US$ 5) com alertas em 50%, 90% e 100%.

> ⚠️ Alertas de orçamento **avisam, mas não desligam** nada. Quem controla o gasto é você.

## 🟡 Nível 2 — Seu primeiro deploy no Cloud Run

O **Cloud Run** roda qualquer container e cobra por uso — e escala até zero quando não há acesso, o que encaixa bem no nível gratuito.

Instale a [gcloud CLI](https://cloud.google.com/sdk/docs/install) e configure:

```bash
gcloud init                                  # login e escolha do projeto
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

Uma API mínima em Node.js (`index.js`):

```js
import express from "express";

const app = express();
app.get("/", (_req, res) => res.json({ ok: true, mensagem: "Olá do Cloud Run!" }));

const port = process.env.PORT ?? 8080; // o Cloud Run define a porta em PORT
app.listen(port, () => console.log(`Rodando na porta ${port}`));
```

Deploy direto do código-fonte (o Cloud Build cria o container para você):

```bash
gcloud run deploy minha-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --max-instances 2
```

No fim, o comando mostra a URL pública do serviço.

> 💡 `--max-instances 2` limita quantas cópias do serviço podem rodar ao mesmo tempo — uma proteção simples contra picos de tráfego (e de custo).

## 🔴 Nível 3 — Boas práticas de produção

### Segredos

Guarde chaves no **Secret Manager** e injete no serviço como variável de ambiente:

```bash
printf "minha-chave" | gcloud secrets create GEMINI_API_KEY --data-file=-
gcloud run deploy minha-api --source . --region us-central1 \
  --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest
```

### Deploy pelo GitHub Actions sem chave JSON

Em vez de baixar uma chave de conta de serviço (que pode vazar), use **Workload Identity Federation**: o GitHub Actions prova a identidade do workflow e recebe credenciais temporárias. A action oficial é `google-github-actions/auth`.

### Controle de custos

- **Cloud Run:** `--min-instances 0` (padrão) para escalar a zero e `--max-instances` para limitar.
- **BigQuery:** antes de rodar uma consulta, veja no editor quantos dados ela vai processar. Selecione só as colunas necessárias — `SELECT *` lê a tabela inteira.
- **Compute Engine:** VM ligada cobra mesmo parada esperando. Desligue o que não usa e apague discos órfãos.
- **Limpeza:** ao terminar um projeto de disciplina, **exclua o projeto inteiro** em vez de apagar recurso por recurso.

### Quando usar o quê

| Precisa de… | Use |
| --- | --- |
| API ou site em container | Cloud Run |
| Função pequena disparada por evento | Cloud Run functions |
| Analisar muitos dados com SQL | BigQuery |
| Controle total do sistema operacional | Compute Engine |
| Backend pronto para app web/mobile | [Firebase](firebase.md) |

## 🔗 Links oficiais

- [Programa gratuito do Google Cloud](https://cloud.google.com/free)
- [Detalhes do Free Tier e da avaliação](https://docs.cloud.google.com/free/docs/free-cloud-features)
- [Documentação do Cloud Run](https://cloud.google.com/run/docs)
- [Orçamentos e alertas](https://cloud.google.com/billing/docs/how-to/budgets)
- [Google Cloud para Educação](https://cloud.google.com/edu)
