import type { Movie } from "../types/movieType";

export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch("https://ghibliapi.vercel.app/films");
  const data = await response.json();

  return data;
}