import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="main">
      <h1 className="heading">Posts</h1>
      <div className="text-right">
        <Link to={"/posts/create"} className="btn inline-block">
          Create Post
        </Link>
      </div>
      <ul className="posts">
        {loading ? (
          <span className="spinner" />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`} className="card card-link">
                <div>
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-badge">@{post.username}</p>
                </div>
                <p>{post.postText}</p>
              </Link>
            </li>
          ))
        ) : (
          <li>
            <h1 className="not-found">Posts not found!</h1>
          </li>
        )}
      </ul>
    </main>
  );
}
