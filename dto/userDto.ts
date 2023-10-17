import { BookDto } from './bookDto';

export interface UserDto {
  userId?: string;
  userName: string;
  password: string;
  books?: BookDto[];
  token?: string;
  expires?: Date;
  created_date?: Date;
  isActive?: false;
}
