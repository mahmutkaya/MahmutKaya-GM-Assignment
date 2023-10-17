import { toCamelCase } from '../support/helpers';

export const locators = {
  buttons: {
    submit: '#submit',
  },
  listItems: {
    brokenLinksAndImages: '#item-6:has-text("Broken Links - Images")',
    droppable: '.group-header:has-text("Interactions") + * #item-3',
    practiceForm: '.group-header:has-text("Forms") + * #item-0',
    progressBar: '.group-header:has-text("Widgets") + * #item-4',
    toolTips: '.group-header:has-text("Widgets") + * #item-6',
    webTables: '.group-header:has-text("Elements") + * #item-3',
  },
};

export class BasePage {
  async navigateTo(pageName: string) {
    await page.goto(BASE_URL + pageName);
  }

  async clickOnItemInLeftPanel(item: string) {
    const itemLocator = locators.listItems[toCamelCase(item)];
    await page.locator(itemLocator).click();
  }

  async clickOnButton(button: string) {
    const buttonLocator = locators.buttons[toCamelCase(button)];
    await page.locator(buttonLocator).click();
  }
}
