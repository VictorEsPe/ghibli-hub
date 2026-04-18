import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovie } from "../../services/fetchMovies";
import type { Movie } from "../../types/movieType";
import { Link } from "react-router-dom";

export function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function getMovie() {
      if (id) {
        try {
          const movie = await fetchMovie(id);
          setMovie(movie);
        } catch (error) {
          console.error("An error occurred while fetching the movie:", error);
          setError(true);
        }
      }
    }

    getMovie();
  }, [id]);

  if (error) {
    return (
        <div>
            <Link to="/">Return</Link>
            <p>Failed to load movie. Please try again later.</p>
        </div>
    );
  }

  if (!movie) {
    return (
        <div>
            <Link to="/">Return</Link>
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <section>
      <Link to="/">Return</Link>
      {movie && (
        <div>
          <img src={movie.movie_banner} alt={movie.title} />
          <span>{movie.rt_score}</span>
          <h2>{movie.title}</h2>
          <span>{movie.release_date}</span>
          <p>{movie.director}</p>
          <p>{movie.description}</p>
        </div>
      )}
    </section>
  );
}
