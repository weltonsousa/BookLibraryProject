using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BookLibraryProject.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    BookId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TotalCopies = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    CopiesInUse = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ISBN = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: true),
                    Category = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.BookId);
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "BookId", "Category", "CopiesInUse", "FirstName", "ISBN", "LastName", "Title", "TotalCopies", "Type" },
                values: new object[,]
                {
                    { 1, "Fiction", 1, "J.D.", "0123456789", "Salinger", "The Catcher in the Rye", 10, "Hardcover" },
                    { 2, "Fiction", 2, "Harper", "0987654321", "Lee", "To Kill a Mockingbird", 8, "Paperback" },
                    { 3, "Dystopian Fiction", 5, "George", "1122334455", "Orwell", "1984", 15, "Hardcover" },
                    { 4, "Programming", 1, "Robert C.", "5566778899", "Martin", "Clean Code", 5, "Paperback" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");
        }
    }
}
