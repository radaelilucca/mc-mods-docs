---
title: Instalação e uso
description: Instale Hotbar Locker e trave slots da hotbar durante o jogo.
---

# Instalação e uso

## Requisitos

- **Minecraft 1.20.1:** Forge 47.4.0.
- **Minecraft 1.21.1:** Fabric Loader 0.16.9 e Fabric API 0.110.0+1.21.1, Forge 52.0.53 ou NeoForge 21.1.236.
- Instale o mod no cliente e no servidor.
- Create é opcional. No Minecraft 1.21.1, Hotbar Locker também protege os slots travados contra equipamentos da Create Toolbox.

## Trave um slot

1. Abra **Opções → Controles → Teclas de atalho** e procure **Hotbar Locker**.
2. Atribua uma tecla a **Alternar trava do slot da hotbar**.
3. Selecione o slot da hotbar que deseja proteger e pressione a tecla atribuída.
4. Confira a moldura dourada, o cadeado e a mensagem de confirmação. Pressione a tecla novamente nesse slot para destravá-lo.

As travas pertencem ao seu jogador e permanecem após salvar, reconectar ou renascer. A moldura contorna o slot enquanto ele trava; o cadeado aparece depois do contorno. O contorno do slot selecionado fica dourado enquanto ele estiver travado.

## O que a trava protege

As travas impedem substituições automáticas. Quando possível, o pick block coloca o item em um slot desbloqueado da hotbar. Se todos estiverem travados, o pick no modo Criativo usa um espaço disponível no inventário principal; sem espaço, deixa os itens protegidos intactos. Equipamentos da Create Toolbox são redirecionados para um slot desbloqueado quando possível e são recusados com segurança quando todos os slots da hotbar estão travados.

Você ainda pode selecionar, usar, consumir, danificar e mover itens travados manualmente. Limpar o inventário Criativo preserva as pilhas travadas na hotbar.

Consulte [Configurações](configuration) para ver a tecla de atalho e a ausência de arquivos de configuração editáveis do mod.
