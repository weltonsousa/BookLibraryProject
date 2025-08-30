import React, { useState } from 'react';
import { BookCard } from './components/BookCard';
import { SearchForm } from './components/SearchForm';
import { BookForm } from './components/BookForm';
import { ConfirmModal } from './components/ConfirmModal';
import { useBooks } from './hooks/useBooks';
import { type Book, type CreateBookRequest, type UpdateBookRequest } from './types/book';
import { type BookSearchRequest } from './types/search';

type ViewMode = 'list' | 'add' | 'edit';

const App: React.FC = () => {
  const { books, loading, error, searchBooks, createBook, updateBook, deleteBook } = useBooks();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; bookId: number | null }>({
    isOpen: false,
    bookId: null
  });

  const handleSearch = async (params: BookSearchRequest) => {
    await searchBooks({ ...params, page: 1 });
  };

  const handlePageChange = async (page: number) => {
    await searchBooks({ page });
  };

  const handleAddBook = () => {
    setSelectedBook(undefined);
    setViewMode('add');
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setViewMode('edit');
  };

  const handleDeleteBook = (bookId: number) => {
    setDeleteModal({ isOpen: true, bookId });
  };

  const confirmDelete = async () => {
    if (deleteModal.bookId) {
      await deleteBook(deleteModal.bookId);
      setDeleteModal({ isOpen: false, bookId: null });
    }
  };

  const handleSubmitBook = async (bookData: CreateBookRequest | UpdateBookRequest) => {
    if ('bookId' in bookData) {
      await updateBook(bookData.bookId, bookData);
    } else {
      await createBook(bookData);
    }
    setViewMode('list');
    setSelectedBook(undefined);
  };

  const handleCancel = () => {
    setViewMode('list');
    setSelectedBook(undefined);
  };

  if (viewMode === 'add' || viewMode === 'edit') {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <BookForm
            book={selectedBook}
            onSubmit={handleSubmitBook}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Library Management System</h1>
            <button
              onClick={handleAddBook}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              + Add Book
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Form */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <>
            {/* Results Information */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {books.items.length} of {books.totalItems} books
                {books.totalPages > 1 && ` (Page ${books.page} of ${books.totalPages})`}
              </p>
            </div>

            {/* Book List */}
            {books.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {books.items.map((book) => (
                  <BookCard
                    key={book.bookId}
                    book={book}
                    onEdit={handleEditBook}
                    onDelete={handleDeleteBook}
                  />
                ))}
              </div>
            ) : !loading && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search filters or add a new book.</p>
                <button
                  onClick={handleAddBook}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add First Book
                </button>
              </div>
            )}

            {/* Pagination */}
            {books.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(books.page - 1)}
                  disabled={!books.hasPreviousPage || loading}
                  className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, books.totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className={`px-3 py-2 border rounded-md ${pageNum === books.page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(books.page + 1)}
                  disabled={!books.hasNextPage || loading}
                  className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, bookId: null })}
        onConfirm={confirmDelete}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonStyle="danger"
      />
    </div>
  );
};

export default App;