import React, { useEffect, useState } from "react";
import useUserData from "../UserData";
import Loading from "../Loading";
import { db, auth } from "../../firebase/Inicializacao";
import { collection, getDocs } from "firebase/firestore";
import ReportCard from "../Reports/ReportCard";
import FolderGameCard from "../FolderGameCard";
import "./ProfileInfo.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProfileInfo = () => {
  const { userData, loading } = useUserData();
  const [purchasedReports, setPurchasedReports] = useState([]);
  const [analyzedGames, setAnalyzedGames] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      try {
        // 🔍 Fetch purchased reports
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

        // 🎮 Fetch analyzed games
        const gamesSnapshot = await getDocs(
          collection(db, "users", userId, "analyzed_game")
        );

        const gamesData = gamesSnapshot.docs
          .map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              background: data.background_raw,
              reviewScore: data.reviewSummary?.review_score_desc,
              description: data.description,
              year: data.year,
              type: data.typeGame,
              name: data.name,
              createdAt: data.timestamp,
            };
          })
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;
            return bTime - aTime;
          });

        setAnalyzedGames(gamesData);
      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading || loadingData) return <Loading />;

  return (
    <div>
      <h2 className="text-4xl font-bold mb-3">Welcome {userData.firstName}</h2>
      <p className="text-white text-xl mb-8">
        Check here your purchased reports and the last games you analysed.
      </p>
      <div className="text-2xl font-bold">Purchased reports</div>
      <div className=" relative w-full">
        {purchasedReports.length > 0 ? (
          <div className="carousel-container">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              slidesPerView={3}
              spaceBetween={30}
              breakpoints={{
                150: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 30 },
              }}
            >
              {purchasedReports.map((report) => (
                <SwiperSlide
                  id="swiper-slide"
                  key={report.id}
                  className="flex justify-center"
                >
                  <ReportCard
                    id="report-card"
                    report={report}
                    purchasedReports={[report.id]}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="swiper-button-prev-custom">←</div>
            <div className="swiper-button-next-custom">→</div>
          </div>
        ) : (
          <p className="text-white/60 text-lg">
            You haven't purchased any reports yet.
          </p>
        )}
      </div>
      <div className="mt-6">
        <div className="text-2xl font-bold">Games recently analysed</div>
        <div className="relative w-full">
          {analyzedGames.length > 0 ? (
            <div className="carousel-container">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: ".swiper-button-next-custom-games",
                  prevEl: ".swiper-button-prev-custom-games",
                }}
                slidesPerView={3}
                spaceBetween={30}
                breakpoints={{
                  150: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 30 },
                }}
              >
                {analyzedGames.map((game) => (
                  <SwiperSlide key={game.appid} className="flex justify-center">
                    <FolderGameCard game={game} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="swiper-button-prev-custom-games">←</div>
              <div className="swiper-button-next-custom-games">→</div>
            </div>
          ) : (
            <p className="text-white/60 text-lg">
              You haven't analysed any games yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
