import React, { useEffect, useState } from "react";
import useUserData from "../UserData";
import Loading from "../Loading";
import { db, auth } from "../../firebase/Inicializacao";
import { collection, getDocs } from "firebase/firestore";
import ReportCard from "../Reports/ReportCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProfileInfo = () => {
  const { userData, loading } = useUserData();
  const [purchasedReports, setPurchasedReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    const fetchPurchasedReports = async () => {
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

        const reportsCollection = collection(db, "reports");
        const allReportsSnapshot = await getDocs(reportsCollection);

        const purchasedFullReports = [];
        allReportsSnapshot.forEach((doc) => {
          const reportData = doc.data();
          if (purchasedIds.includes(reportData.id)) {
            purchasedFullReports.push({ id: doc.id, ...reportData });
          }
        });

        setPurchasedReports(purchasedFullReports);
      } catch (error) {
        console.error("Erro ao buscar reports comprados:", error);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchPurchasedReports();
  }, []);

  if (loading || loadingReports) return <Loading />;
  if (!userData)
    return <p className="text-white">Utilizador não autenticado.</p>;

  return (
    <div>
      <h2 className="text-4xl font-bold mb-3">Welcome {userData.firstName}</h2>
      <p className="text-white text-xl mb-8">
        Check here your purchased reports and the last games you analysed.
      </p>
      <div className="text-2xl font-bold mb-4">Reports purchased</div>
      <div className=" relative w-full h-[100rem]">
        {purchasedReports.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={3}
            spaceBetween={-50} // Aumenta o espaço entre os slides
            breakpoints={{
              150: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 2, spaceBetween: 40 },
            }}
          >
            {purchasedReports.map((report) => (
              <SwiperSlide key={report.id} className="flex justify-center">
                <ReportCard report={report} purchasedReports={[report.id]} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-white/60 text-lg">
            You haven't purchased any reports yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
