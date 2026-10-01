---
description: Figma e FigJam grátis para estudantes — plano educacional, verificação, wireframes, componentes, Auto Layout, protótipos e handoff para o código.
order: 1
---

# 🎨 Figma

O **Figma** é a ferramenta de design de interfaces mais usada no mercado. Funciona no navegador, permite várias pessoas editando ao mesmo tempo e inclui o **FigJam**, um quadro branco para brainstorms e fluxos. Estudantes e professores usam os recursos profissionais **de graça** com o plano educacional.

> Informações conferidas em setembro de 2026 na [página do Figma para Educação](https://www.figma.com/education/).

## 🟢 Nível 1 — Ativando o plano educacional

1. Crie uma conta no Figma com seu **e-mail de estudante**.
2. **Faça a verificação** pelo link que o Figma envia depois do cadastro.
3. **Crie o seu time educacional** para liberar os recursos profissionais pagos.

### Conceitos básicos

- **Frame:** a "tela" (um celular, um desktop). Atalho `F`.
- **Camadas:** cada elemento (texto, retângulo, imagem) fica na lista à esquerda.
- **Componente:** um elemento reutilizável (um botão, um card). Mudou o principal, mudam todas as cópias.
- **Protótipo:** liga frames com cliques para simular o app navegando.
- **FigJam:** para fluxos de usuário, mapas de ideias e dinâmicas em grupo (como os 6 Chapéus do Pensamento).

## 🟡 Nível 2 — Do rascunho ao protótipo

1. **Comece no FigJam:** desenhe o fluxo principal (por exemplo: login → lista → detalhe → criar).
2. **Wireframe em baixa fidelidade:** retângulos cinza e textos, sem cor. Valide o fluxo antes de caprichar no visual.
3. **Defina estilos:** cores, tipografia e espaçamentos como *variables* e *styles*, para manter tudo consistente.
4. **Use Auto Layout** (`Shift + A`): os elementos se reorganizam sozinhos quando o conteúdo muda — e o comportamento é parecido com o *flexbox* do CSS.
5. **Crie componentes com variantes:** um único componente "Botão" com as variantes primário/secundário e normal/desabilitado.
6. **Monte o protótipo:** na aba **Prototype**, ligue os botões às telas e teste no modo apresentação (ou no app do Figma no celular).

> 💡 Pense em **8 px**: espaçamentos múltiplos de 8 (8, 16, 24, 32) deixam a interface organizada e combinam com as escalas do Tailwind CSS.

## 🔴 Nível 3 — Design system e handoff para o código

### Um mini design system para o projeto

| Peça | No Figma | No código |
| --- | --- | --- |
| Cores | Variables (`cor/primaria`, `cor/fundo`) com modos claro e escuro | Variáveis CSS ou `theme.extend.colors` no Tailwind |
| Tipografia | Text styles (`Título 1`, `Corpo`) | Classes utilitárias ou componentes de texto |
| Espaçamento | Variables numéricas | Escala de espaçamento do CSS/Tailwind |
| Componentes | Botão, Input, Card com variantes | Componentes React com as mesmas *props* |

Dar os **mesmos nomes** no Figma e no código facilita muito a conversa entre quem desenha e quem programa.

### Handoff

- O **modo de inspeção** mostra medidas, cores e trechos de CSS de cada elemento.
- Exporte ícones em **SVG** e imagens em **WebP** ou PNG, nos tamanhos certos.
- Deixe comentários nas telas explicando estados que não aparecem no protótipo: carregando, vazio, erro.

### Acessibilidade desde o design

- **Contraste:** texto normal precisa de contraste mínimo de 4,5:1 com o fundo (critério WCAG AA). Há plugins que verificam isso.
- **Área de toque:** botões com pelo menos 44 × 44 px no celular.
- **Não dependa só de cor:** um erro deve ter ícone ou texto, não só borda vermelha.

## 🔗 Links oficiais

- [Figma para Educação](https://www.figma.com/education/)
- [Central de ajuda do Figma](https://help.figma.com/)
