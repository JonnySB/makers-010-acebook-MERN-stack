import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPosts } from "../../services/posts";
import { getUserById } from "../../services/users";
import Post from "../../components/Post/Post";

export const ProfilePage = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [profileInfo, setProfileInfo] = useState("");
  const [userID, setUserID] = useState("");
  const { profile_id } = useParams();
  const [profileOwner, setProfileOwner] = useState(false);

  useEffect(() => {
    if (token) {
      getUserById(token, profile_id)
        .then((data) => {
          console.log(data);
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
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      {profileOwner ? (
        <h1>Hi owner, {profileInfo.username}</h1>
      ) : (
        <h1>Hi stranger</h1>
      )}
    </>
  );
};
