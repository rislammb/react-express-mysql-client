import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function OpenRoute({ component: Component }) {
  const { username } = useContext(AuthContext);

  return username ? <Navigate to="/" /> : <Component />;
}
