import { useState } from "react";
import { createPosts } from "../../services/posts";

const CreatePost = () => {
  // const [token, setToken] = useState(window.localStorage.getItem("token"));

  // const handleInput [text, setText] = useState("Type your post here...")

  const token = window.localStorage.getItem("token")

  const handleCreatePost = (event) => {
    event.preventDefault();
    const form = event.target
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    createPosts(token, formJson.message);
  };

  return (
    <form onSubmit={handleCreatePost}>
      <textarea rows="5" cols="75" name="message"></textarea>
      <label>
        <input type="submit" name="submit" value="Post"></input>
      </label>
    </form>
  );
};

export default CreatePost;
