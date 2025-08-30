using BookLibraryProject.Models;

namespace BookLibraryProject.DTOs
{
    public class BookSearchRequest
    {
        public string? Author { get; set; }
        public string? ISBN { get; set; }
        public BookStatus? Status { get; set; }
        public string? Title { get; set; }
        public string? Category { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
