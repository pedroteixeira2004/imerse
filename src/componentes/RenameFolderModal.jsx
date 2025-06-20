import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import GlassToast from "./GlassToast";

const RenameFolderModal = ({ isOpen, onClose, onSave, initialName }) => {
  const [newName, setNewName] = useState(initialName || "");

  useEffect(() => {
    setNewName(initialName || "");
  }, [initialName]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (newName.trim() === "") {
      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message={`Please enter a new name for the folder`}
            type="warning"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
      return;
    }

    onSave(newName.trim()); // Executa lógica externa (como updateDoc)
    toast.custom(
      (t) => (
        <GlassToast
          t={t}
          message={`Folder renamed successfully!`}
          type="success"
        />
      ),
      { duration: 3000, position: "top-center" }
    );

    onClose(); // Fecha o modal após salvar
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 font-sf">
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6 w-1/3 h-80 flex items-center justify-center">
        <div className="w-full">
          <h2 className="text-white text-4xl mb-4 font-bold text-center">
            Rename folder
          </h2>

          <input
            type="text"
            placeholder="New folder name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-3 text-white text-lg rounded-full
              bg-white/20 placeholder-white/70
              backdrop-blur-xl border border-white/30
              shadow-md outline-none focus:ring-2 focus:ring-white/50 mt-9"
          />

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full transition-all duration-300 button-filters font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-full button2 text-white px-6 font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenameFolderModal;
