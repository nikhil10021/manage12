import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Book } from '../models/Book';
import { mockAPI } from '../api/mockBackend';

interface LibraryContextType {
  books: Book[];
  refreshBooks: () => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const refreshBooks = async () => {
    const data = await mockAPI.getBooks();
    setBooks(data);
  };

  useEffect(() => {
    refreshBooks();
  }, []);

  return (
    <LibraryContext.Provider value={{ books, refreshBooks }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
