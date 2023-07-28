import * as vscode from 'vscode';
import { AST, Insert_Replace, Parser } from 'node-sql-parser';

class SqlHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Hover> {
    try {
      const selectedWord = this.getSelectedWord(document, position);

      const sqlContent = document.lineAt(position).text;
      const queries = this.splitSqlQueries(sqlContent);

      const hoverMessage = this.getHoverMessageForWord(queries, selectedWord);

      return new vscode.Hover(hoverMessage);
    } catch (error) {
      return null;
    }
  }

  private getSelectedWord(document: vscode.TextDocument, position: vscode.Position): string {
    const range = document.getWordRangeAtPosition(position);
    return document.getText(range);
  }

  private splitSqlQueries(sqlContent: string): string[] {
    return sqlContent.split(';').filter(query => query.trim().length > 0).map(query => `${query};`);
  }

  private getHoverMessageForWord(queries: string[], selectedWord: string): string {
    const parser = new Parser();
    let hoverMessage = '';

    for (const query of queries) {
      const ast = this.getAstForQuery(parser, query) as Insert_Replace;
      if (ast && ast.type === 'insert') {
        hoverMessage += this.getHoverMessageForInsertQuery(ast, selectedWord);
      }
    }

    return hoverMessage;
  }

  private getAstForQuery(parser: Parser, query: string): AST | AST[] {
    return parser.astify(query, {
      database: 'PostgresQL',
    });
  }

  private getHoverMessageForInsertQuery({ columns, values }: Insert_Replace, selectedWord: string): string {
    let hoverMessage = '';

    if (columns && values) {
      const columnIndex = columns.findIndex(column => column === selectedWord);
      const selectedValue =
        columnIndex >= 0 && columnIndex < values.length ? values[columnIndex] : undefined;

      if (selectedValue !== undefined) {
        hoverMessage += `**${selectedWord}** corresponds to the value: **${selectedValue.value}**`;
      } else {
        const valueIndex = values.findIndex(
          // I don't know why but this column property is not documented
          // @ts-ignore
          val => (val.column !== undefined ? val.column : `${val.value}`) === selectedWord
        );
        const column = valueIndex >= 0 && valueIndex < columns.length ? columns[valueIndex] : undefined;

        if (column) {
          hoverMessage += `**${selectedWord}** corresponds to the column: **${column}**\n`;
        }
      }
    }

    return hoverMessage;
  }
}

function activate(context: vscode.ExtensionContext) {
  const sqlHoverProvider = vscode.languages.registerHoverProvider('sql', new SqlHoverProvider());
  context.subscriptions.push(sqlHoverProvider);
}

function deactivate() {}

export { activate, deactivate };
