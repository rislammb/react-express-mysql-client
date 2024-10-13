import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../axios";
import PostList from "../components/PostList";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { username } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axiosPrivate.get(`/posts`);
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
        <h1 className="heading">Posts</h1>
        {username && (
          <Link to={"/post/create"} className="btn inline-block">
            Create Post
          </Link>
        )}
      </div>
      {loading ? (
        <span className="spinner" />
      ) : (
        <PostList posts={posts} page={"home"} />
      )}
    </main>
  );
}
