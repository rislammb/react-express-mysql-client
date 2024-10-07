import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
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
      {loading ? (
        <span className="spinner" />
      ) : post ? (
        <div className="card">
          <div>
            <h1>{post.title}</h1>
            <h5 className="card-badge">@{post.username}</h5>
          </div>
          <p>{post.postText}</p>
          <p className="text-sm">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <h1 className="not-found">Post not found!</h1>
      )}
    </main>
  );
}
