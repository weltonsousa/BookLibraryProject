import React, { useState, useEffect } from 'react';
import type { Book, CreateBookRequest, UpdateBookRequest } from '../types/book';

interface BookFormProps {
  book?: Book;
  onSubmit: (book: CreateBookRequest | UpdateBookRequest) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const BookForm: React.FC<BookFormProps> = ({
  book,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    totalCopies: 0,
    copiesInUse: 0,
    type: '',
    isbn: '',
    category: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        firstName: book.firstName,
        lastName: book.lastName,
        totalCopies: book.totalCopies,
        copiesInUse: book.copiesInUse,
        type: book.type || '',
        isbn: book.isbn || '',
        category: book.category || '',
      });
    }
  }, [book]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Author first name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Author last name is required';
    }

    if (formData.totalCopies < 0) {
      newErrors.totalCopies = 'Total copies must be greater than or equal to 0';
    }

    if (formData.copiesInUse < 0) {
      newErrors.copiesInUse = 'Copies in use must be greater than or equal to 0';
    }

    if (formData.copiesInUse > formData.totalCopies) {
      newErrors.copiesInUse = 'Copies in use cannot be greater than total copies';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (book) {
        // Update existing book
        const updateData: UpdateBookRequest = {
          bookId: book.bookId,
          ...formData,
        };
        await onSubmit(updateData);
      } else {
        // Create new book
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {book ? 'Edit Book' : 'Add New Book'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Author first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Author last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Copies *
            </label>
            <input
              type="number"
              min="0"
              value={formData.totalCopies}
              onChange={(e) => handleChange('totalCopies', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.totalCopies ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.totalCopies && (
              <p className="text-red-500 text-sm mt-1">{errors.totalCopies}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Copies in Use
            </label>
            <input
              type="number"
              min="0"
              value={formData.copiesInUse}
              onChange={(e) => handleChange('copiesInUse', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.copiesInUse ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.copiesInUse && (
              <p className="text-red-500 text-sm mt-1">{errors.copiesInUse}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Hardcover, Paperback"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ISBN
            </label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => handleChange('isbn', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ISBN code"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Fiction, Programming, Science"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (book ? 'Update' : 'Add')}
          </button>
        </div>
      </form>
    </div>
  );
};