import React from "react";
import MovieModel from "../../models/MovieModel";
import "./NumResults.css";

interface NumResultsProps {
  movies: MovieModel[];
}

export default function NumResults(props: NumResultsProps) {
  return (
    <p className="NumResults">
      Found <strong>{props.movies.length}</strong> 🎬
    </p>
  );
}
