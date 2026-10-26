
import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import BookForm from "./BookForm";
import BookItem from "./BookItem";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks(): Promise<void> {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/books`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar livros.");
        }

        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error) {
        if (controller.signal.aborted) return;

        setError("Não foi possível carregar os livros.");
        console.error(error);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => controller.abort();
  }, []);

  function handleBookAdded(book: Book): void {
    setBooks((previousBooks) => [...previousBooks, book]);
  }

  function handleBookDeleted(id: string): void {
    setBooks((previousBooks) =>
      previousBooks.filter((book) => book._id !== id)
    );
  }

  return (
    <div className="book-list">
      <BookForm onBookAdded={handleBookAdded} />

      <h2>Meus livros</h2>

      {loading && <p>Carregando livros...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p>Nenhum livro cadastrado.</p>
      )}

      {!loading &&
        books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onBookDeleted={handleBookDeleted}
          />
        ))}
    </div>
  );
}

export default BookList;

