---
title: Sensors
---

# Sensors

Esta página cobre os sensores lançados: Radar Altimeter, Terrain Scanner e Advanced Terrain Scanner. Ela explica posicionamento, controles no jogo e saída de redstone. Para leituras em Lua, consulte o guia [Computer Craft](computer-craft).

## Radar Altimeter

![Modelo do Radar Altimeter](../../assets/radar-altimeter.png)

Coloque o Radar Altimeter com a lente de vidro apontada para baixo. Ele mede a distância livre abaixo da lente, até o alcance máximo configurado (128 blocos por padrão). O canal `altitude` sai por todas as faces do bloco. A intensidade aumenta com a altitude: o limite inferior configurado produz 0, o limite superior produz 15 e valores intermediários são escalados dentro da faixa. O padrão é de 0–32 blocos.

## Terrain Scanner

![Modelo do Terrain Scanner Basic](../../assets/terrain-scanner.png)

Coloque o scanner apontado para a área que deseja observar. O bocal indica a direção frontal. Ele acompanha sua orientação horizontal e pode ser instalado de ponta-cabeça sem mudar essa direção. O scanner Basic usa nove raios distribuídos por uma abertura fixa de 90° e emite o canal `front` por todas as faces do bloco.

O scanner considera o obstáculo detectado mais próximo. O sinal fica mais forte perto de um obstáculo: o limite inferior configurado produz 15, o limite superior produz 0 e valores intermediários são escalados dentro da faixa. O padrão é de 4–32 blocos.

## Advanced Terrain Scanner

![Modelo do Advanced Terrain Scanner](../../assets/terrain-scanner-advanced.png)

O Advanced possui canais independentes `front`, `left` e `right`. Sua abertura pode ser ajustada entre 30° e 180° e começa em 90°. Clique com o botão direito no bloco e ajuste o controle deslizante de abertura. As abas Frente, Esquerda e Direita configuram o alcance de cada canal e suas frequências opcionais de Redstone Link do Create. Os canais laterais só são ativados acima de uma abertura de 50°; a cobertura útil depende da abertura configurada.

Cada canal usa a mesma escala de proximidade do scanner Basic: 15 no limite inferior ou mais perto, 0 no limite superior ou mais longe e intensidade escalada entre os dois. O padrão é de 4–32 blocos por canal. Com saída pelas faces, o Advanced direciona cada canal à face horizontal correspondente: frente, esquerda ou direita.

## Configurar saídas de redstone

Clique com o botão direito em qualquer sensor para abrir a tela de configuração de saída. Arraste o controle de faixa para definir as distâncias próxima e distante. O alcance máximo do sensor é 128 blocos por padrão; a faixa válida deve ter limite inferior não negativo e limite superior maior, sem exceder o máximo configurado do sensor.

Os dois slots de frequência definem o roteamento da saída:

- Deixe ambos vazios para emitir redstone pelas faces do bloco.
- Coloque um item em cada slot para configurar um par de frequência do Redstone Link do Create. Selecione itens do inventário pelo seletor mostrado abaixo dos controles. Os itens formam a frequência e não são consumidos.
- No Advanced Terrain Scanner, o roteamento é global. Um par completo em qualquer canal muda todos os canais para saída por Redstone Link. Configure um par em cada canal que deve transmitir; canais sem par completo não têm frequência Link.

Use **Aplicar** para salvar ou **Cancelar** para descartar as alterações pendentes. As configurações ficam salvas no sensor. O sinal de altitude do Radar Altimeter aumenta quando a nave sobe; os sinais dos Terrain Scanners aumentam quando obstáculos se aproximam. Um canal sem leitura válida ou sem obstáculo detectado emite 0.

## Limites das leituras

Os sensores não carregam chunks. Terrenos em chunks descarregados não são escaneados; por isso, um Terrain Scanner pode ter cobertura incompleta perto desses limites. Uma leitura indisponível não é uma medição de distância zero. Posicione os sensores de modo que a direção de medição e o terreno observado estejam em chunks carregados.
