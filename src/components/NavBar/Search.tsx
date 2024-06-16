import React from "react";
import "./Search.css";

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search(props: SearchProps) {
  return (
    <input
      className="Search"
      type="text"
      placeholder="Search movies..."
      value={props.query}
      onChange={(e) => props.setQuery(e.target.value)}
      //   ref={inputEl}
    />
  );
}
