---
title: Filters and source priority
description: Choose which items an upgrade matches and whether it checks the backpack or linked network first.
---

# Filters and source priority

Open the upgrade's tab in the backpack to configure its filter. Filter controls vary by function and reuse the Sophisticated Backpacks filter interface. A filter decides which items or fluids can be handled; source priority decides where an eligible item is taken from or sent first. These are separate settings.

## Allow list and block list

Where the filter offers a list mode, choose **Allow list** to handle only items matching a filter slot, or **Block list** to handle items that do not match a slot. For example, put cobblestone in an Allow list to deposit or collect only cobblestone; put it in a Block list to exclude cobblestone while handling other eligible items.

Some upgrades use specialized filters: Restock uses Sophisticated's Deposit filter, Feeding accepts food, Alchemy accepts supported consumables, and Pump filters fluids. Their tab exposes the relevant controls for that function.

## Match items stored in the backpack

Pickup and Magnet use the Sophisticated contents filter, which can match against items already stored in the backpack. **Match stored items** narrows the filter to that backpack contents context; use it when you want collection to follow what the backpack already contains. This is distinct from choosing which source has priority.

## Backpack first and Linked network first

Upgrades that can use both the backpack and its linked network provide a priority control:

- **Backpack first:** try the backpack as the source or destination first, then use the network for anything that cannot be handled there.
- **Linked network first:** try the linked network first, then use the backpack for anything remaining.

For example, Remote Refill set to Backpack first takes the requested item from the backpack when possible, then fetches any remaining amount from the network. Remote Pickup set to Linked network first routes a collected item into the network when possible, then falls back to the backpack. Filters still apply whichever source or destination is tried.

Priority is available on Pickup, Magnet, Refill, Feeding, Alchemy, and Pump. Deposit always moves items from the backpack to the network, and Restock always moves items from the network to the backpack, so those two have a fixed direction instead.
