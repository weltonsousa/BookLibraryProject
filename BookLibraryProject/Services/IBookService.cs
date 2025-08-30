using BookLibraryProject.DTOs;
using BookLibraryProject.Models;

namespace BookLibraryProject.Services
{
    public interface IBookService
    {
        Task<PagedResult<BookResponse>> SearchBooksAsync(BookSearchRequest request);
        Task<BookResponse?> GetBookByIdAsync(int id);
        Task<BookResponse> CreateBookAsync(Book book);
        Task<BookResponse?> UpdateBookAsync(int id, Book book);
        Task<bool> DeleteBookAsync(int id);
    }
}
