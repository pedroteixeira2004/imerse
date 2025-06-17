import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/Inicializacao";
import CreateFolderOverlay from "./CreateFolderOverlay";

const ButtonCreateFolder = ({ onFolderCreated }) => {
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
      alert(`Pasta "${folderName}" criada com sucesso!`);
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        Criar nova pasta
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
