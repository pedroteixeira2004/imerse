import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingReviews from "../LoadingReviews";
import background1 from "../../assets/imagens/gradiente_game_details.svg";
import Background from "../background";
import mouse from "../../assets/icones/mouse.png";
import ReviewCard from "../ReviewCard";
import BackButton from "../BackButton";
import FeatureOverlay from "./FeatureOverlay";

const ReviewsPagePreview = () => {
  const { appId } = useParams();
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [reviewTexts, setReviewTexts] = useState([]);
  const [reviewSummary, setReviewSummary] = useState({});
  const [gameDetails, setGameDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalNegative, setTotalNegative] = useState(0);
  const [percentPositive, setPercentPositive] = useState(0);
  const [percentNegative, setPercentNegative] = useState(0);
  const [averagePlaytime, setAveragePlaytime] = useState(0);
  const numPerPage = searchParams.get("num_per_page") || 20;
  const reviewType = searchParams.get("review_type") || "all";
  const dayRange = searchParams.get("day_range") || "365";
  const language = searchParams.get("language") || "english";
  const filter = searchParams.get("filter") || "all";
  const [showOverlay, setShowOverlay] = useState(false);
  const minPlaytimeParam = Number(searchParams.get("min_playtime") || 0);
  const maxPlaytimeParam =
    searchParams.get("max_playtime") === ""
      ? Infinity
      : Number(searchParams.get("max_playtime"));
  const purchaseType = searchParams.get("purchase_type");
  const sorting = searchParams.get("sorting");
  const [filteredCount, setFilteredCount] = useState(0);
  const extractYear = (rawDate) => {
    if (!rawDate || typeof rawDate !== "string") return "";
    const normalized = rawDate.toLowerCase().trim();
    if (normalized.includes("coming soon")) return "Coming Soon";
    const match = normalized.match(/\b(19|20)\d{2}\b/);
    return match ? match[0] : "";
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch reviews + summary
        const reviewsResponse = await fetch(
          `http://localhost:3001/api/reviews/${appId}?filter=${filter}&num_per_page=${numPerPage}&review_type=${reviewType}&day_range=${dayRange}&language=${language}`
        );
        if (!reviewsResponse.ok)
          throw new Error("Error while fetching reviews");

        const reviewsData = await reviewsResponse.json();
        const minPlaytimeMinutes = minPlaytimeParam * 60;
        const maxPlaytimeMinutes =
          maxPlaytimeParam === Infinity ? Infinity : maxPlaytimeParam * 60;

        // Filtro de playtime em minutos
        const filteredReviews = reviewsData.reviews.filter((review) => {
          const playtime = review.author?.playtime_at_review || 0;
          const steamPurchase = review.steam_purchase;
          const playtimeOk =
            playtime >= minPlaytimeMinutes && playtime <= maxPlaytimeMinutes;

          const purchaseOk =
            purchaseType === "" ||
            (purchaseType === "true" && steamPurchase === true) ||
            (purchaseType === "false" && steamPurchase === false);

          return playtimeOk && purchaseOk;
        });
        if (sorting === "funny") {
          filteredReviews.sort(
            (a, b) => (b.votes_funny || 0) - (a.votes_funny || 0)
          );
        } else if (sorting === "playtime") {
          filteredReviews.sort(
            (a, b) =>
              (b.author?.playtime_at_review || 0) -
              (a.author?.playtime_at_review || 0)
          );
        } else if (sorting === "like") {
          filteredReviews.sort((a, b) => (b.votes_up || 0) - (a.votes_up || 0));
        }
        const onlyTexts = filteredReviews.map((r) => r.review);
        setFilteredCount(filteredReviews.length);
        setReviews(filteredReviews);
        setReviewTexts(onlyTexts);
        // Cálculo da média de horas jogadas
        const totalPlaytime = reviewsData.reviews.reduce((acc, review) => {
          return acc + (review.author?.playtime_at_review || 0);
        }, 0);

        const avgPlaytime =
          reviewsData.reviews.length > 0
            ? Math.round(totalPlaytime / reviewsData.reviews.length / 60)
            : 0;

        setAveragePlaytime(avgPlaytime);

        // Usar variável local para evitar o problema de timing do setState
        const summary = reviewsData.review_summary || {};
        setReviewSummary(summary);
        setTotalPositive(summary.total_positive || 0);
        setTotalNegative(summary.total_negative || 0);

        if (summary.total_reviews > 0) {
          setPercentPositive(
            Math.round((summary.total_positive / summary.total_reviews) * 100)
          );
          setPercentNegative(
            Math.round((summary.total_negative / summary.total_reviews) * 100)
          );
        } else {
          setPercentPositive(0);
          setPercentNegative(0);
        }

        // Fetch game details
        const gameDetailsResponse = await fetch(
          `http://localhost:3001/api/game-details/${appId}`
        );
        if (!gameDetailsResponse.ok)
          throw new Error("Erro ao buscar detalhes do jogo.");

        const gameDetailsData = await gameDetailsResponse.json();
        setGameDetails(gameDetailsData[appId]?.data || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appId, filter, numPerPage, reviewType, dayRange, language]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <LoadingReviews />;
  if (!reviews.length) return <p className="text-black">No reviews found.</p>;
  const year = extractYear(gameDetails.release_date.date);
  return (
    <div>
      <Background />
      <div
        className="relative h-[100vh] w-full"
        style={{
          backgroundImage: `url(${gameDetails.background_raw})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay opcional (background1 por cima se você quiser) */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${background1})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="flex-1 flex-col justify-end min-h-screen flex z-20">
          <div className="font-sf text-white game-details">
            <div className="flex z-30">
              <div className="z-30">
                <BackButton />
              </div>
              <div className="text-6xl font-bold mb-2 z-30">
                {gameDetails.name}
              </div>
            </div>
            <div className="backdrop-blur w-64 text-4xl mt-6 font-medium">
              Overall analysis
            </div>
            <div
              className="flex flex-wrap mt-7 mb-5 w-full gap-3 justify-center"
              id="overall info"
            >
              <div className="flex-1 min-w-[150px] max-w-[250px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-3xl font-medium">
                  {reviewSummary.total_reviews}
                </p>
                <p className="text-xl mt-1">Total reviews</p>
              </div>
              <div className="flex-1 min-w-[250px] max-w-[350px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-3xl font-medium">
                  {reviewSummary.review_score_desc}
                </p>
                <p className="text-xl mt-1">Overall score</p>
              </div>
              <div className="flex-1 min-w-[100px] max-w-[200px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-3xl font-medium">{percentPositive}%</p>
                <p className="text-xl mt-1">Total positive</p>
              </div>
              <div className="flex-1 min-w-[150px] max-w-[200px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-3xl font-medium">{percentNegative}%</p>
                <p className="text-xl mt-1">Total negative</p>
              </div>
              <div className="flex-1 min-w-[250px] max-w-[350px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-3xl font-medium">{averagePlaytime} hours</p>
                <p className="text-xl mt-1">Average playtime</p>
                <p>(based on the extrated reviews)</p>
              </div>
            </div>
            <div className="backdrop-blur-lg rounded-2xl text-3xl mt-14 justify-center font-medium flex">
              <div>Scroll to see reviews</div>
              <img
                src={mouse}
                alt="mouse"
                className="ml-4 w-10 h-10 animate-bounceMouse"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" relative z-30">
          <div className="relative">
            <div className="relative z-10">
              <div className="m-10 p-6 z-40">
                {/* Reviews */}
                <p className="text-5xl font-bold mb-3 font-sf text-white">
                  Reviews
                </p>
                <p className="text-xl font-regular font-sf text-white mb-6">
                  We found {filteredCount} reviews according to the filters you
                  applied
                </p>
                <ul>
                  {reviews.map((review, index) => (
                    <ReviewCard review={review} key={index} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!loading && filteredCount > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full font-sf">
          <div className="bg-white/20 backdrop-blur p-4 px-6 shadow-lg text-white text-center">
            <h2 className="text-xl font-bold">This is just a preview</h2>
            <p className="text-md mt-1">
              To access AI features, advanced filters, and more tools, please
              log in or sign up.
            </p>
          </div>
        </div>
      )}
      {showOverlay && <FeatureOverlay onClose={() => setShowOverlay(false)} />}
    </div>
  );
};

export default ReviewsPagePreview;
