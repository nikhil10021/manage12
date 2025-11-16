import React, { useState } from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { useAuth } from '../../context/AuthContext';
import { mockAPI } from '../../api/mockBackend';

const BookList = () => {
  const { books, refreshBooks } = useLibrary();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleBorrow = async (bookId: string) => {
    if (!user) return;
    setError(null);
    const resp = await mockAPI.borrowBook(user.id, bookId);
    if (!resp.success) {
      setError(resp.error || "Action failed");
    } else {
      await refreshBooks();
    }
  };

  if (books.length === 0) {
    return <p>The library has no books available currently.</p>;
  }
  return (
    <div>
      <h2>Books in Library</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} -{' '}
            <span>
              {book.stock > 0 ? `In stock: ${book.stock}` : 'Not Available'}
            </span>
            {user && book.stock > 0 && !user.borrowedBooks.includes(book.id) && (
              <button onClick={() => handleBorrow(book.id)} style={{ marginLeft: 10 }}>
                Borrow
              </button>
            )}
            {user && user.borrowedBooks.includes(book.id) && (
              <span style={{ marginLeft: 10, color: "#1e88e5" }}>(Already borrowed)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
