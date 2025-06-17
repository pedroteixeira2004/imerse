import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/Inicializacao";
import Background from "./background";
import AppLayout2 from "./Layout2";
import ButtonCreateFolder from "./Library/ButtonCreateFolder";

const Library = () => {
  const [folders, setFolders] = useState([]);
  const userId = auth.currentUser?.uid;

  const fetchFolders = async () => {
    if (!userId) return;
    try {
      const libraryRef = collection(db, "users", userId, "library");
      const snapshot = await getDocs(libraryRef);
      const foldersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFolders(foldersData);
    } catch (error) {
      console.error("Erro ao buscar pastas:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [userId]);

  // Passa essa função para o ButtonCreateFolder
  const handleFolderCreated = () => {
    fetchFolders();
  };

  return (
    <div className="text-white font-sf">
      <Background />
      <AppLayout2>
        <div className="text-5xl text-center font-bold w-full m-10">
          Welcome to your library,
        </div>
        <div className="mb-6">
          {/* Passa função para atualizar lista */}
          <ButtonCreateFolder onFolderCreated={handleFolderCreated} />
        </div>

        <div className="mt-6">
          <h3 className="text-3xl mb-4">Suas pastas</h3>
          {folders.length === 0 ? (
            <p>Nenhuma pasta criada ainda.</p>
          ) : (
            <ul className="space-y-3">
              {folders.map((folder) => (
                <li
                  key={folder.id}
                  className="p-4 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
                >
                  {folder.nome}
                </li>
              ))}
            </ul>
          )}
        </div>
      </AppLayout2>
    </div>
  );
};

export default Library;
