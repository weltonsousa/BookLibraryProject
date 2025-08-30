import { BookStatus } from './enums';

export interface BookSearchRequest {
  author?: string;
  isbn?: string;
  status?: BookStatus;
  title?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}