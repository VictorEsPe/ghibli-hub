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
    return (
      <div className="flex flex-col items-center mt-5 gap-10">
        <p>Failed to load movies. Please try again later.</p>
      </div>
    )
  }
  
  if (!movies) {
    return (
      <div className="flex flex-col items-center mt-5 gap-10">
        <p>Loading...</p>
      </div>
    )
  }


  return (
    <section className="flex flex-col items-center gap-5 p-5">
      <h2 className="text-gray-800 text-4xl">Film List</h2>
      <ul className="flex flex-center flex-col gap-8">
        {movies.map((movie, index) => (
          <li key={index}>
            <Link
              to={`/${movie.id}`}
              className="flex flex-col items-center min-w-79 max-w-125 border border-gray-300 rounded-lg p-5 shadow-lg hover:scale-102 transition-transform duration-200"
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
