
import React, { useState } from 'react';
import { generateBookRecommendation } from '../services/geminiService';
import { Book, BookStatus, Genre } from '../types';
import { XIcon, SparklesIcon } from './icons';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecommendation: (book: Omit<Book, 'id'>) => void;
}

const RecommendationModal: React.FC<RecommendationModalProps> = ({ isOpen, onClose, onAddRecommendation }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<{ title: string; author: string; genre: string } | null>(null);

  const handleGetRecommendation = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description of the book you want.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await generateBookRecommendation(prompt);
      setRecommendation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddBook = () => {
    if (recommendation) {
      const validGenre = Object.values(Genre).find(g => g.toLowerCase() === recommendation.genre.toLowerCase()) || Genre.Other;
      onAddRecommendation({
        title: recommendation.title,
        author: recommendation.author,
        genre: validGenre,
        status: BookStatus.Available,
      });
      resetState();
    }
  };

  const resetState = () => {
    setPrompt('');
    setIsLoading(false);
    setError(null);
    setRecommendation(null);
  }

  const handleClose = () => {
    resetState();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold flex items-center"><SparklesIcon className="h-6 w-6 mr-2 text-amber-500" /> AI Book Recommendation</h2>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {!recommendation ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Describe the kind of book you're looking for:</label>
                <textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., a sci-fi novel about space exploration with a mystery twist"></textarea>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button onClick={handleGetRecommendation} disabled={isLoading} className="w-full px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:bg-amber-300 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                  </>
                ) : 'Get Recommendation'}
              </button>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <h3 className="text-lg font-medium">Here's a suggestion:</h3>
              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{recommendation.title}</p>
                <p className="text-slate-600 dark:text-slate-300">by {recommendation.author}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Genre: {recommendation.genre}</p>
              </div>
              <div className="pt-2 flex justify-center space-x-3">
                <button onClick={() => setRecommendation(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500">Try Again</button>
                <button onClick={handleAddBook} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Add to Library</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationModal;
