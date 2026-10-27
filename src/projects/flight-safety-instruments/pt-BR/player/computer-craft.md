---
title: Computer Craft
---

# Computer Craft

CC:Tweaked permite ler sensores, criar telas e automações, consultar a rede aviônica, gerenciar waypoints FMS e reagir a alertas GPWS durante o jogo. Todos os exemplos de código e APIs dos peripherals para jogadores estão reunidos aqui.

## Conectar um computador

Instale CC:Tweaked 1.120.0 ou mais recente. Coloque um computador ou modem cabeado encostado no bloco que deseja consultar, ou conecte-o pela rede de modems cabeados do CC:Tweaked. Peripherals de sensores, GPWS e mesa são independentes da Avionics Cable Network. A Network Bridge é o peripheral CC:Tweaked para consultar essa rede de cabos do jogo.

Encontre um dispositivo pelo tipo do peripheral:

```lua
local altimeter = assert(peripheral.find("radar_altimeter"), "Radar Altimeter não encontrado")
local reading = altimeter.getReading()
print(reading.status, reading.value, reading.unit)
```

`peripheral.find(type)` encontra um dispositivo. Se houver vários do mesmo tipo, `peripheral.find(type, callback)` pode selecionar pelo nome da attachment; `peripheral.getNames()` lista todos os peripherals conectados.

## APIs dos peripherals

