import React from "react";
import { uploadImage } from "../../services/images.js";

const ImageUpload = (props) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fileDataURL = await readFile(file);
    uploadImage(fileDataURL, props.id);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const imgUpload = document.getElementById("imgUpload");
    imgUpload.click();
  }

  const readFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return (
    <>
      <input role="input" id="imgUpload" type="file" onChange={handleChange} className="hidden" />
      <label role="label" onClick={handleClick}>
        <svg role="svg" className="w-6 h-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8c0-.6.4-1 1-1h1.5l1.7-1.7c.2-.2.4-.3.7-.3h6.2c.3 0 .5.1.7.3L17.5 7H19c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Z" />
          <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </label>
    </>
  );
};


export default ImageUpload;