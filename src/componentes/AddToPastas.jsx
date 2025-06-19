import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/Inicializacao";
import AddLibraryButton from "./AddLibraryButton";
import OverlayPastas from "./OverlayPastas";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GlassToast from "./GlassToast";
import { Description } from "@headlessui/react";

const AddToPastas = ({ game }) => {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addedFolderId, setAddedFolderId] = useState(null); // ← guarda onde o jogo está
  const userId = auth.currentUser?.uid;

  // 1. Carrega pastas
  useEffect(() => {
    const fetchFolders = async () => {
      if (!userId) return;

      const libraryRef = collection(db, "users", userId, "library");
      const snapshot = await getDocs(libraryRef);
      const foldersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFolders(foldersData);

      // Verifica se jogo já está em alguma pasta
      const folderWithGame = foldersData.find((folder) =>
        (folder.jogos || []).some((j) => j.id === game.id)
      );
      setAddedFolderId(folderWithGame?.id || null);
    };

    fetchFolders();
  }, [userId, game.id]);

  // 2. Adicionar jogo
  const handleAddGame = async () => {
    if (!selectedFolderId || !userId) return;

    const folderRef = doc(db, "users", userId, "library", selectedFolderId);

    const newGame = {
      id: game.id,
      name: game.name,
      background: game.background_raw || "",
      year: game.year || "",
      type: game.typeGame || "",
      reviewScore: game.reviewSummary?.review_score_desc || "No reviews",
      description: game.description,
      addedAt: new Date().toISOString(),
    };

    const selectedFolder = folders.find((f) => f.id === selectedFolderId);
    const jogos = selectedFolder?.jogos || [];

    await updateDoc(folderRef, {
      jogos: [...jogos, newGame],
    });

    setAddedFolderId(selectedFolderId);
    setSelectedFolderId(null);

    toast.custom(
      (t) => (
        <GlassToast
          t={t}
          message={`Game added to folder "${selectedFolder?.nome}"`}
          type="success"
        />
      ),
      { duration: 3000, position: "top-center" }
    );

    setIsOpen(false);
  };

  // 3. Remover jogo
  const handleRemoveGame = async () => {
    if (!userId || !addedFolderId) return;

    const folderRef = doc(db, "users", userId, "library", addedFolderId);
    const folder = folders.find((f) => f.id === addedFolderId);
    const jogos = folder?.jogos || [];

    const updatedGames = jogos.filter((j) => j.id !== game.id);

    await updateDoc(folderRef, { jogos: updatedGames });

    setAddedFolderId(null);

    toast.custom(
      (t) => (
        <GlassToast
          t={t}
          message={`Game removed from folder "${folder?.nome}"`}
          type="error"
        />
      ),
      { duration: 3000, position: "top-center" }
    );
  };

  // 4. Quando clicar no botão
  const handleButtonClick = () => {
    if (addedFolderId) {
      handleRemoveGame();
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
          onConfirm={handleAddGame}
        />
      )}
    </>
  );
};

export default AddToPastas;
