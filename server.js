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
      `https://store.steampowered.com/api/appdetails?appids=${appId}&l=english`
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
      case "Sentiment analysis":
        prompt = `
You are an expert AI analyst for game reviews.

Analyze the emotional sentiment and patterns expressed in the reviews below.

Return only a valid JSON object, strictly in this format:
{
  "summary": "Brief summary of the overall information focusing on the emotions.",
  "overallTone": explain if the overall tone of the reviews is Very Positive, Positive, Mixed, Negative or Very Negative and explain why exposing the main reasons,
  "positiveAspects": ["aspect1", "aspect2", "aspect3", ...],
  "negativeAspects": ["aspect1", "aspect2", "aspect3", ...],
  "emotionalExpressions": ["emotion1", "emotion2", "emotion3", ...],
  "recurringTrends": ["trend1", "trend2", "trend3", ...]
  "suggestions":["suggestion1", "suggestion2", "suggestion3", ...]
}

Guidelines:
- "summary" must summarize all the content, focusing on the emotions and where they are expressed.
- "overallTone" must summarize the dominant emotional tone and the main reasons.
- "positiveAspects" should include all the positive aspects mentioned related to the positive emotions.
- "negativeAspects" should include all the negative aspects mentioned related to the negative emotions.
- "emotionalExpressions" should include both explicit emotions (joy, frustration) and subtle feelings.
- "recurringTrends" should describe behaviors, complaints, praises, or patterns of player experience.
- "suggestions" should be inferred suggestions or requests from the players.

Important rules:
- Return all aspect names, overall tone, keywords, themes, emotional expressions, and suggestions with the first letter capitalized.
- Ensure that all multi-word terms or phrases have spaces between words (e.g., "fast loading" instead of "fastLoading").
- Do not include any explanations.
- Do not include any text outside the JSON.
- Do not use markdown syntax.

Reviews:
${limitedComments}
`;
        break;

      case "Keywords extraction":
        prompt = `
You are an expert AI analyst for game reviews.

Extract detailed keywords and recurring terms from the reviews below.

Return only a valid JSON object, strictly in this format:
{
  "summary": "Brief summary of the most current themes and words used in the reviews.",
  "keywords": [
    { "term": "keyword1", "frequency": number },
    { "term": "keyword2", "frequency": number }
  ]
  "themes": ["theme1", "theme2", "theme3", ...]
  "suggestions": ["suggestion1", "suggestion2", "suggestion3", ...]
}

Guidelines:
- "summary" must summarize the most words and themes used in the reviews.
- "keywords" should include important nouns, verbs, or phrases (avoid generic terms).
- Estimate "frequency" by how often the keyword appears in the reviews.
- "themes" should capture broad areas of discussion.
- "suggestions" should be actionable insights inferred from the reviews.

Important rules:
- Return all aspect names, overall tone, keywords, themes, emotional expressions, and suggestions with the first letter capitalized.
- Ensure that all multi-word terms or phrases have spaces between words (e.g., "fast loading" instead of "fastLoading").
- Do not include any explanations.
- Do not include any text outside the JSON.
- Do not use markdown syntax.

Reviews:
${limitedComments}
`;

        break;

      case "General analysis":
        prompt = `
You are an expert AI analyst for game reviews.

Based on the reviews below, generate a complete insight about how players are feeling about the game.

Return only a valid JSON object, strictly in this format:
{
"summary": "Brief summary and balance of how players are feeling, suggestions, positive and negative aspects, keywords.",
"overallTone": "explain if the overall tone of the reviews is Very Positive, Positive, Mixed, Negative or Very Negative and explain why exposing the main reasons",
"emotionExpressions": ["emotion1", "emotion2", "emotion3", ...],
  "themes": ["theme1", "theme2", "theme3", ...],
  "positiveAspects": ["aspect1", "aspect2", "aspect3", ...],
  "negativeAspects": ["aspect1", "aspect2", "aspect3", ...],
  "suggestions": ["suggestion1", "suggestion2", ...]
  "recurringTrends": ["trend1", "trend2", "trend3", ...],
}

Guidelines:
- Be concise and clear in "summary".
- "overallTone" summarizes the dominant tone and balance of the reviews and the main reasons.
- "emotionalExpressions" should highlight both strong and subtle emotions.
- "themes" capture broad topics of player discussion.
- "positiveAspects" should highlight specific positive areas of the game.
- "negativeAspects" should highlight specific areas of criticism.
- "suggestions" are actionable insights or requests.
- "recurringTrends" are repeated patterns or comments from players.

Important rules:
- Return all aspect names, overall tone, keywords, themes, emotional expressions, and suggestions with the first letter capitalized
- Ensure that all multi-word terms or phrases have spaces between words (e.g., "fast loading" instead of "fastLoading").
- Do not include any explanations.
- Do not include any text outside the JSON.
- Do not use markdown syntax.

Reviews:
${limitedComments}
`;

        break;

      default:
        return res.status(400).json({ error: "Invalid analysis type." });
    }

    // Call Gemini API
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

    // Get AI response text
    let aiText =
      response.data.candidates[0]?.content?.parts[0]?.text?.trim() || "";

    console.log("Raw AI response:", aiText);

    // Try to extract only the JSON part (handle if Gemini adds extra text)
    // Regex to extract JSON block if needed
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Could not extract JSON from AI response.");
    }

    const jsonText = jsonMatch[0];

    // Parse JSON
    let parsedInsight;
    try {
      parsedInsight = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      console.error("JSON text:", jsonText);
      return res.status(500).json({ error: "Invalid JSON format from AI." });
    }

    // Send to React app
    res.json({ insight: parsedInsight });
  } catch (error) {
    console.error("Error analyzing reviews with Gemini:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Details:", error.response.data);
    } else {
      console.error(error);
    }
    res.status(500).json({ error: "Error analyzing reviews with Gemini." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
