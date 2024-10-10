import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import CreateComment from "../components/CreateComment";
import CommentList from "../components/CommentList";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="main responsive-main">
      {loading ? (
        <span className="spinner" />
      ) : post ? (
        <>
          <div className="card relative">
            <span
              onClick={handleDelete}
              className="absolute-r btn btn-sm btn-delete"
            >
              Delete
            </span>
            <div>
              <h1>{post.title}</h1>
              <h5 className="card-badge">@{post.username}</h5>
            </div>
            <p>{post.postText}</p>
            <p className="text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="card">
            <CreateComment postId={id} fetchData={fetchData} />
            <CommentList comments={post?.comments} fetchData={fetchData} />
          </div>
        </>
      ) : (
        <h1 className="not-found">Post not found!</h1>
      )}
    </main>
  );
}
