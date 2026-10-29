---
title: Guia de integração
description: Adicione a R-Ui Lib a um mod Forge ou NeoForge e use sua API de interface.
---

# Integrar a R-Ui Lib

A R-Ui Lib é uma dependência executável separada. O mod consumidor compila usando o JAR da biblioteca e declara a dependência para que o jogo carregue ambos os mods; o JAR da biblioteca não é embutido no artefato do consumidor.

## Adicionar a dependência

Coloque o JAR executável no projeto consumidor e adicione-o ao classpath do Gradle:

```groovy
dependencies {
    implementation files("libs/r_ui_lib-1.21.1-neoforge-<version>.jar")
}
```

O JAR contém metadados do loader, então a execução de desenvolvimento pode detectá-lo. Jogadores instalam a biblioteca como um mod separado.

Declare a dependência nos metadados do mod consumidor. Para NeoForge, uma dependência apenas de cliente pode ser declarada assim:

```toml
[[dependencies.${mod_id}]]
modId="r_ui_lib"
type="required"
versionRange="[0.8.0,)"
ordering="AFTER"
side="CLIENT"
```

Ajuste o intervalo de versões e o formato dos metadados à release e ao loader realmente usados pelo seu mod.

## Usar a API pública

As classes públicas de interface ficam em `com.radaeli.ruilib.ui`. Tipos de tela e componentes que usam classes client-side do Minecraft só devem ser acessados pelo código do cliente.

Escolha o tema global durante a inicialização do cliente:

```java
UiThemes.setGlobalTheme(UiTheme.DARK); // ou UiTheme.LIGHT
```

Crie os controles como objetos Java comuns e adicione-os a um componente raiz. `UiScreen` fornece o ciclo de vida da tela, desenho e distribuição de entradas para a árvore de componentes.

## Seleção de itens

`ItemSlot` armazena uma referência de filtro, não uma pilha do inventário. `InventoryGrid` permite ao jogador selecionar itens sem alterar o inventário. Com o JEI instalado, slots compatíveis dentro de uma `UiScreen` também aceitam itens arrastados da interface do JEI.

Para contêineres controlados pelo mod consumidor, use o modo de interação personalizado da grade e aplique e sincronize as alterações de inventário no próprio mod. Nesse modo, a biblioteca não altera o contêiner.

## Publicação e artefatos

Para integração local, compile os artefatos executáveis usando o Gradle Wrapper do projeto e use um JAR compatível. A biblioteca também oferece um fluxo de publicação Maven, que exige configurar o endereço do repositório pela pessoa mantenedora. Nunca inclua credenciais de publicação nos arquivos do projeto.

Consulte [loaders e validação](./loaders-and-validation) para ver os alvos de build e verificações repetíveis.
