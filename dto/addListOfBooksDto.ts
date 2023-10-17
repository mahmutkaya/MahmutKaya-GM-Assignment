import { IsbnDto } from './isbnDto';

export interface AddListOfBooksDto {
  userId: string;
  collectionOfIsbns: IsbnDto[];
}
