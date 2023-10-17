import { DataTable, Then, When } from '@cucumber/cucumber';
import { FormsPage, locators } from '../../pages/FormsPage';
import { expect } from '@playwright/test';

const formsPage = new FormsPage();

When('I fill in student registration form with following details:', async (studentDt: DataTable) => {
  await formsPage.fillInStudentRegistrationForm(studentDt);
});

When('I check {string} option in hobbies list', async (hobby: string) => {
  await page.locator(locators.others.hobby(hobby)).click();
});

When('I click on {string} option in gender list', async (gender: string) => {
  await page.locator(locators.others.gender(gender)).first().click();
});

When('I select {string} option in {string} dropdown', async (option: string, dropdown: string) => {
  await formsPage.selectDropdownItem(option, dropdown);
});

Then('I verify that success modal is displayed with {string} title', async (title: string) => {
  await expect(page.locator(locators.others.exampleModal)).toHaveText(title);
});
