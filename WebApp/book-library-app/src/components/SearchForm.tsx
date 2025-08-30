import React, { useState } from 'react';
import { type BookSearchRequest } from '../types/search';
import { BookStatus } from '../types/enums';

interface SearchFormProps {
  onSearch: (params: BookSearchRequest) => void;
  loading?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading = false }) => {
  const [searchParams, setSearchParams] = useState<BookSearchRequest>({
    author: '',
    isbn: '',
    title: '',
    category: '',
    status: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Remove empty fields
    const filteredParams: BookSearchRequest = {};
    if (searchParams.author?.trim()) filteredParams.author = searchParams.author.trim();
    if (searchParams.isbn?.trim()) filteredParams.isbn = searchParams.isbn.trim();
    if (searchParams.title?.trim()) filteredParams.title = searchParams.title.trim();
    if (searchParams.category?.trim()) filteredParams.category = searchParams.category.trim();
    if (searchParams.status) filteredParams.status = searchParams.status;

    onSearch(filteredParams);
  };

  const handleReset = () => {
    setSearchParams({
      author: '',
      isbn: '',
      title: '',
      category: '',
      status: undefined,
    });
    onSearch({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search Books</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={searchParams.title || ''}
              onChange={(e) => setSearchParams(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              value={searchParams.author || ''}
              onChange={(e) => setSearchParams(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ISBN
            </label>
            <input
              type="text"
              value={searchParams.isbn || ''}
              onChange={(e) => setSearchParams(prev => ({ ...prev, isbn: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ISBN code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={searchParams.category || ''}
              onChange={(e) => setSearchParams(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Book category"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={searchParams.status || ''}
              onChange={(e) => setSearchParams(prev => ({
                ...prev,
                status: e.target.value ? e.target.value as BookStatus : undefined
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All status</option>
              <option value={BookStatus.WantToRead}>Want to read</option>
              <option value={BookStatus.Reading}>Reading</option>
              <option value={BookStatus.Read}>Read</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};