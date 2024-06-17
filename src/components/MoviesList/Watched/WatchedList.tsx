import "./WatchedList.css";
import WatchedModel from "../../../models/WatchedModel";
import WatchedMovie from "./WatchedMovie";

interface WatchedListProps {
  watched: WatchedModel[];
  onDeleteWatched: (id: string) => void;
}

function WatchedList(props: WatchedListProps) {
  return (
    <ul className="WatchedList list">
      {props.watched.map((movie) => (
        <WatchedMovie
          onDeleteWatched={props.onDeleteWatched}
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
}

export default WatchedList;
