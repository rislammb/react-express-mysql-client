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
        <Link to={"/create-post"} className="btn inline-block">
          Create Post
        </Link>
      </div>
      <ul className="posts">
        {loading ? (
          <span className="spinner" />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`} className="card card-link">
                <div>
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-badge">@{post.username}</p>
                </div>
                <p>{post.postText}</p>
              </Link>
            </li>
          ))
        ) : (
          <li className="not-found">Posts not found!</li>
        )}
      </ul>
    </main>
  );
}
