---
title: Sensors
---

# Sensors

This page covers the released sensor blocks: Radar Altimeter, Terrain Scanner, and Advanced Terrain Scanner. It explains placement, in-game controls, and redstone output. For Lua readings, use the [Computer Craft guide](computer-craft).

## Radar Altimeter

![Radar Altimeter model](../../assets/radar-altimeter.png)

Place the Radar Altimeter with its glass lens facing down. It measures clearance below the lens, up to the configured maximum range (128 blocks by default). It emits the `altitude` channel on every block face. The redstone signal rises with altitude: the configured lower distance produces 0, the upper distance produces 15, and values between them are scaled across the range. The default range is 0–32 blocks.

## Terrain Scanner

![Basic Terrain Scanner model](../../assets/terrain-scanner.png)

Place the scanner facing the area you want to watch. Its nozzle marks the forward direction. It follows its horizontal facing and can be mounted upside down while keeping that same direction. The Basic scanner uses nine rays across a fixed 90° aperture and emits its `front` channel from all block faces.

The scanner reports the closest detected obstacle. Its signal is strongest near an obstacle: the configured lower distance produces 15, the upper distance produces 0, and values between them are scaled across the range. The default range is 4–32 blocks.

## Advanced Terrain Scanner

![Advanced Terrain Scanner model](../../assets/terrain-scanner-advanced.png)

The Advanced scanner has independent `front`, `left`, and `right` channels. Its aperture can be set from 30° to 180° and starts at 90°. Right-click the block and adjust the aperture slider. The separate Front, Left, and Right tabs configure each channel's distance range and optional Create Redstone Link frequencies. Side channels activate only above a 50° aperture; their useful coverage depends on how wide the scanner is set.

Each channel uses the same proximity scale as the Basic scanner: 15 at or nearer than the lower bound, 0 at or beyond the upper bound, and a scaled value between them. Defaults are 4–32 blocks per channel. The Advanced scanner routes each channel to the matching forward, left, or right horizontal face when using block-face output.

## Configure redstone outputs

Right-click any sensor to open its output configuration screen. Drag the range slider to set the near and far distances. The sensor maximum range is 128 blocks by default; the valid range must have a nonnegative lower bound and a larger upper bound no greater than the configured sensor maximum.

The two frequency slots select output routing:

- Leave both slots empty to emit redstone from the block faces.
- Put one item in each slot to configure a Create Redstone Link frequency pair. Pick items from your inventory using the item picker shown below the controls. The two slots form a frequency; they are not consumed.
- On the Advanced Terrain Scanner, routing is global. A complete pair on any channel switches all channels to Redstone Link output. Configure a pair on every channel you want to broadcast; channels without a complete pair have no Link frequency.

Use **Apply** to save the settings or **Cancel** to discard the draft. Settings are stored with the sensor. The Radar Altimeter's altitude signal grows as the craft gets higher; terrain scanner signals grow as obstacles get closer. A channel with no valid reading or no detected obstacle emits 0.

## Reading limits

Sensors do not load chunks. Unloaded terrain is not scanned; a terrain scanner can therefore have incomplete coverage near unloaded chunks. A missing reading is not the same as a zero-distance measurement. Place sensors so their measurement direction and intended terrain are available in loaded chunks.
