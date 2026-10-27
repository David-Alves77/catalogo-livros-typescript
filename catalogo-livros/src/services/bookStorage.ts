
import type { Book, NewBook } from "../types/Book";

const STORAGE_KEY = "catalogo-livros";

export function getBooks(): Book[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as Book[];
  } catch {
    return [];
  }
}

export function addBook(book: NewBook): Book {
  const books = getBooks();

  const newBook: Book = {
    ...book,
    _id: crypto.randomUUID(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...books, newBook])
  );

  return newBook;
}

export function deleteBook(id: string): void {
  const books = getBooks();

  const updatedBooks = books.filter(
    (book) => book._id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedBooks)
  );
}
