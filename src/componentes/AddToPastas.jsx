import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/Inicializacao";
import AddLibraryButton from "./AddLibraryButton";
import OverlayPastas from "./OverlayPastas";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GlassToast from "./GlassToast";

const AddToPastas = ({ game, report }) => {
  const isGame = !!game;
  const content = game || report;
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addedFolderId, setAddedFolderId] = useState(null);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchFolders = async () => {
      if (!userId || !content?.id) return;

      const libraryRef = collection(db, "users", userId, "library");
      const snapshot = await getDocs(libraryRef);
      const foldersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFolders(foldersData);

      const folderWithItem = foldersData.find((folder) => {
        const arr = isGame ? folder.jogos : folder.reports;
        return (arr || []).some((i) => i.id === content.id);
      });

      setAddedFolderId(folderWithItem?.id || null);
    };

    fetchFolders();
  }, [userId, content?.id]);

  const handleAdd = async () => {
    if (!selectedFolderId || !userId) return;

    const folderRef = doc(db, "users", userId, "library", selectedFolderId);
    const selectedFolder = folders.find((f) => f.id === selectedFolderId);
    const existingItems = isGame
      ? selectedFolder?.jogos || []
      : selectedFolder?.reports || [];

    const newItem = isGame
      ? {
          id: game.id,
          name: game.name,
          background: game.background_raw || "",
          year: game.year || "",
          type: game.typeGame || "",
          reviewScore: game.reviewSummary?.review_score_desc || "No reviews",
          description: game.description,
          addedAt: new Date().toISOString(),
        }
      : {
          id: report.id,
          title: report.title,
          year: report.year,
          description: report.description,
          link: report.link,
          price: report.price,
          included: report.included,
          image: report.image,
          addedAt: new Date().toISOString(),
        };

    const updateField = isGame ? "jogos" : "reports";

    await updateDoc(folderRef, {
      [updateField]: [...existingItems, newItem],
    });

    setAddedFolderId(selectedFolderId);
    setSelectedFolderId(null);

    toast.custom(
      (t) => (
        <GlassToast
          t={t}
          message={`${isGame ? "Game" : "Report"} added to folder "${
            selectedFolder?.nome
          }"`}
          type="success"
        />
      ),
      { duration: 3000, position: "top-center" }
    );

    setIsOpen(false);
  };

  const handleRemove = async () => {
    if (!userId || !addedFolderId) return;

    const folderRef = doc(db, "users", userId, "library", addedFolderId);
    const folder = folders.find((f) => f.id === addedFolderId);
    const currentItems = isGame ? folder?.jogos || [] : folder?.reports || [];

    const updatedItems = currentItems.filter((i) => i.id !== content.id);
    const updateField = isGame ? "jogos" : "reports";

    await updateDoc(folderRef, { [updateField]: updatedItems });

    setAddedFolderId(null);

    toast.custom(
      (t) => (
        <GlassToast
          t={t}
          message={`${isGame ? "Game" : "Report"} removed from folder "${
            folder?.nome
          }"`}
          type="error"
        />
      ),
      { duration: 3000, position: "top-center" }
    );
  };

  const handleButtonClick = () => {
    if (addedFolderId) {
      handleRemove();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <AddLibraryButton isAdded={!!addedFolderId} onClick={handleButtonClick} />
      {isOpen && (
        <OverlayPastas
          folders={folders}
          selectedFolderId={selectedFolderId}
          onSelect={setSelectedFolderId}
          onClose={() => setIsOpen(false)}
          onConfirm={handleAdd}
        />
      )}
    </>
  );
};

export default AddToPastas;
