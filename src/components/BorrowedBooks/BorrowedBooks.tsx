import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import { mockAPI } from '../../api/mockBackend';

const BorrowedBooks = () => {
  const { user } = useAuth();
  const { refreshBooks } = useLibrary();
  const [borrowed, setBorrowed] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) setBorrowed(user.borrowedBooks);
    else setBorrowed([]);
  }, [user]);

  const handleReturnBook = async (bookId: string) => {
    setError(null);
    if (!user) return;
    const resp = await mockAPI.returnBook(user.id, bookId);
    if (!resp.success) {
      setError(resp.error || "Return failed");
    } else {
      setBorrowed(prev => prev.filter(id => id !== bookId));
      await refreshBooks();
    }
  };

  if (!user) {
    return <p>Please login to see your borrowed books.</p>;
  }

  if (!borrowed.length) {
    return <p>You have not borrowed any books yet.</p>;
  }

  return (
    <div>
      <h2>Your Borrowed Books</h2>
      {error && <p style={{color:"red"}}>{error}</p>}
      <ul>
        {borrowed.map(bookId => (
          <li key={bookId}>
            {bookId}
            <button onClick={() => handleReturnBook(bookId)} style={{marginLeft:10}}>
              Return
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BorrowedBooks;
