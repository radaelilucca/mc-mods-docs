---
title: Sensor behavior
---

# Radar Altimeter and Terrain Scanners

![Radar Altimeter](../../assets/radar-altimeter.png)

## Radar Altimeter

The `radar_altimeter` casts nine rays downward in a 20° half-angle cone. At least three must hit for a valid sample; the reported value is the median hit distance in decimal blocks. It ignores entities and its host sublevel, but can hit collision shapes in the world or other sublevels. The default maximum range is 128 blocks (`radarAltimeterMaxRange`); the shared scan interval defaults to 5 ticks (`sensorScanIntervalTicks`). Raycasts never load chunks. Fewer than three returns produces `unavailable`; an internal scan error produces `failed`.

Its CC:Tweaked API is `getReading()`, returning `{status, value?, unit, gameTime}`. `value` exists only for `valid` status and `unit` is `blocks`. `radar_altimeter_reading_changed` fires when status or value changes, not merely because a new sample timestamp was recorded.

## Terrain Scanners

![Basic Terrain Scanner](../../assets/terrain-scanner.png)

Both scanners point horizontally along the block facing, including when mounted upside down. They follow Aeronautics sublevel movement and test block collision shapes; entities and the host sublevel are ignored. Unloaded chunks reduce coverage.

![Advanced Terrain Scanner](../../assets/terrain-scanner-advanced.png)

The basic `terrain_scanner` uses nine rays with a fixed 90° total aperture. The `terrain_scanner_advanced` distributes approximately 9–81 rays over an adjustable 30°–180° aperture (90° by default). Ray count follows the covered angular area and cannot be set directly. `terrainScannerMaxRange` defaults to 128 blocks.

`getScan()` returns a snapshot containing `status`, `contacts`, `sampledRays`, `totalRays`, `coverage`, `unit` (`blocks`), and `gameTime`. Each contact contains a 1-based `rayIndex`, `distance`, and relative `directionX`, `directionY`, and `directionZ` (right, up, forward). Any completed ray makes the sample `valid`, even if coverage is partial. If no ray completes, status is `unavailable`; unexpected failures are `failed`. An empty contact list is safe to interpret as clear only when coverage is complete.

The advanced peripheral also offers `getConfiguration()` and `setOpeningAngle(degrees)`, and emits `terrain_scanner_configuration_changed`. The setter accepts 30–180 degrees and returns false for the current or invalid value. Both variants emit `terrain_scanner_scan_changed` when the scan changes.

## Redstone outputs

Sensors expose `getOutputs()`, `getOutputConfiguration()`, `setOutputRange(channel, min, max)`, and `setLinkFrequencies(channel, first, second)`. Output range is transformed into a 0–15 signal. Output mode is automatic: without a complete frequency pair the signal uses block faces; any complete pair selects Redstone Link. On the Advanced Scanner the mode applies to the whole block, so channels without pairs do not fall back to face output.
