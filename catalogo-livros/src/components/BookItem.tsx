
import { useState } from "react";
import type { Book } from "../types/Book";

interface BookItemProps {
  book: Book;
  onBookDeleted: (id: string) => void;
}

function BookItem({ book, onBookDeleted }: BookItemProps) {
  const [error, setError] = useState("");

  function handleDelete(): void {
    try {
      setError("");
      onBookDeleted(book._id);
    } catch (error) {
      setError("Não foi possível excluir o livro.");
      console.error(error);
    }
  }

  return (
    <div className="book-item">
      <h3>{book.title}</h3>

      <p>
        <strong>Autor:</strong> {book.author}
      </p>

      <p>
        <strong>Status:</strong> {book.status}
      </p>

      <button
        type="button"
        onClick={handleDelete}
      >
        Excluir
      </button>

      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default BookItem;
