import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navabr from "./components/Navabr";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import "./App.css";
import Post from "./pages/Post";
import UserPosts from "./pages/UserPosts";

function App() {
  return (
    <BrowserRouter>
      <Navabr />
      <Routes>
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/user/:username" element={<UserPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
