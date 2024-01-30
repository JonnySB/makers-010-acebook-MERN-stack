import { createPosts } from "../../services/posts";

const CreatePost = (props) => {
 
  const handleCreatePost = (event) => {
    event.preventDefault();
    const form = event.target
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    createPosts(props.token, formJson.content);
  };

  return (
    <form onSubmit={handleCreatePost} method="POST">
      <textarea rows="5" cols="75" name="content"></textarea>
      <label>
        <input type="submit" name="submit" value="Post"></input>
      </label>
    </form>
  );
};

export default CreatePost;
