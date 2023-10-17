import { toCamelCase } from '../support/helpers';
import { BasePage } from './BasePage';

export const locators = {
  buttons: {
    startAndStop: '#startStopButton',
  },
};

export class WidgetPage extends BasePage {
  async clickOnButton(button: string) {
    const buttonLocator = locators.buttons[toCamelCase(button)];
    await page.locator(buttonLocator).click();
  }
}
