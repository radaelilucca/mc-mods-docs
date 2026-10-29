---
title: Exemplos de componentes
description: Um exemplo Java focado para cada componente concreto da R-Ui Lib.
---

# Exemplos de componentes

Cada seção apresenta um componente individualmente. Adicione o componente ao layout raiz passado para `new UiScreen(Component.literal("Example"), root)`. Os trechos presumem imports do pacote de interface da R-Ui Lib, além de `net.minecraft.network.chat.Component`, `net.minecraft.world.item.ItemStack`, `net.minecraft.world.item.Items` e `java.util.List` quando usados. Substitua callbacks `this::...` por métodos do seu mod. Crie telas e acesse objetos de cliente Minecraft apenas no cliente.

## Layout

### AbsoluteLayout

Posicione elementos em coordenadas específicas usando `Bounds`.

```java
AbsoluteLayout absolute = new AbsoluteLayout();
absolute.addAt(new Button(Component.literal("Superior esquerdo"), () -> {}), new Bounds(8, 8, 90, 20));
```

### Row

Organize controles na horizontal com espaçamento entre eles.

```java
Row row = new Row(6);
row.add(new Label(Component.literal("Nome")));
row.add(new TextField(Component.literal("Buscar")));
```

### Column

Empilhe um texto e um campo verticalmente.

```java
Column column = new Column(4);
column.add(new Label(Component.literal("Nome do jogador")));
column.add(new TextField(Component.literal("Digite um nome")));
```

### Stack

Sobreponha elementos na mesma área, útil para selos e sobreposições.

```java
Stack stack = new Stack(Alignment.CENTER, Alignment.CENTER);
stack.add(new ItemPreview(new ItemStack(Items.DIAMOND), 32));
stack.add(new Label(Component.literal("Novo")));
```

### Grid

Distribua controles em um número fixo de colunas.

```java
Grid grid = new Grid(2, 6);
grid.add(new Button(Component.literal("Norte"), () -> {}));
grid.add(new Button(Component.literal("Sul"), () -> {}));
```

### ScrollView

Permita rolagem vertical quando os filhos ultrapassarem a altura disponível.

```java
ScrollView scroll = new ScrollView(4);
for (int i = 1; i <= 12; i++) scroll.add(new Label(Component.literal("Entrada " + i)));
```

### HorizontalScrollView

Mantenha conteúdo largo acessível em uma tela mais estreita.

```java
HorizontalScrollView scroll = new HorizontalScrollView(6);
for (int i = 1; i <= 8; i++) scroll.add(new Button(Component.literal("Página " + i), () -> {}));
```

### ClipStack

Recorte os filhos aos limites do contêiner.

```java
ClipStack clipped = new ClipStack(Alignment.CENTER, Alignment.CENTER);
clipped.add(new Label(Component.literal("Recortado nos limites do contêiner")));
```

### Spacer

Use espaço fixo para separar itens ou espaço flexível para afastar controles.

```java
Row actions = new Row(4);
actions.add(new Button(Component.literal("Voltar"), () -> {}));
actions.add(Spacer.flex());
actions.add(new Button(Component.literal("Salvar"), () -> {}));
```

## Texto e ações

### Label

Exiba um pequeno texto do Minecraft.

```java
Label status = new Label(Component.literal("Pronto"));
```

### Button

Execute uma ação quando o jogador ativar o botão.

```java
Button save = new Button(Component.literal("Salvar"), this::saveSettings);
```

### IconButton

Exiba um ícone com um nome acessível separado.

```java
IconButton lock = new IconButton(Component.literal("Desbloquear opções"), IconButton.Symbol.LOCK_OPEN, this::unlock);
```

### Divider

Separe grupos relacionados com uma linha horizontal ou vertical.

```java
Divider divider = new Divider(Divider.Orientation.HORIZONTAL);
```

### Panel

Dê um fundo com espaçamento interno a um grupo de conteúdo.

```java
Column content = new Column(4);
content.add(new Label(Component.literal("Áudio")));
Panel panel = new Panel(content, Insets.all(8));
```

### Card

Apresente conteúdo em um cartão com título e seleção opcional.

```java
Column details = new Column(4);
details.add(new Label(Component.literal("Alta")));
Card card = new Card(Component.literal("Qualidade"), details);
```

### SelectableCard

Faça uma área de conteúdo responder como uma opção única.

```java
SelectableCard option = new SelectableCard(new Label(Component.literal("Equilibrado")), false, () -> selectBalanced());
```

### Tooltip

Adicione uma explicação a qualquer componente. O Minecraft a mostra ao passar o cursor ou focar o componente.

```java
Button reset = new Button(Component.literal("Redefinir"), this::resetSettings);
reset.tooltip(Component.literal("Restaurar valores padrão"));
```

## Escolhas e entrada

### Toggle

Leia uma escolha booleana quando o jogador a alterar.

```java
Toggle sound = new Toggle(Component.literal("Som ativado"), true, this::setSoundEnabled);
```

### Chip

Mostre um filtro compacto que pode ser selecionado.

```java
Chip available = new Chip(Component.literal("Disponível"), false, this::filterAvailable);
```

### Tabs

Alterne entre painéis de conteúdo na mesma tela.

```java
Tabs tabs = new Tabs()
    .addTab(Component.literal("Geral"), new Label(Component.literal("Opções gerais")))
    .addTab(Component.literal("Áudio"), new Label(Component.literal("Opções de áudio")));
```

