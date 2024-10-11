import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ component: Component }) {
  const { username } = useContext(AuthContext);

  return username ? <Component /> : <Navigate to="/login" />;
}
