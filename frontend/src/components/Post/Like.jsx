import React from "react";
import { postLike } from "../../services/posts";
import { postUnlike } from "../../services/posts";

const Like = (props) => {
  const likes = props.likes.length;
  //will have to implment way to get user_id or change the way likes are stored
  //change it to your own user id to test
  const user_id = "65ba6cdcfa8cb44a4fe4cc40"

  var postLiked = false;
  var iconNotLikedSVG =
    <svg className="w-5 h-5 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.9 0 1.4-.5 2.2-1a33.3 33.3 0 0 0 4.5-5.8 1.5 1.5 0 0 1 2 .3 1.6 1.6 0 0 1 .4 1.3L14.7 10M7 11H4v6.5c0 .8.7 1.5 1.5 1.5v0c.8 0 1.5-.7 1.5-1.5V11Zm6.5-1h5l.5.1a1.8 1.8 0 0 1 1 1.4l-.1.9-2.1 6.4c-.3.7-.4 1.2-1.7 1.2-2.3 0-4.8-1-6.7-1.5" />
    </svg>;

  var iconLikedSVG =
    <svg className="w-5 h-5 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 22">
      <path fillRule="evenodd" d="M15 9.7h4a2 2 0 0 1 1.6.9 2 2 0 0 1 .3 1.8l-2.4 7.2c-.3.9-.5 1.4-1.9 1.4-2 0-4.2-.7-6.1-1.3L9 19.3V9.5A32 32 0 0 0 13.2 4c.1-.4.5-.7.9-.9h1.2c.4.1.7.4 1 .7l.2 1.3L15 9.7ZM4.2 10H7v8a2 2 0 1 1-4 0v-6.8c0-.7.5-1.2 1.2-1.2Z" clipRule="evenodd" />;
    </svg>;

  var iconSVG = iconNotLikedSVG;

  if (props.likes.find((element) => element === user_id)) {
    postLiked = true;
    iconSVG = iconLikedSVG;

  }

  const handlePostLike = () => {
    if (!postLiked) {
      postLike(props.token, props.post_id)
        .then((data) => {
          props.setToken(data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    }
    else {
      postUnlike(props.token, props.post_id)
        .then((data) => {
          props.setToken(data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    }
  }


  return (
    <div className="flex justify-start items-center align-middle">
      <button type="button" onClick={handlePostLike} className="">
        {iconSVG}
      </button>
      <span className="ms-2">{likes}</span>
    </div>
  );
}

export default Like;