import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import instance from "../axios";

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    instance
      .post("/posts", values)
      .then(() => {
        return navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
            placeholder="Title..."
          />
          {errors.title && <p className="warning">Title is required!</p>}
        </div>
        <div className="form-group">
          <label htmlFor="postText">Post Text</label>
          <textarea
            rows={3}
            {...register("postText", { required: true })}
            id="postText"
            placeholder="Post text..."
          />
          {errors.postText && <p className="warning">Post text is required!</p>}
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", {
              required: "Username is required!",
              minLength: {
                value: 3,
                message: "Minimum length is 3!",
              },
              maxLength: {
                value: 15,
                message: "Maximum length is 15!",
              },
            })}
            id="username"
            placeholder="username..."
          />
          {errors.username && (
            <p className="warning">{errors.username.message}</p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Create
        </button>
      </form>
    </main>
  );
}
