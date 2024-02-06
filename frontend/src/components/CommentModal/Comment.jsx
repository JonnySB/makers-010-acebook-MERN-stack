import React from "react";

const Comment = (props) => {
  return (
    <>
      <p>{props.message}</p>
      <p>{props.createdAt}</p>
      <p>{props.owner}</p>
    </>
  );
};

export default Comment;
