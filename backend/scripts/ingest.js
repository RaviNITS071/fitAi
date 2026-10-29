/**
 * Ingestion CLI Script for FitAI (Pipeline A)
 * Usage: node scripts/ingest.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { ingestCorpus } = require('../rag/service');

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is not defined in .env");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(uri);
    console.log("Connected successfully. Starting knowledge base ingestion (Pipeline A)...");

    const result = await ingestCorpus();
    console.log("✅ Ingestion completed successfully!");
    console.log(`- Documents processed: ${result.sourcesCount}`);
    console.log(`- Chunks stored: ${result.chunksStored}`);
    console.log(`- Corpus ID: ${result.corpusId}`);
    console.log(`- Vector Search Index: ${result.indexName}`);
  } catch (err) {
    console.error("❌ Ingestion error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
