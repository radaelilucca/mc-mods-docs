---
title: Componentes e temas
description: Famílias de componentes atuais da R-Ui Lib e personalização visual.
---

# Componentes e temas

A R-Ui Lib compõe telas usando componentes. Adicione elementos a um layout raiz, como `Row`, `Column`, `Stack` ou `Grid`, e mostre essa raiz em uma `UiScreen`.

## Famílias de componentes

| Família | Exemplos | Finalidade |
| --- | --- | --- |
| Layout | `Row`, `Column`, `Stack`, `Grid`, `ScrollView`, `ClipStack` | Posicionar, agrupar, rolar e recortar conteúdo |
| Exibição | `Label`, `Panel`, `Card`, `Divider`, `ItemCard` | Apresentar texto, conteúdo agrupado e prévias de itens |
| Controles | `Button`, `IconButton`, `Toggle`, `Chip`, `Tabs`, `Select`, `TextField`, `SearchField`, `Slider` | Permitir escolhas e entrada de valores |
| Dados e retorno visual | `ItemSlot`, `InventoryGrid`, `ProgressBar`, `Table`, `Modal`, notificações toast | Selecionar itens, mostrar dados e comunicar resultados |

A API exata é definida pela versão documentada da biblioteca. Use as classes e métodos públicos dessa versão.

Veja [um exemplo de cada componente](./component-examples) para adaptar trechos focados à sua tela.

## Temas

`UiTheme.DARK` e `UiTheme.LIGHT` oferecem paletas prontas. Defina o padrão global durante a inicialização do cliente:

```java
UiThemes.setGlobalTheme(UiTheme.DARK);
```

Uma tela pode usar seu próprio `UiTheme`. Um tema personalizado combina uma `UiPalette` de cores semânticas ARGB e `UiTokens` de espaçamento, dimensões, tipografia, cantos e animações. Os componentes usam o tema ativo, exceto quando a tela ou o componente define uma personalização local.

## Sliders

Um slider pode ter um controle ou um intervalo com valores inferior e superior. Os valores são limitados à faixa e ajustados ao passo configurado; os controles do intervalo não se cruzam. A tecla Space muda o controle ativo, e os controles do teclado ajustam seu valor.

## Filtros de itens

`ItemSlot` guarda uma referência de um item e pode ser esvaziado. A integração com JEI é opcional. `InventoryGrid.playerInventory()` exibe o inventário e a hotbar do jogador; a grade também pode exibir outros contêineres. No modo de interação personalizado, o mod consumidor realiza e sincroniza as alterações.
