---
title: Loaders e validação
description: Alvos de Minecraft da R-Ui Lib, código compartilhado e builds repetíveis.
---

# Loaders e validação

A R-Ui Lib produz artefatos para dois loaders a partir do código de interface compartilhado. Os módulos específicos de cada loader fornecem a inicialização e as integrações com APIs diferentes.

| Minecraft | Loader | Versão mínima do loader | Java |
| --- | --- | --- | --- |
| 1.20.1 | Forge | 47.4.20 | 17 |
| 1.21.1 | NeoForge | 21.1.236 | 21 |

Use Java 21 para executar o Gradle deste workspace multilíder. As toolchains do Gradle selecionam Java 17 para Forge 1.20.1 e Java 21 para NeoForge 1.21.1.

## Compilar os dois artefatos

No repositório da R-Ui Lib, execute:

```powershell
.\scripts\dev.ps1 -Task buildAll
```

O repositório também documenta builds e clientes de desenvolvimento separados para cada loader. O script localiza instalações de JDK ou aceita caminhos explícitos para Java 17 e Java 21.

## Validar mudanças

Ao alterar componentes, layouts, temas ou exemplos compartilhados, valide os dois loaders. Mantenha o catálogo do playground e seus layouts incluídos alinhados e teste acesso client-side à API em um cliente de desenvolvimento.

O repositório traz comandos de build e verificações de paridade no guia de Forge/NeoForge. Ao relatar a validação, registre os comandos e runtimes utilizados; uma compilação bem-sucedida, por si só, não confirma o comportamento em jogo.
