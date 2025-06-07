import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TimestampConverter from "./timestampConverter";
import AppLayout from "./Layout";
import { useNavigate } from "react-router-dom";
import LoadingReviews from "./LoadingReviews";

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

        // Usar variável local para evitar o problema de timing do setState
        const summary = reviewsData.review_summary || {};
        setReviewSummary(summary);
        setTotalPositive(summary.total_positive || 0);
        setTotalNegative(summary.total_negative || 0);

        if (summary.total_reviews > 0) {
          setPercentPositive(
            ((summary.total_positive / summary.total_reviews) * 100).toFixed(2)
          );
          setPercentNegative(
            ((summary.total_negative / summary.total_reviews) * 100).toFixed(2)
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
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <AppLayout>
        <div className="m-10 p-6">
          {/* Game Details */}
          {gameDetails && (
            <div className="mb-8 p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg text-white">
              <h1 className="text-4xl font-bold mb-2">{gameDetails.name}</h1>
              <p className="mb-2">
                📅 Release Date: {gameDetails.release_date?.date}
              </p>
            </div>
          )}

          {/* Review Summary */}
          {reviewSummary && (
            <div className="mb-8 p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-2">Review Summary</h2>
              <p>Selected timeframe: </p>
              <p>Total Positive: {percentPositive}</p>
              <p>Total Negative: {percentNegative}</p>
              <p>Overall Score: {reviewSummary.review_score_desc}</p>
            </div>
          )}

          {/* AI Analysis */}
          <h1 className="text-3xl font-bold mb-4 font-sf text-white">
            AI Analysis
          </h1>
          <div className="mb-4 flex gap-4 flex-wrap">
            <button
              onClick={() => handleAnalyze("general")}
              className={`px-4 py-2 rounded-full text-white font-bold transition-all duration-300 button2
      ${analysisType === "general"}`}
            >
              General Insight
            </button>

            <button
              onClick={() => handleAnalyze("sentiment")}
              className={`px-4 py-2 rounded-full text-white font-bold transition-all duration-300 button2
      ${analysisType === "sentiment"}`}
            >
              Sentiment Analysis
            </button>

            <button
              onClick={() => handleAnalyze("keywords")}
              className={`px-4 py-2 rounded-full text-white font-bold transition-all duration-300 
      ${
        analysisType === "keywords"
          ? "bg-gradient-to-r from-blue-400 to-teal-400"
          : "bg-gradient-to-r from-blue-400 to-teal-400 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,255,0.9)]"
      }`}
            >
              Keyword Extraction
            </button>
          </div>

          {analysisStatus && (
            <p className="text-white font-semibold mb-4">{analysisStatus}</p>
          )}

          {/* Reviews */}
          <h1 className="text-3xl font-bold mb-4 font-sf text-white">
            Reviews
          </h1>
          <ul>
            {reviews.map((review, index) => (
              <li
                key={index}
                className="mb-4 p-4 rounded-lg bg-white bg-opacity-30 backdrop-blur-lg"
              >
                <p className="text-white font-sf">{review.review}</p>
                <TimestampConverter timestamp={review.timestamp_created} />
                <p className="text-white text-sm">
                  👍 {review.votes_up} 👎 {review.votes_down}
                </p>
                <p>
                  Hours played at the review: {review.author.playtime_at_review}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </AppLayout>
    </div>
  );
};

export default ReviewsPage;
