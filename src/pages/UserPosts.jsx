import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { getUserPosts } from "../services/postService";
import { AuthContext } from "../context/AuthContext";

export default function UserPosts() {
  const { username: user } = useContext(AuthContext);
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUserPosts(username);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  return (
    <main className="main">
      <div className="flex-jb">
        <h1 className="heading">{username}&apos;s posts</h1>
        {user && (
          <Link to={"/post/create"} className="btn inline-block">
            Create Post
          </Link>
        )}
      </div>
      {loading ? <span className="spinner" /> : <PostList posts={posts} />}
    </main>
  );
}
