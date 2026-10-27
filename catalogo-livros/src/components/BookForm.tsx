
import { useState, type FormEvent } from "react";
import type { BookStatus, NewBook } from "../types/Book";

interface BookFormProps {
  onAddBook: (book: NewBook) => void;
}

function BookForm({ onAddBook }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<BookStatus>("Não lido");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !author.trim()) {
      setError("Preencha o título e o autor.");
      return;
    }

    const newBook: NewBook = {
      title: title.trim(),
      author: author.trim(),
      status,
    };

    try {
      setError("");
      onAddBook(newBook);

      setTitle("");
      setAuthor("");
      setStatus("Não lido");
    } catch (error) {
      setError("Não foi possível cadastrar o livro.");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar livro</h2>

      <input
        type="text"
        placeholder="Título do livro"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Autor do livro"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        required
      />

      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as BookStatus)
        }
      >
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>

      <button type="submit">Adicionar livro</button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
}

export default BookForm;
