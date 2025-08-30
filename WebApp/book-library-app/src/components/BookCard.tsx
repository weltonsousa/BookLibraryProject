import React from 'react';
import { type Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (bookId: number) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{book.title}</h3>
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(book)}
              className="text-blue-600 hover:text-blue-800 p-1"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(book.bookId)}
              className="text-red-600 hover:text-red-800 p-1"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2 text-gray-600">
        <p className="font-medium">
          <span className="text-gray-500">Author:</span> {book.fullAuthorName}
        </p>

        {book.isbn && (
          <p>
            <span className="text-gray-500">ISBN:</span> {book.isbn}
          </p>
        )}

        {book.category && (
          <p>
            <span className="text-gray-500">Category:</span> {book.category}
          </p>
        )}

        {book.type && (
          <p>
            <span className="text-gray-500">Type:</span> {book.type}
          </p>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm">
            <span className="text-gray-500">Total:</span>
            <span className="font-semibold ml-1">{book.totalCopies}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">In use:</span>
            <span className="font-semibold ml-1">{book.copiesInUse}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Available:</span>
            <span className={`font-semibold ml-1 ${book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {book.availableCopies}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

