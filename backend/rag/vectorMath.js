/**
 * Vector Mathematics Module for FitAI
 * Implements the exact cosine similarity function from GenAI interview preparation guide (Chapter 5 & 8)
 * Compares vector directions and handles exact nearest-neighbor ranking baseline.
 */

function cosine(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length || a.length === 0) {
    throw new Error("Vectors must have equal, nonzero dimensions");
  }
  let dot = 0, aa = 0, bb = 0;
  for (let i = 0; i < a.length; i++) {
    if (!Number.isFinite(a[i]) || !Number.isFinite(b[i])) {
      throw new Error("Coordinates must be finite numbers");
    }
    dot += a[i] * b[i];
    aa += a[i] * a[i];
    bb += b[i] * b[i];
  }
  if (aa === 0 || bb === 0) {
    throw new Error("Zero vector");
  }
  return dot / Math.sqrt(aa * bb);
}

/**
 * Normalizes a raw cosine similarity [-1, 1] to a [0, 1] scale
 * matching MongoDB Atlas Vector Search exposed vectorSearchScore behavior.
 */
function normalizeScore(rawCosine) {
  return (rawCosine + 1) / 2;
}

/**
 * Performs exact nearest-neighbor ranking over a set of candidate vectors
 * Useful as an exact baseline (ANN validation), small corpus evaluation, and test fallback.
 */
function rankByCosine(queryVector, items, topK = 4) {
  const scored = items.map(item => {
    const rawScore = cosine(queryVector, item.embedding);
    return {
      item,
      rawScore,
      score: normalizeScore(rawScore)
    };
  });

  scored.sort((a, b) => b.rawScore - a.rawScore);
  return scored.slice(0, topK);
}

module.exports = {
  cosine,
  normalizeScore,
  rankByCosine
};
