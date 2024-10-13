import { useState } from "react";
import { useForm } from "react-hook-form";
import { createComment } from "../services/commentService";

export default function CommentForm({ postId, addComment }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
    setSubmitting(true);
    setError("");
    values.postId = +postId;
    try {
      const res = await createComment(values);
      addComment(res.data);
      reset();
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.error ?? err?.message ?? "Something went wrong!"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="form comment-form"
      >
        <div className="form-group">
          <input
            {...register("commentBody", { required: true })}
            id="commentBody"
            placeholder="Enter comment ..."
            autoComplete="off"
          />
          {errors.commentBody && (
            <p className="warning">Comment body is required!</p>
          )}
        </div>
        <button
          className="btn btn-primary btn-sm relative flex-c"
          type="submit"
          disabled={submitting}
        >
          Comment
          {submitting && <span className="submittig" />}
        </button>
      </form>
      {error && <p className="warning mt-xs">{error}</p>}
    </div>
  );
}
