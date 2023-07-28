const vscode = require('vscode');
const { Parser } = require('node-sql-parser');

class SqlHoverProvider {
  provideHover(document, position, token) {
    try {
      const range = document.getWordRangeAtPosition(position);
      let selectedWord = document.getText(range);

      const editor = vscode.window.activeTextEditor;
      const selection = editor.selection;
      if (selection && !selection.isEmpty) {
          const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
          selectedWord = editor.document.getText(selectionRange);
      }

      // Separa o conteúdo do arquivo em queries SQL separadas por ';'
      const sqlContent = document.lineAt(position).text;
      const queries = sqlContent.split(';').filter(query => query.trim().length > 0).map(query => `${query};`);


      // Analisa cada query individualmente
      const parser = new Parser();
      let hoverMessage = '';

      for (const query of queries) {

        const ast = parser.astify(query, {
          database: 'PostgresQL',
        });

        if (ast && ast[0] && ast[0].type === 'insert') {
          console.log('Insert type!');
          const { columns, values: rawValues } = ast[0];
          const values = Array.isArray(rawValues) ? rawValues[0].value : rawValues;
          console.log('columns and values:', columns, values);
          if (columns && values) {
            const columnIndex = columns.findIndex(column => column == selectedWord);
            const selectedValue = columnIndex >= 0 && columnIndex < values.length ? values[columnIndex] : undefined;

            if (selectedValue !== undefined) {
              hoverMessage += `**${selectedWord}** corresponde ao valor: **${selectedValue.value}**`;
            } else {
              const valueIndex = values.findIndex(val => (val.column !== undefined ? val.column : `${val.value}`) == selectedWord);
              console.log('valueIndex:',valueIndex);
              const column = valueIndex >= 0 && valueIndex < columns.length ? columns[valueIndex] : undefined;
              console.log('column:',column);

              if (column) {
                hoverMessage += `**${selectedWord}** corresponde à coluna: **${column}**\n`;
              }
            }
          }
        }
      }

      console.log('Hover Message:', hoverMessage);
      return new vscode.Hover(hoverMessage);
    } catch (error) {
      // console.error('Error:', error);
      return null; // Retorna null para evitar que a extensão falhe em caso de erro
    }
  }
}

function activate(context) {
  const sqlHoverProvider = vscode.languages.registerHoverProvider('sql', new SqlHoverProvider());
  context.subscriptions.push(sqlHoverProvider);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};

