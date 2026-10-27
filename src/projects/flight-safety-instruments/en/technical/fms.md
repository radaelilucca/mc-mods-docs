---
title: Flight Management System
---

# Flight Management System

![FMS module](../../assets/fms-module.png)

The FMS is a virtual 2×3 module installed in a Modular Table. It stores waypoints with UUID, name (1–32 characters), dimension, and integer block coordinates. Fractional Lua coordinates are floored, including negative values. Removing the module or breaking the table stores its data in the `fms_module` item. Duplicate module UUIDs are replaced when both copies are present in a loaded world.

The table peripheral exposes `getFmsWaypoints(column, row)`, `createWaypoint(column, row, name, x, y, z)`, `updateWaypoint(column, row, id, name, x, y, z)`, `deleteWaypoint(column, row, id)`, `selectWaypoint(column, row, id)`, and `clearWaypointSelection(column, row)`. Coordinates are 1-based table grid coordinates. Editing preserves the waypoint's dimension; creating uses the current dimension.

`getFmsSignals(column, row)` reads the FMS channels. `waypoint_selected` is a boolean `VALID` reading. `distance_to_waypoint` is horizontal X/Z distance in blocks and is `UNAVAILABLE` when no target exists or it is in another dimension. `modular_table_fms_waypoint_changed` and `modular_table_fms_signal_changed` notify server-confirmed updates. `getNetworkSignals()` also reads typed channels published by endpoints on the complete physical cable network; virtual-module channels include `module_column` and `module_row`.

An `fms_navigator` can be associated with the exact module through its Navigator UI tab; the item is not consumed. Replacing a Navigator already associated with a different FMS requires explicit confirmation. The Aeronautics Navigation Table resolves only a loaded FMS in the same level and Sable sublevel, and does not load chunks. The compass target follows the selected waypoint horizontally; Y does not affect its direction. The FMS does not feed alerts into GPWS.
