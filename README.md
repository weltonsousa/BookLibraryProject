# 📚 Library System

A complete library management system developed with **C# .NET** on the backend and **React TypeScript** on the frontend.

## 🚀 Features

- ✅ **Full CRUD** for books (Create, Read, Update, Delete)
- 🔍 **Advanced search** by author, ISBN, title, category, and status
- 📄 **Pagination** of results
- 📱 **Responsive interface** with Tailwind CSS
- 🎯 **Reading status system** (Want to Read, Reading, Read)
- 📊 **Stock control** (total copies, copies in use, available)
- ⚡ **Full REST API** with Scalar documentation

## 🛠️ Technologies Used

### Backend
- **C# .NET 9**
- **Entity Framework Core** (SQL Server)
- **ASP.NET Core Web API**
- **Scalar** for documentation

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Custom Hooks** for state management
- **Fetch API** for backend communication

## 📋 Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [SQL Server LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb) or SQL Server

## 🔧 Installation and Setup

### Backend

1. **Clone the repository**
   ```bash
   git clone https://github.com/weltonsousa/BookLibraryProject
   cd library-project
   ```

2. **Configure the backend**
   ```bash
   cd LibraryProject
   dotnet restore
   ```

3. **Set up the connection string**

   Edit the `appsettings.json` file:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LibraryProjectDb;Trusted_Connection=true;MultipleActiveResultSets=true"
     }
   }
   ```

4. **Run the migrations**
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

5. **Run the backend**
   ```bash
   dotnet run
   ```

   The backend will be available at: `https://localhost:7182`

### Frontend

1. **Set up the frontend**
   ```bash
   cd library-frontend
   npm install
   ```

2. **Set up the environment variables**

   Create a `.env` file at the root of the frontend project:
   ```env
   REACT_APP_API_URL=https://localhost:7182/api
   ```

3. **Run the frontend**
   ```bash
   npm start
   ```

   The frontend will be available at: `http://localhost:3000`

## 📁 Project Structure

```
library-project/
├── LibraryProject/                 # Backend C#
│   ├── Controllers/
│   │   └── BooksController.cs
│   ├── Data/
│   │   └── LibraryContext.cs
│   ├── DTOs/
│   │   ├── BookResponse.cs
│   │   ├── BookSearchRequest.cs
│   │   └── PagedResult.cs
│   ├── Models/
│   │   ├── Book.cs
│   │   └── BookStatus.cs
│   ├── Services/
│   │   ├── IBookService.cs
│   │   └── BookService.cs
│   ├── Migrations/
│   ├── appsettings.json
│   └── Program.cs
│
└── library-frontend/               # Frontend React
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── BookCard.tsx
    │   │   ├── BookForm.tsx
    │   │   └── SearchForm.tsx
    │   ├── hooks/
    │   │   └── useBooks.ts
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   ├── index.ts
    │   │   ├── api.ts
    │   │   ├── book.ts
    │   │   ├── enums.ts
    │   │   ├── pagination.ts
    │   │   └── search.ts
    │   ├── App.tsx
    │   ├── index.tsx
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    └── .env
```

## 🗄️ Data Model

### Books Table

| Field | Type | Description |
|-------|------|-------------|
| `book_id` | INT (PK, Identity) | Unique book identifier |
| `title` | VARCHAR(100) | Book title |
| `first_name` | VARCHAR(50) | Author's first name |
| `last_name` | VARCHAR(50) | Author's last name |
| `total_copies` | INT | Total available copies |
| `copies_in_use` | INT | Copies currently in use |
| `type` | VARCHAR(50) | Book type (Hardcover, Paperback, etc.) |
| `isbn` | VARCHAR(80) | ISBN code |
| `category` | VARCHAR(50) | Book category |

### Enum BookStatus

- `WantToRead` - Want to read
- `Reading` - Reading
- `Read` - Read

## 🌐 API Endpoints

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/books/search` | Search books with filters |
| `GET` | `/api/books/{id}` | Get book by ID |
| `POST` | `/api/books` | Create new book |
| `PUT` | `/api/books/{id}` | Update existing book |
| `DELETE` | `/api/books/{id}` | Delete book |

### Search Parameters

- `author` - Author's name (partial search)
- `isbn` - ISBN code (partial search)
- `title` - Book title (partial search)
- `category` - Category (partial search)
- `status` - Reading status (WantToRead, Reading, Read)
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)

## 📖 How to Use

1. **Add Books**: Click "Add Book" and fill out the form
2. **Search Books**: Use the search filters to find specific books
3. **Edit Books**: Click the edit icon on any book
4. **Delete Books**: Click the trash icon (confirmation required)

## 🔍 Search Features

The system allows searching by:

- **Title**: Partial search in the book title
- **Author**: Search by full name, first or last name
- **ISBN**: Partial search in the ISBN code
- **Category**: Partial search in the category
- **Status**: Filter by reading status (simulated based on availability)

## 🚧 Future Improvements

- [ ] User authentication system
- [ ] Personal reading history per user
- [ ] Loan system with dates
- [ ] Ratings and comments
- [ ] Book cover upload
- [ ] Due date notifications
- [ ] Reports and statistics
- [ ] Integration API with external libraries

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 👥 Authors

- **Welton Sousa** - *Software Engineer* -

⭐ If this project helped you, consider starring the repository!