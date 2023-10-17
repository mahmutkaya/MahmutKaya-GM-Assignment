import { DataTable, Then, When } from '@cucumber/cucumber';
import { ENDPOINTS } from '../../support/constants';
import { expect } from '@playwright/test';
import { testContext } from '../../support/testContext';
import { UserDto } from '../../dto/userDto';
import { generateTokenAndLogin } from '../../support/apiUtils';

When('I create/have a user with following details:', async (userDt: DataTable) => {
  testContext.user = userDt.hashes()[0] as any;
  global.response = await request.post(ENDPOINTS.USER, {
    data: testContext.user,
  });
});

When('I get user details', async () => {
  const user: UserDto = await generateTokenAndLogin();
  global.response = await request.get(`${ENDPOINTS.USER}/${user.userId}`, {
    data: testContext.user,
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
    failOnStatusCode: true,
  });
});

Then('I verify that status code is {int}', async (statusCode: number) => {
  expect(global.response.status()).toBe(statusCode);
});

Then(/^I verify that response contains (.*) "([^"]*)"$/, async (key: string, value: string) => {
  expect(await global.response.json()).toHaveProperty(key, value);
});
