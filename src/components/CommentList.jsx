import { useContext } from "react";
import { axiosPrivate } from "../axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function CommentList({ comments, removeComment }) {
  const { username } = useContext(AuthContext);

  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/comments/${id}`);
      removeComment(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <h4 className="comments-label">Comments:</h4>
      <ul className="comments">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="flex-jb">
              <div>
                <Link to={`/user/${comment.username}`}>
                  @{comment.username}
                </Link>
                <p>
                  {comment.commentBody}{" "}
                  <span className="text-sm  badge">
                    {new Date(comment.createdAt).toLocaleTimeString()}
                  </span>
                </p>
              </div>
              {username === comment.username && (
                <span
                  onClick={() => handleDelete(comment.id)}
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </span>
              )}
            </li>
          ))
        ) : (
          <li>Comments not found!</li>
        )}
      </ul>
    </div>
  );
}
