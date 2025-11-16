import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';
import { Book } from '../../models/Book';
import { mockAPI } from '../../api/mockBackend';

const AdminPanel = () => {
  const { user } = useAuth();
  const { books, refreshBooks } = useLibrary();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [stock, setStock] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);

  // Helper to get book details by ID for display
  const getBookDetails = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    return book ? `${book.title} by ${book.author}` : bookId;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role === "ADMIN") {
        const allUsers = await mockAPI.getUsers();
        setUsers(allUsers);
      }
    };
    fetchUsers();
  }, [user, books]);

  const handleAddBook = async () => {
    if (!title || !author || stock < 1) {
      setError("Please fill all fields with valid values.");
      return;
    }
    const newBook: Book = {
      id: "b" + Date.now(),
      title,
      author,
      stock
    };
    try {
      await mockAPI.addBook(newBook);
      setTitle('');
      setAuthor('');
      setStock(1);
      await refreshBooks();
      setError(null);
    } catch {
      setError("Failed to add book.");
    }
  };

  if (!user || user.role !== "ADMIN") {
    return <p style={{color:"red"}}>Access denied. Admins only.</p>;
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Add Book</h3>
        <input type="text" placeholder="Title" value={title}
          onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Author" value={author}
          onChange={e => setAuthor(e.target.value)} />
        <input type="number" min={1} placeholder="Stock" value={stock}
          onChange={e => setStock(Number(e.target.value))} />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <div>
        <h3>Current Inventory</h3>
        {books.length === 0 ? <p>No books present.</p> : (
          <ul>
            {books.map(book => (
              <li key={book.id}>
                {book.title} by {book.author} - Stock: {book.stock}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>Borrowed Books / Users</h3>
        <ul>
          {users.map(u => (
            <li key={u.id}>
              <b>{u.name}</b> ({u.role})<br />
              Borrowed: {u.borrowedBooks.length > 0
                ? (
                  <ul>
                    {u.borrowedBooks.map((bookId: string) => (
                      <li key={bookId}>{getBookDetails(bookId)}</li>
                    ))}
                  </ul>
                )
                : "None"
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
