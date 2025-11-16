import React from 'react';
import { render, screen } from '@testing-library/react';
import { LibraryProvider } from '../../context/LibraryContext';
import BookList from '../BookList/BookList';


// Custom wrapper to force empty books for test
const CustomEmptyLibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Custom mock for context to provide empty books
  const LibraryContext = require('../../context/LibraryContext');
  const MockProvider = LibraryContext.LibraryContext.Provider;

  return (
    <MockProvider value={{ books: [], refreshBooks: () => {} }}>
      {children}
    </MockProvider>
  );
};

test('renders empty library message', () => {
  render(
    <CustomEmptyLibraryProvider>
      <BookList />
    </CustomEmptyLibraryProvider>
  );
  const message = screen.getByText(/library has no books/i);
  expect(message).toBeInTheDocument();
});

export {};
