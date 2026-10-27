---
title: Avionics Cable Network
---

# Avionics Cable Network

Avionics Cable transporta somente dados. Segmentos adjacentes formam linhas e ramificações; qualquer endpoint compatível encostado em uma das seis faces entra na mesma rede. Não há portas, frequências, blocos de junção nem conexão sem fio. Peripherals dos endpoints continuam independentes; a Network Bridge informa a topologia.

O peripheral `avionics_network_bridge` fornece `getNetworkStatus()` e `getConnectedDevices()`. O snapshot de status contém `{status, connected, complete, cableCount, endpointCount}`. Os status possíveis são `disconnected`, `connected`, `incomplete` e `limit_exceeded`; somente uma rede totalmente percorrida fica conectada e completa. Contagens de uma travessia incompleta são limites inferiores e a lista de endpoints fica vazia em resultados incompletos ou limitados. Cada dispositivo contém `{type, x, y, z}` relativo ao nível/sublevel atual da bridge.

```lua
local bridge = assert(peripheral.find("avionics_network_bridge"), "Bridge não encontrada")
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

`avionics_network_changed` leva o nome da attachment e o snapshot de status atualizado. O servidor calcula e mantém a topologia em cache; mudanças nos blocos relevantes ou no estado de chunks invalidam esse cache. A travessia não carrega chunks. Uma fronteira descarregada resulta em `incomplete`; exceder `maxAvionicsNetworkBlocks` (4096 blocos visitados por padrão) resulta em `limit_exceeded`. Dimensões, níveis e sublevels separados nunca são conectados.
