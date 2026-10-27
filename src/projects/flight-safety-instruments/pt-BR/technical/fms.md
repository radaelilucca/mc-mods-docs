---
title: Flight Management System
---

# Flight Management System

![Módulo FMS](../../assets/fms-module.png)

O FMS é um módulo virtual 2×3 instalado em uma Modular Table. Ele armazena waypoints com UUID, nome (1–32 caracteres), dimensão e coordenadas inteiras de bloco. Coordenadas Lua fracionárias são arredondadas para baixo, inclusive valores negativos. Ao remover o módulo ou quebrar a mesa, seus dados ficam no item `fms_module`. UUIDs duplicados são substituídos quando as duas cópias estão presentes em um mundo carregado.

O peripheral da mesa oferece `getFmsWaypoints(column, row)`, `createWaypoint(column, row, name, x, y, z)`, `updateWaypoint(column, row, id, name, x, y, z)`, `deleteWaypoint(column, row, id)`, `selectWaypoint(column, row, id)` e `clearWaypointSelection(column, row)`. Coordenadas do grid da mesa começam em 1. Editar preserva a dimensão do waypoint; criar usa a dimensão atual.

`getFmsSignals(column, row)` lê os canais do FMS. `waypoint_selected` é uma leitura booleana `VALID`. `distance_to_waypoint` é a distância horizontal X/Z em blocos e fica `UNAVAILABLE` quando não há alvo ou ele está em outra dimensão. `modular_table_fms_waypoint_changed` e `modular_table_fms_signal_changed` notificam mudanças confirmadas pelo servidor. `getNetworkSignals()` também lê canais tipados publicados por endpoints na rede física de cabos completa; canais de módulos virtuais incluem `module_column` e `module_row`.

Um `fms_navigator` pode ser associado ao módulo exato pela aba Navigator da interface; o item não é consumido. Substituir um Navigator associado a outro FMS exige confirmação explícita. A Navigation Table do Aeronautics procura apenas um FMS carregado no mesmo nível e sublevel Sable e não carrega chunks. O alvo da bússola segue horizontalmente o waypoint selecionado; Y não altera sua direção. O FMS não envia alertas ao GPWS.
