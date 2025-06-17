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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-80">
        <h2 className="text-white text-xl mb-4">Nova Pasta</h2>
        <input
          type="text"
          placeholder="Nome da pasta"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full p-2 rounded text-black"
        />
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 text-white"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderOverlay;
