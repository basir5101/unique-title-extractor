const { stopWords } = require("./data");

const removeStopWords = (tokens) =>
  tokens.filter((token) => !stopWords.has(token));
const normalizeTitle = (title = "") =>
  title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();

module.exports = { removeStopWords, normalizeTitle };
