import { useState } from "react";
import "./Box.css";
import Button from "./Button";

interface BoxProps {
  children: any;
}

function Box(props: BoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="Box">
      <Button
        className="btn-toggle"
        onClickEvent={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </Button>
      {isOpen && props.children}
    </div>
  );
}

export default Box;
