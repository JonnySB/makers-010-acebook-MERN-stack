import { useState } from "react";

const Intro = (props) => {
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleBioSubmit = () => {
    setNewBio("");
    setEditingBio(false);
  };

  return (
    <div class="flex flex-col items-center mx-auto pt-2 p-4 border shadow-sm rounded-lg bg-white">
      <div>
        <h1 class="mt-2 text-2xl font-bold tracking-tight text-gray-900">
          Intro
        </h1>
      </div>
      <div className="w-full">
        {props.profileOwner && !props.profileInfo.bio ? (
          <div className="flex justify-center">
            {editingBio ? (
              <div>
                <input
                  type="text"
                  value={newBio}
                  onChange={handleBioChange}
                  placeholder="Type your bio here"
                />
                <button onClick={handleBioSubmit}>Submit</button>
              </div>
            ) : (
              <div>
                <button onClick={() => setEditingBio(true)} className="wfull">
                  Add Bio
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>{props.profileInfo.bio}</p>
        )}
      </div>
    </div>
  );
};

export default Intro;
