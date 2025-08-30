using BookLibraryProject.Models;
using Microsoft.EntityFrameworkCore;

namespace BookLibraryProject.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasKey(e => e.BookId);
                entity.Property(e => e.BookId).UseIdentityColumn();
                entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.TotalCopies).HasDefaultValue(0);
                entity.Property(e => e.CopiesInUse).HasDefaultValue(0);
                entity.Property(e => e.Type).HasMaxLength(50);
                entity.Property(e => e.ISBN).HasMaxLength(80);
                entity.Property(e => e.Category).HasMaxLength(50);
            });

            // Seed data
            modelBuilder.Entity<Book>().HasData(
                new Book 
                { 
                    BookId = 1,
                    Title = "The Catcher in the Rye", 
                    FirstName = "J.D.", 
                    LastName = "Salinger", 
                    TotalCopies = 10, 
                    CopiesInUse = 1, 
                    Type = "Hardcover", 
                    ISBN = "0123456789", 
                    Category = "Fiction" 
                },
                new Book 
                { 
                    BookId = 2,
                    Title = "To Kill a Mockingbird", 
                    FirstName = "Harper", 
                    LastName = "Lee", 
                    TotalCopies = 8, 
                    CopiesInUse = 2, 
                    Type = "Paperback", 
                    ISBN = "0987654321", 
                    Category = "Fiction" 
                },
                new Book
                {
                    BookId = 3,
                    Title = "1984",
                    FirstName = "George",
                    LastName = "Orwell",
                    TotalCopies = 15,
                    CopiesInUse = 5,
                    Type = "Hardcover",
                    ISBN = "1122334455",
                    Category = "Dystopian Fiction"
                },
                new Book
                {
                    BookId = 4,
                    Title = "Clean Code",
                    FirstName = "Robert C.",
                    LastName = "Martin",
                    TotalCopies = 5,
                    CopiesInUse = 1,
                    Type = "Paperback",
                    ISBN = "5566778899",
                    Category = "Programming"
                }
            );
        }
    }
}
