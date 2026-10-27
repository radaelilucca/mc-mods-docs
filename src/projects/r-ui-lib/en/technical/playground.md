---
title: UI playground
description: Explore and save interface component layouts in R-Ui Lib development runs.
---

# UI playground

The playground is a development tool for arranging components, inspecting their properties, and previewing interactions inside Minecraft.

## Open it

Start a development client and press **F7** to open the playground. The screen is available in development runs, not in production installations. **F8** opens the item-selection example; **F6** shows a sample toast sequence. These key bindings can be changed in Controls.

## Edit and preview

Drag components from the palette to the canvas. Nest them in layout containers, adjust properties in the inspector, and switch between **Edit** and **Preview**. Preview lets you try controls and layout behavior before returning to editing.

The bundled examples cover basic controls, input, layouts, data, status, and scrolling. They load directly from the mod and are available before the player saves a layout.

JEI can provide item drag-and-drop for supported item slots when installed. The item-selection example also shows how an inventory item can be referenced without removing it.

## Save and load

Save a named layout from the toolbar. Layouts are written to `config/r_ui_lib/ui-playground/` in the game directory. The **Load** picker lists bundled examples and saved layouts. Demonstration callbacks are created by the playground and are not written into layout JSON.

Layouts use schema version `1`. Invalid files are rejected with an on-screen error so the game can remain open.