### Select

Escolha um valor em uma lista de opções rotuladas.

```java
Select<String> quality = new Select<>(List.of(
    new Select.Option<>("low", Component.literal("Baixa")),
    new Select.Option<>("high", Component.literal("Alta"))
), "low", this::setQuality);
```

### RadioGroup

Exiba opções exclusivas em uma lista vertical. Cada opção pode incluir uma dica e ser desabilitada.

```java
RadioGroup<String> qualidade = new RadioGroup<>(List.of(
    new RadioGroup.Option<>("low", Component.literal("Baixa"), Component.literal("Mais rápida"), true),
    new RadioGroup.Option<>("high", Component.literal("Alta"), Component.literal("Mais detalhes"), true)
), "low", this::setQuality);
```

### Stepper

Altere um número inteiro limitado com setas, roda do mouse ou teclado.

```java
Stepper<Integer> quantidade = Stepper.ofRange(Component.literal("Quantidade"), 1, 16, 1, 4, this::setCount);
```

### SegmentedControl

Ofereça poucas opções mutuamente exclusivas em linha.

```java
SegmentedControl<String> mode = new SegmentedControl<>(List.of(
    new SegmentedControl.Option<>("day", Component.literal("Dia")),
    new SegmentedControl.Option<>("night", Component.literal("Noite"))
), "day", this::setMode);
```

### TextField

Receba texto e reaja conforme o valor mudar.

```java
TextField name = new TextField(Component.literal("Nome do mundo"));
name.setMaxLength(32);
name.setResponder(this::setWorldName);
```

### SearchField

Use um campo voltado à filtragem de uma coleção.

```java
SearchField search = new SearchField(Component.literal("Buscar itens"));
search.setResponder(this::filterItems);
```

### Slider

Altere um número dentro de uma faixa, ajustando-o ao passo configurado.

```java
Slider volume = new Slider(0, 100, 75, 5, this::setVolume)
    .setValueFormatter(value -> Math.round(value) + "%");
```

## Itens e cores

### ItemPreview

Renderize um ícone de item apenas para visualização no tamanho desejado.

```java
ItemPreview preview = new ItemPreview(new ItemStack(Items.IRON_INGOT), 32);
```

### ItemCard

Apresente um item com rótulo e ação ao clicar.

```java
ItemCard recipe = new ItemCard(new ItemStack(Items.IRON_INGOT), Component.literal("Barra de ferro"), this::openRecipe);
```

### ItemGrid

Exiba cartões de itens selecionáveis em uma grade.

```java
ItemGrid items = new ItemGrid(4, 4, (index, stack) -> chooseItem(stack));
items.addItem(new ItemStack(Items.DIAMOND), Component.literal("Diamante"));
```

### ItemSlot

Guarde uma referência de um item e reaja quando ela mudar.

```java
ItemSlot filter = new ItemSlot();
filter.setOnItemChanged(this::setFilterItem);
```

### InventoryGrid

Exiba o inventário local para selecionar itens sem removê-los.

```java
InventoryGrid inventory = InventoryGrid.playerInventory()
    .setOnItemPicked(stack -> setFilterItem(stack.copy()));
```

Para um contêiner controlado pelo mod consumidor, selecione `InteractionMode.CUSTOM` e implemente os callbacks e a sincronização com o servidor nesse mod.

### ColorSwatch

Permita que o jogador selecione uma cor RGB de uma paleta.

```java
ColorSwatch accent = new ColorSwatch(0x6C8CFF, false, () -> setAccent(0x6C8CFF));
```

### ColorPicker

Edite uma cor com controles RGB e entrada hexadecimal sincronizados; a alteração só é aplicada ao selecionar Apply.

```java
ColorPicker picker = new ColorPicker(0x6C8CFF, this::setAccent, this::cancelColorEdit);
```

## Dados e notificações

### ProgressBar

Mostre o progresso dentro de uma faixa explícita.

```java
ProgressBar progress = new ProgressBar(0, 100, 42)
    .setPercentage(true);
```

### Table

Renderize linhas com acessores tipados por coluna.

```java
Table<String[]> table = new Table<String[]>()
    .addColumn(TableColumn.preferred(Component.literal("Item"), Alignment.START, row -> Component.literal(row[0])))
    .addColumn(TableColumn.preferred(Component.literal("Quantidade"), Alignment.END, row -> Component.literal(row[1])))
    .setRows(List.<String[]>of(new String[] {"Ferro", "16"}, new String[] {"Cobre", "8"}));
```

### RadialMenu

Ofereça ações contextuais em um seletor circular.

```java
RadialMenu actions = new RadialMenu()
    .addSegment(new RadialSegment(Component.literal("Marcar"), true, this::markTarget))
    .addSegment(new RadialSegment(Component.literal("Limpar"), true, this::clearTarget));
```

### Modal

Mostre conteúdo sobre a tela atual e trate o fechamento pela `UiScreen` proprietária.

```java
Modal confirm = new Modal(Component.literal("Excluir predefinição?"),
    new Label(Component.literal("Esta ação não pode ser desfeita.")))
    .setOnClose(this::restoreFocus);
screen.showModal(confirm);
```

### ToastHost

Use o host disponível em `UiScreen` para exibir notificações temporárias.

```java
screen.toastHost().success(Component.literal("Opções salvas"));
```
