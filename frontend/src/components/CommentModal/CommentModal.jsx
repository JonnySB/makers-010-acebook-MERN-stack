import React, { useState } from "react";
import "./CommentModal.css";
import CreateComment from "./CreateComment";
import Post from "../Post/Post.jsx";
import Comment from "./Comment";

const CommentModal = (props) => {
  const [commentModal, setCommentModal] = useState(false);

  const toggleCommentModal = () => {
    if (props.commentOn) setCommentModal(!commentModal);
  };

  const commentIcon = (
    <svg
      role="commentIcon"
      className="text-blue-700"
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );

  return (
    <>
      <button
        role="modalBtn"
        onClick={toggleCommentModal}
        className="btn-modal"
      >
        {commentIcon}
      </button>

      {commentModal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content pt-2 p-4">
              <button className="close-modal fixed top-0 right-0" onClick={toggleCommentModal}>
                Close
              </button>
              <div className="comments-scroll">
                <Post
                  userID={props.userID}
                  post={props.post}
                  key={props.post._id}
                  token={props.token}
                  setToken={props.setToken}
                  commentModal={commentModal}
                  commentOn={false}
                  actionButtons={false}
                />
                <div className="comments">
                  {console.log(props.post)}
                  {props.post.comments.toReversed().map((comment) => {
                    return (
                      <Comment
                        message={comment.message}
                        createdAt={comment.createdAt}
                        owner={comment.owner}
                        owner_firstName={comment.owner_firstName}
                        owner_lastName={comment.owner_lastName}
                        owner_username={comment.owner_username}
                      />
                    );
                  })}
                </div>
              </div>
              <CreateComment
                token={props.token}
                setToken={props.setToken}
                post_id={props.post._id}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;
