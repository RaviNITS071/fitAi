const { createHash } = require('node:crypto');
const { Document } = require('@langchain/core/documents');
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');
const { sourceDocuments, corpusId } = require('../rag/corpus');

describe('Chunking & Ingestion Pipeline Unit Tests (PDF Chapter 8 & 11)', () => {
  test('RecursiveCharacterTextSplitter splits documents while preserving bounds and overlap', async () => {
    const longText = "Strength training is effective for muscle development. ".repeat(40);
    const doc = new Document({
      pageContent: longText,
      metadata: { sourceId: "test-doc", goal: "strength", corpusId }
    });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100
    });

    const chunks = await splitter.splitDocuments([doc]);
    expect(chunks.length).toBeGreaterThan(1);
    chunks.forEach(chunk => {
      expect(chunk.pageContent.length).toBeLessThanOrEqual(600); // within tolerance
      expect(chunk.metadata.sourceId).toBe("test-doc");
      expect(chunk.metadata.goal).toBe("strength");
    });
  });

  test('generates repeatable SHA256 chunk IDs for idempotent upserts', () => {
    const sourceId = "strength-profile";
    const text = "Demo app policy text content";

    const id1 = createHash("sha256").update(sourceId + "\n" + text).digest("hex");
    const id2 = createHash("sha256").update(sourceId + "\n" + text).digest("hex");

    expect(id1).toBe(id2);
    expect(id1).toHaveLength(64);
  });

  test('verified corpus documents have required metadata fields for vector index filtering', () => {
    sourceDocuments.forEach(doc => {
      expect(doc.id).toBeDefined();
      expect(doc.title).toBeDefined();
      expect(doc.goal).toBeDefined();
      expect(["strength", "endurance", "general"]).toContain(doc.goal);
      expect(doc.corpusId).toBe("fitai_demo_v1");
      expect(doc.text.length).toBeGreaterThan(20);
    });
  });
});
