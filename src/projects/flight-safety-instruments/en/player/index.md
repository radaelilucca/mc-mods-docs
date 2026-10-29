---
title: Install and use
---

# Install and use

## Requirements

- Minecraft 1.21.1 and NeoForge 21.1.236 or newer
- Create 6.0.10 or newer and Create Aeronautics 1.3 or newer
- Sable 2.0.5 or newer
- CC:Tweaked 1.120.0 or newer
- R-Ui Lib 0.8.0 or newer

Create Aeronautics is bundled with the mod. Install Fly by Instruments and its required dependencies on both the client and server.

## Start playing

Craft the sensors, place them in your craft, and connect redstone components or Create Redstone Links. Open [Sensors](sensors) for placement, block controls, and output configuration.

To give the craft a GPWS, place an [Avionics Computer](avionics-computer), connect it and the sensors with the [Avionics Wire](avionics-network), and show its alerts on a [Modular Table](modular-table) with lamps and buzzers. These blocks are Experimental: they can be crafted, but they may still change between versions.

Hold **Shift** over any block or module in your inventory for a short summary of what it does and how to use it, in the same style as Create's tooltips.

## Crafting

All blocks are in the **Aeronautics: Fly by Instruments** creative tab. Every block except the Avionics Network Bridge has a recipe; look them up in your recipe viewer. The main ingredients are:

| Item | Made from |
| --- | --- |
| Radar Altimeter | Iron sheets, electron tubes, a brass casing and an observer |
| Terrain Scanner | Iron sheets, electron tubes, a brass casing and an observer |
| Advanced Terrain Scanner | A Terrain Scanner, a precision mechanism and electron tubes |
| Avionics Computer | Brass sheets, a precision mechanism, electron tubes, a block of industrial iron and a comparator |
| Modular Table Base | Brass sheets around a brass casing |
| Lamp Module (1×1) | A redstone lamp, brass sheets, an electron tube and a precision mechanism |
| Lamp Module (2×1) | Two Lamp Modules (1×1), shapeless |
| Buzzer Module (1×1) | A note block, iron sheets, electron tubes, a block of industrial iron and a precision mechanism |
| FMS | A compass, brass and iron sheets, electron tubes, a precision mechanism and a button |
| FMS Compass | A compass, brass sheets, an electron tube, precision mechanisms and iron nuggets |
| Avionics Wire (×8) | Dried kelp wrapped in brass sheets |
| Wire Connector (×4) | Brass sheets, brass ingots, an electron tube and an iron nugget |
| Wire Support (×8) | Iron sheets and a block of industrial iron |

## Computers

Every computer feature is in the [Computer Craft guide](computer-craft): connect a computer and read sensors or avionics peripherals with Lua.
