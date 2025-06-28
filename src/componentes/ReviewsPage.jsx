import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import AppLayout from "./Layout";
import { useNavigate } from "react-router-dom";
import LoadingReviews from "./LoadingReviews";
import background1 from "../assets/imagens/gradiente_game_details.svg";
import Background from "./background";
import mouse from "../assets/icones/mouse.png";
import sentiment_analysis from "../assets/icones/sentiment_analysis.png";
import keywords from "../assets/icones/keywords.png";
import general from "../assets/icones/general.png";
import ReviewCard from "./ReviewCard";
import star from "../assets/icones/star.png";
import BotaoTopo from "./BotaoTopo";
import AddToPastas from "./AddToPastas";
import BackButton from "./BackButton";
import DownloadReviewsButton from "./DownloadReviewsButton";
import { getAuth } from "firebase/auth";
import { saveAnalyzedGameToFirebase } from "../firebase/FirebaseUtils";

const ReviewsPage = () => {
  const { appId } = useParams();
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [reviewTexts, setReviewTexts] = useState([]);
  const [reviewSummary, setReviewSummary] = useState({});
  const [gameDetails, setGameDetails] = useState(null);
  const [error, setError] = useState(null);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState("");
  const [analysisType, setAnalysisType] = useState("");
  const navigate = useNavigate();
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
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch reviews + summary
        const reviewsResponse = await fetch(
          `http://localhost:3001/api/reviews/${appId}?filter=${filter}&num_per_page=${numPerPage}&review_type=${reviewType}&day_range=${dayRange}&language=${language}`
        );
        if (!reviewsResponse.ok) throw new Error("Erro ao buscar avaliações.");

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
  useEffect(() => {
    const saveGame = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && gameDetails) {
        try {
          await saveAnalyzedGameToFirebase(user.uid, {
            id: appId,
            name: gameDetails.name,
            background_raw: gameDetails.background_raw,
            year: extractYear(gameDetails.release_date?.date),
            typeGame: gameDetails.type,
            reviewSummary: reviewSummary,
            description: gameDetails.short_description,
          });
        } catch (err) {
          console.error("Erro ao salvar jogo no Firebase:", err);
        }
      }
    };

    saveGame();
  }, [gameDetails]); // <-- executa quando `gameDetails` mudar

  const handleAnalyze = async (type) => {
    setLoading(true);
    setInsight("");
    setAnalysisStatus("Analysing...");
    setAnalysisType(type);

    try {
      const response = await fetch(
        "http://localhost:3001/api/analyze-reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comments: reviewTexts, type }),
        }
      );

      const data = await response.json();
      if (data.insight) {
        console.log("Navigating to Insight with:", {
          insight: data.insight,
          analysisType: type,
          gameName: gameDetails?.name,
        });
        navigate("/insight", {
          state: {
            insight: data.insight,
            analysisType: type,
            gameName: gameDetails.name,
          },
        });
      } else {
        setAnalysisStatus("The analysis failed");
      }
    } catch (err) {
      setAnalysisStatus("Error while connecting to Gemini");
    } finally {
      setLoading(false);
    }
  };
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
        <div className="flex-1 flex-col justify-end pl-20 min-h-screen flex z-20">
          <div className="font-sf text-white game-details">
            <div className="flex z-30">
              <div className="z-30">
                <BackButton />
              </div>
              <div className="text-6xl font-bold mb-2 z-30">
                {gameDetails.name}
              </div>
              <div className="items-center space-x-4 flex ml-6">
                <AddToPastas
                  game={{
                    id: appId,
                    name: gameDetails.name,
                    background_raw: gameDetails.background_raw,
                    year: year,
                    typeGame: gameDetails.type,
                    reviewSummary: reviewSummary,
                    description: gameDetails.short_description,
                  }}
                />
              </div>
            </div>
            <div className="backdrop-blur w-64 text-4xl mt-6 font-medium">
              Overall analysis
            </div>
            <div
              className="flex flex-wrap mt-7 mb-5 w-full gap-6 justify-center"
              id="overall info"
            >
              <div className="flex-1 min-w-[250px] max-w-[350px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-4xl font-medium">
                  {reviewSummary.total_reviews}
                </p>
                <p className="text-xl mt-1">Total reviews</p>
              </div>
              <div className="flex-1 min-w-[300px] max-w-[400px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-4xl font-medium">
                  {reviewSummary.review_score_desc}
                </p>
                <p className="text-xl mt-1">Overall score</p>
              </div>
              <div className="flex-1 min-w-[200px] max-w-[300px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-4xl font-medium">{percentPositive}%</p>
                <p className="text-xl mt-1">Total positive</p>
              </div>
              <div className="flex-1 min-w-[200px] max-w-[300px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-4xl font-medium">{percentNegative}%</p>
                <p className="text-xl mt-1">Total negative</p>
              </div>
              <div className="flex-1 min-w-[300px] max-w-[400px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6">
                <p className="text-4xl font-medium">{averagePlaytime} hours</p>
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
              <AppLayout>
                <div className="m-10 p-6 z-40">
                  {/* AI Analysis */}
                  <div className="flex items-center">
                    <p className="text-5xl font-bold font-sf text-white mb-2">
                      AI Analysis
                    </p>
                    <img
                      src={star}
                      alt="ai anlaysis"
                      className=" ml-4 h-11 w-11"
                    />
                  </div>
                  <p className="text-xl font-regular font-sf text-white mb-6">
                    Click to choose the type of analysis to run with AI
                  </p>
                  <div className="mb-16 flex gap-4 flex-wrap">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleAnalyze("General analysis")}
                        className={`flex flex-col items-center justify-center text-white font-bold transition-all duration-300 button-filters font-sf px-6 py-1 rounded-3xl 
    ${analysisType === "General analysis"}`}
                      >
                        <img src={general} className="h-20 w-20 mb-2" />
                        <span>General analysis</span>
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleAnalyze("Sentiment analysis")}
                        className={` flex flex-col items-center justify-center text-white font-bold transition-all duration-300 button-filters font-sf px-6 py-1 rounded-3xl 
      ${analysisType === "Sentiment analysis"}`}
                      >
                        <img
                          src={sentiment_analysis}
                          className="h-20 w-20 mb-2"
                        />
                        Sentiment analysis
                      </button>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleAnalyze("Keywords extraction")}
                        className={` flex flex-col items-center justify-center text-white font-bold transition-all duration-300 button-filters font-sf px-6 py-1 rounded-3xl 
      ${analysisType === "Keywords extraction"}`}
                      >
                        <img src={keywords} className="h-20 w-20 mb-2" />
                        Keywords extraction
                      </button>
                    </div>
                  </div>

                  {analysisStatus && (
                    <p className="text-white font-semibold mb-4">
                      {analysisStatus}
                    </p>
                  )}

                  {/* Reviews */}
                  <p className="text-5xl font-bold mb-3 font-sf text-white">
                    Reviews
                  </p>
                  <p className="text-xl font-regular font-sf text-white mb-6">
                    We found {filteredCount} reviews according to the filters
                    you applied
                  </p>
                  <ul>
                    {reviews.map((review, index) => (
                      <ReviewCard review={review} key={index} />
                    ))}
                  </ul>
                </div>
              </AppLayout>
            </div>
          </div>
        </div>
      </div>
      <DownloadReviewsButton reviews={reviews} gameName={gameDetails?.name} />
      <BotaoTopo />
    </div>
  );
};

export default ReviewsPage;
