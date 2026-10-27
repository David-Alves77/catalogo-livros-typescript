
import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

import {
  getBooks,
  addBook,
  deleteBook,
} from "./services/bookStorage";

import type { Book, NewBook } from "./types/Book";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  function handleAddBook(book: NewBook): void {
    const newBook = addBook(book);

    setBooks((previous) => [
      ...previous,
      newBook,
    ]);
  }

  function handleDeleteBook(id: string): void {
    deleteBook(id);

    setBooks((previous) =>
      previous.filter((book) => book._id !== id)
    );
  }

  return (
    <main>
      <h1>Catálogo de Livros</h1>

      <BookForm onAddBook={handleAddBook} />

      <BookList
        books={books}
        onDeleteBook={handleDeleteBook}
      />
    </main>
  );
}

export default App;
