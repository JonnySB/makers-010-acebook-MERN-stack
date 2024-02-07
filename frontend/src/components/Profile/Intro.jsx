import { useState } from "react";
import birthdayIcon from "../../assets/birthdayIcon.svg";
import educationIcon from "../../assets/educationIcon.svg";
import workplaceIcon from "../../assets/workplaceIcon.svg";
import currentLocationIcon from "../../assets/currentLocationIcon.svg";
import IntroItem from "./IntroItem";

const Intro = (props) => {
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleBioSave = () => {
    //service stuff for update Bio
    setNewBio("");
    setEditingBio(false);
  };

  const handleBioCancel = () => {
    setNewBio("");
    setEditingBio(false);
  };

  return (
    <div class="flex flex-col mx-auto pt-2 p-4 border shadow-sm rounded-lg bg-white">
      <div>
        <h1 class="my-2 text-xl text-left font-bold tracking-tight text-gray-900">
          Intro
        </h1>
      </div>
      <div className="w-full">
        {props.profileOwner && !props.profileInfo.bio ? (
          <div className="flex flex-col gap-2">
            {editingBio ? (
              <>
                <div className="flex">
                  <textarea
                    rows="3"
                    className="w-full text-center text-md border border-gray-300 bg-gray-100 rounded-md py-2 focus:border-blue-500 placeholder:text-gray-500"
                    type="text"
                    value={newBio}
                    onChange={handleBioChange}
                    placeholder="Describe who you are"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="w-fit p-2 hover:bg-gray-300 justify-center text-center font-medium rounded-md bg-gray-200"
                    onClick={handleBioCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-fit p-2 hover:bg-gray-300 justify-center text-center font-medium rounded-md bg-gray-200"
                    onClick={handleBioSave}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <div className="py-2">
                <button
                  className="w-full py-1 hover:bg-gray-300 justify-center text-center font-medium rounded-md bg-gray-200"
                  onClick={() => setEditingBio(true)}
                >
                  Add Bio
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>{props.profileInfo.bio}</p>
        )}
      </div>
      <div>
        <IntroItem
          icon={birthdayIcon}
          label="Born on"
          value={props.profileInfo.dob}
        />
        <IntroItem
          icon={educationIcon}
          label="Studies at"
          value={props.profileInfo.education}
        />
        <IntroItem
          icon={workplaceIcon}
          label="Works at"
          value={props.profileInfo.workplace}
        />
        <IntroItem
          icon={currentLocationIcon}
          label="Lives in"
          value={props.profileInfo.currentLocation}
        />
      </div>
      <div className="py-2">
        {props.profileOwner ? (
          <button className="w-full py-1 hover:bg-gray-300 justify-center text-center font-medium rounded-md bg-gray-200">
            Edit details
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Intro;
