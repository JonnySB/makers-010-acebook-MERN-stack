import { useState } from "react";
import { createPosts } from "../../services/posts";

const CreatePost = (props) => {
  // Updates the text in the body of textarea
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleCreatePost = (event) => {
    event.preventDefault();
    // TODO:
    // The below check won't be called <textarea> has attribute "required". 
    // This makes it hard to test and so can only test that the function wasn't called.
    // The tooltip popup is from the browser and won't appear in the DOM
    // Need to have a further think about validation on front end
    if (!text.trim()) {
      console.log("createPosts wasn't called")
      console.error("Error: Please write some text in your post");
      return;
    }

    createPosts(props.token, text)
      .then((data) => {
        props.setToken(data.token);
      })
      .catch((err) => {
        console.error(err);
      });

    setText("");
    //We might need to change to change to the following code when implementing Posts with Photos
    // const form = event.target;
    // const formData = new FormData(form);
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson.message)
    // createPosts(token, formJson.message);
  };

  return (
    <div
      role="createPostDiv"
      className="my-3 pt-2 pb-0 p-4 border shadow-sm rounded-lg bg-white border border-gray-200"
    >
      <form onSubmit={handleCreatePost} aria-label="Create New Post Form">
        <div className="px-2 py-2 bg-white rounded-t-lg">
          <textarea
            name="message"
            value={text}
            onChange={handleChange}
            rows="4"
            cols="75"
            className="focus:outline-none w-full px-0 text-md text-gray-900 bg-white resize-none"
            placeholder="Write a post..."
            required
          ></textarea>
        </div>
        <div className="flex justify-end px-2 py-4 bg-white border-t">
          <div>
            <button
              role="createPostSubmitButton"
              type="submit"
              name="submit"
              className="py-2.5 px-4 text-md font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800"
              aria-label="Submit Post"
              value="Create Post"
            >
              Create Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
