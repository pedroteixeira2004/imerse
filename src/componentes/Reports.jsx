import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/Inicializacao";
import Background from "./background";
import AppLayout from "./Layout";
import ReportsSearchBar from "./Reports/ReportsSearchBar";
import ReportCard from "./Reports/ReportCard";

const Reports = () => {
  const [selectedTab, setSelectedTab] = useState("highlighted"); // default tab
  const [highlightedReports, setHighlightedReports] = useState([]);
  const [purchasedReports, setPurchasedReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixedHighlightedReports = async () => {
      try {
        const highlightedIds = [
          "1",
          "3",
          "5",
          "7",
          "9",
          "11",
          "13",
          "15",
          "17",
          "19",
          "21",
          "23",
        ]; // <- substitui pelos valores do campo 'id' dentro dos reports

        const snapshot = await getDocs(collection(db, "reports"));
        const allReports = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            firestoreId: doc.id, // opcional, caso precise do doc.id depois
            ...data,
          };
        });

        const filtered = highlightedIds
          .map((id) =>
            allReports.find((report) => String(report.id) === String(id))
          )
          .filter(Boolean); // remove reports não encontrados

        setHighlightedReports(filtered);
      } catch (error) {
        console.error("Erro ao buscar highlighted reports fixos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFixedHighlightedReports();
  }, []);

  useEffect(() => {
    const fetchPurchased = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      try {
        const purchasesSnapshot = await getDocs(
          collection(db, "users", userId, "purchased_reports")
        );

        let purchasedIds = [];
        purchasesSnapshot.forEach((doc) => {
          const data = doc.data();
          if (Array.isArray(data.reports)) {
            purchasedIds.push(...data.reports.map((r) => r.id));
          }
        });

        const reportsSnapshot = await getDocs(collection(db, "reports"));
        const allReports = reportsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const purchased = allReports.filter((r) => purchasedIds.includes(r.id));
        setPurchasedReports(purchased);
      } catch (error) {
        console.error("Erro ao buscar purchased reports:", error);
      }
    };

    fetchPurchased();
  }, []);

  const renderReports = () => {
    const reportsToRender =
      selectedTab === "highlighted" ? highlightedReports : purchasedReports;

    if (loading) {
      return <p className="text-white mt-10">Loading reports...</p>;
    }

    if (reportsToRender.length === 0) {
      return (
        <p className="text-white/60 text-lg mt-10">
          {selectedTab === "highlighted"
            ? "No highlighted reports found."
            : "You haven't purchased any reports yet."}
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {reportsToRender.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            purchasedReports={purchasedReports.map((r) => r.id)} // passa sempre os IDs comprados
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Background />
      <AppLayout>
        <div className="flex flex-col items-center justify-center text-white m-10">
          <div className="font-sf text-5xl font-bold text-center w-7/12">
            Get the industry insights and level up your game
          </div>
          <div className="text-3xl font-sf mt-8 w-7/12 text-center">
            Access and purchase detailed reports designed to support informed
            decisions and professional growth.
          </div>
          <div className="mt-3">
            <ReportsSearchBar />
          </div>

          {/* Botões de filtro */}
          <div className="flex gap-5 mt-20">
            <button
              onClick={() => setSelectedTab("highlighted")}
              className={`button-filters rounded-full font-sf font-medium ${
                selectedTab === "highlighted" ? "active" : ""
              }`}
            >
              Highlighted Reports
            </button>

            <button
              onClick={() => setSelectedTab("purchased")}
              className={`button-filters rounded-full font-sf font-medium ${
                selectedTab === "purchased" ? "active" : ""
              }`}
            >
              Purchased Reports
            </button>
          </div>

          {/* Grid com os reports */}
          {renderReports()}
        </div>
      </AppLayout>
    </div>
  );
};

export default Reports;
