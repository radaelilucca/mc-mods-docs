---
title: Avionics Cable Network
---

# Avionics Cable Network

Avionics Cable carries data only. Adjacent cable segments form lines and branches; a compatible endpoint touching any of the six faces joins the same network. There are no ports, frequencies, junction blocks, or wireless links. Endpoint peripherals remain independently available; the Network Bridge reports topology.

The `avionics_network_bridge` peripheral provides `getNetworkStatus()` and `getConnectedDevices()`. Status snapshots contain `{status, connected, complete, cableCount, endpointCount}`. Status may be `disconnected`, `connected`, `incomplete`, or `limit_exceeded`; only a fully traversed network is `connected` and complete. Counts from incomplete traversal are lower bounds and the endpoint list is empty for incomplete or limited results. Device entries contain `{type, x, y, z}` relative to the bridge's current level/sublevel.

```lua
local bridge = assert(peripheral.find("avionics_network_bridge"), "Bridge not found")
local network = bridge.getNetworkStatus()
print(network.status, network.cableCount, network.endpointCount)

if network.complete then
  for _, device in ipairs(bridge.getConnectedDevices()) do
    print(device.type, device.x, device.y, device.z)
  end
end

while true do
  local _, attachment, updated = os.pullEvent("avionics_network_changed")
  print(attachment, updated.status, updated.complete)
end
```

`avionics_network_changed` carries the attachment name and updated status snapshot. The server calculates topology and caches it; relevant block changes and chunk state changes invalidate the cache. Traversal does not load chunks. Reaching an unloaded boundary yields `incomplete`; exceeding `maxAvionicsNetworkBlocks` (4096 visited blocks by default) yields `limit_exceeded`. Separate dimensions, levels, and sublevels are never bridged.
