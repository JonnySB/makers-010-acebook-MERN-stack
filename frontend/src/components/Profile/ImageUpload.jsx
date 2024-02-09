import React from "react";
import { uploadImage } from "../../services/images.js";

const ImageUpload = (props) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fileDataURL = await readFile(file);
    uploadImage(fileDataURL, props.id, props.token).then((response) => {
      props.setToken(response.token);
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const imgUpload = document.getElementById("imgUpload");
    imgUpload.click();
  };

  const readFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <div className="hover:brightness-75 cursor-pointer">
      <img
        className="object-fill"
        src={props.profileImg}
        onClick={handleClick}
      />
      <input
        role="input"
        id="imgUpload"
        type="file"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
