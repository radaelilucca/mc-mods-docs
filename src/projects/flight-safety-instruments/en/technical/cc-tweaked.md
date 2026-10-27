---
title: CC:Tweaked API and examples
---

# CC:Tweaked API and examples

Each instrument is its own peripheral. Connect a computer or wired modem directly to the block, or use a wired modem network. The Avionics Cable Network is a separate data network: the Network Bridge reports its topology, while endpoints still expose their own readings. A `modular_table` can additionally query typed readings from a complete cable network with `getNetworkSignals()`.

## Find peripherals

`peripheral.find(type)` returns the first matching peripheral. For multiple instruments, use `peripheral.find(type, callback)` to keep the attachment name, or enumerate `peripheral.getNames()` and inspect each device. Methods below are called with dot syntax in CC:Tweaked.

```lua
local altimeter = assert(peripheral.find("radar_altimeter"), "Altimeter missing")
local reading = altimeter.getReading()
if reading.status == "valid" then
  print(string.format("Clearance: %.1f %s", reading.value, reading.unit))
else
  print("No valid clearance:", reading.status)
end
```

## Peripheral index

| Type | Main methods | Events |
| --- | --- | --- |
| `radar_altimeter` | `getReading()`, output configuration methods | `radar_altimeter_reading_changed` |
| `terrain_scanner` | `getScan()`, output configuration methods | `terrain_scanner_scan_changed` |
| `terrain_scanner_advanced` | Scanner methods, `getConfiguration()`, `setOpeningAngle(degrees)` | Scan and `terrain_scanner_configuration_changed` |
| `avionics_network_bridge` | `getNetworkStatus()`, `getConnectedDevices()` | `avionics_network_changed` |
| `modular_table` | Grid/module methods, local outputs, FMS methods, `getNetworkSignals()` | Table, alert, panel, and FMS change events |
| `gpws` | `getStatus()`, `getAlerts()`, `getConfiguration()`, setters | Alert, phase, mode, and configuration events |

## React to sensor changes

Events carry the attachment name and a snapshot. Use `os.pullEvent` to wait without polling. Scanner `coverage` is a fraction between 0 and 1; partial coverage can report known contacts, but no contacts with partial coverage must not be treated as a clear path.

```lua
local scanner = assert(peripheral.find("terrain_scanner"), "Scanner missing")
local function report(scan)
  print(scan.status, scan.sampledRays .. "/" .. scan.totalRays, scan.coverage)
  for _, hit in ipairs(scan.contacts) do
    print(hit.distance, hit.directionX, hit.directionY, hit.directionZ)
  end
end

report(scanner.getScan())
while true do
  local _, attachment, scan = os.pullEvent("terrain_scanner_scan_changed")
  print("Updated:", attachment)
  report(scan)
end
```

For an Advanced Scanner, `setOpeningAngle(120)` accepts values from 30 to 180 degrees and returns true only when a new valid value is applied. Read its current value with `getConfiguration()`.

## Configure redstone outputs

Radar Altimeters and Terrain Scanners provide `getOutputs()`, `getOutputConfiguration()`, `setOutputRange(channel, min, max)`, and `setLinkFrequencies(channel, first, second)`. Output mode is selected automatically: an incomplete frequency pair leaves output on block faces; a complete pair selects Create Redstone Link. For an Advanced Scanner this selection is global across channels.

## Query network topology

Only trust the endpoint list when the traversal is complete. `incomplete` means an unloaded boundary was reached; `limit_exceeded` means the configured visit limit was hit.

```lua
local bridge = assert(peripheral.find("avionics_network_bridge"), "Bridge missing")
local status = bridge.getNetworkStatus()
print(status.status, status.complete)
if status.complete then
  for _, device in ipairs(bridge.getConnectedDevices()) do
    print(device.type, device.x, device.y, device.z)
  end
end
```

## Control the Modular Table and GPWS

Grid coordinates are 1-based. Physical modules are installed in-world; Lua can inspect and configure existing modules. Use `applyBasicSetup()` to route installed lamps/buzzers to `gpws.any` at Caution, then read outputs or listen for `modular_table_alert_outputs_changed`. The table also provides FMS waypoint operations documented in the [FMS guide](fms).

```lua
local tablePeripheral = assert(peripheral.find("modular_table"), "Table missing")
tablePeripheral.applyBasicSetup()
print(textutils.serialize(tablePeripheral.getOutputs()))

local gpws = peripheral.find("gpws")
if gpws then
  print(textutils.serialize(gpws.getStatus()))
  for channel, alert in pairs(gpws.getAlerts()) do
    print(channel, alert.state, alert.severity)
  end
end
```

The GPWS peripheral supports `setProfile("basic"|"advanced")`, `setMode("off"|"standby"|"armed"|"test")`, `setSensitivity("low"|"normal"|"high")`, `setAlertConfiguration(...)`, and `setPhaseOverride("auto"|phase)`. Explicit arming and threshold writes are for the Advanced profile. Subscribe to `gpws_alert_changed` for server-confirmed alert updates.

## Snapshot and event rules

- Sensor snapshots include `status` and `gameTime`; valid readings include `value` and `unit`.
- `unavailable` is a real state, not numeric zero. `failed` indicates an unexpected sampling failure.
- Change events are emitted when relevant values/status change, not on every sampling tick.
- Network enumeration is intentionally empty unless the topology is complete.
- Server-side setters validate input and return false on rejected changes; do not assume a Lua call succeeded without checking when the return value is meaningful.
