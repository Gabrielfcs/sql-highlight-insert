## SQL Highlight Insert - Visual Studio Code Extension

🇧🇷 [Ver em Português (Brasil)](./README.pt-BR.md)

## Overview

The SQL Highlight Insert extension adds syntax highlighting features for `INSERT` queries in SQL files in Visual Studio Code (VSCode). When hovering over a column, the extension displays a tooltip with the corresponding column value. When hovering over the value, the tooltip shows the column name.

## Features

- Syntax highlighting for SQL `INSERT` queries.
- Tooltip displaying the corresponding column value when hovering over a column.
- Tooltip showing the column name when hovering over the value.

## How to Use

1. Install the SQL Highlight Insert extension in Visual Studio Code. To do this, follow the steps below:
   - Open VSCode.
   - Click on the extensions icon in the left sidebar (or use the shortcut `Ctrl+Shift+X` or `Cmd+Shift+X` on Mac) to open the Visual Studio Code Marketplace.
   - Search for "SQL Highlight Insert" in the search box.
   - Click "Install" to install the extension.

2. Open an SQL file in VSCode containing `INSERT` queries.

3. When hovering over a column, the tooltip will display the corresponding column value.

4. When hovering over the value, the tooltip will display the column name.

## Example

Consider the following snippet from an SQL file:

```sql
INSERT INTO "product"("id", "name", "price", "stock") VALUES (1, 'Product A', 10.99, 50);
INSERT INTO "product"("id", "name", "price", "stock") VALUES (2, 'Product B', 5.99, 30);
```

- When hovering over the word `"name"` in the first line, the tooltip will display the corresponding value `"Product A"`.
- When hovering over the value `"Product A"`, the tooltip will display the column name `"name"`.
- The tooltip will be formatted as `string "Product A"`.

- When hovering over the number `10.99` in the first line, the tooltip will display the corresponding value `10.99`.
- When hovering over the value `10.99`, the tooltip will display the column name `"price"`.
- The tooltip will be formatted as `number 10.99`.

it will look like this:

![example](images/example.jpg)

## Notes

- The extension uses the `node-sql-parser` library to parse and interpret the SQL queries. Make sure the SQL code is valid for the extension to work correctly.
- The tooltip formatting may vary based on the structure of the SQL query and the information available in the code.
- The extension supports `INSERT` queries in SQL files that are open in Visual Studio Code.

## Support and Contributions

To report issues or make suggestions, visit the extension's repository on GitHub: [SQL Highlight Insert - GitHub](https://github.com/your-username/sql-highlight-insert).

Contributions are welcome! Feel free to submit pull requests to improve this extension.

## License

This extension is licensed under the MIT License. See the `LICENSE` file in the GitHub repository for more information.

## Authors

This extension was created by [Gabriel Felipe](https://github.com/gabrielfcs).