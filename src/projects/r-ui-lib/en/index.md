---
title: R-Ui Lib
description: A reusable UI component library for Forge and NeoForge mods.
outline: [2, 3]
---

# R-Ui Lib

R-Ui Lib gives Minecraft mods a shared set of reusable components for building clear, consistent screens. It adds no standalone screens, blocks, or items; players see it through the mods that depend on it.

| Minecraft | Loader | Minimum version |
| --- | --- | --- |
| 1.20.1 | Forge | 47.4.20 |
| 1.21.1 | NeoForge | 21.1.236 |

**Documentation reflects R-Ui Lib 0.7.0.**

## For players

Install the library alongside a compatible mod that requires it, using matching Minecraft and loader versions. The consumer mod determines which screens and features use the library.

[Installation and requirements](./player/)

## For developers

Build screens from layouts, interactive controls, item-selection components, and shared visual themes. The same component source supports the listed Forge and NeoForge targets.

- [Integration guide](./technical/integration)
- [Components and themes](./technical/components-and-themes)
- [Development playground](./technical/playground)
- [Loaders and validation](./technical/loaders-and-validation)

## Changelog

[View the R-Ui Lib changelog](./changelog)
