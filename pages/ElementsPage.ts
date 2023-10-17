import { DataTable } from '@cucumber/cucumber';
import { getTableData, toCamelCase } from '../support/helpers';
import { BasePage } from './BasePage';

export const locators = {
  buttons: {
    add: '#addNewRecordButton',
  },
  icons: {
    editRecord: (record: string) => `[role="gridcell"]:has-text("${record}") ~ [role="gridcell"] [title="Edit"]`,
  },
  images: {
    toolsqa1: 'img[src*="Toolsqa_1.jpg"]',
  },
  inputs: {
    age: '#age',
    department: '#department',
    email: '#userEmail',
    firstName: '#firstName',
    lastName: '#lastName',
    salary: '#salary',
  },
  others: {
    registrationForm: '#registration-form-modal',
    webTableCells: '[role="gridcell"]',
    webTableHeaders: '[role="columnheader"]',
    webTableRows: '[role="rowgroup"]',
  },
};

export class ElementsPage extends BasePage {
  async clickOnButtonInElementsPage(button: string) {
    const buttonLocator = locators.buttons[toCamelCase(button)];
    await page.locator(buttonLocator).click();
  }

  async enterValueInInputField(value: string, input: string) {
    const inputLocator = locators.inputs[toCamelCase(input)];
    await page.locator(inputLocator).clear();
    await page.locator(inputLocator).fill(value);
  }

  async getWebTableRecords(): Promise<Record<string, string>[]> {
    return await getTableData(
      locators.others.webTableHeaders,
      locators.others.webTableRows,
      locators.others.webTableCells,
    );
  }

  async fillInRegistrationForm(recordDt: DataTable) {
    const record: Record<string, string> = recordDt.hashes()[0];
    await page.waitForSelector(locators.others.registrationForm);

    for (const [key, value] of Object.entries(record)) {
      await page.locator(locators.inputs[toCamelCase(key)]).clear();
      await page.locator(locators.inputs[toCamelCase(key)]).fill(value);
    }
  }

  async isRecordExistInWebTable(recordDt: DataTable): Promise<boolean> {
    const expectedRecord = recordDt.hashes()[0];
    const actualRecords = await this.getWebTableRecords();

    return actualRecords.some((actualRecord) => JSON.stringify(actualRecord) === JSON.stringify(expectedRecord));
  }

  async createRecordInWebTable(recordDt: DataTable) {
    await this.navigateTo('webtables');
    if (!(await this.isRecordExistInWebTable(recordDt))) {
      await page.locator(locators.buttons.add).click();
      await this.fillInRegistrationForm(recordDt);
      await this.clickOnButton('submit');
    }
  }
}
