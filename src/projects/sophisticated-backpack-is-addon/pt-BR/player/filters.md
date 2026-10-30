---
title: Filtros e prioridade de origem
description: Escolha quais itens correspondem ao filtro e se a mochila ou a rede vinculada será consultada primeiro.
---

# Filtros e prioridade de origem

Abra a aba do upgrade na mochila para configurar o filtro. Os controles variam conforme a função e reutilizam a interface de filtros do Sophisticated Backpacks. O filtro define quais itens ou fluidos podem ser manipulados; a prioridade de origem define de onde um item elegível é retirado ou para onde ele é enviado primeiro. São configurações distintas.

## Lista permitida e lista bloqueada

Quando o filtro oferece seleção de modo, escolha **Allow list** para manipular somente itens que correspondam a um slot do filtro ou **Block list** para ignorar os itens correspondentes e manipular os demais elegíveis. Por exemplo, coloque pedregulho em uma Allow list para depositar ou coletar somente pedregulho; coloque-o em uma Block list para excluí-lo e aceitar os demais itens elegíveis.

Alguns upgrades usam filtros especializados: Restock usa o filtro Deposit do Sophisticated, Feeding aceita alimentos, Alchemy aceita consumíveis compatíveis e Pump filtra fluidos. A aba apresenta os controles relevantes à função.

## Corresponder a itens guardados na mochila

Pickup e Magnet usam o filtro de conteúdo do Sophisticated, que pode comparar itens com os que já estão guardados na mochila. **Match stored items** restringe o filtro a esse contexto de conteúdo da mochila; use-o quando quiser que a coleta siga os itens que a mochila já contém. Essa opção é diferente da prioridade de origem.

## Backpack first e Linked network first

Upgrades que podem usar tanto a mochila quanto a rede vinculada oferecem um controle de prioridade:

- **Backpack first:** tenta usar a mochila primeiro como origem ou destino; em seguida, usa a rede para o que não couber nela.
- **Linked network first:** tenta usar primeiro a rede vinculada; depois usa a mochila para o que restar.

Por exemplo, Remote Refill em Backpack first retira primeiro da mochila o item solicitado, se disponível, e busca na rede a quantidade restante. Remote Pickup em Linked network first envia o item coletado à rede primeiro, se possível, e usa a mochila como alternativa. Os filtros continuam valendo para cada origem ou destino consultado.

A prioridade está disponível em Pickup, Magnet, Refill, Feeding, Alchemy e Pump. Deposit sempre envia itens da mochila à rede e Restock sempre traz itens da rede para a mochila; esses dois têm direção fixa.
