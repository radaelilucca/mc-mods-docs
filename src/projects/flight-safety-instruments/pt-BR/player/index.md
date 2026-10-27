---
title: Instalação e uso
---

# Instalação e uso

## Requisitos

- Minecraft 1.21.1 e NeoForge 21.1.236 ou mais recente
- Create 6.0.10 ou mais recente e Create Aeronautics 1.3 ou mais recente
- Sable 2.0.5 ou mais recente
- R-Ui Lib 0.5.0 ou mais recente
- CC:Tweaked 1.120.0 ou mais recente é opcional e necessário somente para integração com computadores

Create Aeronautics vem incluído no mod. Instale o mod e suas dependências necessárias no cliente e no servidor.

## Primeiro sensor

### Medir a distância até o solo

![Radar Altimeter visto de baixo](../../assets/radar-altimeter.png)

Coloque o Radar Altimeter com a lente de vidro apontada para baixo. Ele mede a distância abaixo da lente, até o alcance máximo configurado (128 blocos por padrão). Ajuste a faixa de distância na interface; o sinal de redstone aumenta conforme a distância aumenta. Conecte uma lâmpada ou outro componente de redstone a qualquer face de saída.

### Observar a rota de voo

![Terrain Scanner Basic](../../assets/terrain-scanner.png)

Aponte o bocal do Terrain Scanner para a área que deseja observar. O sinal aumenta quando obstáculos se aproximam. A saída está disponível em todas as faces, e o scanner pode ser instalado no teto mantendo a direção horizontal de frente.

![Terrain Scanner Advanced](../../assets/terrain-scanner-advanced.png)

O Advanced Terrain Scanner possui canais independentes Frente, Esquerda e Direita. Ajuste a abertura de 30° a 180° e configure o alcance de aviso de cada canal. Os canais laterais só cobrem essas direções quando a abertura é suficiente.

## Configurar saídas

Clique com o botão direito no sensor para definir os limites inferior e superior de distância. Sem um par completo de frequências Redstone Link, o sinal sai pelas faces do bloco. Um par completo muda a saída para o Redstone Link do Create; no Advanced Scanner, esse modo é global, então configure um par em cada canal que deve transmitir.

As varreduras não carregam chunks. Terreno em chunks descarregados não é observado e pode reduzir a cobertura do scanner ou deixar a leitura do altímetro indisponível. Consulte a [referência dos sensores](../technical/sensors) para dados e limites, ou o [guia CC:Tweaked](../technical/cc-tweaked) para ler snapshots em Lua.

## Aviônica experimental

Modular Table, módulos, FMS, Avionics Cable, Network Bridge e GPWS Computer são experimentais, não têm receitas e podem mudar. Estão disponíveis na aba criativa ou por comandos, por exemplo:

```mcfunction
/give @s aeronautics_fly_by_instruments:modular_table_base
/give @s aeronautics_fly_by_instruments:avionics_cable
/give @s aeronautics_fly_by_instruments:gpws_computer
```
