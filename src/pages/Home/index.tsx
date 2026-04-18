import { useEffect, useState } from "react";
import { fetchMoviesList } from "../../services/fetchMovies";
import type { Movie } from "../../types/movieType";
import { Link } from "react-router-dom";

export function MoviesList() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function getMovies() {
      try {
        const data = await fetchMoviesList();
        const moviesList = data
          .slice(0, 10)
          .sort((a, b) => (a.title > b.title ? 1 : -1));

        setError(false);
        setMovies(moviesList);
      } catch (error) {
        console.error("An error occurred while fetching movies:", error);
        setError(true);
      }
    }
    getMovies();
  }, []);

  if (error) {
    return <p>Failed to load movies. Please try again later.</p>;
  }
  
  if (!movies) {
    return <p>Loading...</p>;
  }


  return (
    <section className="flex flex-col items-center gap-8">
      <h2 className="text-gray-800 text-2xl">Lista de Filmes</h2>
      <ul className="flex flex-col gap-5">
        {movies.map((movie, index) => (
          <li key={index}>
            <Link
              to={`/${movie.id}`}
              className="flex flex-col items-center w-md border border-gray-300 rounded-lg p-5 shadow-sm"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-xs h-xs mb-7 rounded-lg"
              />
              <div className="flex gap-2 items-end w-full mb-2">
                <h4 className="text-gray-950 font-semibold text-lg">
                  {movie.title}
                </h4>
                <p className="text-gray-500">{movie.release_date}</p>
              </div>
              <p className="text-gray-700">{movie.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
