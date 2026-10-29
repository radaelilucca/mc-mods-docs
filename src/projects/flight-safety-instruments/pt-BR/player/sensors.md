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

Abra o scanner e escolha em **Olha para** o lado da aeronave que ele vigia: frente da aeronave, traseira da aeronave, lado esquerdo ou lado direito. Um scanner novo começa como **Não definido**. Só o [Avionics Computer](avionics-computer) usa essa opção; a saída de redstone não depende dela.

O scanner considera o obstáculo detectado mais próximo. O sinal fica mais forte perto de um obstáculo: o limite inferior configurado produz 15, o limite superior produz 0 e valores intermediários são escalados dentro da faixa. O padrão é de 4–32 blocos.

## Advanced Terrain Scanner

![Modelo do Advanced Terrain Scanner](../../assets/terrain-scanner-advanced.png)

O Advanced possui canais independentes `front`, `left` e `right`. Sua **Abertura** pode ser ajustada entre 30° e 180°, de 5 em 5°, e começa em 90°. A tela mostra uma seção Frente, Esquerda e Direita, cada uma com a própria faixa de distância e frequências opcionais de Redstone Link do Create. Os canais laterais só são ativados acima de 50° de abertura; abaixo disso a seção deles mostra "Exige abertura acima de 50°". Como o scanner Basic, ele tem a opção **Olha para**.

Cada canal usa a mesma escala de proximidade do scanner Basic: 15 no limite inferior ou mais perto, 0 no limite superior ou mais longe e intensidade escalada entre os dois. O padrão é de 4–32 blocos por canal. Com saída pelas faces, o Advanced direciona cada canal à face horizontal correspondente: frente, esquerda ou direita.

## Configurar saídas de redstone

Clique com o botão direito em qualquer sensor para abrir a tela de saída. **Cada mudança aplica na hora**: não há botão Aplicar nem Cancelar. O cabeçalho mostra o sensor e para onde vai o sinal: **Faces do bloco** ou **Via Link**.

Cada canal tem dois controles de distância, em blocos (1 bloco = 1 m):

- Radar Altimeter: **Baixo · sinal 0** e **Alto · sinal 15**. O sinal cresce quando a nave sobe. Padrão 0–32.
- Terrain Scanners: **Perto · sinal 15** e **Longe · sinal 0**. O sinal cresce quando um obstáculo se aproxima. Padrão 4–32.

Clique nas setas ou use a roda do mouse; com Shift o passo é 10. As duas pontas nunca se cruzam nem passam do alcance máximo do sensor (128 blocos por padrão). Um canal sem leitura válida ou sem obstáculo detectado emite 0.

Os dois slots de frequência (vermelho e azul) de um canal escolhem para onde vai o sinal:

- Deixe os dois vazios para emitir redstone pelas faces do bloco.
- Clique num slot para abrir **Frequência do Link**: clique num item do inventário para copiá-lo para o slot, ou arraste-o até um slot. Os itens são copiados, nunca gastos. **Concluir** ou Esc volta. Clique direito num slot o limpa.
- Com os dois slots preenchidos, o canal transmite pelo Redstone Link do Create. O estado ao lado dos slots mostra **Faces do bloco**, **Par incompleto**, **Via Link** ou **Desligado (Link)**.
- No Advanced Terrain Scanner o roteamento é global. Um par completo em qualquer canal passa o sensor inteiro para o Redstone Link, e os canais sem par completo ficam desligados. Dê um par a cada canal que quiser usar.

As configurações ficam salvas no sensor.

## Limites das leituras

Os sensores não carregam chunks. Terrenos em chunks descarregados não são escaneados; por isso, um Terrain Scanner pode ter cobertura incompleta perto desses limites. Uma leitura indisponível não é uma medição de distância zero. Posicione os sensores de modo que a direção de medição e o terreno observado estejam em chunks carregados.
