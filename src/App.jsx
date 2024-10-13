import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navabr from "./components/navbar";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import "./App.css";
import Post from "./pages/Post";
import UserPosts from "./pages/UserPosts";
import ProtectedRoute from "./components/ProtectedRoute";
import OpenRoute from "./components/OpenRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navabr />
        <Routes>
          <Route
            path="/post/create"
            element={<ProtectedRoute component={CreatePost} />}
          />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user/:username" element={<UserPosts />} />
          <Route path="/login" element={<OpenRoute component={Login} />} />
          <Route
            path="/register"
            element={<OpenRoute component={Register} />}
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
