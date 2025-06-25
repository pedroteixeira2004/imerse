import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/Inicializacao"; // Importa auth
import Loading from "../../componentes/Loading";
import Background from "../background";
import AppLayout2 from "../Layout2";
import ReportsSearchBar from "./ReportsSearchBar";
import ReportCard from "./ReportCard";

const ReportsResults = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasedReports, setPurchasedReports] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() ?? "";

  // Pega o usuário atual
  const user = auth.currentUser;

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "reports"));
        const filtered = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((report) => report.title?.toLowerCase().includes(searchTerm));

        setReports(filtered);
      } catch (error) {
        console.error("Erro ao buscar reports:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) fetchReports();
    else {
      setReports([]);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!user) {
      setPurchasedReports([]);
      return;
    }

    const fetchPurchased = async () => {
      try {
        const purchasedRef = collection(
          db,
          "users",
          user.uid,
          "purchased_reports"
        );
        const snapshot = await getDocs(purchasedRef);

        let allPurchasedIds = [];

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (Array.isArray(data.reports)) {
            const ids = data.reports.map((r) => r.id); // assume que o campo é 'id'
            allPurchasedIds.push(...ids);
          }
        });

        console.log("Reports comprados (IDs):", allPurchasedIds); // 🔍 Aqui está o log!

        setPurchasedReports(allPurchasedIds);
      } catch (error) {
        console.error("Erro ao buscar reports comprados:", error);
      }
    };

    fetchPurchased();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="text-white font-sf m-10">
          <div className="text-white font-sf flex flex-col justify-center mb-10">
            <ReportsSearchBar />
          </div>

          <h1 className="text-3xl font-bold mb-8">
            Results for: "<span className="text-white">{searchTerm}</span>"
          </h1>

          {reports.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  purchasedReports={purchasedReports}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-xl mt-10">No reports found.</p>
          )}
        </div>
      </AppLayout2>
    </div>
  );
};

export default ReportsResults;
