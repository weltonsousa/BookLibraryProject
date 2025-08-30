import type { Book, BookSearchRequest, CreateBookRequest, UpdateBookRequest, PagedResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7182/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Buscar livros com filtros
  async searchBooks(searchParams: BookSearchRequest): Promise<PagedResult<Book>> {
    const queryParams = new URLSearchParams();

    if (searchParams.author) queryParams.append('author', searchParams.author);
    if (searchParams.isbn) queryParams.append('isbn', searchParams.isbn);
    if (searchParams.status) queryParams.append('status', searchParams.status);
    if (searchParams.title) queryParams.append('title', searchParams.title);
    if (searchParams.category) queryParams.append('category', searchParams.category);
    if (searchParams.page) queryParams.append('page', searchParams.page.toString());
    if (searchParams.pageSize) queryParams.append('pageSize', searchParams.pageSize.toString());

    const endpoint = `/books/search${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return this.request<PagedResult<Book>>(endpoint);
  }

  // Buscar livro por ID
  async getBookById(id: number): Promise<Book> {
    return this.request<Book>(`/books/${id}`);
  }

  // Criar novo livro
  async createBook(book: CreateBookRequest): Promise<Book> {
    return this.request<Book>('/books', {
      method: 'POST',
      body: JSON.stringify(book),
    });
  }

  // Atualizar livro existente
  async updateBook(id: number, book: UpdateBookRequest): Promise<Book> {
    return this.request<Book>(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(book),
    });
  }

  // Deletar livro
  async deleteBook(id: number): Promise<void> {
    return this.request<void>(`/books/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();

