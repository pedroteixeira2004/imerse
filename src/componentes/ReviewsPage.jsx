import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import AppLayout from "./Layout";
import { useNavigate } from "react-router-dom";
import LoadingReviews from "./LoadingReviews";
import add_library from "../assets/icones/add_library.png";
import background1 from "../assets/imagens/gradiente_game_details.svg";
import Background from "./background";
import mouse from "../assets/icones/mouse.png";
import ReviewCard from "./ReviewCard";

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch reviews + summary
        const reviewsResponse = await fetch(
          `http://localhost:5000/api/reviews/${appId}?filter=${filter}&num_per_page=${numPerPage}&review_type=${reviewType}&day_range=${dayRange}&language=${language}`
        );
        if (!reviewsResponse.ok) throw new Error("Erro ao buscar avaliações.");

        const reviewsData = await reviewsResponse.json();
        const onlyTexts = reviewsData.reviews.map((r) => r.review);

        setReviews(reviewsData.reviews || []);
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
          `http://localhost:5000/api/game-details/${appId}`
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

  const handleAnalyze = async (type) => {
    setLoading(true);
    setInsight("");
    setAnalysisStatus("Analysing...");
    setAnalysisType(type);

    try {
      const response = await fetch(
        "http://localhost:5000/api/analyze-reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comments: reviewTexts, type }),
        }
      );

      const data = await response.json();
      if (data.insight) {
        navigate("/insight", { state: { insight: data.insight } });
      } else {
        setAnalysisStatus("A análise falhou.");
      }
    } catch (err) {
      setAnalysisStatus("Erro ao conectar ao serviço de IA.");
    } finally {
      setLoading(false);
    }
  };
  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <LoadingReviews />;
  if (!reviews.length)
    return <p className="text-black">Nenhuma avaliação encontrada.</p>;
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
            <div className="flex">
              <div className="text-6xl font-bold mb-2 z-30">
                {gameDetails.name}
              </div>
              <div className="items-center space-x-4 flex">
                <button className="expandable-button rounded-full mx-6">
                  <img src={add_library} alt="Add to library" />
                  <span className="text font-sf font-bold">Add to library</span>
                </button>
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
                <p className="text-4xl font-medium">{dayRange} days</p>
                <p className="text-xl mt-1">Selected timeframe</p>
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
              </div>
            </div>
            <div className="backdrop-blur-lg rounded-2xl text-3xl mt-14 justify-center font-medium flex">
              <div>Scroll to see reviews</div>
              <img src={mouse} alt="mouse" className="ml-4 w-10 h-10" />
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
                  <p className="text-5xl font-bold mb-6 font-sf text-white">
                    AI Analysis
                  </p>
                  <div className="mb-10 flex gap-4 flex-wrap">
                    <button
                      onClick={() => handleAnalyze("general")}
                      className={`px-4 py-2 rounded-full text-white font-bold transition-all duration-300 button2 font-sf
      ${analysisType === "general"}`}
                    >
                      General analysis
                    </button>

                    <button
                      onClick={() => handleAnalyze("sentiment")}
                      className={`px-4 py-2 rounded-full text-white font-bold transition-all duration-300 button2 font-sf
      ${analysisType === "sentiment"}`}
                    >
                      Sentiment analysis
                    </button>

                    <button
                      onClick={() => handleAnalyze("keywords")}
                      className={`px-4 py-2 rounded-full text-white font-bold transition-all duration-300 button2 font-sf
      ${analysisType === "keywords"}`}
                    >
                      Keyword extraction
                    </button>
                  </div>

                  {analysisStatus && (
                    <p className="text-white font-semibold mb-4">
                      {analysisStatus}
                    </p>
                  )}

                  {/* Reviews */}
                  <p className="text-5xl font-bold mb-6 font-sf text-white">
                    Reviews
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
    </div>
  );
};

export default ReviewsPage;
