import axios from "../axios";

export default function CommentList({ comments, fetchData }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/comments/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return comments?.length > 0 ? (
    comments.map((comment) => (
      <div key={comment.id} className="flex-jb">
        <div>
          <p>{comment.commentBody}</p>
          <p className="text-sm">
            {new Date(comment.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <span
          onClick={() => handleDelete(comment.id)}
          className="btn btn-sm btn-delete"
        >
          Delete
        </span>
      </div>
    ))
  ) : (
    <p className="not-found-sm">Comments not found!</p>
  );
}
