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
      <button onClick={toggleCommentModal} className="btn-modal">
        {commentIcon}
      </button>

      {commentModal && (
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            {/* Overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
            </div>

            {/* Modal Panel */}
            <div className="h-75vh w-full md:w-5/6 bg-white rounded-lg text-left transform">
              {/* Modal Content */}
              <div className="overflow-y-auto">
                <div className="pt-2 p-4">
                  {/* Post Component */}
                  <Post
                    userID={props.userID}
                    post={props.post}
                    key={props.post._id}
                    token={props.token}
                    setToken={props.setToken}
                    commentModal={commentModal}
                    commentOn={false}
                  />
                  {/* Comments */}
                  <div
                    className="comments "
                    onScroll={(e) => {
                      document.querySelector(".post-container").scrollTop =
                        e.target.scrollTop;
                    }}
                  >
                    {props.post.comments.map((comment, index) => (
                      <Comment
                        key={index}
                        message={comment.message}
                        createdAt={comment.createdAt}
                        owner={comment.owner}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Comments Box */}
              <div className="bg-gray-200 px-4 py-2 sticky bottom-0">
                <CreateComment
                  token={props.token}
                  setToken={props.setToken}
                  post_id={props.post._id}
                />
              </div>
              {/* Close Button */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button className="close-modal" onClick={toggleCommentModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;
