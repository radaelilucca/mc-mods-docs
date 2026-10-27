---
title: Modular Table
---

# Modular Table

![Módulo FMS](../../assets/fms-module.png)

A base Modular Table possui um grid exposto 3×3 e pode ser montada em qualquer face sólida. O nome do peripheral CC:Tweaked é `modular_table`; as coordenadas Lua do grid começam em 1. Instalação e remoção são ações físicas no jogo, não feitas por Lua. O footprint de um módulo deve caber por inteiro no grid e não pode sobrepor outra célula ocupada. A lâmpada 2×1 gira para 1×2 com a roda do mouse; o FMS ocupa 2×3.

Módulos de lâmpada ocupam 1×1 ou 2×1 (rotacionável para 1×2) e têm vidro emissivo no modelo. É um efeito visual, sem luz dinâmica projetada no mundo. O buzzer ocupa 1×1; o volume configurado também ajusta seu alcance de som proporcionalmente, até 16 blocos a 100%. O som é espacial na posição do módulo, inclusive quando a mesa está em um sublevel Sable em movimento.

Clique com o botão direito em uma célula vazia com a mão principal vazia para abrir o painel; clique numa lâmpada ou buzzer para suas configurações. Segure um módulo e clique com o botão direito na face exposta para visualizar e instalar. Use a Wrench do Create para remover. A mão secundária não instala nem remove módulos.

Métodos principais: `getGridSize()`, `getModules()`, `getSlot(column, row)`, `canFit(column, row, width, height)`, `getOutputs()`, `getAvailableChannels()` e `getPanelStatus()`. `canFit` apenas consulta; coordenadas fora da faixa geram erro Lua, enquanto um footprint válido que ultrapasse o grid retorna false.

Métodos adicionais: `configureModule(column, row, channel, threshold)`, `configureAlertModule(column, row, source, channel, minimumSeverity)`, `setBuzzerVolume(column, row, percent)`, `applyBasicSetup()`, `testPanel()`, `setMuted(muted)`, `setTestSignal(channel, value)`, `setLampTestIntensity(column, row, level)` e `clearLampTestIntensity(column, row)`. O sinal de teste ativa o módulo quando seu valor alcança o threshold numérico configurado; é local à mesa e não representa leitura de sensor/rede.

Configure módulos com `configureAlertModule(column, row, source, channel, minimumSeverity)`. `source` aceita `gpws` ou `test`; severidade aceita `advisory`, `caution` ou `warning`. `applyBasicSetup()` associa lâmpadas e buzzers a `gpws.any` na severidade Caution. Para sinais locais de compatibilidade, use `configureModule(...)` e `setTestSignal(channel, value)`. `setBuzzerVolume(..., percent)` aceita 0–100, `setMuted(boolean)` controla os buzzers e `testPanel()` executa um teste de três segundos. A sobreposição visual de teste da lâmpada é temporária e não gera luz dinâmica no mundo.

```lua
local panel = assert(peripheral.find("modular_table"), "Mesa não encontrada")
print(textutils.serialize(panel.getGridSize()))
panel.applyBasicSetup()
print(textutils.serialize(panel.getOutputs()))

while true do
  local _, attachment, action, module = os.pullEvent("modular_table_changed")
  print(attachment, action, module.type, module.column, module.row)
end
```

Eventos incluem `modular_table_changed`, `modular_table_signal_changed`, `modular_table_alert_outputs_changed` e `modular_table_panel_state_changed`. Eles representam mudanças confirmadas pelo servidor. Consulte [métodos do FMS](fms) para waypoints e [GPWS](gpws) para configurar alertas. A Network Bridge, não a mesa, informa a topologia agregada.
