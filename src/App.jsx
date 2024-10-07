import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navabr from "./components/Navabr";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import "./App.css";
import Post from "./pages/Post";

function App() {
  return (
    <BrowserRouter>
      <Navabr />
      <Routes>
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
