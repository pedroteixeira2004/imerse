import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/Inicializacao";
import AppLayout2 from "./Layout2";
import Background from "./background";
import FolderGameCard from "./FolderGameCard"; // Novo componente
import Loading from "./Loading";
import BackButton from "./BackButton";

const FolderContentPage = () => {
  const { folderId } = useParams(); // ID da pasta vindo da URL
  const [folderData, setFolderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFolderContent = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId || !folderId) {
        console.error("User ID ou Folder ID ausente.");
        setLoading(false);
        return;
      }

      try {
        const folderRef = doc(db, "users", userId, "library", folderId);
        const folderSnap = await getDoc(folderRef);

        if (folderSnap.exists()) {
          setFolderData(folderSnap.data());
        } else {
          console.error("Pasta não encontrada");
          setFolderData(null);
        }
      } catch (error) {
        console.error("Erro ao buscar conteúdo da pasta:", error);
        setFolderData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFolderContent();
  }, [folderId]);

  if (loading) return <Loading />;
  if (!folderData)
    return <p>Error while loading folder content or folder inexistent</p>;
  return (
    <div className="text-white font-sf">
      <Background />
      <AppLayout2>
        <div className="mx-auto m-10">
          <div className="mb-10 flex items-center justify-center">
            <BackButton />
            <div className="text-5xl text-center font-bold">
              {folderData.nome}
            </div>
          </div>

          {/* Se houver jogos */}
          {folderData.jogos?.length > 0 && (
            <div>
              <h2 className="text-4xl font-semibold mb-6">Games</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {folderData.jogos.map((game, index) => (
                  <FolderGameCard key={index} game={game} />
                ))}
              </div>
            </div>
          )}

          {/* Se houver reports (opcional) */}
          {folderData.reports?.length > 0 && (
            <div className="mt-16">
              <h2 className="text-4xl font-semibold mb-6">Reports</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Adicione aqui um componente para os reports, como <ReportCard report={report} /> */}
                {folderData.reports.map((report, index) => (
                  <div key={index} className="p-4 bg-white/10 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {report.title || "Untitled Report"}
                    </h3>
                    <p className="text-sm text-white/80">
                      {report.summary || "No summary available."}
                    </p>
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
        </div>
      </AppLayout2>
    </div>
  );
};

export default FolderContentPage;
