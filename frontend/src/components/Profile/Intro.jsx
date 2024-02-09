import { useState } from "react";
import birthdayIcon from "../../assets/birthdayIcon.svg";
import educationIcon from "../../assets/educationIcon.svg";
import workplaceIcon from "../../assets/workplaceIcon.svg";
import currentLocationIcon from "../../assets/currentLocationIcon.svg";
import IntroItem from "./IntroItem";

import {
  updateBio,
  updateCurrentLocation,
  updateWorkplace,
  updateEducation,
} from "../../services/users";

const Intro = ({ profileInfo, profileOwner, token, setToken }) => {
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleBioSave = (event) => {
    event.preventDefault();
    try {
      updateBio(newBio, token)
        .then((data) => {
          setToken(data.token);
        })
        .then(() => {
          setNewBio(profileInfo.bio);
        })
        .then(() => {
          setEditingBio(false);
        });
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const handleBioCancel = () => {
    setNewBio(profileInfo.bio);
    setEditingBio(false);
  };

  return (
    <div className="flex flex-col mx-auto my-3 pt-2 p-4 border shadow-sm rounded-lg bg-white">
      <div>
        <h1 className="my-2 text-xl text-left font-bold tracking-tight text-gray-900">
          Intro
        </h1>
      </div>
      <div className="w-full">
        {/* If the profile belongs to the owner but their Bio is empty, show next line.*/}
        {profileOwner && !profileInfo.bio && (
          <div className="flex flex-col gap-2">
            {/* If the user isn't editing the bio, show line 71 */}
            {editingBio ? (
              <>
                <div className="flex">
                  <textarea
                    rows="3"
                    className="w-full text-center text-md border border-gray-300 bg-gray-100 rounded-md py-2 focus:border-blue-500 placeholder:text-gray-500"
                    type="text"
                    onChange={handleBioChange}
                    placeholder="Describe who you are"
                    // Can't test the value inside the text area without below code
                    // value={newBio}
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
                  aria-label="Add Bio"
                  aria-expanded={editingBio}
                  className="w-full py-1 hover:bg-gray-300 justify-center text-center font-medium rounded-md bg-gray-200"
                  onClick={() => setEditingBio(true)}
                >
                  Add Bio
                </button>
              </div>
            )}
          </div>
        )}{" "}
        {profileOwner && profileInfo.bio && (
          <div className="flex flex-col gap-2 py-2">
            {editingBio ? (
              <>
                <div className="flex">
                  <textarea
                    rows="3"
                    className="w-full text-center text-md border border-gray-300 bg-gray-100 rounded-md py-2 focus:border-blue-500 placeholder:text-gray-500"
                    type="text"
                    onChange={handleBioChange}
                    placeholder="Describe who you are"
                  >
                    {profileInfo.bio}
                  </textarea>
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
              <>
                <p className="text-center">{profileInfo.bio}</p>
                <button
                  className="w-full py-1 hover:bg-gray-300 justify-center text-center font-medium rounded-md bg-gray-200"
                  onClick={() => setEditingBio(true)}
                >
                  Edit Bio
                </button>
              </>
            )}
          </div>
        )}
        {!profileOwner && profileInfo.bio && (
          <div className="flex flex-col gap-2 py-2">
            <p className="text-center">{profileInfo.bio}</p>
          </div>
        )}
      </div>
      <div>
        <IntroItem
          icon={birthdayIcon}
          label="Born on"
          value={profileInfo.dob}
          aria-labelledby="born-on-label"
          role="listitem"
        />
        <IntroItem
          icon={educationIcon}
          label="Studies at"
          value={profileInfo.education}
          aria-labelledby="studies-label"
          role="listitem"
        />
        <IntroItem
          icon={workplaceIcon}
          label="Works at"
          value={profileInfo.workplace}
          aria-labelledby="workplace-label"
          role="listitem"
        />
        <IntroItem
          icon={currentLocationIcon}
          label="Lives in"
          value={profileInfo.currentLocation}
          aria-labelledby="lives-in-label"
          role="listitem"
        />
      </div>
      <div className="py-2">
        {profileOwner ? (
          <button className="w-full py-1 hover:bg-gray-300 justify-center text-center font-medium rounded-md bg-gray-200">
            Edit details
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Intro;
