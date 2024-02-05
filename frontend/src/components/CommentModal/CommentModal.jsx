import React, { useState } from "react";
import "./CommentModal.css";

const CommentModal = (props) => {
  const [commentModal, setCommentModal] = useState(false);

  const toggleCommentModal = () => {
    setCommentModal(!commentModal);
  };

  const commentIcon = (
    <svg
      role="commentIcon"
      className="text-blue-700"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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

  const formattedDate = new Date(props.post.createdAt).toLocaleString();
  return (
    <>
      <button onClick={toggleCommentModal} className="btn-modal">
        {commentIcon}
      </button>

      {commentModal && (
        <div className="modal">
          <div className="overlay" onClick={toggleCommentModal}>
            <div className="modal-content pt-2 p-4">
              <div className="flex flex-row">
                <div className="p-4 border rounded-full">Pic</div>
                <div className="flex flex-col justify-center ms-4">
                  <div className="text-sky-500 text-base font-bold">
                    {props.post.user_data[0].username} (
                    {props.post.user_data[0].firstName}{" "}
                    {props.post.user_data[0].lastName})
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {formattedDate}
                  </div>
                </div>
              </div>
              <p role="singlePostContent" className="mt-2 text-sm text-black">
                {props.post.message}
              </p>
              <button className="close-modal" onClick={toggleCommentModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;
