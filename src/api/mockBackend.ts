import { Book } from '../models/Book';
import { User } from '../models/User';
import { Role } from '../models/Role';

// Initial Data
let books: Book[] = [
  { id: 'b1', title: 'React Basics', author: 'Author 1', stock: 3 },
  { id: 'b2', title: 'TypeScript Deep Dive', author: 'Author 2', stock: 2 },
];

let users: User[] = [
  { id: 'u1', name: 'Alice', role: Role.USER, borrowedBooks: [] },
  { id: 'u2', name: 'Bob', role: Role.ADMIN, borrowedBooks: [] },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function getBookById(id: string) {
  return books.find(b => b.id === id);
}

export const mockAPI = {
  getBooks: async (): Promise<Book[]> => {
    await delay(200);
    return books.slice();
  },

  addBook: async (book: Book): Promise<Book> => {
    await delay(200);
    books.push(book);
    return book;
  },

  borrowBook: async (userId: string, bookId: string): Promise<{ success: boolean, error?: string }> => {
    await delay(200);
    const user = users.find(u => u.id === userId);
    const book = getBookById(bookId);
    if (!user || !book) return { success: false, error: "User or book not found." };
    if (user.borrowedBooks.length >= 2) return { success: false, error: "Borrow limit reached." };
    if (user.borrowedBooks.includes(bookId)) return { success: false, error: "Already borrowed this book." };
    if (book.stock < 1) return { success: false, error: "Book not available." };

    book.stock -= 1;
    user.borrowedBooks.push(bookId);
    return { success: true };
  },

  returnBook: async (userId: string, bookId: string): Promise<{ success: boolean, error?: string }> => {
    await delay(200);
    const user = users.find(u => u.id === userId);
    const book = getBookById(bookId);
    if (!user || !book) return { success: false, error: "User or book not found." };
    const idx = user.borrowedBooks.indexOf(bookId);
    if (idx === -1) return { success: false, error: "Book not borrowed." };

    user.borrowedBooks.splice(idx, 1);
    book.stock += 1;
    return { success: true };
  },

  getUser: async (userId: string): Promise<User | null> => {
    await delay(100);
    const user = users.find(u => u.id === userId);
    return user ? { ...user, borrowedBooks: [...user.borrowedBooks] } : null;
  },

  // ADMIN functions
  getUsers: async (): Promise<User[]> => {
    await delay(200);
    // For privacy, do not expose password or internals in real apps
    return users.map(u => ({
      id: u.id,
      name: u.name,
      role: u.role,
      borrowedBooks: [...u.borrowedBooks],
    }));
  },
};
