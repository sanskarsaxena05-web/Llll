
import React from 'react';
import { BookStatus, Genre } from '../types';
import { SearchIcon } from './icons';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterGenre: Genre | 'All';
  setFilterGenre: (genre: Genre | 'All') => void;
  filterStatus: BookStatus | 'All';
  setFilterStatus: (status: BookStatus | 'All') => void;
  genres: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  filterGenre,
  setFilterGenre,
  filterStatus,
  setFilterStatus,
  genres,
}) => {
  return (
    <div className="mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white dark:bg-slate-700 dark:border-slate-600 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="md:col-span-1">
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value as Genre | 'All')}
            className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md leading-5 bg-white dark:bg-slate-700 dark:border-slate-600 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {genres.map(genre => <option key={genre} value={genre}>{genre === 'All' ? 'All Genres' : genre}</option>)}
          </select>
        </div>
        <div className="md:col-span-1">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as BookStatus | 'All')}
            className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md leading-5 bg-white dark:bg-slate-700 dark:border-slate-600 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="All">All Statuses</option>
            <option value={BookStatus.Available}>Available</option>
            <option value={BookStatus.CheckedOut}>Checked Out</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
