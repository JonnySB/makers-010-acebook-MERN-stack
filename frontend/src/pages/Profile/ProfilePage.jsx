import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPosts } from "../../services/posts";
import { getUserById } from "../../services/users";
import Post from "../../components/Post/Post";
import Intro from "../../components/Profile/Intro";

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
    <div className="bg-slate-100 min-h-screen py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-screen-lg mx-auto px-4">
      <div className="min-w-0 flex-auto">
        <Intro profileInfo={profileInfo} profileOwner={profileOwner} />
      </div>
      <div className="min-w-0 flex-auto">
        <Intro profileInfo={profileInfo} profileOwner={profileOwner}/>
      </div>
    </div>
    </div>
    
  );  
};
