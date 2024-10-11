import { axiosPrivate } from "../axios";

export default function CommentList({ comments, fetchData }) {
  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/comments/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return comments?.length > 0 ? (
    <ul className="comments">
      {comments.map((comment) => (
        <li key={comment.id} className="flex-jb">
          <div>
            <p>{comment.commentBody}</p>
            <p className="text-sm">
              {new Date(comment.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <span
            onClick={() => handleDelete(comment.id)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="not-found-sm">Comments not found!</p>
  );
}
