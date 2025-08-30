export interface Book {
  bookId: number;
  title: string;
  firstName: string;
  lastName: string;
  fullAuthorName: string;
  totalCopies: number;
  copiesInUse: number;
  availableCopies: number;
  type?: string;
  isbn?: string;
  category?: string;
}

export interface CreateBookRequest {
  title: string;
  firstName: string;
  lastName: string;
  totalCopies: number;
  copiesInUse?: number;
  type?: string;
  isbn?: string;
  category?: string;
}

export interface UpdateBookRequest extends CreateBookRequest {
  bookId: number;
}