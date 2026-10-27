---
title: Component examples
description: A focused Java example for every concrete R-Ui Lib component.
---

# Component examples

Each section shows one component on its own. Add the resulting component to the root layout passed to `new UiScreen(Component.literal("Example"), root)`. These snippets assume the R-Ui Lib UI package is imported, along with `net.minecraft.network.chat.Component`, `net.minecraft.world.item.ItemStack`, `net.minecraft.world.item.Items`, and `java.util.List` where used. Replace `this::...` callbacks with methods from your mod. Create screens and access Minecraft client objects on the client only.

## Layout

### AbsoluteLayout

Place children at explicit coordinates with `Bounds`.

```java
AbsoluteLayout absolute = new AbsoluteLayout();
absolute.addAt(new Button(Component.literal("Top left"), () -> {}), new Bounds(8, 8, 90, 20));
```

### Row

Lay out controls horizontally with a gap between them.

```java
Row row = new Row(6);
row.add(new Label(Component.literal("Name")));
row.add(new TextField(Component.literal("Search")));
```

### Column

Stack a label and input vertically.

```java
Column column = new Column(4);
column.add(new Label(Component.literal("Player name")));
column.add(new TextField(Component.literal("Type a name")));
```

### Stack

Place multiple children over the same area, useful for badges or overlays.

```java
Stack stack = new Stack(Alignment.CENTER, Alignment.CENTER);
stack.add(new ItemPreview(new ItemStack(Items.DIAMOND), 32));
stack.add(new Label(Component.literal("New")));
```

### Grid

Arrange controls in a fixed number of columns.

```java
Grid grid = new Grid(2, 6);
grid.add(new Button(Component.literal("North"), () -> {}));
grid.add(new Button(Component.literal("South"), () -> {}));
```

### ScrollView

Make a vertical list scroll when its children exceed the available height.

```java
ScrollView scroll = new ScrollView(4);
for (int i = 1; i <= 12; i++) scroll.add(new Label(Component.literal("Entry " + i)));
```

### HorizontalScrollView

Keep a row of wide content accessible in a smaller screen area.

```java
HorizontalScrollView scroll = new HorizontalScrollView(6);
for (int i = 1; i <= 8; i++) scroll.add(new Button(Component.literal("Page " + i), () -> {}));
```

### ClipStack

Clip overlapping children to the container bounds.

```java
ClipStack clipped = new ClipStack(Alignment.CENTER, Alignment.CENTER);
clipped.add(new Label(Component.literal("Clipped to the stack bounds")));
```

### Spacer

Use fixed space for separation or flexible space to push controls apart.

```java
Row actions = new Row(4);
actions.add(new Button(Component.literal("Back"), () -> {}));
actions.add(Spacer.flex());
actions.add(new Button(Component.literal("Save"), () -> {}));
```

## Text and actions

### Label

Display a short piece of Minecraft text.

```java
Label status = new Label(Component.literal("Ready"));
```

### Button

Run an action after the player activates a button.

```java
Button save = new Button(Component.literal("Save"), this::saveSettings);
```

### IconButton

Provide a visible icon and a separate accessible name.

```java
IconButton lock = new IconButton(Component.literal("Unlock settings"), IconButton.Symbol.LOCK_OPEN, this::unlock);
```

### Divider

Separate related groups with a horizontal or vertical rule.

```java
Divider divider = new Divider(Divider.Orientation.HORIZONTAL);
```

### Panel

Give a group a padded background.

```java
Column content = new Column(4);
content.add(new Label(Component.literal("Audio")));
Panel panel = new Panel(content, Insets.all(8));
```

### Card

Present content as a titled, optionally selectable card.

```java
Column details = new Column(4);
details.add(new Label(Component.literal("High")));
Card card = new Card(Component.literal("Quality"), details);
```

### SelectableCard

Make a content area respond as a single selection.

```java
SelectableCard option = new SelectableCard(new Label(Component.literal("Balanced")), false, () -> selectBalanced());
```

### Tooltip

Attach explanatory text to any component; Minecraft shows it on hover or focus.

```java
Button reset = new Button(Component.literal("Reset"), this::resetSettings);
reset.tooltip(Component.literal("Restore default values"));
```

## Choice and input

### Toggle

Read a boolean choice when the player changes it.

```java
Toggle sound = new Toggle(Component.literal("Sound enabled"), true, this::setSoundEnabled);
```

### Chip

Show a compact, selectable filter.

```java
Chip available = new Chip(Component.literal("Available"), false, this::filterAvailable);
```

