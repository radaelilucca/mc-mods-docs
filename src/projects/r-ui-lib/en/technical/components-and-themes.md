---
title: Components and themes
description: Current R-Ui Lib component families and appearance customization.
---

# Components and themes

R-Ui Lib builds screens from composable components. Add children to a root layout such as `Row`, `Column`, `Stack`, or `Grid`, then display the root in a `UiScreen`.

## Component families

| Family | Examples | Purpose |
| --- | --- | --- |
| Layout | `Row`, `Column`, `Stack`, `Grid`, `ScrollView`, `ClipStack` | Position, group, scroll, and clip content |
| Display | `Label`, `Panel`, `Card`, `Divider`, `ItemCard` | Present text, grouped content, and item previews |
| Controls | `Button`, `IconButton`, `Toggle`, `Chip`, `Tabs`, `Select`, `Radio`, `RadioGroup`, `SegmentedControl`, `Stepper`, `TextField`, `SearchField`, `Slider` | Let players make choices and enter values |
| Data and feedback | `ItemSlot`, `InventoryGrid`, `ProgressBar`, `Table`, `Modal`, toast notifications | Select items, show data, and communicate results |

The exact API is defined by the documented library release. Use that release's public classes and methods.

`RadioGroup<T>` presents mutually exclusive options vertically, including optional hints and disabled options. It supports an empty initial selection; mouse selection commits on release, while Up/Down moves and commits and Home/End selects the first or last enabled option. `Stepper<T>` edits a bounded number or cycles through a supplied option model with arrow buttons, mouse wheel, and keyboard. Tooltips can be position-aware: components such as `Stepper` can return a tooltip only over the part of their bounds where it applies.

See [one example for every component](./component-examples) for focused snippets you can adapt to your screen.

## Themes

`UiTheme.DARK` and `UiTheme.LIGHT` provide built-in palettes. Set the global default during client initialization:

```java
UiThemes.setGlobalTheme(UiTheme.DARK);
```

A screen can use its own `UiTheme`. A custom theme combines a `UiPalette` of semantic ARGB colors with `UiTokens` for spacing, dimensions, typography, corner radii, and motion. Components use the active theme unless a component or screen supplies a local override.

## Sliders

Sliders support a single handle or an optional range with a lower and upper value. Values are clamped and snapped to the configured step; range handles cannot cross. The focused handle can be changed with Space, and keyboard controls adjust its value.

## Item filters

`ItemSlot` holds a one-item reference and can be cleared. JEI integration is optional. `InventoryGrid.playerInventory()` displays the player's inventory and hotbar; custom containers can use `InventoryGrid` too. In custom interaction mode, the consumer handles writes and server synchronization.
