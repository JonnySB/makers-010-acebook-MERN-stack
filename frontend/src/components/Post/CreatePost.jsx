import { useState } from "react";
import { createPosts } from "../../services/posts";

const CreatePost = () => {
  // Updates the text in the body of textarea
  const [text, setText] = useState("");
  // Need this to pass the user_id from token generated from user login
  // to backend for authentiation when making requests
  const token = window.localStorage.getItem("token");

  const handleChange = (event) => {
    setText(event.target.value)
  };

  const handleCreatePost = (event) => {
    event.preventDefault();
    createPosts(token, text);
    setText("")
    //We might need to change to change to the following code when implementing Posts with Photos
    // const form = event.target;
    // const formData = new FormData(form);
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson.message)
    // createPosts(token, formJson.message);
  };

  return (
    <form onSubmit={handleCreatePost} aria-label="Create New Post Form">
      <textarea
        rows="5"
        cols="75"
        name="message"
        value={text}
        type="text"
        onChange={handleChange}
        placeholder="Enter your post here..."
      ></textarea>
      <label>
        <input role="submit-button" type="submit" name="submit" value="Create Post" aria-label="Submit Post"></input>
      </label>
    </form>
  );
};

export default CreatePost;
