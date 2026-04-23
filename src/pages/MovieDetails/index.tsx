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
      <div className="flex flex-col items-center mt-5 gap-10">
        <Link
          to="/"
          className="border border-gray-700 p-2 rounded-3xl text-gray-700 hover:bg-gray-200"
        >
          &lt; Return
        </Link>

        <p>Failed to load movie. Please try again later.</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center mt-5 gap-10">
        <Link
          to="/"
          className="border border-gray-700 p-2 rounded-3xl text-gray-700 hover:bg-gray-200"
        >
          &lt; Return
        </Link>

        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="p-5  flex flex-col items-center">
      <div className="flex flex-col items-start gap-5">
        <Link
          to="/"
          className="border border-gray-400 py-2 px-5 rounded-3xl text-gray-700 hover:bg-gray-200"
        >
          &lt; Return
        </Link>
        {movie && (
          <div
            className="min-w-75 max-w-md p-4 border
           border-gray-400 rounded-lg shadow-md flex flex-col items-start gap-5"
          >
            <img
              src={movie.movie_banner}
              alt={movie.title}
              className="rounded-lg"
            />

            <div className="flex items-center gap-4">
              <span className="bg-yellow-200 w-11 h-11 rounded-full text-yellow-600 text-md flex items-center justify-center">
                {movie.rt_score}
              </span>
              <div className="flex items-center gap-1">
                <h2 className="text-2xl">{movie.title}</h2>
                <span className="text-gray-500 text-sm">
                  {movie.release_date}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">
              <p><span className="font-semibold">Director:</span> {movie.director}</p>
              <p><span className="font-semibold">Producer:</span> {movie.producer}</p>
            </div>
            <p>{movie.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
