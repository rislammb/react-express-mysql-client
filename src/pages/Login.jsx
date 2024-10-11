import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
    setSubmitting(true);
    setError("");

    try {
      const res = await loginUser(values);
      login(res.data);
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
      <h1 className="heading">Login</h1>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="form form-sm"
      >
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
            autoFocus
          />
          {errors.username && (
            <p className="warning">{errors.username.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 6,
                message: "Minimum length is 6!",
              },
            })}
            id="password"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="warning">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="warning">{error}</p>}
        <button
          className="btn btn-primary relative flex-c"
          type="submit"
          disabled={submitting}
        >
          Register
          {submitting && <span className="submittig" />}
        </button>
      </form>
    </main>
  );
}
