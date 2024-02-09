import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/Post/CreatePost";
import NavBar from "../../components/NavBar/NavBar";

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
          console.error(err);
        });
    } else {
      navigate("/");
    }
  }, [token]);

  if(!token) {
    return;
  }

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
    <NavBar userID={userID} handleLogout={handleLogout}/>
      <div className="flex justify-center min-h-screen bg-slate-100 pt-6 pb-10">
        <div>
          <CreatePost token={token} setToken={setToken} />
          <div role="feed">
            {posts.map((post) => (
              <Post
                userID={userID}
                post={post}
                key={post._id}
                token={token}
                setToken={setToken}
                commentOn={true}
                actionButtons={true}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
