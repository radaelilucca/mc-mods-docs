---
title: Playground de interface
description: Explore e salve layouts de componentes nas execuções de desenvolvimento da R-Ui Lib.
---

# Playground de interface

O playground é uma ferramenta de desenvolvimento para organizar componentes, inspecionar suas propriedades e pré-visualizar interações dentro do Minecraft.

## Abrir

Inicie um cliente de desenvolvimento e pressione **F7** para abrir o playground. A tela fica disponível em execuções de desenvolvimento, não nas instalações de produção do mod. **F8** abre o exemplo de seleção de itens; **F6** mostra uma sequência demonstrativa de notificações toast. Essas teclas podem ser alteradas em Controles.

## Editar e pré-visualizar

Arraste componentes da paleta para a tela. Aninhe-os em contêineres de layout, ajuste propriedades no inspetor e alterne entre **Edit** e **Preview**. No modo de pré-visualização, experimente controles e o comportamento do layout antes de voltar a editar.

Os exemplos incluídos cobrem controles básicos, entradas, layouts, dados, status e rolagem. Eles são carregados diretamente do mod e estão disponíveis antes de salvar qualquer layout.

Com o JEI instalado, slots compatíveis podem aceitar itens arrastados. O exemplo de seleção também mostra como referenciar um item do inventário sem removê-lo.

## Salvar e carregar

Salve um layout nomeado pela barra superior. Os layouts ficam em `config/r_ui_lib/ui-playground/` dentro da pasta do jogo. A janela **Load** lista os exemplos incluídos e os layouts salvos. Callbacks demonstrativos são criados pelo playground e não são gravados no JSON.

Os layouts usam a versão de esquema `1`. Arquivos inválidos são rejeitados com uma mensagem na tela para que o jogo continue aberto.
