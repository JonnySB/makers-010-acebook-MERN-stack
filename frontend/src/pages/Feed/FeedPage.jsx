import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/Post/CreatePost";
import NavBar from "../Nabvar/NavBar";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userID, setUserID] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          setToken(data.token);
          setUserID(data.user_id);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    } else {
      navigate("/");
    }
  }, [token]);

  if(!token) {
    return;
  }

  return (
    <>
    <NavBar />
      <div className="w-screen h-full bg-gray-100">
        <div className="flex justify-center">
          <CreatePost token={token} setToken={setToken}/>
        </div>

        <div role="feed">
          {posts.map((post) => (
            <Post userID={userID} post={post} key={post._id} token={token} setToken={setToken}/>
          ))}
        </div>
      </div>
    </>
  );
};
