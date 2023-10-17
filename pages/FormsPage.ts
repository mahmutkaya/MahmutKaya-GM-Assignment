import { DataTable } from '@cucumber/cucumber';
import { toCamelCase } from '../support/helpers';
import { BasePage } from './BasePage';

export const locators = {
  inputs: {
    city: '#react-select-4-input',
    currentAddress: '#currentAddress',
    dateOfBirth: '#dateOfBirthInput',
    email: '#userEmail',
    firstName: '#firstName',
    lastName: '#lastName',
    mobile: '#userNumber',
    state: '#react-select-3-input',
    subjects: '#subjectsInput',
  },
  others: {
    gender: (value: string) => `[for*=gender-radio]:has-text("${value}")`,
    hobby: (value: string) => `[for*=hobbies-checkbox]:has-text("${value}")`,
    userForm: '#userForm',
    exampleModal: '#example-modal-sizes-title-lg',
  },
};

export class FormsPage extends BasePage {
  async fillInStudentRegistrationForm(studentDt: DataTable) {
    //re-size screen to escape from ads
    await page.setViewportSize({ width: 1920, height: 1080 });
    const student: Record<string, string> = studentDt.rowsHash();
    await page.waitForSelector(locators.others.userForm);

    for (const [key, value] of Object.entries(student)) {
      await page.locator(locators.inputs[toCamelCase(key)]).fill(value);
      // press esc to close date popup
      if (key == 'Date of Birth') await page.keyboard.press('Escape');
    }
  }

  async selectDropdownItem(option: string, dropdown: string) {
    await page.locator(locators.inputs[toCamelCase(dropdown)]).fill(option);
    await page.keyboard.press('Enter');
  }
}
