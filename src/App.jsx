import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";

const API_KEY = "a6b86698";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load default movies on page load
  useEffect(() => {
    setLoading(true);
    fetch(`https://www.omdbapi.com/?s=movie&type=movie&page=1&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Fetch movies based on search
  useEffect(() => {
    if (search.length > 2) {
      setLoading(true);
      setError("");
      
      fetch(`https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Search) {
            setMovies(data.Search);
            setError("");
          } else {
            setMovies([]);
            setError("No movies found. Try a different search.");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch movies. Please try again.");
          setMovies([]);
          setLoading(false);
        });
    }
  }, [search]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Movie</h1>
      </header>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search movies, TV shows..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} apiKey={API_KEY} />
          ))
        ) : (
          !loading && search.length > 2 && <p className="no-results">No results found</p>
        )}
      </div>

      {search.length === 0 && !loading && movies.length === 0 && (
        <div className="placeholder">
          <p>Enter search terms to find movies or TV shows</p>
        </div>
      )}
    </div>
  );
}
export default App;