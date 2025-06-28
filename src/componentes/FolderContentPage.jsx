import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebase/Inicializacao";
import AppLayout2 from "./Layout2";
import Background from "./background";
import FolderGameCard from "./FolderGameCard";
import Loading from "./Loading";
import BackButton from "./BackButton";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDelete from "./Library/ConfirmDelete";
import { FaCheckCircle } from "react-icons/fa";
import ReportCard from "./Reports/ReportCard";
import toast from "react-hot-toast";
import GlassToast from "./GlassToast";

const FolderContentPage = () => {
  const { folderId } = useParams();
  const [folderData, setFolderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [gameToDeleteIndex, setGameToDeleteIndex] = useState(null); // índice do jogo a deletar
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [purchasedReports, setPurchasedReports] = useState([]);
  const [reportToDeleteIndex, setReportToDeleteIndex] = useState(null);

  const userId = auth.currentUser?.uid;

  const fetchFolderContent = async () => {
    try {
      const folderRef = doc(db, "users", userId, "library", folderId);
      const folderSnap = await getDoc(folderRef);

      if (folderSnap.exists()) {
        setFolderData(folderSnap.data());
      } else {
        console.error("Folder not found");
        setFolderData(null);
      }
    } catch (error) {
      console.error("Error while fetching folder content:", error);
      setFolderData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolderContent();
  }, [folderId]);
  useEffect(() => {
    const fetchPurchasedReports = async () => {
      if (!userId) return;

      try {
        const purchasedRef = collection(
          db,
          "users",
          userId,
          "purchased_reports"
        );
        const snapshot = await getDocs(purchasedRef);

        let allPurchasedIds = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (Array.isArray(data.reports)) {
            const ids = data.reports.map((r) => r.id);
            allPurchasedIds.push(...ids);
          }
        });

        setPurchasedReports(allPurchasedIds);
      } catch (error) {
        console.error("Erro ao buscar reports comprados:", error);
      }
    };

    fetchPurchasedReports();
  }, [userId]);

  const handleRequestDelete = (index, type) => {
    if (type === "game") {
      setGameToDeleteIndex(index);
    } else if (type === "report") {
      setReportToDeleteIndex(index);
    }
    setConfirmOpen(true);
  };
  const handleConfirmDelete = () => {
    if (gameToDeleteIndex !== null) {
      deleteGame(gameToDeleteIndex);
      setGameToDeleteIndex(null);
    }

    if (reportToDeleteIndex !== null) {
      deleteReport(reportToDeleteIndex);
      setReportToDeleteIndex(null);
    }

    setConfirmOpen(false);
  };

  // Cancelar exclusão
  const handleCancelDelete = () => {
    setGameToDeleteIndex(null);
    setReportToDeleteIndex(null);
    setConfirmOpen(false);
  };
  // Deleta o jogo do array e atualiza Firestore e estado local
  const deleteGame = async (gameIndex) => {
    if (!userId || !folderId || !folderData) return;

    try {
      // Remove o jogo do array local
      const updatedGames = [...folderData.jogos];
      updatedGames.splice(gameIndex, 1);

      // Atualiza o Firestore com o novo array de jogos
      const folderRef = doc(db, "users", userId, "library", folderId);
      await updateDoc(folderRef, { jogos: updatedGames });

      // Atualiza estado local para re-renderizar
      setFolderData((prev) => ({ ...prev, jogos: updatedGames }));
      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Game removed from the folder"
            type="error"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
    } catch (error) {
      console.error("Error while deleting game", error);
    }
  };
  const deleteReport = async (reportIndex) => {
    if (!userId || !folderId || !folderData) return;

    try {
      const updatedReports = [...(folderData.reports || [])];
      updatedReports.splice(reportIndex, 1);

      const folderRef = doc(db, "users", userId, "library", folderId);
      await updateDoc(folderRef, { reports: updatedReports });

      setFolderData((prev) => ({ ...prev, reports: updatedReports }));
      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Report removed from folder."
            type="error"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
    } catch (error) {
      console.error("Erro ao deletar report:", error);
    }
  };

  if (loading) return <Loading />;
  if (!folderData)
    return <p>Error while loading folder content or folder inexistent</p>;

  return (
    <div className="text-white font-sf">
      <Background />
      <AppLayout2>
        <div className="mx-auto m-10">
          <div className="mb-10 flex items-center justify-center space-x-4">
            <BackButton />
            <div className="text-5xl font-bold">{folderData.nome}</div>
          </div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="group flex items-center rounded-full px-6 py-2
                border border-white/30 backdrop-blur-[15px]
                bg-gradient-to-br from-white/15 to-white/5 text-white font-bold
                transition-all duration-300
                hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
            >
              {isEditing ? <FaCheckCircle size={20} /> : <FaEdit size={20} />}
              <span
                className={`ml-0 max-w-0 overflow-hidden opacity-0 
                transition-all duration-300 whitespace-nowrap
                ${
                  isEditing
                    ? "opacity-100 ml-3 max-w-[150px]"
                    : "group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[150px]"
                }`}
              >
                {isEditing ? "Done" : "Edit content"}
              </span>
            </button>
          </div>

          {/* Se houver jogos */}
          {folderData.jogos?.length > 0 && (
            <div>
              <h2 className="text-4xl font-semibold mb-6">Games</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {folderData.jogos.map((game, index) => (
                  <div key={index} className="relative">
                    {/* Seu componente, aqui adaptado para aceitar children */}
                    <FolderGameCard game={game} />
                    {isEditing && (
                      <button
                        onClick={() => handleRequestDelete(index, "game")}
                        className="absolute top-2 right-2 button2 p-2 rounded-full transition-shadow shadow-white"
                        title="Delete game"
                      >
                        <FaTrash size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Se houver reports */}
          {folderData.reports?.length > 0 && (
            <div className="mt-16">
              <h2 className="text-4xl font-semibold mb-6">Reports</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {folderData.reports.map((report, index) => (
                  <div key={index} className="relative">
                    <ReportCard
                      report={report}
                      purchasedReports={purchasedReports}
                    />
                    {isEditing && (
                      <button
                        onClick={() => handleRequestDelete(index, "report")}
                        className="absolute top-2 right-2 button2 p-2 rounded-full transition-shadow shadow-white"
                        title="Delete report"
                      >
                        <FaTrash size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {folderData.reports?.length === 0 &&
            folderData.jogos?.length === 0 && (
              <div className="flex justify-center items-center h-[50vh]">
                <p className="text-4xl text-center max-w-1xl font-medium">
                  This folder is empty. Search for games and reports to add
                  content here.
                </p>
              </div>
            )}
          <ConfirmDelete
            isOpen={confirmOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            title={
              gameToDeleteIndex !== null ? "Delete game?" : "Delete report?"
            }
            message={
              gameToDeleteIndex !== null
                ? "Are you sure you want to delete this game from the folder?"
                : "Are you sure you want to delete this report from the folder?"
            }
          />
        </div>
      </AppLayout2>
    </div>
  );
};

export default FolderContentPage;
