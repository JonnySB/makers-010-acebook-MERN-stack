import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPosts } from "../../services/posts";
import { getUserById } from "../../services/users";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import Post from "../../components/Post/Post";
import NavBar from "../../components/NavBar/NavBar";
import CreatePost from "../../components/Post/CreatePost";

import Intro from "../../components/Profile/Intro";

export const ProfilePage = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [profileInfo, setProfileInfo] = useState("");
  const [userID, setUserID] = useState("");
  const { profile_id } = useParams();
  const [profileOwner, setProfileOwner] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getUserById(profile_id, token)
        .then((data) => {
          setProfileInfo(data.user);
          setToken(data.token);
          setUserID(data.user_id);

          if (profile_id === userID) {
            setProfileOwner(true);
          }
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
        });
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

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  }
  console.log(posts);

  return (
    <>
    <NavBar userID={userID} handleLogout={handleLogout}/>
    <div className="bg-slate-100 min-h-screen">
      <ProfileHeader
        profileInfo={profileInfo}
        profileOwner={profileOwner}
        token={token}
        setToken={setToken}
      />
      <div className="md:flex gap-4 md:max-w-screen-lg w-screen mx-auto px-4">
        <div className="flex-auto basis-5/12">
          <Intro
            profileInfo={profileInfo}
            profileOwner={profileOwner}
            token={token}
            setToken={setToken}
          />
          <div className="flex flex-col mx-auto my-3 pt-2 p-4 border shadow-sm rounded-lg bg-white">
            <h1 className="my-2 text-xl text-left font-bold tracking-tight text-gray-900">
              Photos
            </h1>
          </div>

          <div className="flex flex-col mx-auto my-3 pt-2 p-4 border shadow-sm rounded-lg bg-white">
            <h1 className="my-2 text-xl text-left font-bold tracking-tight text-gray-900">
              Friends
            </h1>
          </div>
        </div>
        <div className="flex-auto basis-7/12">
          {profileOwner && <CreatePost token={token} setToken={setToken} />}
          <div className="flex flex-col mx-auto my-3 pt-2 p-4 border shadow-sm rounded-lg bg-white">
            <h1 className="my-2 text-xl text-left font-bold tracking-tight text-gray-900">
              Posts
            </h1>
          </div>
          <div role="feed">
            {posts
              .filter((post) => profile_id === post.owner)
              .map((filteredPost) => (
                <Post
                  userID={userID}
                  post={filteredPost}
                  key={filteredPost._id}
                  token={token}
                  setToken={setToken}
                  commentOn={true}
                  actionButtons={true}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
