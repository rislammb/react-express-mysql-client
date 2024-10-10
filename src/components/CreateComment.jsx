import { useForm } from "react-hook-form";
import axios from "../axios";
import { useState } from "react";

export default function CreateComment({ postId, fetchData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (values) => {
    setSubmitting(true);
    setApiError("");
    values.postId = +postId;
    try {
      await axios.post("/comments", values);
      reset();
      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="form comment-form"
    >
      <div className="form-group">
        <input
          {...register("commentBody", { required: true })}
          id="commentBody"
          placeholder="Enter comment text"
        />
        {errors.commentBody && (
          <p className="warning">Comment body is required!</p>
        )}
      </div>
      {apiError && <p className="warning">{apiError}</p>}
      <button
        className="btn btn-primary relative flex-c"
        type="submit"
        disabled={submitting}
      >
        Comment
        {submitting && <span className="submittig" />}
      </button>
    </form>
  );
}
