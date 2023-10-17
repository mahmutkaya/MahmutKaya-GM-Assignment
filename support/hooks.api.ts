import { After, Before } from '@cucumber/cucumber';
import { expect, request } from '@playwright/test';
import { generateTokenAndLogin } from './apiUtils';
import { ENDPOINTS } from './constants';
import { UserDto } from '../dto/userDto';

Before('@api', async () => {
  global.request = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });
});

After('@deleteUser', async () => {
  const user: UserDto = await generateTokenAndLogin();
  const res = await global.request.delete(`${ENDPOINTS.USER}/${user.userId}`, {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
    failOnStatusCode: true,
  });
  expect(res.status()).toEqual(204);
});
