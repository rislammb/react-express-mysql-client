import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navabr() {
  const { username, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "active-nav" : "")}
      >
        Home
      </NavLink>
      <div className="nav-right">
        {username ? (
          <>
            <p>
              Welcome,{" "}
              <NavLink
                to={`/user/${username}`}
                className={({ isActive }) => (isActive ? "active-nav" : "")}
              >
                {username}
              </NavLink>
            </p>
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to={"/login"}
              className={({ isActive }) => (isActive ? "active-nav" : "")}
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className={({ isActive }) => (isActive ? "active-nav" : "")}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
