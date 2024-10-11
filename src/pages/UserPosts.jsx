import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { getUserPosts } from "../services/postService";

export default function UserPosts() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
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
  }, []);

  return (
    <main className="main">
      <div className="flex-jb">
        <h1 className="heading">{username}&apos;s posts</h1>
        <Link to={"/post/create"} className="btn inline-block">
          Create Post
        </Link>
      </div>
      {loading ? <span className="spinner" /> : <PostList posts={posts} />}
    </main>
  );
}
