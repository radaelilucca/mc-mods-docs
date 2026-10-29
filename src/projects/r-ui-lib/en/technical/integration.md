---
title: Integration guide
description: Add R-Ui Lib to a Forge or NeoForge mod and use its UI API.
---

# Integrate R-Ui Lib

R-Ui Lib is a separate runtime dependency. A consumer compiles against the library JAR and declares the dependency so the game loads both mods; it does not embed the library JAR in its own artifact.

## Add the dependency

Place the runtime JAR in the consumer project, then add it to the Gradle classpath:

```groovy
dependencies {
    implementation files("libs/r_ui_lib-1.21.1-neoforge-<version>.jar")
}
```

The JAR contains loader metadata, so the mod development run can discover it. Players install the library as a separate mod.

Declare the dependency in the consuming mod's metadata. For NeoForge, a client-only dependency can be declared as:

```toml
[[dependencies.${mod_id}]]
modId="r_ui_lib"
type="required"
versionRange="[0.8.0,)"
ordering="AFTER"
side="CLIENT"
```

Match the version range and metadata format to the library release and loader target actually used by your mod.

## Use the public API

Public UI classes are in `com.radaeli.ruilib.ui`. Screen and component types that reference Minecraft client classes must be accessed from client-side code only.

Choose a global theme during client initialization:

```java
UiThemes.setGlobalTheme(UiTheme.DARK); // or UiTheme.LIGHT
```

Create controls as regular Java objects and add them to a root component. A `UiScreen` supplies the screen lifecycle, drawing, and input dispatch for the component tree.

## Item selection

`ItemSlot` stores a filter reference, not an inventory stack. `InventoryGrid` can let a player select items from an inventory without changing it. With JEI installed, supported item slots inside a `UiScreen` also accept JEI drag operations.

For containers that the consumer owns, use the grid's custom interaction mode and apply and synchronize inventory changes in the consumer. The library does not write to a container for that mode.

## Publishing and artifacts

For a local integration, build the runtime artifacts with the project Gradle wrapper and use a matching JAR. The library also provides a Maven publishing workflow; it requires a repository endpoint configured by the maintainer. Never include publishing credentials in source files.

See [loaders and validation](./loaders-and-validation) for build targets and repeatable checks.
