import "./Button.css";

interface ButtonProps {
  children: any;
  className?: string;
  onClickEvent?: () => void;
}

function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClickEvent}
      className={`Button ${props?.className}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
