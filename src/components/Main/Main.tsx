import "./Main.css";

interface MainProps {
  children: any;
}

function Main(props: MainProps) {
  return (
    <div className="Main">
      <main className="main">{props.children}</main>
    </div>
  );
}

export default Main;
