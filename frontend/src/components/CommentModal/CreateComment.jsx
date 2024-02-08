import { useState } from "react";
import { createComment } from "../../services/posts";

const CreateComment = (props) => {
  // Updates the text in the body of textarea
  const [comment, setComment] = useState("");
  // Need this to pass the user_id from token generated from user login
  // to backend for authentiation when making requests

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleCreateComment = (event) => {
    event.preventDefault();
    if (comment.trim() === "") {
      console.log("createComments wasn't called");
      console.error("Error: Please write some text in your comment");
      return;
    }
    console.log("createComments was called");

    createComment(props.token, props.post_id, comment)
      .then((data) => {
        props.setToken(data.token);
      })
      .catch((err) => {
        console.error(err);
      });

    setComment("");
  };

  return (
    <div role="createCommentDiv" className="border border-gray-200 bg-gray-50">
      <form onSubmit={handleCreateComment} aria-label="Create New Comment Form">
        <div className="px-4 py-2 bg-white rounded-t-lg">
          <textarea
            name="message"
            value={comment}
            onChange={handleChange}
            rows="2"
            cols="75"
            className="focus:outline-none w-full px-0 text-sm text-gray-900 bg-white resize-none"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <div className="flex justify-end px-3 py-2 border-t">
          <div>
            <button
              role="createCommentSubmitButton"
              type="submit"
              name="submit"
              className="py-2.5 px-4 text-xs font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800"
              aria-label="Submit Comment"
              value="Create Comment"
            >
              Add Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
