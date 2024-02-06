import { useState } from "react";

const Intro = (props) => {
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState('');

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const handleBioSubmit = () => {
    setNewBio('');
    setEditingBio(false);
  };

  return (
    <div class="flex mx-auto pt-2 p-4 border shadow-sm rounded-lg bg-white">
      <div>
        <p class="mt-2 text-2xl font-bold tracking-tight text-gray-900">
          Intro
        </p>
      </div>
      <div>
        {props.profileOwner && !props.profileInfo.bio ? (
          <div>
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
              <button onClick={() => setEditingBio(true)}>Add Bio</button>
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
