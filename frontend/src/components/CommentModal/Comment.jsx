import React from "react";
import "./CommentModal.css";

const Comment = (props) => {
  const createdAt = new Date(props.createdAt);

  // Get the hours, minutes, day, month, and year from the createdAt date
  const hours = createdAt.getHours().toString().padStart(2, "0");
  const minutes = createdAt.getMinutes().toString().padStart(2, "0");
  const day = createdAt.getDate().toString().padStart(2, "0");
  const month = (createdAt.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const year = createdAt.getFullYear().toString().slice(-2); // Get last two digits of the year

  // Construct the formatted date string
  const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

  // Preserve nulls is used when grouping data in the post controller for the
  // getAllPosts method. Hence, Posts that have no comments are sucessfully
  // presevered but will have an single empty entry in their comments array.
  // The following hadComment conditional rendering stops these null comments
  // from apearing on the comments modal.
  const hasComment = props.owner_firstName.length != 0;
  console.log(hasComment);

  return (
    <>
      {hasComment && (
        <div class="flex items-start gap-2.5 bottom-margin">
          <img
            class="w-8 h-8 rounded-full"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="Jese image"
          />
          <div class="flex flex-col gap-1 w-full max-w-[320px]">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">
                {props.owner_username} ({props.owner_firstName}{" "}
                {props.owner_lastName})
              </span>
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                {formattedDate}
              </span>
            </div>
            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p class="text-sm font-normal text-gray-900 dark:text-white">
                {" "}
                {props.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
