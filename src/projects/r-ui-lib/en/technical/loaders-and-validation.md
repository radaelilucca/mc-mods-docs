---
title: Loaders and validation
description: R-Ui Lib Minecraft targets, shared code, and repeatable build checks.
---

# Loaders and validation

R-Ui Lib builds two loader artifacts from shared UI code. Loader-specific modules provide bootstrap and API bridges.

| Minecraft | Loader | Loader baseline | Java |
| --- | --- | --- | --- |
| 1.20.1 | Forge | 47.4.20 | 17 |
| 1.21.1 | NeoForge | 21.1.236 | 21 |

Use a Java 21 Gradle runtime for this multi-loader workspace. Gradle toolchains select Java 17 for Forge 1.20.1 and Java 21 for NeoForge 1.21.1.

## Build both artifacts

From the R-Ui Lib repository, run:

```powershell
.\scripts\dev.ps1 -Task buildAll
```

The repository also documents separate loader builds and client runs. Its development script can locate local JDK installations or accept explicit Java 17 and Java 21 paths.

## Validate changes

When changing a shared component, layout, theme, or example, validate both loader targets. Keep the built-in playground catalog and its bundled layouts aligned, and test client-only API access from a development client.

The checked-in repository has loader-specific build and parity instructions in its Forge/NeoForge guide. Record exactly which commands and runtimes were used when reporting validation; a successful compile alone does not establish in-game behavior.
