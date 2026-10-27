---
title: Instalar a R-Ui Lib
description: Como instalar a dependência R-Ui Lib e quais versões de Minecraft são compatíveis.
---

# Instalar a R-Ui Lib

A R-Ui Lib é uma biblioteca usada por outros mods. Ela não adiciona uma tela ou recurso de jogo por conta própria.

## Requisitos

| Minecraft | Loader | Versão mínima do loader |
| --- | --- | --- |
| 1.20.1 | Forge | 47.4.20 |
| 1.21.1 | NeoForge | 21.1.236 |

Instale a versão que corresponde ao seu Minecraft e loader. Mantenha a R-Ui Lib e o mod que depende dela na mesma configuração. Instale-a no cliente e no servidor quando o mod dependente solicitar.

## Instalação

1. Baixe o JAR executável da R-Ui Lib para sua versão de Minecraft e loader na [página de releases do projeto](https://github.com/radaelilucca/mc-r-ui-lib/releases).
2. Coloque o JAR na pasta `mods` da sua instância de Minecraft.
3. Instale o mod que usa a biblioteca e as outras dependências exigidas por esse mod.
4. Inicie o jogo com o perfil do loader correspondente.

O JAR de fontes serve para desenvolvedores consultarem o código da biblioteca; ele não deve ser colocado na pasta `mods`.

## O que os jogadores verão

O mod que depende da R-Ui Lib fornece a tela e os controles. Conforme esse mod, eles podem incluir menus, configurações, filtros de itens, grades de inventário, prévias de cores ou personalização de temas.

JEI é opcional. Os mods podem usar a biblioteca sem ele; controles de filtro compatíveis aceitam itens arrastados do JEI quando instalado.

## Solução de problemas

- Se o Minecraft informar que falta uma dependência, instale a R-Ui Lib para a mesma versão de Minecraft e loader do mod dependente.
- Se houver incompatibilidade de versões, atualize ou escolha versões correspondentes da biblioteca e do mod que a exige.
- Informe o problema ao mod responsável pela tela afetada. Inclua as versões do Minecraft e loader, o mod dependente, etapas para reproduzir e um trecho relevante do log.

[Relatar um problema com a R-Ui Lib](https://github.com/radaelilucca/mc-r-ui-lib/issues)
