import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/Inicializacao";
import Background from "./background";
import AppLayout2 from "./Layout2";
import ButtonCreateFolder from "./Library/ButtonCreateFolder";
import folder_img from "../assets/icones/folder.png";
import useUserData from "./UserData";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const { userData, loading } = useUserData();
  const [folders, setFolders] = useState([]);
  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();

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
  if (loading) return <Loading />;
  if (!userData) return <p>Utilizador não autenticado ou sem dados.</p>;

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
            Welcome to your library {userData.firstName}
          </div>

          {/* Grid de pastas e botão */}
          {folders.length === 0 ? (
            // Estilo quando a biblioteca está vazia
            <div className="flex flex-col items-center justify-center min-h-[60vh] mb-20">
              <div className="text-4xl font-medium mb-10 text-center">
                <p>Your library is empty.</p>
                <p className="text-lg font-medium mt-5 text-center">
                  Create a folder to add games and reports.
                </p>
              </div>
              <ButtonCreateFolder
                onFolderCreated={handleFolderCreated}
                isEmpty
              />
            </div>
          ) : (
            // Biblioteca com pastas
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {folders.map((folder) => (
                <div key={folder.id} className="w-44 text-center">
                  <button
                    onClick={() => navigate(`/library/folder/${folder.id}`)}
                    className="h-44 w-44"
                  >
                    <img
                      src={folder_img}
                      alt="folder"
                      className="h-44 w-44 transition-transform duration-300 hover:scale-110"
                    />
                  </button>
                  <div className="text-xl font-medium">{folder.nome}</div>
                </div>
              ))}
              <div className="w-44 flex items-center mb-7 ml-4">
                <ButtonCreateFolder onFolderCreated={handleFolderCreated} />
              </div>
            </div>
          )}
        </div>
      </AppLayout2>
    </div>
  );
};

export default Library;
