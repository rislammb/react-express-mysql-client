import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createPost } from "../services/postService";

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
    setSubmitting(true);
    setError("");
    try {
      await createPost(values);
      return navigate("/");
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
    <main className="main">
      <h1 className="heading">Create Post</h1>
      <form onSubmit={handleSubmit((data) => onSubmit(data))} className="form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            {...register("title", { required: true })}
            id="title"
            placeholder="Enter title"
            autoFocus
          />
          {errors.title && <p className="warning">Title is required!</p>}
        </div>
        <div className="form-group">
          <label htmlFor="postText">Post Text</label>
          <textarea
            rows={3}
            {...register("postText", { required: true })}
            id="postText"
            placeholder="Enter post text"
          />
          {errors.postText && <p className="warning">Post text is required!</p>}
        </div>
        {error && <p className="warning">{error}</p>}
        <button
          className="btn btn-primary relative flex-c"
          type="submit"
          disabled={submitting}
        >
          Create
          {submitting && <span className="submittig" />}
        </button>
      </form>
    </main>
  );
}
