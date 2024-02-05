import React, { useState } from "react";
import "./CommentModal.css";

const CommentModal = (props) => {
  const [commentModal, setCommentModal] = useState(false);

  const toggleCommentModal = () => {
    setCommentModal(!commentModal);
  };

  const formattedDate = new Date(props.post.createdAt).toLocaleString();
  return (
    <>
      <button onClick={toggleCommentModal} className="btn-modal">
        comments
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
