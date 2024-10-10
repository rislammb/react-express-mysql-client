import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../axios";
import { useState } from "react";

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (values) => {
    setSubmitting(true);
    setApiError("");
    try {
      await axios.post("/posts", values);
      return navigate("/");
    } catch (err) {
      console.log(err);
      setApiError(err.message ?? "Something went wrong!");
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
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", {
              required: "Username is required!",
              minLength: {
                value: 2,
                message: "Minimum length is 2!",
              },
              maxLength: {
                value: 15,
                message: "Maximum length is 15!",
              },
            })}
            id="username"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="warning">{errors.username.message}</p>
          )}
        </div>
        {apiError && <p className="warning">{apiError}</p>}
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
