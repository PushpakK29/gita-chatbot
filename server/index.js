import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a Bhagavad Gita assistant.

Rules:
- Answer ONLY using Bhagavad Gita concepts.
- If the question is not related to the Bhagavad Gita, reply exactly:
"Not mentioned in the Bhagavad Gita."

Question:
${userMessage}
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Not mentioned in the Bhagavad Gita.";

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.json({
      reply: "Not mentioned in the Bhagavad Gita.",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
