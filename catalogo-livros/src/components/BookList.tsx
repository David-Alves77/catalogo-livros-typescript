
import type { Book } from "../types/Book";
import BookItem from "./BookItem";

interface BookListProps {
  books: Book[];
  onDeleteBook: (id: string) => void;
}

function BookList({ books, onDeleteBook }: BookListProps) {
  return (
    <div className="book-list">
      <h2>Meus livros</h2>

      {books.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onBookDeleted={onDeleteBook}
          />
        ))
      )}
    </div>
  );
}

export default BookList;
