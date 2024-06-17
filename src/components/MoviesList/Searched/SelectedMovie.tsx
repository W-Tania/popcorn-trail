import { useEffect, useRef, useState } from "react";
// import SelectedMovieModel from "../../../../Models/SelectedMovieModel";
// import WatchedModel from "../../../../Models/WatchedModel";
// import moviesService from "../../../../Services/MoviesService";
// import StarRating from "../../../StarRatingArea/StarRating/StarRating";
import Loader from "../../Ui/Loader";
import "./SelectedMovie.css";
import WatchedModel from "../../../models/WatchedModel";
import SelectedMovieModel from "../../../models/SelectedMovieModel";
import StarRating from "../../Ui/StarRating";
import moviesService from "../../../services/MoviesService";
import useKeyDownListener from "../../../hooks/useKeyDownListener";

interface SelectedMovieProps {
  selectedId: string;
  isWatched: boolean;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedModel) => void;
}

function SelectedMovie(props: SelectedMovieProps) {
  const [movie, setMovie] = useState<SelectedMovieModel>(
    new SelectedMovieModel()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);

  const countRef = useRef<number>(0);

  useEffect(() => {
    if (rating) countRef.current++;
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    setRating(0);

    moviesService
      .getMovieDetails(props.selectedId)
      .then((movie) => {
        setMovie(movie);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.selectedId]);

  useKeyDownListener({
    action: props.onCloseMovie,
    keys: ["Escape"],
  });

  //Change web title when movie selected
  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;

    return () => {
      document.title = "Popcorn Trail";
    };
  }, [movie]);

  function handleAdd() {
    const newWatchedMovie: WatchedModel = {
      imdbID: movie.imdbID,
      Poster: movie.Poster,
      Title: movie.Title,
      imdbRating: +movie.imdbRating,
      runtime: +movie.Runtime.slice().split(" ")[0],
      userRating: rating,
      Year: movie.Year,
      countRatingDecisions: countRef.current,
    };

    props.onAddWatched(newWatchedMovie);
  }

  return (
    <div className="SelectedMovie details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button onClick={props.onCloseMovie} className="btn-back">
              🡨
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.ReleaseDate} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating onSetRating={setRating} maxRating={10} size={24} />

              {rating > 0 &&
                (!props.isWatched ? (
                  <button onClick={handleAdd} className="btn-add">
                    + Add to list
                  </button>
                ) : (
                  <button onClick={handleAdd} className="btn-add">
                    ↑ Update rating
                  </button>
                ))}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedMovie;
