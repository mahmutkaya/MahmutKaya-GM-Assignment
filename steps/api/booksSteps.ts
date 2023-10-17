import { DataTable, Then, When } from '@cucumber/cucumber';
import { AddListOfBooksDto } from '../../dto/addListOfBooksDto';
import { generateTokenAndLogin } from '../../support/apiUtils';
import { ENDPOINTS } from '../../support/constants';
import { UserDto } from '../../dto/userDto';
import { BookDto } from '../../dto/bookDto';
import { expect } from '@playwright/test';
import { IsbnDto } from '../../dto/isbnDto';

When('I add/have following book(s):', async (isbnDt: DataTable) => {
  const isbnList: IsbnDto[] = isbnDt.hashes() as any;
  const user: UserDto = await generateTokenAndLogin();

  const reqBody: AddListOfBooksDto = { userId: user.userId, collectionOfIsbns: isbnList };
  global.response = await request.post(ENDPOINTS.BOOKS, {
    data: reqBody,
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
    failOnStatusCode: true,
  });
});

When('I remove the book with isbn {string}', async (isbn: string) => {
  const user: UserDto = await generateTokenAndLogin();
  global.response = await request.delete(ENDPOINTS.BOOK, {
    data: { isbn, userId: user.userId },
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
    failOnStatusCode: true,
  });
});

Then('I verify that response contains following book(s) details:', async (booksDto: DataTable) => {
  const expectedBooksDetails: BookDto[] = booksDto.hashes() as any;
  const actualBooksDetails: BookDto[] = (await response.json())['books'];

  for (const expectedBook of expectedBooksDetails) {
    for (const [key, value] of Object.entries(expectedBook)) {
      const hasProperty = actualBooksDetails.some((actualBook) => actualBook[key] == value);
      expect(hasProperty).toEqual(true);
    }
  }
});

Then('I verify that response  does not contain a book with isbn {string}', async (expectedIsbn: string) => {
  const actualIsbnList: string[] = (await response.json())['books'].map((book: BookDto) => book.isbn);
  expect(actualIsbnList).not.toContain(expectedIsbn);
});
