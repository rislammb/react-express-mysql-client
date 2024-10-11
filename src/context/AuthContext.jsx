import { createContext, useState, useEffect } from "react";
import { getToken, removeToken, setToken } from "../utils/storage";
import { getLoggedUser } from "../services/userService";

const AuthContext = createContext();

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
        const response = await getLoggedUser();
        setUsername(response.username);
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

export { AuthContext, AuthProvider };
