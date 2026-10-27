---
title: Funcionamento dos sensores
---

# Radar Altimeter e Terrain Scanners

![Radar Altimeter](../../assets/radar-altimeter.png)

## Radar Altimeter

O `radar_altimeter` dispara nove raios para baixo, num cone com meio ângulo de 20°. Pelo menos três precisam atingir uma superfície para validar a amostra; o valor retornado é a mediana das distâncias em blocos decimais. Ele ignora entidades e o sublevel que o contém, mas pode atingir formas de colisão do mundo ou de outros sublevels. O alcance máximo padrão é 128 blocos (`radarAltimeterMaxRange`); o intervalo compartilhado de varredura é de 5 ticks (`sensorScanIntervalTicks`). Raycasts não carregam chunks. Menos de três retornos resulta em `unavailable`; erro interno de varredura resulta em `failed`.

A API CC:Tweaked é `getReading()`, que retorna `{status, value?, unit, gameTime}`. `value` existe apenas com status `valid`, e `unit` é `blocks`. O evento `radar_altimeter_reading_changed` ocorre quando status ou valor muda, não apenas porque uma nova amostra foi registrada.

## Terrain Scanners

![Terrain Scanner Basic](../../assets/terrain-scanner.png)

Ambos os scanners apontam horizontalmente conforme a orientação do bloco, mesmo quando instalados de ponta-cabeça. Acompanham o movimento do sublevel Aeronautics e testam formas de colisão de blocos; entidades e o sublevel que contém o scanner são ignorados. Chunks descarregados reduzem a cobertura.

![Terrain Scanner Advanced](../../assets/terrain-scanner-advanced.png)

O `terrain_scanner` básico usa nove raios com abertura total fixa de 90°. O `terrain_scanner_advanced` distribui aproximadamente 9–81 raios por uma abertura ajustável de 30°–180° (90° por padrão). A quantidade de raios acompanha a área angular e não pode ser definida diretamente. `terrainScannerMaxRange` tem padrão de 128 blocos.

`getScan()` retorna snapshot com `status`, `contacts`, `sampledRays`, `totalRays`, `coverage`, `unit` (`blocks`) e `gameTime`. Cada contato contém `rayIndex` começando em 1, `distance` e `directionX`, `directionY`, `directionZ` relativos ao scanner (direita, cima, frente). Qualquer raio concluído torna a amostra `valid`, mesmo com cobertura parcial. Se nenhum raio concluir, o status é `unavailable`; erros inesperados são `failed`. Uma lista de contatos vazia só indica caminho livre com cobertura completa.

O peripheral avançado também oferece `getConfiguration()` e `setOpeningAngle(degrees)`, além do evento `terrain_scanner_configuration_changed`. O setter aceita 30–180 graus e retorna false para o valor atual ou inválido. As duas variantes emitem `terrain_scanner_scan_changed` quando a varredura muda.

## Saídas de redstone

Sensores expõem `getOutputs()`, `getOutputConfiguration()`, `setOutputRange(channel, min, max)` e `setLinkFrequencies(channel, first, second)`. A faixa de saída é convertida em sinal 0–15. O modo é automático: sem par completo de frequências, o sinal usa as faces do bloco; qualquer par completo seleciona Redstone Link. No Advanced Scanner, o modo vale para o bloco todo, então canais sem par não retornam à saída pelas faces.
