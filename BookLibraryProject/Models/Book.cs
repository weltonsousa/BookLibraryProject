using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookLibraryProject.Models
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        public int TotalCopies { get; set; } = 0;

        public int CopiesInUse { get; set; } = 0;

        [StringLength(50)]
        public string? Type { get; set; }

        [StringLength(80)]
        public string? ISBN { get; set; }

        [StringLength(50)]
        public string? Category { get; set; }
               
        [NotMapped]
        public string FullAuthorName => $"{FirstName} {LastName}";
                
        [NotMapped]
        public int AvailableCopies => TotalCopies - CopiesInUse;
    }
}
