
import BookList from "./components/BookList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Catálogo de Livros</h1>
        <p>Gerencie seus livros favoritos</p>
      </header>

      <main>
        <BookList />
      </main>

      <footer>
        <p>Projeto React + TypeScript | EBAC</p>
      </footer>
    </div>
  );
}

export default App;
