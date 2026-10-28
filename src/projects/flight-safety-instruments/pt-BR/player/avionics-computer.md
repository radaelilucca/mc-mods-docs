---
title: Avionics Computer e GPWS
---

# Avionics Computer e GPWS

::: warning Experimental
O Avionics Computer (no jogo em português, Computador de Aviônica) é conteúdo Experimental das versões de desenvolvimento posteriores à 0.1.0. Não tem receita e o comportamento pode mudar.
:::

![Avionics Computer em operação normal (esquerda) e em alerta (direita)](../../assets/avionics-computer.png)

O Avionics Computer é o centro da aeronave. Ele lê todos os sensores da rede, atribui um papel a cada um e roda um **GPWS** (Ground Proximity Warning System, sistema de alerta de proximidade do solo) sobre essas leituras. Ele avisa sobre terreno à frente, descida rápida, voo baixo demais e inclinação excessiva. Também é o ponto de entrada do [Computer Craft](computer-craft#avionics-computer-api) para a rede inteira.

Funciona como um GPWS real: **configura uma vez e depois só funciona.** Não há o que armar nem limites para editar. O computador fica ativo enquanto estiver no mundo. Você só escolhe a sensibilidade e, se quiser, desliga funções individuais.

## Configurar

1. Coloque o Avionics Computer em qualquer lugar da aeronave. Ele fica virado para você ao ser colocado.
2. Ligue o computador e os sensores na mesma rede, com o [Avionics Wire](avionics-network). O Radar Altimeter é obrigatório. Os Terrain Scanners são opcionais e ativam as funções de terreno.
3. Abra a tela de cada Terrain Scanner e escolha em **Olha para** o lado da aeronave que ele vigia: frente, traseira, esquerda ou direita. O computador nunca deduz o lado pela direção do bloco. Um scanner sem lado aparece como "lado não definido" no computador.
4. Mostre os alertas numa [Modular Table](modular-table) com lâmpadas e buzzers, ou leia-os pelo Computer Craft.

Uma [Modular Table](modular-table#acoplar-uma-mesa-ao-computador) montada diretamente no computador entra na rede dele sem fio.

## O bloco

A frente tem uma pequena tela e um botão de teste:

| Tela | Significado |
| --- | --- |
| Cursor `>_` piscando | Operação normal |
| `!` âmbar piscando | Atenção |
| `!` vermelho piscando | Alerta, ou o autoteste |
| `x` âmbar fixo | GPWS INOP: o computador não consegue funcionar (o motivo aparece na tela dele) |

Um computador recém-colocado mostra INOP até a primeira avaliação. **Clique no botão** para rodar o autoteste de 3 segundos, que leva todas as funções a Alerta. **Clique no resto do bloco** para abrir a tela.

## A tela

- **Cabeçalho:** a sensibilidade e o que importa agora: `NORMAL`, `ATENÇÃO · <função>`, `ALERTA · <função>`, `GPWS INOP` (com o motivo de rede) ou `AUTOTESTE`.
- **Sensores:** cada sensor com o papel e a leitura ao vivo, ou o problema: "sem leitura recente", "outra aeronave", "abertura < 45°", "varredura parcial", "lado não definido".
- **Funções:** cada função aparece ativa, em atenção ou alerta, INOP com motivo, ou inibida. **Clique numa função** para inibi-la ou reativá-la. GPWS INOP não pode ser inibido.
- **Rodapé:** **Sensibilidade** cicla baixa → normal → alta. **Testar** roda o autoteste.

### Papéis dos sensores

| Sensor | Papel |
| --- | --- |
| O Radar Altimeter com a menor altura válida | Altímetro principal |
| Os outros Radar Altimeters | Altímetro secundário |
| Terrain Scanner | Scanner frontal, traseiro, esquerdo ou direito: o lado escolhido na tela dele |

O computador acha o nariz da aeronave pelos scanners com lado: para onde olha um scanner frontal, oposto a um traseiro, ou a 90° de um lateral. O nariz orienta o cone do Pull up e o Bank angle. É um scanner **frontal** com varredura completa e abertura de pelo menos 45° que permite ao Pull up reagir a terreno à frente. Sem ele, o Pull up usa só o tempo até o solo.

## Funções

Os valores são de gameplay, em blocos, blocos por segundo, segundos e graus, não limites aeronáuticos reais.

| Função | Alerta |
| --- | --- |
| Terrain ahead | Atenção com contato a até 32 blocos (8 na aproximação). |
| Pull up | Alerta imediato com contato a até 8 blocos no cone frontal de 45°, ou com 2 segundos ou menos até o solo em descida. |
| Sink rate | Atenção a partir de 6 blocos/s de descida, Alerta a partir de 12. |
| Don't sink | Alerta ao perder 4 blocos ou mais logo após decolar ou durante a subida (janela de 5 segundos). |
| Too low | Fora do solo: Atenção a até 8 blocos, Alerta a até 3; na aproximação, 3 e 1. |
| Bank angle | Atenção a partir de 30°, Alerta a partir de 45°. |
| GPWS INOP | Atenção quando a rede está incompleta, falta o Radar Altimeter ou um sensor falhou ou parou de responder. |

- **A sensibilidade** desloca os limites em 20%. A alta avisa antes: os limites de distância crescem, e os de descida, perda de altitude e inclinação diminuem.
- **Um alerta por vez**, o mais urgente: Pull up, depois Terrain ahead, Too low, Sink rate, Don't sink e Bank angle. Alertas vêm antes de atenções. GPWS INOP só aparece sem alerta de risco.
- **No solo** (muito baixo e quase parado por um segundo) as funções de risco ficam quietas.
- Os alertas pedem duas leituras seguidas para começar e para limpar, exceto o Pull up, que dispara na primeira.
- **INOP com motivo:** uma função que não consegue trabalhar diz por quê: "sem altímetro", "sem scanner", "sem scanner frontal", "varredura parcial", "sem atitude" ou "estabilizando". Varredura parcial sem contato nunca é tratada como caminho livre.

O computador nunca varre o terreno sozinho nem carrega chunks. Ele usa o que os sensores já mediram, na mesma cadência deles.

## Mundos antigos

O GPWS Computer das versões anteriores carrega como Avionics Computer e mantém a sensibilidade. Perfis, modos e regras próprias deixaram de existir. Programas Lua precisam usar o peripheral `avionics_computer` em vez de `gpws`.
