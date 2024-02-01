import React from "react";
import { postLike } from "../../services/posts";

const Like = (props) => {
  const token = window.localStorage.getItem("token");
  const likes = props.likes.length;

  const handlePostLike = () => {
    postLike(token, props.post_id);
  }

  return (
    <div className="flex justify-start items-center align-middle">
      <button type="button" onClick={handlePostLike} className="">
        <svg className="w-5 h-5 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.9 0 1.4-.5 2.2-1a33.3 33.3 0 0 0 4.5-5.8 1.5 1.5 0 0 1 2 .3 1.6 1.6 0 0 1 .4 1.3L14.7 10M7 11H4v6.5c0 .8.7 1.5 1.5 1.5v0c.8 0 1.5-.7 1.5-1.5V11Zm6.5-1h5l.5.1a1.8 1.8 0 0 1 1 1.4l-.1.9-2.1 6.4c-.3.7-.4 1.2-1.7 1.2-2.3 0-4.8-1-6.7-1.5" />
        </svg>
      </button>
      <span className="ms-2">{likes}</span>
    </div>
  );
}

export default Like;