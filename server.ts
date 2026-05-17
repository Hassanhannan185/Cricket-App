import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/commentary", async (req, res) => {
  try {
    const { matchState } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a professional futuristic cricket commentator. Provide a short, high-energy commentary for this match state: ${matchState}. Keep it under 50 words.`,
    });
    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate commentary" });
  }
});

app.post("/api/prediction", async (req, res) => {
  try {
    const { scorecard } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this cricket scorecard and predict the winner and key performer: ${JSON.stringify(scorecard)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedWinner: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            starPlayer: { type: Type.STRING }
          },
          required: ["predictedWinner", "confidence", "reasoning", "starPlayer"]
        }
      }
    });
    res.json(JSON.parse(response.text));
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate prediction" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