- [Radar Altimeter](#radar-altimeter-api)
- [Terrain Scanner](#terrain-scanner-api)
- [Advanced Terrain Scanner](#advanced-terrain-scanner-api)
- [Avionics Network Bridge](#avionics-network-bridge-api)
- [Modular Table](#modular-table-api)
- [API de waypoints FMS e Navigator](#fms-and-navigator-api)
- [GPWS Computer](#gpws-computer-api)

## Ler snapshots e eventos

Métodos retornam o snapshot atual. Eventos permitem aguardar mudanças relevantes em vez de consultar a cada tick. Snapshots de sensores usam `status`, `unit` e `gameTime`; leituras válidas incluem `value`. Trate `unavailable` e `failed` como estados diferentes de valor numérico zero.

```lua
while true do
  local _, attachment, reading = os.pullEvent("radar_altimeter_reading_changed")
  if reading.status == "valid" and reading.value < 6 then
    print(attachment, "POUCA ALTURA", reading.value, reading.unit)
  end
end
```

A cobertura da varredura pode ser parcial perto de chunks descarregados. Mesmo assim, ela pode retornar contatos conhecidos; porém, uma varredura parcial vazia não comprova que o caminho está livre. Consulte os guias [Terrain Scanner](#terrain-scanner-api) e [Advanced Terrain Scanner](#advanced-terrain-scanner-api) para tratar essa condição.

## Radar Altimeter API

![Radar Altimeter](../../assets/radar-altimeter.png)

O peripheral `radar_altimeter` retorna a distância medida abaixo do sensor. Ele funciona sem a Avionics Cable Network.

### Contrato da leitura

`getReading()` retorna `{status, value?, unit, gameTime}`. `status` pode ser `valid`, `unavailable` ou `failed`. `value` só existe em leituras `valid`, com unidade `blocks`. `radar_altimeter_reading_changed` fornece o nome da attachment e o snapshot atualizado; ocorre quando status ou valor muda, não por atualização isolada do timestamp.

```lua
local altimeter = assert(peripheral.find("radar_altimeter"), "Altímetro ausente")
local reading = altimeter.getReading()
if reading.status == "valid" then
  print(string.format("Distância do solo: %.1f %s", reading.value, reading.unit))
else
  print("Leitura está", reading.status)
end

while true do
  local _, attachment, updated = os.pullEvent("radar_altimeter_reading_changed")
  if updated.status == "valid" and updated.value < 6 then
    print(attachment, "POUCA ALTURA", updated.value)
  end
end
```

### Como a leitura funciona

O altímetro dispara nove raios para baixo num cone com meio ângulo de 20°. Pelo menos três precisam atingir uma superfície para validar a amostra; o valor é a mediana das distâncias a partir da face inferior do sensor. Entidades e o sublevel que o contém são ignorados. O sensor não carrega chunks; menos de três retornos produz `unavailable`. O alcance máximo padrão é 128 blocos (`radarAltimeterMaxRange`); o intervalo compartilhado de varredura é de 5 ticks (`sensorScanIntervalTicks`).

### Saída de redstone

O peripheral também oferece `getOutputs()`, `getOutputConfiguration()`, `setOutputRange(channel, min, max)` e `setLinkFrequencies(channel, first, second)`. A faixa de saída converte a distância do solo na intensidade do sinal. Sem um par de frequências completo, o sinal sai pelas faces do bloco; um par completo seleciona Create Redstone Link.

`getOutputs()` retorna uma tabela como `{altitude = 8}`. `getOutputConfiguration()` retorna `{mode, ranges, frequencies}`; a faixa altitude tem `{min, max}`. O único nome de canal é `altitude`. `setOutputRange("altitude", min, max)` aceita distâncias inteiras com `0 <= min < max <= radarAltimeterMaxRange` e retorna se a configuração foi aceita. `setLinkFrequencies("altitude", first, second)` aceita tabelas de frequência no formato `{item = "minecraft:iron_ingot", color = 16711680}`; `color` é opcional, RGB entre 0 e 16777215. Use `{}` para uma frequência vazia. Os dois slots precisam estar preenchidos para ativar saída Link.

`setOutputMode("faces"|"link")` continua disponível por compatibilidade e retorna false para modos desconhecidos. O roteamento é escolhido automaticamente pelos pares de frequência configurados, então esse método não substitui essa seleção. Mudanças de saída emitem `sensor_outputs_changed`; mudanças de configuração emitem `sensor_output_configuration_changed` com a tabela atualizada.

## Terrain Scanner API

![Terrain Scanner](../../assets/terrain-scanner.png)

O peripheral `terrain_scanner` informa contatos com obstáculos à frente do bloco. Ele funciona sem a Avionics Cable Network.

### Ler uma varredura

`getScan()` retorna `{status, contacts, sampledRays, totalRays, coverage, unit, gameTime}`. `unit` é `blocks`. Cada contato contém `rayIndex` começando em 1, `distance` e `directionX`, `directionY`, `directionZ` relativos ao scanner (direita, cima, frente).

```lua
local scanner = assert(peripheral.find("terrain_scanner"), "Terrain Scanner ausente")
local function report(scan)
  print(scan.status, scan.sampledRays .. "/" .. scan.totalRays, scan.coverage)
  for _, hit in ipairs(scan.contacts) do
    print("contato", hit.distance, hit.directionX, hit.directionY, hit.directionZ)
  end
end

report(scanner.getScan())
while true do
  local _, attachment, scan = os.pullEvent("terrain_scanner_scan_changed")
  print("Atualizado:", attachment)
  report(scan)
end
```

Qualquer raio concluído torna a amostra `valid`, mesmo com cobertura parcial. Se nenhum raio for concluído, o status é `unavailable`; erros inesperados são `failed`. Uma lista vazia de contatos só indica ausência de obstáculo detectado quando a cobertura é completa. A varredura não carrega chunks, então uma fronteira descarregada pode reduzir a cobertura.

### Comportamento da varredura

O Terrain Scanner Basic usa nove raios com abertura total fixa de 90°. Ele segue sua orientação horizontal, inclusive quando instalado de ponta-cabeça, e ignora entidades e o sublevel que o contém. `terrainScannerMaxRange` tem alcance padrão de 128 blocos; o intervalo compartilhado de varredura é de 5 ticks.

### Saída de redstone

O peripheral oferece `getOutputs()`, `getOutputConfiguration()`, `setOutputRange(channel, min, max)` e `setLinkFrequencies(channel, first, second)`. O sinal aumenta quando um contato se aproxima. Um par de frequências completo seleciona Create Redstone Link; sem ele, o sinal sai pelas faces.

O limite inferior configurado produz intensidade 15 nessa distância ou abaixo. O limite superior produz 0 nessa distância ou acima; valores intermediários são escalados dentro da faixa. Sem contato utilizável, a saída é 0.

`getOutputs()` retorna a intensidade do canal `front`, como `{front = 12}`. `getOutputConfiguration()` retorna `{mode, ranges, frequencies}`. `setOutputRange("front", min, max)` aceita distâncias inteiras dentro do alcance máximo configurado do sensor, com `min < max`, e retorna booleano. `setLinkFrequencies("front", first, second)` aceita tabelas `{item = "minecraft:iron_ingot", color = 16711680}`; `color` RGB é opcional e varia de 0 a 16777215. Use `{}` para limpar um slot de frequência; ambos precisam estar preenchidos para selecionar modo Link.

`setOutputMode("faces"|"link")` é mantido por compatibilidade; valida o modo, mas o roteamento automático continua dependendo de pares de frequência completos. Mudanças emitem `sensor_outputs_changed` e `sensor_output_configuration_changed` com os snapshots atualizados.

Para o scanner Advanced, consulte [sua API](#advanced-terrain-scanner-api).

## Advanced Terrain Scanner API

![Advanced Terrain Scanner](../../assets/terrain-scanner-advanced.png)

O peripheral `terrain_scanner_advanced` informa contatos por canais independentes `front`, `left` e `right`. Ele funciona sem a Avionics Cable Network.

### Ler uma varredura

`getScan()` retorna `{status, contacts, sampledRays, totalRays, coverage, unit, gameTime}`. `unit` é `blocks`. Cada contato contém `rayIndex` começando em 1, `distance` e `directionX`, `directionY`, `directionZ` relativos ao scanner (direita, cima, frente).

```lua
local scanner = assert(peripheral.find("terrain_scanner_advanced"), "Advanced Terrain Scanner ausente")
local scan = scanner.getScan()
print(scan.status, scan.sampledRays .. "/" .. scan.totalRays, scan.coverage)
for _, hit in ipairs(scan.contacts) do
  print("contato", hit.distance, hit.directionX, hit.directionY, hit.directionZ)
end
```

Qualquer raio concluído torna a amostra `valid`, mesmo com cobertura parcial. Se nenhum raio for concluído, o status é `unavailable`; erros inesperados são `failed`. Uma lista vazia só significa que nenhum obstáculo foi detectado quando a cobertura é completa. A varredura não carrega chunks, então terreno descarregado pode reduzir a cobertura.

### Configurar a abertura

O Advanced Scanner distribui aproximadamente 9–81 raios por uma abertura de 30° a 180°, com 90° como padrão. `getConfiguration()` retorna `{openingAngle}`. `setOpeningAngle(degrees)` só retorna true quando aplica um valor novo válido; caso contrário, retorna false. O evento `terrain_scanner_configuration_changed` informa o nome da attachment e a configuração atualizada.

O scanner segue sua orientação horizontal, inclusive quando instalado de ponta-cabeça, e ignora entidades e o sublevel que o contém. `terrainScannerMaxRange` tem alcance padrão de 128 blocos; o intervalo compartilhado de varredura é de 5 ticks.

### Saídas de redstone

`getOutputs()` retorna intensidades de `front`, `left` e `right`, como `{front = 12, left = 0, right = 0}`. `getOutputConfiguration()` retorna `{mode, ranges, frequencies}`. O sinal aumenta quando um contato se aproxima. O limite inferior configurado produz intensidade 15 nessa distância ou abaixo; o superior produz 0 nessa distância ou acima. Valores intermediários são escalados dentro da faixa; sem contato utilizável, a saída é 0.

`setOutputRange(channel, min, max)` aceita `front`, `left` ou `right`, distâncias inteiras dentro do alcance máximo configurado do sensor e `min < max`; retorna booleano. `setLinkFrequencies(channel, first, second)` aceita tabelas de frequência como `{item = "minecraft:iron_ingot", color = 16711680}`. `color` RGB é opcional e varia de 0 a 16777215. Use `{}` para limpar um slot.

Um par de frequências completo seleciona a saída Create Redstone Link. O modo Link é global: configure um par completo para cada canal que deve transmitir. Caso contrário, o sinal sai pelas faces do bloco. `setOutputMode("faces"|"link")` continua por compatibilidade e valida o valor, mas o roteamento depende dos pares de frequência. Mudanças emitem `sensor_outputs_changed` e `sensor_output_configuration_changed` com snapshots atualizados.

## Avionics Network Bridge API

Avionics Cable conecta endpoints de instrumentos para transportar dados. Coloque os cabos lado a lado para formar linhas ou ramificações e conecte uma `avionics_network_bridge` à rede. A Bridge informa a topologia; para ler valores, use o peripheral próprio de cada instrumento.

`getNetworkStatus()` retorna `{status, connected, complete, cableCount, endpointCount}`. Os status são `disconnected`, `connected`, `incomplete` ou `limit_exceeded`. Apenas uma travessia completa informa `connected = true`. Contagens de uma travessia incompleta são limites inferiores, e `getConnectedDevices()` não retorna uma lista parcial se a rede estiver incompleta ou acima do limite de visitas. Cada dispositivo listado tem `{type, x, y, z}` relativo à Bridge.

```lua
local bridge = assert(peripheral.find("avionics_network_bridge"), "Bridge ausente")
local status = bridge.getNetworkStatus()
print(status.status, status.cableCount, status.endpointCount)

if status.complete then
  for _, device in ipairs(bridge.getConnectedDevices()) do
    print(device.type, device.x, device.y, device.z)
  end
end

while true do
  local _, attachment, updated = os.pullEvent("avionics_network_changed")
  print(attachment, updated.status, updated.complete)
end
```

`avionics_network_changed` fornece o nome da attachment da Bridge e o status atualizado. A travessia não carrega chunks. Atingir um chunk descarregado resulta em `incomplete`; exceder `maxAvionicsNetworkBlocks` (4096 blocos visitados por padrão) resulta em `limit_exceeded`. Redes não atravessam dimensões, níveis ou sublevels Sable.

## Modular Table API

![Módulo FMS](../../assets/fms-module.png)

O peripheral `modular_table` consulta e configura os módulos instalados na mesa 3×3. As coordenadas do grid Lua começam em **1**. A instalação e remoção continuam sendo ações físicas no jogo; Lua não cria módulos físicos.

### Consultar e configurar o painel

Consulte o grid com `getGridSize()`, `getModules()` e `getSlot(column, row)`. `canFit(column, row, width, height)` verifica se um footprint cabe, sem instalar nada. Coordenadas fora da faixa geram erro Lua; um footprint válido que ultrapasse a borda retorna false.

`getGridSize()` retorna `{columns = 3, rows = 3}`. `getSlot()` retorna `{occupied = false, column = ..., row = ...}` ou a descrição de um módulo ocupado com `type`, `column`, `row`, `width`, `height`, `channel`, `threshold`, `source`, `alertChannel`, `minimumSeverity` e `buzzerVolume`. `getOutputs()` retorna descrições dos módulos com `active`, `signal` e `severity` atual. `getPanelStatus()` informa `networkStatus`, `gpwsAvailable`, `muted`, `installedModules` e `activeModules`.

Configure módulos de alerta com `configureAlertModule(column, row, source, channel, minimumSeverity)`. `source` é `gpws` ou `test`; severidade é `advisory`, `caution` ou `warning`. `applyBasicSetup()` associa lâmpadas e buzzers instalados a `gpws.any` em Caution. Sinais de teste locais usam `configureModule(...)` e `setTestSignal(channel, value)`; o módulo ativa quando o valor alcança o threshold numérico. Esses sinais não são leituras de sensores da rede.

```lua
local panel = assert(peripheral.find("modular_table"), "Mesa ausente")
print(textutils.serialize(panel.getGridSize()))
print(textutils.serialize(panel.getModules()))
panel.applyBasicSetup()
print(textutils.serialize(panel.getOutputs()))

while true do
  local _, attachment, action, module = os.pullEvent("modular_table_changed")
  print(attachment, action, module.type, module.column, module.row)
end
```

Outros métodos: `getAvailableChannels()`, `getPanelStatus()`, `setBuzzerVolume(column, row, percent)`, `testPanel()`, `setMuted(muted)`, `setLampTestIntensity(column, row, level)` e `clearLampTestIntensity(column, row)`. Volume aceita de 0 a 100. Intensidade de teste é uma sobreposição visual temporária e não projeta luz dinâmica no mundo.

`applyBasicSetup()` retorna a quantidade de módulos de lâmpada/buzzer configurados. `getAvailableChannels()` lista `gpws.any`, `gpws.terrain`, `gpws.pull_up`, `gpws.sink_rate`, `gpws.dont_sink`, `gpws.too_low`, `gpws.bank_angle` e `gpws.sensor_fail`. O método legado `configureModule(column, row, channel, threshold)` configura uma lâmpada instalada para sinais de teste locais. `setTestSignal(channel, value)` atualiza esse sinal local. `configureAlertModule(...)`, `setBuzzerVolume(...)` e os métodos de teste da lâmpada retornam booleanos; coordenadas inválidas ou módulos não compatíveis geram erro Lua.

Eventos: `modular_table_changed(attachment, action, module)`, `modular_table_signal_changed(attachment, channel, value)`, `modular_table_alert_outputs_changed(attachment, panelStatus, outputs)` e `modular_table_panel_state_changed(attachment, state, value)`. Eles indicam mudanças confirmadas pelo servidor. Consulte [controles de waypoint do FMS](#fms-and-navigator-api) e [GPWS Computer](#gpws-computer-api).

### Consultar a rede de cabos

`getNetworkSignals()` lê snapshots tipados dos canais publicados pelos endpoints na Avionics Cable Network conectada e completa. Esse método não substitui a [Network Bridge](#avionics-network-bridge-api), que informa a topologia. Se a travessia for incompleta, um resultado vazio não prova que não há endpoints.

## FMS and Navigator API

![Módulo FMS](../../assets/fms-module.png)

O FMS é um módulo virtual 2×3 instalado na Modular Table. Ele guarda waypoints nomeados com dimensão e coordenadas inteiras de bloco. As coordenadas do grid Lua da mesa começam em 1. Valores fracionários enviados pela API são arredondados para baixo, inclusive coordenadas negativas.

### Gerenciar waypoints por Lua

O peripheral da mesa oferece `getFmsWaypoints(column, row)`, `createWaypoint(column, row, name, x, y, z)`, `updateWaypoint(column, row, id, name, x, y, z)`, `deleteWaypoint(column, row, id)`, `selectWaypoint(column, row, id)` e `clearWaypointSelection(column, row)`. Métodos de CRUD e seleção retornam true quando aceitam a mudança e false quando não aceitam; UUID malformado ou coordenadas fora do limite geram erro Lua. Cada waypoint retornado tem `{id, name, dimension, x, y, z, selected}`. `createWaypoint` retorna booleano, não o ID novo; use `getFmsWaypoints` para obter o UUID.

```lua
local panel = assert(peripheral.find("modular_table"), "Mesa ausente")
local column, row = 1, 1 -- célula inicial do módulo FMS instalado
for _, waypoint in ipairs(panel.getFmsWaypoints(column, row)) do
  print(waypoint.id, waypoint.name, waypoint.x, waypoint.y, waypoint.z,
    waypoint.selected and "ATIVO" or "")
end

-- createWaypoint retorna true/false; consulte a lista para obter o UUID novo.
if panel.createWaypoint(column, row, "Home", 0, 64, 0) then
  local waypoints = panel.getFmsWaypoints(column, row)
  local home = waypoints[#waypoints]
  if home then panel.selectWaypoint(column, row, home.id) end
end
```

Nomes aceitam de 1 a 32 caracteres. Waypoints novos usam a dimensão atual; editar preserva a dimensão original. Os dados e o destino selecionado ficam armazenados no item `fms_module` quando o módulo é removido.

`getFmsSignals(column, row)` retorna leituras indexadas por `waypoint_selected` e `distance_to_waypoint`. Cada leitura tem `status`, `unit` e `gameTime`, além de `value` quando válida. `waypoint_selected` é uma leitura booleana `VALID`. `distance_to_waypoint` é a distância horizontal X/Z em blocos e fica `UNAVAILABLE` sem destino ou quando ele está em outra dimensão. `modular_table_fms_waypoint_changed(attachment, action, column, row, waypoint)` informa edições; a tabela waypoint fica vazia quando o evento remove um waypoint. `modular_table_fms_signal_changed(attachment, column, row, channel, reading)` informa mudanças dos canais. `getNetworkSignals()` também lê snapshots tipados; módulos virtuais incluem `module_column` e `module_row` para identificar a posição.

### Vincular o item Navigator

Selecione um `fms_navigator` na aba Navigator da interface FMS para vinculá-lo àquele módulo exato; o item não é consumido. Substituir um item já vinculado a outro FMS exige confirmação. Insira o item vinculado numa Navigation Table do Aeronautics para seguir o waypoint selecionado. O destino precisa estar carregado no mesmo nível e sublevel Sable; a busca não carrega chunks. A coordenada Y não afeta a direção da bússola. Canais FMS não criam alertas GPWS.

## GPWS Computer API

![GPWS Computer](../../assets/gpws-computer.png)

O GPWS Computer lê snapshots do Radar Altimeter e dos Terrain Scanners por uma Avionics Cable Network completa. Ele não faz raycasts nem carrega chunks. O tipo do peripheral é `gpws`.

### Consultar estado e alertas

Use `getStatus()` para consultar modo, perfil, fase, estado da rede, quantidade de endpoints, clearance, velocidade vertical e bank. `getAlerts()` retorna uma entrada por canal com `state` (`inactive`, `active` ou `unavailable`), `severity` e `gameTime`. `getConfiguration()` informa as regras efetivas.

```lua
local gpws = assert(peripheral.find("gpws"), "GPWS Computer ausente")
print(textutils.serialize(gpws.getStatus()))
for channel, alert in pairs(gpws.getAlerts()) do
  print(channel, alert.state, alert.severity)
end

while true do
  local _, attachment, alert = os.pullEvent("gpws_alert_changed")
  print(attachment, textutils.serialize(alert))
end
```

Outros eventos são `gpws_flight_phase_changed`, `gpws_mode_changed` e `gpws_configuration_changed`. Eles incluem nome da attachment e snapshot, e ocorrem quando o estado relevante muda.

### Configurar o perfil

O perfil Basic é o padrão. Ele arma quando há rede completa e Radar Altimeter válido; o jogador pode ativar/desativar e escolher sensibilidade `low`, `normal` ou `high`. Terrain Scanner é opcional no Basic. O perfil Advanced começa em `standby`; um programa de computador precisa armá-lo explicitamente.

```lua
gpws.setProfile("advanced")
gpws.setAlertConfiguration("sink_rate", "descent", {
  cautionThreshold = 5,
  warningThreshold = 10,
  hysteresisPercent = 12,
  confirmationSamples = 3,
})
gpws.setPhaseOverride("auto")
gpws.setMode("armed")
```

Setters disponíveis: `setProfile("basic"|"advanced")`, `setMode("off"|"standby"|"armed"|"test")`, `setSensitivity("low"|"normal"|"high")`, `setAlertConfiguration(channel, phase, config)` e `setPhaseOverride("auto"|phase)`. Regras de threshold só podem ser alteradas no Advanced. Thresholds aceitam números finitos de 0 a 4096; zero desativa aquele nível. `hysteresisPercent` aceita 0–90 e `confirmationSamples`, 1–20. Escritas inválidas retornam false sem mudar o estado.

Fases aceitas na configuração: `ground`, `takeoff`, `climb`, `cruise`, `descent`, `approach` e `unknown`. O significado do threshold depende do canal: `TERRAIN` usa distância do contato; `PULL_UP` usa distância do contato central e `secondaryWarningThreshold` para tempo até o solo; `SINK_RATE` usa velocidade de descida; `DONT_SINK` usa perda de AGL; `TOO_LOW` usa AGL; e `BANK_ANGLE` usa graus. `inhibited = true` desativa imediatamente a regra daquele canal/fase.

### Alertas e limites

Canais: `TERRAIN`, `PULL_UP`, `SINK_RATE`, `DONT_SINK`, `TOO_LOW`, `BANK_ANGLE` e `SENSOR_FAIL`. As regras usam blocos, segundos e graus do jogo, não limites aeronáuticos reais. O modo Basic usa os valores padrão do mod. Cobertura parcial sem contato conhecido não significa rota livre. Leituras com mais de dois intervalos do sensor ficam obsoletas. Após carregar o mundo, o modo volta a Standby; Basic arma novamente quando as entradas necessárias ficam disponíveis, enquanto Advanced exige comando explícito para armar.

| Canal | Comportamento padrão |
| --- | --- |
| `TERRAIN` | Caution para contato conhecido a até 32 blocos, ou 8 blocos em Approach. |
| `PULL_UP` | Warning para contato conhecido a até 8 blocos no cone frontal central de 45°, ou tempo até o solo ≤2 segundos durante descida. |
| `SINK_RATE` | Caution com descida ≥6 blocos/s; Warning a ≥12. |
| `DONT_SINK` | Warning após perda ≥4 blocos de AGL recente durante Takeoff/Climb, numa janela de 5 segundos. |
| `TOO_LOW` | Fora de Ground: Caution com AGL ≤8 blocos, Warning ≤3; em Approach: ≤3 e ≤1. |
| `BANK_ANGLE` | Fora de Ground: Caution a ≥30°, Warning a ≥45°. |
| `SENSOR_FAIL` | Caution se a rede estiver incompleta/desconectada, faltar o altímetro obrigatório ou uma fonte instalada relevante falhar/ficar obsoleta. |

Alertas regulares usam histerese de 10% e duas amostras para ativar/limpar; `PULL_UP` ativa na primeira amostra qualificadora. Alertas de risco são suprimidos em Ground, Standby e Off. Standby ainda informa `SENSOR_FAIL`.
