import React, { useState } from "react";

const CreateFolderOverlay = ({ isOpen, onClose, onCreate }) => {
  const [folderName, setFolderName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (folderName.trim() === "") {
      alert("Por favor, insira um nome válido.");
      return;
    }
    onCreate(folderName.trim());
    setFolderName("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 font-sf">
      <div
        className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6 w-1/3 h-80 flex items-center justify-center
      "
      >
        <div>
          <h2 className="text-white text-4xl mb-4 font-bold w-full">
            Create a new folder
          </h2>
          <div>
            <input
              type="text"
              placeholder="Folders name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full p-3 text-white text-lg rounded-full
    bg-white/20 placeholder-white/70
    backdrop-blur-xl border border-white/30
    shadow-md outline-none focus:ring-2 focus:ring-white/50 mt-9"
            />
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onClose}
              className=" px-6 py-2 rounded-full  transition-all duration-300 button-filters font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className=" rounded-full button2 text-white px-6 font-bold"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderOverlay;
