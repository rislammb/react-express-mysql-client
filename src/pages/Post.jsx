import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../axios";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { deletePost, getPost } from "../services/postService";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getPost(id);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
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
              className="absolute-r btn btn-sm btn-danger"
            >
              Delete
            </span>
            <div>
              <h1>{post.title}</h1>
              <Link to={`/user/${post.username}`} className="card-badge">
                @{post.username}
              </Link>
            </div>
            <p>{post.postText}</p>
            <p className="text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="card">
            <CommentForm postId={id} fetchData={fetchData} />
            <CommentList comments={post?.comments} fetchData={fetchData} />
          </div>
        </>
      ) : (
        <h1 className="not-found">Post not found!</h1>
      )}
    </main>
  );
}
