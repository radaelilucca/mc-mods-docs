---
title: Install and use
description: Install Hotbar Locker and lock hotbar slots in game.
---

# Install and use

## Requirements

- **Minecraft 1.20.1:** Forge 47.4.0.
- **Minecraft 1.21.1:** Fabric Loader 0.16.9 and Fabric API 0.110.0+1.21.1, Forge 52.0.53, or NeoForge 21.1.236.
- Install the mod on both the client and server.
- Create is optional. On Minecraft 1.21.1, Hotbar Locker also protects locked slots from Create Toolbox equipment.

## Lock a slot

1. Open **Options → Controls → Key Binds** and find **Hotbar Locker**.
2. Assign a key to **Toggle hotbar slot lock**.
3. Select the hotbar slot to protect and press the assigned key.
4. Look for the gold frame, padlock, and confirmation message. Press the key again on that slot to unlock it.

Locks belong to your player and remain after saving, reconnecting, or respawning. The visual frame traces around the slot as it locks; the padlock appears after the trace. The selected slot's outline is gold while it remains locked.

## What a lock protects

Locks block automatic replacement. Pick block places an item in an unlocked hotbar slot when possible. If all hotbar slots are locked, Creative pick uses an available main-inventory slot; if there is no room, it leaves locked items alone. Create Toolbox equipment is redirected to an unlocked slot when possible and safely rejected when all hotbar slots are locked.

You can still select, use, consume, damage, and move locked items manually. Clearing the Creative inventory preserves locked hotbar stacks.

See [Configuration](configuration) for the key binding and the absence of editable mod configuration files.
