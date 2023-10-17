import { toCamelCase } from '../support/helpers';
import { BasePage } from './BasePage';

export const locators = {
  others: {
    dragMe: '#simpleDropContainer #draggable',
    dropHere: '#simpleDropContainer #droppable',
  },
};

export class InteractionPage extends BasePage {
  async dragAndDrop(draggable: string, droppable: string) {
    const draggableLocator = locators.others[toCamelCase(draggable)];
    const droppableLocator = locators.others[toCamelCase(droppable)];

    await page.locator(draggableLocator).dragTo(page.locator(droppableLocator));
  }
}
