const { cosine, normalizeScore, rankByCosine } = require('../rag/vectorMath');

describe('Cosine Similarity & Vector Mathematics (PDF Chapter 5 & 8)', () => {
  test('evaluates exact 2D cosine similarity matching Chapter 7 examples', () => {
    const query = [1, 0];
    const chunkA = [0.8, 0.6];
    const chunkB = [0, 1];
    const chunkC = [-1, 0];

    // Chunk A: 1*0.8 + 0*0.6 = 0.8
    expect(cosine(query, chunkA)).toBeCloseTo(0.8, 5);
    // Chunk B: perpendicular => 0
    expect(cosine(query, chunkB)).toBeCloseTo(0.0, 5);
    // Chunk C: opposite => -1
    expect(cosine(query, chunkC)).toBeCloseTo(-1.0, 5);
  });

  test('normalizes raw cosine [-1, 1] to MongoDB vectorSearchScore scale [0, 1]', () => {
    expect(normalizeScore(1.0)).toBe(1.0);
    expect(normalizeScore(0.0)).toBe(0.5);
    expect(normalizeScore(-1.0)).toBe(0.0);
    expect(normalizeScore(0.8)).toBeCloseTo(0.9, 4);
  });

  test('throws error on mismatched vector dimensions', () => {
    expect(() => cosine([1, 2], [1, 2, 3])).toThrow('Vectors must have equal, nonzero dimensions');
    expect(() => cosine([], [])).toThrow('Vectors must have equal, nonzero dimensions');
  });

  test('throws error on zero vectors', () => {
    expect(() => cosine([0, 0], [1, 1])).toThrow('Zero vector');
    expect(() => cosine([1, 1], [0, 0])).toThrow('Zero vector');
  });

  test('throws error on non-finite coordinates', () => {
    expect(() => cosine([1, NaN], [1, 2])).toThrow('Coordinates must be finite numbers');
    expect(() => cosine([1, 2], [Infinity, 2])).toThrow('Coordinates must be finite numbers');
  });

  test('executes exact top-k ranking over 5 candidate vectors (PDF Chapter 8 Exercise)', () => {
    const query = [1, 0, 0];
    const candidates = [
      { id: 'v1', embedding: [0.9, 0.1, 0.0] },
      { id: 'v2', embedding: [0.1, 0.9, 0.0] },
      { id: 'v3', embedding: [0.99, 0.01, 0.0] }, // Closest
      { id: 'v4', embedding: [-0.8, 0.1, 0.0] },
      { id: 'v5', embedding: [0.5, 0.5, 0.0] }
    ];

    const ranked = rankByCosine(query, candidates, 3);
    expect(ranked.length).toBe(3);
    expect(ranked[0].item.id).toBe('v3');
    expect(ranked[1].item.id).toBe('v1');
    expect(ranked[2].item.id).toBe('v5');
    expect(ranked[0].rawScore).toBeGreaterThan(ranked[1].rawScore);
  });
});
