import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/Inicializacao";
import CreateFolderOverlay from "./CreateFolderOverlay";
import create from "../../assets/icones/create_folder.png";
import toast from "react-hot-toast";
import GlassToast from "../GlassToast";

const ButtonCreateFolder = ({ onFolderCreated, isEmpty = false }) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const userId = auth.currentUser?.uid;

  const openOverlay = () => setOverlayOpen(true);
  const closeOverlay = () => setOverlayOpen(false);

  const createFolder = async (folderName) => {
    if (!userId) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      const libraryRef = collection(db, "users", userId, "library");
      await addDoc(libraryRef, {
        nome: folderName,
        criadoEm: new Date(),
        jogos: [], // opcional para guardar jogos
        reports: [], // opcional para guardar reports
      });
      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Folder created with success!"
            type="success"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
      closeOverlay();

      if (onFolderCreated) {
        onFolderCreated(); // atualiza a lista no componente pai
      }
    } catch (error) {
      console.error("Erro ao criar pasta:", error);
      alert("Erro ao criar pasta. Tente novamente.");
    }
  };

  return (
    <div>
      <button
        onClick={openOverlay}
        className={`transition-all duration-300 rounded-2xl flex items-center justify-center ${
          isEmpty
            ? "text-white button-filters p-6 w-44 h-44"
            : "text-white button-filters w-24"
        }`}
      >
        <img
          src={create}
          alt="create folder"
          className={`transition-transform duration-300 ${
            isEmpty ? "w-28 h-28" : "w-12 h-12"
          }`}
        />
      </button>

      <CreateFolderOverlay
        isOpen={isOverlayOpen}
        onClose={closeOverlay}
        onCreate={createFolder}
      />
    </div>
  );
};

export default ButtonCreateFolder;
