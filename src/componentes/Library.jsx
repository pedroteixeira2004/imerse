import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/Inicializacao";
import Background from "./background";
import AppLayout2 from "./Layout2";
import ButtonCreateFolder from "./Library/ButtonCreateFolder";
import folder_img from "../assets/icones/folder.png";
import useUserData from "./UserData";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import FolderEditControls from "./Library/FolderEditControls";
import RenameFolderModal from "./RenameFolderModal";
import ConfirmDelete from "./Library/ConfirmDelete";
import toast from "react-hot-toast";
import GlassToast from "./GlassToast";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const Library = () => {
  const { userData, loading } = useUserData();
  const [folders, setFolders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [folderToRename, setFolderToRename] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);

  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();

  const fetchFolders = async () => {
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
  if (!userData) return <p>User not found or with no data</p>;

  const handleFolderCreated = () => {
    fetchFolders();
  };

  // Abre modal de renomear
  const openRenameModal = (folder) => {
    setFolderToRename(folder);
    setIsRenameModalOpen(true);
  };

  const closeRenameModal = () => {
    setIsRenameModalOpen(false);
    setFolderToRename(null);
  };

  const saveRename = async (newName) => {
    if (!userId || !folderToRename) return;
    try {
      await updateDoc(doc(db, "users", userId, "library", folderToRename.id), {
        nome: newName,
      });
      fetchFolders();
      closeRenameModal();
    } catch (error) {
      console.error("Erro ao renomear pasta:", error);
    }
  };

  // Abre modal de confirmação para deletar
  const openDeleteModal = (folder) => {
    setFolderToDelete(folder);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setFolderToDelete(null);
  };

  // Função que de fato apaga a pasta após confirmação
  const confirmDelete = async () => {
    if (!userId || !folderToDelete) return;
    try {
      await deleteDoc(doc(db, "users", userId, "library", folderToDelete.id));
      fetchFolders();
      closeDeleteModal();

      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Folder deleted successfully"
            type="success"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
    } catch (error) {
      console.error("Erro ao deletar pasta:", error);
    }
  };

  return (
    <div className="text-white font-sf">
      <Background />
      <AppLayout2>
        <div className="mx-auto px-4">
          <div className="text-5xl text-center font-bold mb-16 mt-10">
            Welcome to your library {userData.firstName}
          </div>

          {folders.length === 0 ? (
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
            <>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="group flex items-center rounded-full px-6 py-2
      border border-white/30 backdrop-blur-[15px]
      bg-gradient-to-br from-white/15 to-white/5 text-white font-bold
      transition-all duration-300
      hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
                >
                  {isEditing ? (
                    <FaCheckCircle size={20} />
                  ) : (
                    <FaEdit size={20} />
                  )}
                  <span
                    className={`ml-0 max-w-0 overflow-hidden opacity-0 
        transition-all duration-300 whitespace-nowrap
        ${
          isEditing
            ? "opacity-100 ml-3 max-w-[150px]"
            : "group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[150px]"
        }`}
                  >
                    {isEditing ? "Done" : "Edit folders"}
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {folders.map((folder) => (
                  <div key={folder.id} className="w-44 text-center relative">
                    <button
                      onClick={() => navigate(`/library/folder/${folder.id}`)}
                      className="h-44 w-44"
                      disabled={isEditing}
                    >
                      <img
                        src={folder_img}
                        alt="folder"
                        className={`h-44 w-44 transition-transform duration-300 ${
                          !isEditing && "hover:scale-110"
                        }`}
                      />
                    </button>
                    <div className="text-xl font-medium mt-2">
                      {folder.nome}
                    </div>

                    {isEditing && (
                      <FolderEditControls
                        folderId={folder.id}
                        onDelete={() => openDeleteModal(folder)} // Abre modal confirmação delete
                        onRename={() => openRenameModal(folder)}
                      />
                    )}
                  </div>
                ))}

                <div className="w-44 flex items-center mb-7 ml-4">
                  <ButtonCreateFolder onFolderCreated={handleFolderCreated} />
                </div>
              </div>
            </>
          )}
        </div>
      </AppLayout2>

      {/* Modal de renomear */}
      <RenameFolderModal
        isOpen={isRenameModalOpen}
        onClose={closeRenameModal}
        onSave={saveRename}
        initialName={folderToRename?.nome}
      />

      {/* Modal de confirmação para deletar */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
        title="Delete folder?"
        message="Are you sure you want to delete this folder?"
      />
    </div>
  );
};

export default Library;
