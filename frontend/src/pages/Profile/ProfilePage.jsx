import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";

export const ProfilePage = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  return (
    <>
      <h1>username</h1>
    </>
  );
};