### Tabs

Switch between content panels while keeping them in one screen.

```java
Tabs tabs = new Tabs()
    .addTab(Component.literal("General"), new Label(Component.literal("General settings")))
    .addTab(Component.literal("Audio"), new Label(Component.literal("Audio settings")));
```

### Select

Choose one value from a list of labeled options.

```java
Select<String> quality = new Select<>(List.of(
    new Select.Option<>("low", Component.literal("Low")),
    new Select.Option<>("high", Component.literal("High"))
), "low", this::setQuality);
```

### SegmentedControl

Offer a small set of mutually exclusive choices inline.

```java
SegmentedControl<String> mode = new SegmentedControl<>(List.of(
    new SegmentedControl.Option<>("day", Component.literal("Day")),
    new SegmentedControl.Option<>("night", Component.literal("Night"))
), "day", this::setMode);
```

### TextField

Capture text and react as its value changes.

```java
TextField name = new TextField(Component.literal("World name"));
name.setMaxLength(32);
name.setResponder(this::setWorldName);
```

### SearchField

Provide a field intended for filtering a collection.

```java
SearchField search = new SearchField(Component.literal("Search items"));
search.setResponder(this::filterItems);
```

### Slider

Adjust a number over a bounded range, snapping to the configured step.

```java
Slider volume = new Slider(0, 100, 75, 5, this::setVolume)
    .setValueFormatter(value -> Math.round(value) + "%");
```

## Items and color

### ItemPreview

Render a read-only item icon at the requested size.

```java
ItemPreview preview = new ItemPreview(new ItemStack(Items.IRON_INGOT), 32);
```

### ItemCard

Present an item with a label and a click action.

```java
ItemCard recipe = new ItemCard(new ItemStack(Items.IRON_INGOT), Component.literal("Iron ingot"), this::openRecipe);
```

### ItemGrid

Display selectable item cards in a regular grid.

```java
ItemGrid items = new ItemGrid(4, 4, (index, stack) -> chooseItem(stack));
items.addItem(new ItemStack(Items.DIAMOND), Component.literal("Diamond"));
```

### ItemSlot

Hold a one-item reference and respond when it changes.

```java
ItemSlot filter = new ItemSlot();
filter.setOnItemChanged(this::setFilterItem);
```

### InventoryGrid

Show the local player's inventory for selection without removing its contents.

```java
InventoryGrid inventory = InventoryGrid.playerInventory()
    .setOnItemPicked(stack -> setFilterItem(stack.copy()));
```

For a container owned by your mod, select `InteractionMode.CUSTOM` and implement the callbacks and server synchronization in the consuming mod.

### ColorSwatch

Let the player select one RGB color from a palette.

```java
ColorSwatch accent = new ColorSwatch(0x6C8CFF, false, () -> setAccent(0x6C8CFF));
```

### ColorPicker

Edit a color with synchronized RGB sliders and hexadecimal input; commit it only when Apply is selected.

```java
ColorPicker picker = new ColorPicker(0x6C8CFF, this::setAccent, this::cancelColorEdit);
```

## Data and feedback

### ProgressBar

Show progress against an explicit range.

```java
ProgressBar progress = new ProgressBar(0, 100, 42)
    .setPercentage(true);
```

### Table

Render rows using typed column accessors.

```java
Table<String[]> table = new Table<String[]>()
    .addColumn(TableColumn.preferred(Component.literal("Item"), Alignment.START, row -> Component.literal(row[0])))
    .addColumn(TableColumn.preferred(Component.literal("Count"), Alignment.END, row -> Component.literal(row[1])))
    .setRows(List.<String[]>of(new String[] {"Iron", "16"}, new String[] {"Copper", "8"}));
```

### RadialMenu

Offer context actions around a circular selector.

```java
RadialMenu actions = new RadialMenu()
    .addSegment(new RadialSegment(Component.literal("Mark"), true, this::markTarget))
    .addSegment(new RadialSegment(Component.literal("Clear"), true, this::clearTarget));
```

### Modal

Show focused content over the current screen and handle its close event from the owning `UiScreen`.

```java
Modal confirm = new Modal(Component.literal("Delete preset?"),
    new Label(Component.literal("This action cannot be undone.")))
    .setOnClose(this::restoreFocus);
screen.showModal(confirm);
```

### ToastHost

Use the host already exposed by `UiScreen` to show short-lived feedback.

```java
screen.toastHost().success(Component.literal("Settings saved"));
```
