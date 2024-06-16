import MovieModel from "../../../models/MovieModel";
import Movie from "./Movie";
import "./MovieList.css";

interface MovieListProps {
  movies: MovieModel[];
  //   onSelectMovie: (movie: MovieModel) => void;
}

function MovieList(props: MovieListProps) {
  return (
    <ul className="MovieList list list-movies">
      {props.movies?.map((movie) => (
        <Movie
          //   onSelectMovie={props.onSelectMovie}
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
}

export default MovieList;
