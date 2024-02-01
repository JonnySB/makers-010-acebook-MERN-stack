import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/Post/CreatePost";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    } else {
      navigate("/login");
    }
  }, [token]);

  if (!token) {
    return;
  }

  return (
    <>
      <div className="w-screen">
        <div className="flex justify-center">
          <CreatePost token={token} setToken={setToken}/>
        </div>

        <div role="feed">
          {posts.map((post) => (
            <Post post={post} key={post._id}/>
          ))}
        </div>
      </div>
    </>
  );
};
