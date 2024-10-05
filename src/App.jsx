import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="heading">Posts</h1>
      <ul className="posts">
        {loading ? (
          <span className="spinner" />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="card">
              <div>
                <h3>{post.title}</h3>
                <p className="username">@{post.username}</p>
              </div>
              <p>{post.postText}</p>
            </li>
          ))
        ) : (
          <li className="not-found">Posts not found!</li>
        )}
      </ul>
    </>
  );
}

export default App;
