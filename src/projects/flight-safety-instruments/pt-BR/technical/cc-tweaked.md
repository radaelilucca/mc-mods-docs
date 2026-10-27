---
title: API CC:Tweaked e exemplos
---

# API CC:Tweaked e exemplos

Cada instrumento é um peripheral próprio. Conecte um computador ou modem cabeado diretamente ao bloco ou use uma rede de modems cabeados. A Avionics Cable Network é uma rede de dados separada: a Network Bridge informa sua topologia, enquanto os endpoints continuam expondo suas próprias leituras. A `modular_table` também pode consultar leituras tipadas de uma rede de cabos completa com `getNetworkSignals()`.

## Encontrar peripherals

`peripheral.find(type)` retorna o primeiro peripheral correspondente. Para vários instrumentos, use `peripheral.find(type, callback)` para obter também o nome da attachment, ou percorra `peripheral.getNames()` e inspecione cada dispositivo. Os métodos abaixo usam a sintaxe com ponto do CC:Tweaked.

```lua
local altimeter = assert(peripheral.find("radar_altimeter"), "Altímetro ausente")
local reading = altimeter.getReading()
if reading.status == "valid" then
  print(string.format("Distância: %.1f %s", reading.value, reading.unit))
else
  print("Distância indisponível:", reading.status)
end
```

## Índice de peripherals

| Tipo | Métodos principais | Eventos |
| --- | --- | --- |
| `radar_altimeter` | `getReading()` e configuração de saída | `radar_altimeter_reading_changed` |
| `terrain_scanner` | `getScan()` e configuração de saída | `terrain_scanner_scan_changed` |
| `terrain_scanner_advanced` | Métodos do scanner, `getConfiguration()`, `setOpeningAngle(degrees)` | Varredura e `terrain_scanner_configuration_changed` |
| `avionics_network_bridge` | `getNetworkStatus()`, `getConnectedDevices()` | `avionics_network_changed` |
| `modular_table` | Grid/módulos, saídas locais, FMS, `getNetworkSignals()` | Eventos de mesa, alertas, painel e FMS |
| `gpws` | `getStatus()`, `getAlerts()`, `getConfiguration()`, setters | Eventos de alerta, fase, modo e configuração |

## Reagir a mudanças dos sensores

Eventos levam o nome da attachment e um snapshot. Use `os.pullEvent` para aguardar sem polling. `coverage` do scanner é uma fração de 0 a 1; cobertura parcial pode retornar contatos conhecidos, mas ausência de contatos com cobertura parcial não significa caminho livre.

```lua
local scanner = assert(peripheral.find("terrain_scanner"), "Scanner ausente")
local function report(scan)
  print(scan.status, scan.sampledRays .. "/" .. scan.totalRays, scan.coverage)
  for _, hit in ipairs(scan.contacts) do
    print(hit.distance, hit.directionX, hit.directionY, hit.directionZ)
  end
end

report(scanner.getScan())
while true do
  local _, attachment, scan = os.pullEvent("terrain_scanner_scan_changed")
  print("Atualizado:", attachment)
  report(scan)
end
```

No Advanced Scanner, `setOpeningAngle(120)` aceita valores de 30 a 180 graus e retorna true somente quando aplica um valor válido novo. Consulte o valor atual com `getConfiguration()`.

## Configurar saídas de redstone

Radar Altimeters e Terrain Scanners fornecem `getOutputs()`, `getOutputConfiguration()`, `setOutputRange(channel, min, max)` e `setLinkFrequencies(channel, first, second)`. O modo de saída é automático: par incompleto mantém saída nas faces; par completo seleciona Create Redstone Link. No Advanced Scanner, essa seleção é global para todos os canais.

## Consultar topologia da rede

Só use a lista de endpoints quando a travessia estiver completa. `incomplete` significa que foi encontrada uma fronteira de chunk descarregado; `limit_exceeded` indica que o limite configurado de visitas foi atingido.

```lua
local bridge = assert(peripheral.find("avionics_network_bridge"), "Bridge ausente")
local status = bridge.getNetworkStatus()
print(status.status, status.complete)
if status.complete then
  for _, device in ipairs(bridge.getConnectedDevices()) do
    print(device.type, device.x, device.y, device.z)
  end
end
```

## Consultar Modular Table e GPWS

As coordenadas do grid começam em 1. Módulos físicos são instalados no mundo; Lua pode consultar e configurar módulos existentes. Use `applyBasicSetup()` para associar lâmpadas/buzzers instalados a `gpws.any` em Caution e depois ler as saídas ou aguardar `modular_table_alert_outputs_changed`. A mesa também oferece operações de waypoint documentadas no [guia FMS](fms).

```lua
local tablePeripheral = assert(peripheral.find("modular_table"), "Mesa ausente")
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

O peripheral GPWS oferece `setProfile("basic"|"advanced")`, `setMode("off"|"standby"|"armed"|"test")`, `setSensitivity("low"|"normal"|"high")`, `setAlertConfiguration(...)` e `setPhaseOverride("auto"|phase)`. Armar explicitamente e alterar thresholds se aplica ao perfil Advanced. Inscreva-se em `gpws_alert_changed` para atualizações confirmadas pelo servidor.

## Regras de snapshots e eventos

- Snapshots dos sensores incluem `status` e `gameTime`; leituras válidas incluem `value` e `unit`.
- `unavailable` é um estado real, não valor numérico zero. `failed` indica erro inesperado de amostragem.
- Eventos de mudança são emitidos quando valores/status relevantes mudam, não a cada tick de amostragem.
- A enumeração da rede é intencionalmente vazia enquanto a topologia não estiver completa.
- Setters no servidor validam entradas e retornam false para mudanças rejeitadas; confira o retorno quando ele for significativo.
