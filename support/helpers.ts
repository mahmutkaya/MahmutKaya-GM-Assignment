export const REGEX = {
  NON_ALPHANUMERIC: /[^a-zA-Z0-9]+(.)/g,
};

export function toCamelCase(str: string) {
  return str.toLowerCase().replace(REGEX.NON_ALPHANUMERIC, (m, chr) => chr.toUpperCase());
}

export async function getTableData(headersLocator: string, rowsLocator: string, cellsLocator: string) {
  // Extract headers
  const headers = (await page.locator(headersLocator).allInnerTexts()).map((header) => header.trim());
  // Extract data rows
  const rows = await page.locator(rowsLocator).all();
  const tableData: Record<string, string>[] = [];

  for (const row of rows) {
    const rowData: Record<string, string> = {};
    const cells = await row.locator(cellsLocator).allInnerTexts();

    for (const [index, header] of headers.entries()) {
      cells[index].trim().length && (rowData[header] = cells[index].trim());
    }
    Object.keys(rowData).length && tableData.push(rowData);
  }
  return tableData;
}
