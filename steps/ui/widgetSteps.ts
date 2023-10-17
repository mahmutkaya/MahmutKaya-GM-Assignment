import { Then, When } from '@cucumber/cucumber';
import { WidgetPage, locators } from '../../pages/WidgetPage';
import { expect } from '@playwright/test';
import { toCamelCase } from '../../support/helpers';

const widgetPage = new WidgetPage();

When('I click on {string} button in widget page', async (button: string) => {
  await widgetPage.clickOnButton(button);
});

Then('I verify that progress bar is at {string}', async (progress: string) => {
  await expect(page.getByRole('progressbar')).toHaveText(progress);
});

Then('I verify that {string} button has {string} text', async (button: string, text: string) => {
  await expect(page.locator(locators.buttons[toCamelCase(button)])).toHaveText(text);
});
