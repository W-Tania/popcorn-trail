import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./App.css";
import Logo from "./NavBar/Logo";
import NavBar from "./NavBar/NavBar";
import NumResults from "./NavBar/NumResults";
import Search from "./NavBar/Search";
import Main from "./Ui/Main";
import Box from "./Ui/Box";
import MovieList from "./MoviesList/Searched/MovieList";
import WatchedSummary from "./MoviesList/Watched/WatchedSummary";
import WatchedList from "./MoviesList/Watched/WatchedList";
import Loader from "./Ui/Loader";
import WatchedModel from "../models/WatchedModel";
import MovieModel from "../models/MovieModel";
import SelectedMovie from "./MoviesList/Searched/SelectedMovie";
import ErrorMessage from "./Ui/ErrorMessage";

function App() {
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>(null);
  const [isWatched, setIsWatched] = useState<boolean>(false);
  const { movies, isLoading, error } = useMovies({ query });

  const [watched, setWatched] = useLocalStorage<WatchedModel[]>({
    initialState: [],
    key: "watched",
  });

  function handleSelectMovie(movie: MovieModel) {
    const watchedState: boolean = watched
      .map((movie) => movie.imdbID)
      .includes(movie.imdbID);
    setIsWatched(watchedState);
    setSelectedId(movie.imdbID === selectedId ? null : movie.imdbID);
  }

  function handleAddWatched(movie: WatchedModel): void {
    const updatedWatched: WatchedModel[] = [...watched];
    const watchedState: boolean = updatedWatched
      .map((movie) => movie.imdbID)
      .includes(movie.imdbID);

    if (watchedState) {
      const movieToUpdate: WatchedModel = updatedWatched.find(
        (prevMovie) => prevMovie.imdbID === movie.imdbID
      );
      movieToUpdate.userRating = movie.userRating;
      movieToUpdate.countRatingDecisions += movie.countRatingDecisions;
    } else updatedWatched.push(movie);

    setWatched(updatedWatched);
    setSelectedId(null);
  }

  function handleCloseMovie(): void {
    setSelectedId(null);
  }

  function handleDeleteWatched(id: string): void {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {query.length === 0 || (error && <ErrorMessage message={error} />)}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              isWatched={isWatched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
