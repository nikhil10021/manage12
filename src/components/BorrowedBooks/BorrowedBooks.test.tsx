import React from 'react';
import { render, screen } from '@testing-library/react';
import { LibraryProvider } from '../../context/LibraryContext';
import BookList from '../BookList/BookList';


test('renders empty library message', () => {
  render(
    <LibraryProvider>
      <BookList />
    </LibraryProvider>
  );
  const message = screen.getByText(/library has no books/i);
  expect(message).toBeInTheDocument();
});
