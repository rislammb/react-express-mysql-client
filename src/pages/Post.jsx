import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { deletePost, getPost } from "../services/postService";

export default function Post() {
  const { id } = useParams();
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPost(id);
      setPost(res.data);
      setComments(res.data?.comments);
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

  const addComment = (newComment) =>
    setComments((prev) => [...prev, newComment]);

  const removeComment = (commentId) =>
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <main className="main responsive-main">
      {loading ? (
        <span className="spinner" />
      ) : post ? (
        <>
          <div className="card">
            <div>
              <h2 className="flex flex-jbs">
                {post.title}{" "}
                {username === post.username && (
                  <span
                    onClick={handleDelete}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </span>
                )}
              </h2>
              <Link to={`/user/${post.username}`} className="card-badge">
                @{post.username}
              </Link>
            </div>
            <p>{post.postText}</p>
            <p className="text-sm badge">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="card">
            {username && <CommentForm postId={id} addComment={addComment} />}
            <CommentList comments={comments} removeComment={removeComment} />
          </div>
        </>
      ) : (
        <h1 className="not-found">Post not found!</h1>
      )}
    </main>
  );
}
