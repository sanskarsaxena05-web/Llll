
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Book, BookStatus, Genre } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import BookCard from './components/BookCard';
import AddBookModal from './components/AddBookModal';
import RecommendationModal from './components/RecommendationModal';
import SearchBar from './components/SearchBar';
import { BookOpenIcon } from './components/icons';

const App: React.FC = () => {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isRecModalOpen, setRecModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | undefined>(undefined);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState<Genre | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<BookStatus | 'All'>('All');

  const genres = useMemo(() => {
    const allGenres = new Set(books.map(book => book.genre));
    return ['All', ...Array.from(allGenres)];
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = filterGenre === 'All' || book.genre === filterGenre;
      const matchesStatus = filterStatus === 'All' || book.status === filterStatus;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [books, searchTerm, filterGenre, filterStatus]);

  const handleAddBook = (book: Omit<Book, 'id'>) => {
    setBooks(prev => [...prev, { ...book, id: Date.now().toString() }]);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
    setBookToEdit(undefined);
  };
  
  const handleToggleStatus = useCallback((id: string) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id
          ? { ...book, status: book.status === BookStatus.Available ? BookStatus.CheckedOut : BookStatus.Available }
          : book
      )
    );
  }, [setBooks]);

  const handleDeleteBook = useCallback((id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  }, [setBooks]);

  const handleEditBook = (book: Book) => {
    setBookToEdit(book);
    setAddModalOpen(true);
  };

  const openAddModal = () => {
    setBookToEdit(undefined);
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setBookToEdit(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header onAddBookClick={openAddModal} onRecommendClick={() => setRecModalOpen(true)} />

      <main className="container mx-auto p-4 md:p-6">
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterGenre={filterGenre}
          setFilterGenre={setFilterGenre}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          genres={genres}
        />

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                onToggleStatus={handleToggleStatus} 
                onDelete={handleDeleteBook}
                onEdit={handleEditBook}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpenIcon className="mx-auto h-16 w-16 text-slate-400" />
            <h3 className="mt-2 text-lg font-medium text-slate-600 dark:text-slate-400">No books found</h3>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your search or add a new book!</p>
          </div>
        )}
      </main>

      <AddBookModal 
        isOpen={isAddModalOpen} 
        onClose={closeAddModal}
        onSave={bookToEdit ? handleUpdateBook : handleAddBook}
        bookToEdit={bookToEdit}
      />
      
      <RecommendationModal 
        isOpen={isRecModalOpen} 
        onClose={() => setRecModalOpen(false)}
        onAddRecommendation={(book) => {
          setRecModalOpen(false);
          handleAddBook(book);
        }}
      />
    </div>
  );
};

export default App;
