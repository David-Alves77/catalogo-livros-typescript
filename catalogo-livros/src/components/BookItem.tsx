
import { useState } from "react";
import type { Book } from "../types/Book";

interface BookItemProps {
  book: Book;
  onBookDeleted: (id: string) => void;
}

function BookItem({ book, onBookDeleted }: BookItemProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleDelete(): Promise<void> {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/books/${book._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir livro.");
      }

      onBookDeleted(book._id);
    } catch (error) {
      setError("Não foi possível excluir o livro.");
      console.error(error);
    } finally {
      setLoading(false);
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
        disabled={loading}
      >
        {loading ? "Excluindo..." : "Excluir"}
      </button>

      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default BookItem;
