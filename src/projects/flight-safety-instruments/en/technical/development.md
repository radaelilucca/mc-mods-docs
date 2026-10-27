---
title: Development setup
---

# Development setup

This guide is for people building or extending the mod. Player-facing CC:Tweaked APIs and in-game examples are documented under [For players](../player/computer-craft).

## Build environment

The current source targets Java 21, Minecraft 1.21.1, and NeoForge 21.1.236. Development also uses Create 6.0.10+, Create Aeronautics 1.3+, Sable 2.0.5, CC:Tweaked 1.120.0+, and R-Ui Lib 0.5.0+. Create Aeronautics is bundled in the mod; Create, Aeronautics, Sable, CC:Tweaked, and R-Ui Lib are local compile/runtime dependencies for development.

```powershell
.\gradlew.bat build
.\gradlew.bat runClient
```

The source repository's [development guide](https://github.com/radaelilucca/mc-fly-by-instruments/blob/main/docs/development.md) documents dependency JAR configuration, GameTest tasks, and release scope. Start from the [mod source](https://github.com/radaelilucca/mc-fly-by-instruments).
