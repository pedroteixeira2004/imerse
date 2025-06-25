import React from "react";
import folder_img from "../assets/icones/folder.png";

const OverlayPastas = ({
  folders,
  selectedFolderId,
  onSelect,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center font-sf">
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-white p-8 w-full max-w-3xl relative">
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-4xl font-bold mb-2 text-center">Select a folder</h2>
        <p className="text-2xl text-center font-medium mb-6">
          Select a folder to add the game to
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => onSelect(folder.id)}
              className={`
        cursor-pointer p-3 rounded-xl border-2 transition-all
        ${
          selectedFolderId === folder.id
            ? "border-white bg-white/10"
            : "border-white/20 hover:bg-gradient-to-br hover:from-white/25 hover:to-white/10 hover:border-white/50 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2)]"
        }
      `}
            >
              <img
                src={folder_img}
                alt="folder"
                className="h-20 w-20 mx-auto mb-2"
              />
              <p className="text-center font-semibold">{folder.nome}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            disabled={!selectedFolderId}
            className="px-6 py-2 button2 font-bold font-sf text-white rounded-full disabled:opacity-50"
          >
            Add game
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlayPastas;
