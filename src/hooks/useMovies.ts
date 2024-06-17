import { useState, useEffect } from "react";
import MovieModel from "../models/MovieModel";
import moviesService from "../services/MoviesService";

interface useMoviesProps {
  query: string;
}

export function useMovies(props: useMoviesProps) {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    const controller = new AbortController();

    moviesService
      .getMoviesBySearch(props.query, controller)
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setError("");
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [props.query]);
  return { movies, isLoading, error };
}
