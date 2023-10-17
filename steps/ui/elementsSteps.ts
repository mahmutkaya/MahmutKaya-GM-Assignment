import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { ElementsPage, locators } from '../../pages/ElementsPage';
import { expect } from '@playwright/test';
import { toCamelCase } from '../../support/helpers';

const elementsPage = new ElementsPage();

Given('I have a record in web table with following details:', async (recordDt: DataTable) => {
  await elementsPage.createRecordInWebTable(recordDt);
});

When('I fill in registration form with following details:', async (recordDt: DataTable) => {
  await elementsPage.fillInRegistrationForm(recordDt);
});

When('I click on {string} button in elements page', async (button: string) => {
  await elementsPage.clickOnButtonInElementsPage(button);
});

When('I enter {string} in the {string} input field in elements page', async (value: string, input: string) => {
  await elementsPage.enterValueInInputField(value, input);
});

When(
  'I click on {string} icon of the record that contains firstname {string}',
  async (icon: string, firstName: string) => {
    await page.locator(locators.icons[toCamelCase(icon)](firstName)).click();
  },
);

Then('I verify that registration form is displayed', async () => {
  const registrationFormLocator = locators.others.registrationForm;
  await expect(page.locator(registrationFormLocator)).toBeVisible();
});
Then('I verify that web table has following record:', async (recordDt: DataTable) => {
  const isRecordExist: boolean = await elementsPage.isRecordExistInWebTable(recordDt);
  expect(isRecordExist).toBeTruthy();
});

Then('I verify that {string} image is broken', async (image: string) => {
  const src = await page.locator(locators.images[toCamelCase(image)]).first().getAttribute('src');
  const response = await page.goto(BASE_URL + src, { waitUntil: 'domcontentloaded' });
  const contentType = response.headers()['content-type'];

  expect(contentType.startsWith('image/')).toEqual(false);
});
