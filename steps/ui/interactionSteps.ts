import { Then, When } from '@cucumber/cucumber';
import { InteractionPage, locators } from '../../pages/InteractionPage';
import { expect } from '@playwright/test';
import { toCamelCase } from '../../support/helpers';

const interactionPage = new InteractionPage();

When('I drag the {string} box to {string} area', async (draggable: string, droppable: string) => {
  await interactionPage.dragAndDrop(draggable, droppable);
});

Then('I verify that {string} element has {string} text', async (element: string, text: string) => {
  await expect(page.locator(locators.others[toCamelCase(element)])).toHaveText(text);
});
