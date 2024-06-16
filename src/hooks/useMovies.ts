import { useState, useEffect } from "react";
import MovieModel from "../models/MovieModel";

const KEY = "717c5fe8";

interface useMoviesProps {
  query: string;
}

export function useMovies(props: useMoviesProps) {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(
    function () {
      //   callback?.();
      //   handleCloseMoive();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${props.query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error(data["Error"]);

          setMovies(data.Search);
          setError("");
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";

          if (!(error instanceof Error) || error.name !== "AbortError") {
            // Now we only handle non-abort errors
            setError(message);
          }

          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
      if (props.query.length < 2) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [props.query]
  );

  return { movies, isLoading, error };
}
