import { useState, useEffect, useCallback } from 'react';
import { type Book, type CreateBookRequest, type UpdateBookRequest } from '../types/book';
import { type BookSearchRequest } from '../types/search';
import { type PagedResult } from '../types/pagination';
import { apiService } from '../service/api';

export const useBooks = (initialSearchParams?: BookSearchRequest) => {
  const [books, setBooks] = useState<PagedResult<Book>>({
    items: [],
    totalItems: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = useCallback(async (searchParams: BookSearchRequest = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiService.searchBooks({
        page: 1,
        pageSize: 10,
        ...searchParams,
      });
      setBooks(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error find books');
    } finally {
      setLoading(false);
    }
  }, []);

  const createBook = useCallback(async (book: CreateBookRequest) => {
    setLoading(true);
    setError(null);

    try {
      await apiService.createBook(book);
      await searchBooks(initialSearchParams);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error create book');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [searchBooks, initialSearchParams]);

  const updateBook = useCallback(async (id: number, book: UpdateBookRequest) => {
    setLoading(true);
    setError(null);

    try {
      await apiService.updateBook(id, book);

      await searchBooks(initialSearchParams);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error update book');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [searchBooks, initialSearchParams]);

  const deleteBook = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await apiService.deleteBook(id);

      await searchBooks(initialSearchParams);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error delete book');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [searchBooks, initialSearchParams]);

  useEffect(() => {
    searchBooks(initialSearchParams);
  }, [searchBooks, initialSearchParams]);

  return {
    books,
    loading,
    error,
    searchBooks,
    createBook,
    updateBook,
    deleteBook,
  };
};