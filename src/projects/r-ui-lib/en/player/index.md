---
title: Install R-Ui Lib
description: How to install the R-Ui Lib dependency and which Minecraft versions it supports.
---

# Install R-Ui Lib

R-Ui Lib is a library used by other mods. It does not add a screen or gameplay feature by itself.

## Requirements

| Minecraft | Loader | Minimum loader version |
| --- | --- | --- |
| 1.20.1 | Forge | 47.4.20 |
| 1.21.1 | NeoForge | 21.1.236 |

Install the version that matches your Minecraft version and mod loader. Keep R-Ui Lib and the mod that requires it on the same Minecraft and loader setup. Install it on the client and server when the dependent mod requests it.

## Install

1. Download the R-Ui Lib runtime JAR for your Minecraft version and loader from the [project's release page](https://github.com/radaelilucca/mc-r-ui-lib/releases).
2. Place the runtime JAR in your Minecraft instance's `mods` folder.
3. Install the mod that uses the library, together with any of that mod's other required dependencies.
4. Start the game with the matching loader profile.

The sources JAR is for developers browsing the library code; it does not belong in the `mods` folder.

## What players will see

The mod that depends on R-Ui Lib provides the screen and controls. Depending on that mod, these may include menus, settings, item filters, inventory grids, color previews, or theme customization.

JEI is optional. Mods can use the library without it; supported item-filter controls can accept items dragged from JEI when it is installed.

## Troubleshooting

- If Minecraft reports a missing dependency, install R-Ui Lib for the same Minecraft version and loader as the dependent mod.
- If a version mismatch appears, update or choose matching builds of the library and the mod that requires it.
- Report problems to the mod that owns the affected screen. Include Minecraft and loader versions, the dependent mod, reproduction steps, and a relevant log excerpt.

[Report an issue with R-Ui Lib](https://github.com/radaelilucca/mc-r-ui-lib/issues)
