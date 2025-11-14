
import React, { useState, useEffect } from 'react';
import { Book, BookStatus, Genre } from '../types';
import { XIcon } from './icons';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: any) => void;
  bookToEdit?: Book;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onSave, bookToEdit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState<Genre>(Genre.Fiction);
  
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setGenre(bookToEdit.genre);
    } else {
      setTitle('');
      setAuthor('');
      setGenre(Genre.Fiction);
    }
  }, [bookToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookToEdit) {
      onSave({ ...bookToEdit, title, author, genre });
    } else {
      onSave({ title, author, genre, status: BookStatus.Available });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">{bookToEdit ? 'Edit Book' : 'Add a New Book'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Author</label>
            <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Genre</label>
            <select id="genre" value={genre} onChange={e => setGenre(e.target.value as Genre)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              {Object.values(Genre).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{bookToEdit ? 'Save Changes' : 'Add Book'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
