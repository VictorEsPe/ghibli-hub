import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/fetchMovies";
import type { Movie } from "../../types/movieType";
import { Link } from "react-router-dom";

export function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function getMovies() {
      const data = await fetchMovies();
      const moviesList = data
        .slice(0, 10)
        .sort((a, b) => (a.title > b.title ? 1 : -1));

      setMovies(moviesList);
    }

    getMovies();
  }, []);

  return (
    <section className="flex flex-col items-center gap-8">
      <h2 className="text-gray-800 text-2xl">Lista de Filmes</h2>
      <ul className="flex flex-col gap-5">
        {movies.map((movie, index) => (
          <li
            key={index}
           
          >
            <Link to={`/${movie.id}`}  className="flex flex-col items-center w-md border border-gray-300 rounded-lg p-5 shadow-sm">
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
