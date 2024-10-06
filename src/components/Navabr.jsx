import { Link } from "react-router-dom";

export default function Navabr() {
  return (
    <nav className="navbar">
      <Link to={"/"}>Home</Link>
      <div className="right">
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </div>
    </nav>
  );
}
