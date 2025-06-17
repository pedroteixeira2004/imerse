import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/Inicializacao";
import Background from "./background";
import AppLayout2 from "./Layout2";
import ButtonCreateFolder from "./Library/ButtonCreateFolder";
import folder_img from "../assets/icones/folder.png";

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
      console.error("Error trying to fetch folders", error);
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
        <div className=" mx-auto px-4">
          {/* Título central */}
          <div className="text-5xl text-center font-bold mb-16 mt-10">
            Welcome to your library,
          </div>

          {/* Grid de pastas e botão */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {folders.length === 0 ? (
              <p className="col-span-full text-center">Your library is empty</p>
            ) : (
              folders.map((folder) => (
                <div key={folder.id} className="w-44 text-center">
                  <button className="h-44 w-44">
                    <img
                      src={folder_img}
                      alt="folder"
                      className="h-44 w-44  transition-transform duration-300 hover:scale-110"
                    />
                  </button>
                  <div className="text-xl font-medium mt-2">{folder.nome}</div>
                </div>
              ))
            )}

            {/* Botão para criar nova pasta */}
            <div className="w-44 flex items-center mb-16 ml-4">
              <ButtonCreateFolder onFolderCreated={handleFolderCreated} />
            </div>
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};

export default Library;
