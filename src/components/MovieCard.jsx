import { useState } from "react";
import "./MovieCard.css";

function MovieCard({ movie, apiKey }) {
  const [details, setDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const getDetails = () => {
    if (showDetails) {
      setShowDetails(false);
      return;
    }

    setLoadingDetails(true);
    fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setShowDetails(true);
        setLoadingDetails(false);
      })
      .catch(() => {
        setLoadingDetails(false);
      });
  };

  return (
    <div className={`movie-card ${showDetails ? "expanded" : ""}`}>
      <div className="movie-poster-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
          alt={movie.Title}
          className="movie-poster"
        />
        <div className="movie-year">{movie.Year}</div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-type">{movie.Type}</p>

        <button onClick={getDetails} className="details-btn">
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {showDetails && (
          <div className="movie-details">
            {loadingDetails ? (
              <p>Loading details...</p>
            ) : details ? (
              <>
                <p><strong>Plot:</strong> {details.Plot}</p>
                <p><strong>Rating:</strong> ⭐ {details.imdbRating}/10</p>
                <p><strong>Director:</strong> {details.Director}</p>
                <p><strong>Cast:</strong> {details.Actors}</p>
                <p><strong>Genre:</strong> {details.Genre}</p>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
