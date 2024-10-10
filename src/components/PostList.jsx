import { Link, useNavigate } from "react-router-dom";

export default function PostList({ posts, page }) {
  const navigate = useNavigate();

  return (
    <ul className="posts">
      {posts.length > 0 ? (
        posts.map((post) => (
          <li
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="card card-link"
          >
            <div>
              <p className="card-title">{post.title}</p>
              {page === "home" ? (
                <Link to={`/user/${post.username}`} className="card-badge">
                  @{post.username}
                </Link>
              ) : (
                ""
              )}
            </div>
            <p>{post.postText}</p>
            <p className="text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </li>
        ))
      ) : (
        <li>
          <h1 className="not-found">Posts not found!</h1>
        </li>
      )}
    </ul>
  );
}
