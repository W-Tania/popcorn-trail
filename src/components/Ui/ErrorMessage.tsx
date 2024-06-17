import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage(props: ErrorMessageProps) {
  return (
    <p className="ErrorMessage error">
      <span>⛔</span> {props.message}
    </p>
  );
}

export default ErrorMessage;
