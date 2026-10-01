# 🤝 Como contribuir com o Hub

Ficamos felizes que você queira ajudar a comunidade acadêmica! Este guia explica onde ficam as coisas, como escrever uma página nova e como enviar a sua contribuição.

Ao participar, você concorda em seguir o nosso [Código de Conduta](CODE_OF_CONDUCT.md).

## 🧭 Formas de ajudar

- **Sugerir uma ferramenta:** abra uma [issue de sugestão](https://github.com/AnneS006/hub-google-embaixadores/issues/new/choose) — não precisa saber programar.
- **Avisar que algo mudou:** benefícios estudantis mudam o tempo todo. Viu uma regra ou link desatualizado? Abra uma issue de atualização.
- **Escrever ou atualizar uma página:** siga o passo a passo abaixo.
- **Melhorar o site:** o código fica em `src/` (Next.js + Tailwind).

## 📂 Onde fica cada coisa

```
content/                  ← todo o conteúdo do site, em Markdown
├── index.md              ← página inicial
├── guias/                ← cada pasta vira uma seção da barra lateral
├── cloud-e-baas/
├── dev-tools/
├── apis-de-ia/
└── gestao-e-design/
src/                      ← código do site (Next.js)
.github/                  ← templates de issue/PR e automações (GitHub Actions)
```

A barra lateral do site é montada sozinha a partir das pastas de `content/`. Para criar uma página nova, basta criar o arquivo `.md` na pasta certa. Para criar uma categoria nova, crie uma pasta nova e adicione o nome de exibição dela em `src/lib/site.ts` (em `sectionTitles` — a ordem ali é a ordem das seções no site).

## 📝 Modelo de página

Toda página de ferramenta é dividida em **três níveis**, para servir de quem nunca usou a ferramenta até quem vai colocar um projeto em produção:

| Nível | Responde a |
| --- | --- |
| 🟢 **Nível 1 — Iniciante** | O que é? Quem tem direito? Como conseguir o benefício? Quais os conceitos básicos? |
| 🟡 **Nível 2 — Intermediário** | Como construir algo pequeno, com código e comandos que funcionam? |
| 🔴 **Nível 3 — Avançado** | Segurança, custos, automação, arquitetura e boas práticas de produção |

Toda página também precisa de um **resumo dos limites gratuitos** com a fonte e a data da conferência.

Copie este modelo para começar:

```markdown
---
description: Uma frase resumindo a página (aparece nos buscadores e na API).
order: 5
---

# 🧩 Nome da Ferramenta

Uma ou duas frases sobre o que é a ferramenta e por que ela é útil para estudantes.

> Informações conferidas em MM/AAAA na [página oficial](https://exemplo.com).

## 📋 O que é gratuito
| Item | Limite |
| --- | --- |
| ... | ... |

## 🟢 Nível 1 — Primeiros passos
Conceitos e como ativar o benefício.

## 🟡 Nível 2 — Mão na massa
Um projeto pequeno com código.

## 🔴 Nível 3 — Produção e boas práticas
Segurança, custos e automação.

## 🔗 Links oficiais
- [Página oficial](https://exemplo.com)
```

- O título na barra lateral vem do primeiro `#` do arquivo (sem o emoji). Se quiser outro, use `title:` no bloco do topo.
- `order:` define a posição da página dentro da seção (menor primeiro).
- Os títulos `##` aparecem no índice "Nesta página", ao lado do conteúdo.
- Textos começando com `>` viram caixas de aviso — use para ⚠️ alertas e 💡 dicas.

**Regras de ouro:**
- Sempre cite a fonte oficial e a data em que você conferiu.
- Nada de links de pirataria ou formas de burlar a verificação estudantil.
- Prefira links relativos entre páginas do Hub (ex: `../dev-tools/github-student-pack.md`) — eles funcionam no GitHub e no site.

## 💻 Rodando o site localmente

Requer [Node.js](https://nodejs.org/) 20 ou mais recente.

```bash
npm install
npm run dev      # abre em http://localhost:3000
npm run lint     # verifica o código
npm run build    # gera o site estático em out/
```

## 🔄 Fluxo de contribuição (Pull Requests)

1. Faça o **Fork** do projeto.
2. Crie sua branch: `git checkout -b feat/nova-ferramenta`.
3. Faça commits seguindo os [Commits Semânticos](https://www.conventionalcommits.org/pt-br/):
   - `feat: adiciona Canva Pro` — conteúdo ou funcionalidade nova
   - `fix: atualiza link do Firebase` — correção
   - `docs: melhora o guia de contribuição` — documentação do projeto
4. Faça o push e abra seu **Pull Request** preenchendo o checklist do template.

Ao abrir o PR, duas verificações rodam sozinhas: o **build do site** e o **verificador de links**. Se alguma ficar vermelha, clique em *Details* para ver o que corrigir. Depois do merge, o site é publicado automaticamente.
