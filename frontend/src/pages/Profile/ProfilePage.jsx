import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import NavBar from "../Nabvar/NavBar";

export const ProfilePage = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  return (
    <>
    <NavBar />
      <h1>username</h1>
    </>
  );
};
