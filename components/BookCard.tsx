
import React from 'react';
import { Book, BookStatus } from '../types';
import { TrashIcon, PencilIcon } from './icons';

interface BookCardProps {
  book: Book;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onToggleStatus, onDelete, onEdit }) => {
  const statusColor = book.status === BookStatus.Available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
  const imageUrl = book.coverImageUrl || `https://picsum.photos/seed/${book.id}/400/600`;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-1">
      <div className="relative">
        <img src={imageUrl} alt={book.title} className="w-full h-56 object-cover" />
        <span className={`absolute top-2 right-2 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${statusColor}`}>
          {book.status}
        </span>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium">{book.genre}</p>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 flex-grow">{book.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 mb-4">by {book.author}</p>
        <div className="mt-auto flex justify-between items-center space-x-2">
          <button 
            onClick={() => onToggleStatus(book.id)}
            className="flex-1 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-md transition"
          >
            {book.status === BookStatus.Available ? 'Check Out' : 'Return'}
          </button>
          <button onClick={() => onEdit(book)} className="p-2 text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
            <PencilIcon className="h-5 w-5" />
          </button>
          <button onClick={() => onDelete(book.id)} className="p-2 text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
