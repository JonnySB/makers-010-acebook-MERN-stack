import React from "react";

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
            <div
              className="size-44 bg-cover bg-center border-8 border-white rounded-full overflow-hidden"
              style={{
                backgroundImage: `url(https://i.pinimg.com/originals/e5/3c/6b/e53c6bfa45da3f684fda60c4b21b1307.jpg)`,
              }}
            ></div>
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
