import { APIRequestContext, APIResponse, expect, request } from '@playwright/test';
import { ENDPOINTS } from './constants';
import { testContext } from './testContext';
import { UserDto } from '../dto/userDto';

export async function generateTokenAndLogin(): Promise<UserDto> {
  const req: APIRequestContext = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });

  await req.post(ENDPOINTS.TOKEN, {
    data: testContext.user,
    failOnStatusCode: true,
  });

  const res: APIResponse = await req.post(ENDPOINTS.LOGIN, {
    data: testContext.user,
    failOnStatusCode: true,
  });

  expect(res.status()).toEqual(200);
  return (await res.json()) as UserDto;
}
