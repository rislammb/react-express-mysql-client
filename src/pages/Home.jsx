import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get("/posts")
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
    <main className="main">
      <h1 className="heading">Posts</h1>
      <div className="text-right">
        <button className="btn">
          <Link to={"/create-post"}>Create Post</Link>
        </button>
      </div>
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
    </main>
  );
}
