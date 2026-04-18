import type { Movie } from "../types/movieType";

export async function fetchMoviesList(): Promise<Movie[]> {
  const response = await fetch("https://ghibliapi.vercel.app/films");

  if(!response.ok) {
    throw new Error("Failed to fetch movies list");
  }

  return await response.json();

}

export async function fetchMovie(id: string): Promise<Movie> {
    const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`);

    if(!response.ok) {
    throw new Error("Failed to fetch movies data");
  }

    return await response.json();
}