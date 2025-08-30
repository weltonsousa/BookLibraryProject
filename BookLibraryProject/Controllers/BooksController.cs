using BookLibraryProject.DTOs;
using BookLibraryProject.Models;
using BookLibraryProject.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookLibraryProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }
        
       
        [HttpGet("search")]
        public async Task<ActionResult<PagedResult<BookResponse>>> SearchBooks([FromQuery] BookSearchRequest request)
        {
            try
            {
                var result = await _bookService.SearchBooksAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error internal server", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookResponse>> GetBook(int id)
        {
            try
            {
                var book = await _bookService.GetBookByIdAsync(id);

                if (book == null)
                    return NotFound(new { message = "Book not found" });

                return Ok(book);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error internal server", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<BookResponse>> CreateBook([FromBody] Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var createdBook = await _bookService.CreateBookAsync(book);
                return CreatedAtAction(nameof(GetBook), new { id = createdBook.BookId }, createdBook);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error internal server", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BookResponse>> UpdateBook(int id, [FromBody] Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var updatedBook = await _bookService.UpdateBookAsync(id, book);

                if (updatedBook == null)
                    return NotFound(new { message = "Book not found" });

                return Ok(updatedBook);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error internal server", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            try
            {
                var deleted = await _bookService.DeleteBookAsync(id);

                if (!deleted)
                    return NotFound(new { message = "Book not found" });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error internal server", error = ex.Message });
            }
        }
    }
}


