const { staticTitles } = require("./data");
const { removeStopWords, normalizeTitle } = require("./helper");

const getUniqueTitles = (headlines = [], threshold = 0.4) => {
  const titles = [...headlines];
  const calculateCosineSimilarity = (title1 = "", title2 = "") => {
    const tokens1 = removeStopWords(title1.split(" "));
    const tokens2 = removeStopWords(title2.split(" "));

    const allTokens = Array.from(new Set([...tokens1, ...tokens2]));
    const vector1 = allTokens.map((token) => (tokens1.includes(token) ? 1 : 0));
    const vector2 = allTokens.map((token) => (tokens2.includes(token) ? 1 : 0));

    const dotProduct = vector1.reduce(
      (sum, val, i) => sum + val * vector2[i],
      0
    );
    const magnitude1 = Math.sqrt(
      vector1.reduce((sum, val) => sum + val ** 2, 0)
    );
    const magnitude2 = Math.sqrt(
      vector2.reduce((sum, val) => sum + val ** 2, 0)
    );

    return dotProduct / (magnitude1 * magnitude2);
  };

  const groups = [];
  const used = new Set();

  titles.forEach((title, i) => {
    if (used.has(i)) return;
    const normalizedTitle = normalizeTitle(title);
    const group = [title];

    titles.forEach((otherTitle, j) => {
      if (i !== j && !used.has(j)) {
        const normalizedOther = normalizeTitle(otherTitle);
        const similarity = calculateCosineSimilarity(
          normalizedTitle,
          normalizedOther
        );

        if (similarity >= threshold) {
          group.push(otherTitle);
          used.add(j);
        }
      }
    });

    groups.push(group);
    used.add(i);
  });

  const uniqueTitles = groups.map((group) => group[0]);
  return {
    groups: groups,
    uniqueTitles: uniqueTitles,
  };
};

module.exports = { getUniqueTitles };
