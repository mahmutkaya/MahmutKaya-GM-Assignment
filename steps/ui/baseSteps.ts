import { Given, Then, When } from '@cucumber/cucumber';
import { BasePage } from '../../pages/BasePage';
import { PATHS } from '../../support/constants';
import { expect } from '@playwright/test';

const basePage = new BasePage();

Given('I am on the {string} page', async (pageName: string) => {
  await basePage.navigateTo(pageName);
});

When('I click on {string} item in the left panel', async (item: string) => {
  await basePage.clickOnItemInLeftPanel(item);
});

When('I click on {string} button', async (button: string) => {
  await basePage.clickOnButton(button);
});

When('I upload {string} image to {string} input field', async (image: string, input: string) => {
  await page.getByLabel(input).setInputFiles(PATHS.RESOURCES + image);
});

When('I wait at least for {int} seconds', async (timeout: number) => {
  await page.waitForTimeout(timeout * 1000);
});

When('I hover over the button {string}', async (button: string) => {
  await page.getByRole('button', { name: button, exact: true }).hover();
});

Then('I verify that {string} button is displayed', async (button: string) => {
  await expect(page.getByRole('button', { name: button, exact: true })).toBeVisible();
});

Then('I verify that {string} button is not displayed', async (button: string) => {
  await expect(page.getByRole('button', { name: button, exact: true })).not.toBeVisible();
});

Then('I verify that {string} tooltip is displayed', async (text: string) => {
  await expect(page.getByRole('tooltip', { name: text })).toBeVisible();
});
