const fs = require("fs");

const rawText = fs.readFileSync("./data/gita_raw.txt", "utf-8");

// split text into paragraphs
const paragraphs = rawText
  .split(/\n\s*\n/)
  .map(p => p.trim())
  .filter(p => p.length > 200);

const chunks = [];
let id = 1;

for (const para of paragraphs) {
  chunks.push({
    id: id++,
    text: para
  });
}

fs.writeFileSync(
  "./data/gita_chunks.json",
  JSON.stringify(chunks, null, 2)
);

console.log("✅ Chunking complete:", chunks.length, "chunks created");
