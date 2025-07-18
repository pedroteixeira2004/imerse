import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Background from "../background";
import AppLayout2 from "../Layout2";
import { FaCheck } from "react-icons/fa";
import CartButton from "./CartButton";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/Inicializacao";
import DownloadButton from "./DownloadButton";
import AddToPastas from "../AddToPastas";

const ReportDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state;
  const [purchasedReports, setPurchasedReports] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

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
            const ids = data.reports.map((r) => r.id);
            allPurchasedIds.push(...ids);
          }
        });

        setPurchasedReports(allPurchasedIds);
        setIsPurchased(allPurchasedIds.includes(report.id));
      } catch (error) {
        console.error("Erro ao buscar reports comprados:", error);
      }
    };

    fetchPurchased();
  }, [report.id]);

  if (!report) {
    return (
      <div className="text-white text-center mt-20">
        <h1 className="text-2xl">No report data found.</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-white text-black rounded-full font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }
  console.log(report.image);
  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="text-white h-screen flex items-center font-sf">
          <div className="flex items-center px-10 gap-x-10 w-full">
            <div className="w-[50%]">
              <h1 className="text-5xl font-bold mb-4">{report.title}</h1>
              <div className="text-3xl mb-4">{report.year}</div>
              <div className="text-3xl mb-4 font-bold">Abstract</div>
              <p className="text-white text-xl mb-6">{report.description}</p>
              <div className="text-3xl mb-4 font-bold">What's included</div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-white text-xl">
                {report.included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheck size={20} className="text-white" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-lg flex flex-col items-center justify-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-12">
                <div className="text-5xl font-semibold mb-4 text-center">
                  {isPurchased ? "Purchased" : `${report.price} €`}
                </div>
                <hr className="w-full border-t border-gray-300 my-2" />
                <div className="mt-6">
                  <div className="flex items-center mb-4">
                    <FaCheck size={24} color="white" />
                    <div className="ml-5 text-xl">
                      {isPurchased
                        ? "You now have full access"
                        : "Instant access after paying by credit card"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaCheck size={24} color="white" />
                    <div className="ml-5 text-xl">
                      {isPurchased
                        ? "Available for download now"
                        : "Available for download after purchase"}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-full mt-7 gap-6">
                  {isPurchased ? (
                    <DownloadButton link={report.link} />
                  ) : (
                    <CartButton report={report} />
                  )}
                  <AddToPastas report={report} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};

export default ReportDetails;
