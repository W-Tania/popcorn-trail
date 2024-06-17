import React, { useRef } from "react";
import "./Search.css";
import useKeyDownListener from "../../hooks/useKeyDownListener";

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search(props: SearchProps) {
  const inputEl = useRef(null);

  useKeyDownListener({
    keys: ["Enter"],
    action: function () {
      if (document.activeElement === inputEl.current) return;
      inputEl.current.focus();
      props.setQuery("");
    },
  });

  return (
    <input
      className="Search"
      type="text"
      placeholder="Search movies..."
      value={props.query}
      onChange={(e) => props.setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
