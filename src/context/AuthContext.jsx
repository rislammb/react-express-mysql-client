import { createContext, useState, useEffect } from "react";
import { getToken, removeToken, setToken } from "../utils/storage";
import { getLoggedUser } from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (data) => {
    setUsername(data.username);
    setToken(data.token);
  };

  const logout = () => {
    setUsername(null);
    removeToken();
  };

  const fetchUserInfo = async () => {
    const token = getToken();
    if (token) {
      try {
        const res = await getLoggedUser();
        setUsername(res.data.username);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return loading ? (
    <div className="spinner mt-lg" />
  ) : (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
