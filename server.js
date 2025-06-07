const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
console.log("🔑 GEMINI_API_KEY carregada:", process.env.GEMINI_API_KEY);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Para ler JSON do corpo da requisição

// Rota para lista de jogos
app.get("/api/game-list", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar a lista de jogos da Steam." });
  }
});

// Rota para reviews
app.get("/api/reviews/:appId", async (req, res) => {
  try {
    const { appId } = req.params;
    let { num_per_page, review_type, day_range, language, filter } = req.query;

    if (!appId) {
      return res.status(400).json({ error: "ID do jogo não foi fornecido." });
    }

    num_per_page = parseInt(num_per_page) || 20;
    review_type = review_type || "all";
    day_range = day_range || "all";
    language = language || "english";
    filter = filter || "recent";

    // 1. Buscar o resumo das reviews (summary)
    const summaryResponse = await axios.get(
      `https://store.steampowered.com/appreviews/${appId}`,
      {
        params: {
          json: 1,
          filter: "summary",
        },
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; SteamReviewBot/1.0)",
        },
      }
    );

    const reviewSummary = summaryResponse.data.query_summary || {};
    console.log("Resumo das reviews do Steam:", reviewSummary);

    // 2. Buscar as reviews detalhadas (como já fazia)
    let allReviews = [];
    let cursor = "*";
    const seen = new Set();

    while (allReviews.length < num_per_page && cursor) {
      const response = await axios.get(
        `https://store.steampowered.com/appreviews/${appId}`,
        {
          params: {
            json: 1,
            num_per_page: 100,
            review_type,
            day_range,
            language,
            cursor,
            filter,
          },
        }
      );

      const reviews = response.data.reviews || [];
      const newReviews = reviews.filter((r) => !seen.has(r.recommendationid));
      newReviews.forEach((r) => seen.add(r.recommendationid));
      allReviews.push(...newReviews);

      cursor = response.data.cursor;
      if (!cursor || reviews.length === 0) break;
    }

    // 3. Retornar os dados combinados: resumo + lista de reviews
    res.json({
      review_summary: reviewSummary,
      reviews: allReviews.slice(0, num_per_page),
    });
  } catch (error) {
    console.error("Erro ao buscar reviews:", error.message);
    res.status(500).json({ error: "Erro ao buscar reviews do jogo." });
  }
});

// Rota para detalhes do jogo
app.get("/api/game-details/:appId", async (req, res) => {
  try {
    const { appId } = req.params;
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erro na requisição da Steam:", error);
    res.status(500).json({ error: "Erro ao buscar detalhes do jogo." });
  }
});

app.post("/api/analyze-reviews", async (req, res) => {
  try {
    const { comments, type } = req.body;
    console.log("Requested analysis type:", type);

    if (!comments || !Array.isArray(comments)) {
      return res.status(400).json({ error: "Invalid comments array." });
    }

    const limitedComments = comments.slice(0, 50).join("\n\n");

    let prompt = "";

    switch (type) {
      case "sentiment":
        prompt = `
Analyze the emotional sentiment expressed in the reviews below.
Identify the overall tone (positive, negative, or mixed), highlight specific emotional expressions (e.g., frustration, joy, excitement), and describe any recurring emotional trends.
Reviews:
${limitedComments}
    `;
        break;
      case "keywords":
        prompt = `
Extract the main keywords and recurring terms from the reviews below.
Focus on words and phrases that reflect the players' experience or concerns. Avoid generic terms. Organize the keywords by frequency or importance.
Reviews:
${limitedComments}
    `;
        break;
      case "general":
        prompt = `
Based on the reviews below, write a general insight about how players are feeling about the game.
Highlight recurring themes, positive or negative sentiments, and any implicit suggestions.
Reviews:
${limitedComments}
    `;
        break;
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const aiText = response.data.candidates[0].content.parts[0].text;
    res.json({ insight: aiText });
  } catch (error) {
    console.error("Error analyzing reviews with Gemini:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Details:", error.response.data);
    }
    res.status(500).json({ error: "Error analyzing reviews with Gemini." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
