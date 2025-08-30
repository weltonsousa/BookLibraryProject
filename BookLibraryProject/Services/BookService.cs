using BookLibraryProject.Data;
using BookLibraryProject.DTOs;
using BookLibraryProject.Models;
using Microsoft.EntityFrameworkCore;

namespace BookLibraryProject.Services
{
    public class BookService : IBookService
    {
        
        private readonly LibraryContext _context;

        public BookService(LibraryContext context)
        {
            _context = context;
        }

        public async Task<PagedResult<BookResponse>> SearchBooksAsync(BookSearchRequest request)
        {
            var query = _context.Books.AsQueryable();
            
            if (!string.IsNullOrWhiteSpace(request.Author))
            {
                query = query.Where(b =>
                    (b.FirstName + " " + b.LastName).Contains(request.Author) ||
                    b.FirstName.Contains(request.Author) ||
                    b.LastName.Contains(request.Author));
            }

            if (!string.IsNullOrWhiteSpace(request.ISBN))
            {
                query = query.Where(b => b.ISBN != null && b.ISBN.Contains(request.ISBN));
            }

            if (!string.IsNullOrWhiteSpace(request.Title))
            {
                query = query.Where(b => b.Title.Contains(request.Title));
            }

            if (!string.IsNullOrWhiteSpace(request.Category))
            {
                query = query.Where(b => b.Category != null && b.Category.Contains(request.Category));
            }

            if (request.Status.HasValue)
            {
                switch (request.Status.Value)
                {
                    case BookStatus.WantToRead:                
                        query = query.Where(b => (b.TotalCopies - b.CopiesInUse) > 0);
                        break;
                    case BookStatus.Reading:                        
                        query = query.Where(b => b.CopiesInUse > 0 && b.CopiesInUse < b.TotalCopies);
                        break;
                    case BookStatus.Read:                       
                        break;
                }
            }

            var totalItems = await query.CountAsync();

            var books = await query
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(b => new BookResponse
                {
                    BookId = b.BookId,
                    Title = b.Title,
                    FirstName = b.FirstName,
                    LastName = b.LastName,
                    FullAuthorName = b.FirstName + " " + b.LastName,
                    TotalCopies = b.TotalCopies,
                    CopiesInUse = b.CopiesInUse,
                    AvailableCopies = b.TotalCopies - b.CopiesInUse,
                    Type = b.Type,
                    ISBN = b.ISBN,
                    Category = b.Category
                })
                .ToListAsync();

            return new PagedResult<BookResponse>
            {
                Items = books,
                TotalItems = totalItems,
                Page = request.Page,
                PageSize = request.PageSize
            };
        }

        public async Task<BookResponse?> GetBookByIdAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null) return null;

            return new BookResponse
            {
                BookId = book.BookId,
                Title = book.Title,
                FirstName = book.FirstName,
                LastName = book.LastName,
                FullAuthorName = book.FullAuthorName,
                TotalCopies = book.TotalCopies,
                CopiesInUse = book.CopiesInUse,
                AvailableCopies = book.AvailableCopies,
                Type = book.Type,
                ISBN = book.ISBN,
                Category = book.Category
            };
        }

        public async Task<BookResponse> CreateBookAsync(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return new BookResponse
            {
                BookId = book.BookId,
                Title = book.Title,
                FirstName = book.FirstName,
                LastName = book.LastName,
                FullAuthorName = book.FullAuthorName,
                TotalCopies = book.TotalCopies,
                CopiesInUse = book.CopiesInUse,
                AvailableCopies = book.AvailableCopies,
                Type = book.Type,
                ISBN = book.ISBN,
                Category = book.Category
            };
        }

        public async Task<BookResponse?> UpdateBookAsync(int id, Book book)
        {
            var existingBook = await _context.Books.FindAsync(id);

            if (existingBook == null) return null;

            existingBook.Title = book.Title;
            existingBook.FirstName = book.FirstName;
            existingBook.LastName = book.LastName;
            existingBook.TotalCopies = book.TotalCopies;
            existingBook.CopiesInUse = book.CopiesInUse;
            existingBook.Type = book.Type;
            existingBook.ISBN = book.ISBN;
            existingBook.Category = book.Category;

            await _context.SaveChangesAsync();

            return new BookResponse
            {
                BookId = existingBook.BookId,
                Title = existingBook.Title,
                FirstName = existingBook.FirstName,
                LastName = existingBook.LastName,
                FullAuthorName = existingBook.FullAuthorName,
                TotalCopies = existingBook.TotalCopies,
                CopiesInUse = existingBook.CopiesInUse,
                AvailableCopies = existingBook.AvailableCopies,
                Type = existingBook.Type,
                ISBN = existingBook.ISBN,
                Category = existingBook.Category
            };
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null) return false;

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

