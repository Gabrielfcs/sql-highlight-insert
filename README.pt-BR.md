
## SQL Highlight Insert - Extensão para Visual Studio Code

🇺🇸 [View in English](./README.md)

## Visão geral

A extensão SQL Highlight Insert adiciona recursos de destaque de sintaxe para consultas de `INSERT` em arquivos SQL no Visual Studio Code (VSCode). Ao pairar o mouse sobre uma coluna, a extensão mostra um tooltip com o valor correspondente à coluna. Ao pairar sobre o valor, o tooltip exibe o nome da coluna.

## Funcionalidades

- Destaque de sintaxe para consultas SQL do tipo `INSERT`.
- Tooltip que mostra o valor correspondente à coluna ao pairar o mouse sobre uma coluna.
- Tooltip que mostra o nome da coluna ao pairar sobre o valor.

## Como usar

1. Instale a extensão SQL Highlight Insert no Visual Studio Code. Para fazer isso, siga os passos abaixo:
   - Abra o VSCode.
   - Clique no ícone de extensões na barra lateral esquerda (ou use o atalho `Ctrl+Shift+X` ou `Cmd+Shift+X` no Mac) para abrir a Visual Studio Code Marketplace.
   - Pesquise por "SQL Highlight Insert" na caixa de pesquisa.
   - Clique em "Install" para instalar a extensão.

2. Abra um arquivo SQL no VSCode contendo consultas de `INSERT`.

3. Ao pairar o mouse sobre uma coluna, o tooltip exibirá o valor correspondente à coluna.

4. Ao pairar sobre o valor, o tooltip exibirá o nome da coluna.

## Exemplo

Considere o seguinte trecho de um arquivo SQL:

```sql
INSERT INTO "product"("id", "name", "price", "stock") VALUES (1, 'Product A', 10.99, 50);
INSERT INTO "product"("id", "name", "price", "stock") VALUES (2, 'Product B', 5.99, 30);
```

- Ao pairar o mouse sobre a palavra `"name"` na primeira linha, o tooltip exibirá o valor correspondente `"Product A"`.
- Ao pairar sobre o valor `"Product A"`, o tooltip exibirá o nome da coluna `"name"`.
- O tooltip será formatado como `string "Product A"`.

- Ao pairar o mouse sobre o número `10.99` na primeira linha, o tooltip exibirá o valor correspondente `10.99`.
- Ao pairar sobre o valor `10.99`, o tooltip exibirá o nome da coluna `"price"`.
- O tooltip será formatado como `number 10.99`.

Isso aparecerá assim:

![example](images/example.jpg)

## Observações

- A extensão utiliza a biblioteca `node-sql-parser` para analisar e interpretar as consultas SQL. Certifique-se de que o código SQL seja válido para que a extensão funcione corretamente.
- A formatação do tooltip pode variar com base na estrutura da consulta SQL e nas informações disponíveis no código.
- A extensão suporta consultas de `INSERT` em arquivos SQL que estejam abertos no Visual Studio Code.

## Suporte e Contribuições

Para relatar problemas ou fazer sugestões, visite o repositório da extensão no GitHub: [SQL Highlight Insert - GitHub](https://github.com/your-username/sql-highlight-insert).

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests para melhorar esta extensão.

## Licença

Esta extensão é licenciada sob a

 Licença MIT. Consulte o arquivo `LICENSE` no repositório do GitHub para obter mais informações.

## Autores

Esta extensão foi criada por [Gabriel Felipe](https://github.com/gabrielfcs).