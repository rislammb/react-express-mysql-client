import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axios";
import PostList from "../components/PostList";

export default function UserPosts() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts/u/${username}`);
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
