---
title: Changelog da R-Ui Lib
description: Histórico de versões da R-Ui Lib.
---

# Changelog da R-Ui Lib

## [0.8.0] - 2026-10-28

### Adicionado

- Adicionados botões de opção e grupos verticais com dicas, opções desabilitadas e navegação pelo teclado.
- Adicionados steppers para números limitados e listas de opções, com setas, roda do mouse e teclado.
- Adicionadas tooltips posicionais, para que um componente possa exibir sua dica em apenas parte de sua área.

## [0.7.0] - 2026-10-26

### Adicionado

- Adicionados cards selecionáveis com controles filhos independentes e foco pelo teclado.
- Adicionada seleção segmentada com opções desabilitadas e navegação pelo teclado.
- Adicionados ícones integrados de cadeado aberto e fechado.

### Corrigido

- Corrigidas as tooltips personalizadas nas amostras de cores.

## [0.6.0] - 2026-10-26

### Adicionado

- Adicionadas prévias de itens redimensionáveis e amostras de cores selecionáveis.
- Adicionado seletor de cores RGB e hexadecimal com prévia, aplicar e cancelar.
- Adicionada rolagem horizontal e fundos locais opcionais para painéis.

### Corrigido

- Corrigidas prévias de itens que apareciam sobre diálogos modais.

## [0.5.0] - 2026-10-14

### Adicionado

- Adicionado suporte a Forge 1.20.1 junto ao NeoForge 1.21.1, com a mesma API de componentes e playground de desenvolvimento.
- Adicionado um layout de referência pronto para carregar para cada categoria de componentes do playground, disponível antes mesmo de salvar um layout.

### Corrigido

- Corrigidas a seleção de texto ao arrastar e a posição do cursor em campos de texto nos dois loaders suportados.

## [0.4.0] - 2026-10-09

### Adicionado

- Adicionada seleção por menu com descrições de opções, navegação pelo teclado, rolagem do mouse e menus que permanecem visíveis fora de painéis roláveis.
- Adicionadas leituras personalizáveis para sliders, com porcentagens e outras unidades.
- Adicionado alinhamento centralizado de abas e métodos auxiliares para atualizar botões e seletores de itens.

### Corrigido

- Adicionado um pequeno espaço entre linhas de texto de notificações toast para facilitar a leitura.

## [0.3.0] - 2026-10-07

### Adicionado

- Adicionada seleção opcional com dois controles para intervalos ordenados, com suporte a mouse, rolagem, teclado e edição no playground.
- Adicionadas ações interativas opcionais nos cabeçalhos de diálogos.

### Alterado

- Aumentado o espaçamento entre o conteúdo toast e a faixa de destaque à esquerda.
- Traduzida toda a documentação para inglês dos EUA e adicionado um README que identifica claramente a biblioteca como alpha e em construção.

### Corrigido

- Corrigidas cintilações no fim dos fades de toast e de texto, e mantidas as faixas de destaque dentro das bordas arredondadas.
- Corrigidos o alinhamento vertical do texto e os cliques na área interna dos campos de texto.
- Corrigidos os cantos internos das abas para que abas adjacentes formem uma faixa contínua.
- Corrigido o posicionamento de tooltips temáticas sobre itens renderizados.
- Corrigidos o alinhamento de linhas e colunas e permitido que telas reservem os limites visíveis do painel para o JEI.

## [0.2.0] - 2026-10-06

### Adicionado

- Adicionada `InventoryGrid` para renderizar contêineres genéricos ou o inventário principal e a hotbar do jogador, com um modo de seleção que copia itens para `ItemSlot` sem alterar o inventário de origem.
- Adicionados callbacks de interação personalizados, dimensões configuráveis do grid e destaque sutil da hotbar no layout de inventário do jogador.
- Adicionados fundos configuráveis para `ItemSlot`, com cores nomeadas do tema e valores ARGB arbitrários, incluindo controles no inspetor do playground.
- Adicionada uma tela de exemplo para testar inventários e a transferência de itens do JEI para slots fantasma.

O [CHANGELOG no repositório](https://github.com/radaelilucca/mc-r-ui-lib/blob/main/CHANGELOG.md) é o registro oficial das versões.
