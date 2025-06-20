import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Inicializacao";
import Loading from "../../componentes/Loading";
import Background from "../background";
import AppLayout2 from "../Layout2";
import ReportsSearchBar from "./ReportsSearchBar";
import ReportCard from "./ReportCard";

const ReportsResults = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() ?? "";

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
  {
    loading && <Loading />;
  }
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
          {!loading && reports.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {reports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}

          {!loading && reports.length === 0 && (
            <p className="text-center text-xl mt-10">No reports found.</p>
          )}
        </div>
      </AppLayout2>
    </div>
  );
};

export default ReportsResults;
