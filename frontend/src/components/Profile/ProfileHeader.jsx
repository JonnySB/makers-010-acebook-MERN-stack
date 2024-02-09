import React from "react";
import ImageUpload from "./ImageUpload";

const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/dapj3ww2j/image/upload/profile/";

const ProfileHeader = (props) => {
  return (
    <>
      <div className="flex flex-col items-center w-full h-auto bg-gradient-to-b from-gray-400 to-white">
        <div
          className="items-end w-full max-w-[68rem] h-72 bg-center bg-cover rounded-b-xl"
          style={{
            backgroundImage: `url(https://wallpapercave.com/wp/wp7335992.jpg)`,
          }}
        ></div>
      </div>
      <div className="flex flex-col items-center w-full h-auto bg-white drop-shadow-sm">
        <div className="lg:flex items-end w-full max-w-[68rem] h-auto pb-8 ml-24 -mt-20">
          <div className="flex">
            <div className="size-44 border-8 border-white bg-white rounded-full overflow-hidden">
            {props.profileOwner ? (
                <ImageUpload
                  id={props.profileInfo._id}
                  profileImg={props.profileInfo.profileImg}
                  token={props.token}
                  setToken={props.setToken}
                />
              ) : (
                <img className="object-fill" src={props.profileInfo.profileImg} />
              )}
            </div>
            <div className="flex flex-col gap-1 ml-4 self-end">
              <div className="text-4xl font-bold align-bottom">
                {props.profileInfo.firstName} {props.profileInfo.lastName}
              </div>
              <p className="text-md text-gray-500 align-bottom">745 friends</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
