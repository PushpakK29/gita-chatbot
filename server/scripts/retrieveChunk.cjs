const fs = require("fs");

const chunks = JSON.parse(
  fs.readFileSync("./data/gita_chunks.json", "utf-8")
);

// 🔹 Improved scoring with concept boosts
function scoreChunk(chunkText, queryWords) {
  let score = 0;
  const text = chunkText.toLowerCase();

  // direct keyword overlap
  for (const word of queryWords) {
    if (text.includes(word)) score += 2;
  }

  // 🔹 Bhagavad Gita concept boosts
  if (text.includes("karma")) score += 3;
  if (text.includes("yoga")) score += 3;
  if (text.includes("buddhi")) score += 2;
  if (text.includes("action")) score += 1;
  if (text.includes("duty")) score += 1;
  if (text.includes("attachment")) score += 1;
  if (text.includes("result")) score += 1;

  return score;
}

// 🔹 test question
const question = "What is karma yoga?";
const queryWords = question
  .toLowerCase()
  .replace(/[^a-z\s]/g, "")
  .split(" ")
  .filter(w => w.length > 3);

let bestChunk = null;
let bestScore = 0;

for (const chunk of chunks) {
  const score = scoreChunk(chunk.text, queryWords);
  if (score > bestScore) {
    bestScore = score;
    bestChunk = chunk;
  }
}

// 🔹 confidence threshold
if (!bestChunk || bestScore < 4) {
  console.log("❌ No relevant chunk found");
} else {
  console.log("✅ Best matching chunk (score:", bestScore, ")\n");
  console.log(bestChunk.text.slice(0, 800));
}
