import { Link } from "react-router-dom";

export default function PostList({ posts, page }) {
  return (
    <ul className="posts">
      {posts.length > 0 ? (
        posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`} className="card card-link">
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
              <p className="text-sm badge">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </Link>
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
