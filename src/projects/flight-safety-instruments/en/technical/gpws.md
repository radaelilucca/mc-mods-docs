---
title: GPWS Computer
---

# GPWS Computer

![GPWS Computer](../../assets/gpws-computer.png)

The GPWS Computer consumes snapshots from Radar Altimeters and Terrain Scanners on the Avionics Cable Network. It does not raycast or load chunks. Readings older than two sensor intervals are stale. The computer and sensors must be on the same complete network.

## Profiles and operation

The Basic profile is the default. With a complete network and valid Radar Altimeter it arms automatically; players can activate/deactivate it and choose Low, Normal, or High sensitivity. Terrain scanners are optional in Basic. The Advanced profile starts in Standby and requires explicit arming; thresholds, hysteresis, confirmation counts, and manual phase overrides are configured through CC:Tweaked. Test mode synthesizes Warning for every channel without changing sensor readings. On world reload, the mode returns to Standby.

Automatic phases are `GROUND`, `TAKEOFF`, `CLIMB`, `CRUISE`, `DESCENT`, `APPROACH`, and `UNKNOWN`. Common phase changes require two samples. Ground requires AGL ≤1.5 blocks and vertical speed ≤0.5 blocks/s for 20 ticks. Risk alerts are quiet while ground is confirmed. High sensitivity shifts thresholds toward earlier warnings; Low shifts them the other way.

## Default channels

These are gameplay values, not real aviation limits. Regular alerts use 10% hysteresis and two qualifying/clearing samples; `PULL_UP` activates on its first qualifying sample.

| Channel | Default behavior |
| --- | --- |
| `TERRAIN` | Caution at a known contact within 32 blocks, or 8 in Approach. Missing scanner or insufficient coverage without a known contact is Unavailable. |
| `PULL_UP` | Immediate Warning for a known contact within 8 blocks in the central 45° forward cone, or estimated time to ground ≤2 s while descending. |
| `SINK_RATE` | Caution at descent ≥6 blocks/s; Warning at ≥12. |
| `DONT_SINK` | Warning after ≥4 blocks of recent AGL loss during Takeoff/Climb, over a 5 s window. |
| `TOO_LOW` | Outside Ground, Caution at ≤8 blocks AGL and Warning at ≤3; in Approach, thresholds are ≤3 and ≤1. |
| `BANK_ANGLE` | Outside Ground, Caution at ≥30° and Warning at ≥45°. |
| `SENSOR_FAIL` | Caution if network is incomplete/disconnected, the required altimeter is missing, or a relevant installed source fails or is stale. |

Risk channels are suppressed in Ground, Standby, and Off. Standby still reports `SENSOR_FAIL`; Off suppresses every alert. A contact from partial scan coverage can support an alert, but no contact with partial coverage is not proof of a clear path.

## CC:Tweaked

Peripheral type: `gpws`. `getStatus()` returns mode, profile, phase, network state, endpoint count, clearance, vertical speed, and bank with status/unit/time. `getAlerts()` returns state and severity per channel. `getConfiguration()` reports effective rules. Methods include `setMode(mode)`, `setProfile(profile)`, `setSensitivity(value)`, `setAlertConfiguration(channel, phase, config)`, and `setPhaseOverride(phaseOrAuto)`.

```lua
local gpws = assert(peripheral.find("gpws"), "GPWS Computer not found")
gpws.setProfile("basic")
gpws.setSensitivity("normal")
print(textutils.serialize(gpws.getStatus()))

while true do
  local _, attachment, alert = os.pullEvent("gpws_alert_changed")
  print(attachment, textutils.serialize(alert))
end
```

In Advanced, `setAlertConfiguration` accepts `cautionThreshold`, `warningThreshold`, `secondaryWarningThreshold`, `hysteresisPercent` (0–90), `confirmationSamples` (1–20), and `inhibited`. Finite thresholds are 0–4096; zero disables that level. Threshold meaning depends on the channel: distance for TERRAIN, distance/time-to-ground for PULL_UP, descent speed for SINK_RATE, AGL loss for DONT_SINK, AGL for TOO_LOW, and degrees for BANK_ANGLE. Invalid writes and configuration writes in Basic return false without changing state.

Events are `gpws_alert_changed`, `gpws_flight_phase_changed`, `gpws_mode_changed`, and `gpws_configuration_changed`; each supplies the attachment name and a snapshot. Events are emitted when relevant state changes.
