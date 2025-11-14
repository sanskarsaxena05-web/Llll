
import React from 'react';
import { PlusIcon, SparklesIcon, BookOpenIcon } from './icons';

interface HeaderProps {
  onAddBookClick: () => void;
  onRecommendClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddBookClick, onRecommendClick }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <BookOpenIcon className="h-8 w-8 text-indigo-500" />
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            Gemini Library Manager
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={onRecommendClick}
            className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-3 rounded-lg shadow-sm transition-transform transform hover:scale-105"
          >
            <SparklesIcon className="h-5 w-5 mr-0 md:mr-2" />
            <span className="hidden md:inline">Recommend</span>
          </button>
          <button 
            onClick={onAddBookClick}
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-3 rounded-lg shadow-sm transition-transform transform hover:scale-105"
          >
            <PlusIcon className="h-5 w-5 mr-0 md:mr-2" />
            <span className="hidden md:inline">Add Book</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
