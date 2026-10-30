---
title: Linking
description: Link a remote upgrade to AE2, Refined Storage, or Tom's Simple Storage.
---

# Linking

Each remote upgrade stores its own link to one network endpoint. All eight upgrade types use the same linking method; each type can link to Applied Energistics 2, Refined Storage, or Tom's Simple Storage. On NeoForge 1.21.1 with SCC 1.5.3 or newer installed, they can also link to Super Cool Calculator. You do not need a network-specific version of the upgrade.

## Link an upgrade

1. Craft the remote upgrade you want to use.
2. Hold it in either hand.
3. **Shift-right-click** a compatible block belonging to the network you want to use:
   - **AE2:** ME Wireless Access Point.
   - **Refined Storage:** Controller.
   - **Tom's Simple Storage:** Storage Terminal.
   - **SCC (NeoForge 1.21.1 only):** Network Antenna.
4. A confirmation appears when the link is saved. Put the upgrade into a backpack upgrade slot and open its tab to configure the function.

The player must be allowed to interact with the block and access the network. Network availability, wireless range, and permissions remain controlled by the storage mod. The upgrade does not create wireless access or bypass these rules.

SCC gameplay support requires version 1.5.3 or newer; full in-game validation is still pending.

## Change or remove a link

To switch networks, hold the upgrade and Shift-right-click a compatible block in the new network. The new endpoint replaces the old link; the upgrade's filters and other settings stay with it.

To unlink while keeping the settings, craft the upgrade by itself in a crafting grid. This removes its network endpoint. Crafting or relinking is temporarily blocked while an upgrade has items or fluids pending recovery; recover those first.

An upgrade can report that its network is unavailable if the backend mod is missing, the endpoint is unloaded or missing, its dimension is unavailable, or access is denied. The stored link is retained when a backend mod is absent.
