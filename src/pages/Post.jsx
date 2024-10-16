import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { deletePost, getPost } from "../services/postService";
import { toggleLike } from "../services/likeService";

export default function Post() {
  const { id } = useParams();
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reactText, setReactText] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await getPost(id);
      setPost(data);
      setComments(data?.comments);
      setReactText(
        data?.likes?.find((like) => like.username === username)
          ? "Unlike"
          : "Like"
      );
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

  const handleLike = async () => {
    try {
      await toggleLike(id);
      setReactText((prev) => (prev === "Like" ? "Unlike" : "Like"));
    } catch (err) {
      console.log("Error from like: ", err);
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
            <div className="w-full">
              <div className="flex-jb">
                <h2>{post.title}</h2>
                {username === post.username && (
                  <btn onClick={handleDelete} className="btn btn-danger">
                    Delete
                  </btn>
                )}
              </div>
              <Link to={`/user/${post.username}`} className="card-badge">
                @{post.username}
              </Link>
            </div>
            <p>{post.postText}</p>
            <div className="flex-jb w-full text-sm">
              <p className="badge">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              {username && (
                <button className="btn btn-xs btn-primary" onClick={handleLike}>
                  {reactText}
                </button>
              )}
            </div>
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
