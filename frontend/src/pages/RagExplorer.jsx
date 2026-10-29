import React, { useState, useEffect } from 'react';
import { 
  Database, Search, Play, CheckCircle2, AlertTriangle, ShieldCheck, 
  Sparkles, FileText, Cpu, ArrowRight, Layers, Key, RefreshCw, Loader2
} from 'lucide-react';
import { answerRAGQuestion, getCorpusKnowledge } from '../api/client';

export default function RagExplorer() {
  const [question, setQuestion] = useState('What information is needed before making a strength plan outline?');
  const [goal, setGoal] = useState('strength');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [corpusData, setCorpusData] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('test'); // 'test' | 'corpus' | 'architecture'

  useEffect(() => {
    fetchCorpus();
  }, []);

  const fetchCorpus = async () => {
    try {
      const res = await getCorpusKnowledge();
      setCorpusData(res.data);
    } catch (err) {
      console.warn("Could not load corpus data:", err);
    }
  };

  const handleTestRAG = async (e) => {
    e?.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await answerRAGQuestion(question.trim(), goal);
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "RAG Query Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest mb-4">
          <Sparkles size={14} className="animate-pulse" /> Live RAG Pipeline & Vector Search Engine
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Inspect FitAI's <span className="gradient-text">Two-Stage RAG Pipeline</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Built with LangChain.js, OpenAI 1,536-dimensional embeddings, and MongoDB Atlas Vector Search.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('test')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'test'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            ⚡ Live RAG Query Sandbox
          </button>
          <button
            onClick={() => setActiveTab('corpus')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'corpus'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            📚 Knowledge Base Corpus ({corpusData?.documentsCount || 9} docs)
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'architecture'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            🧠 Technical Architecture & Specs
          </button>
        </div>
      </div>

      {activeTab === 'test' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Query Formulation Input Panel */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Search size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Request Formulation (Pipeline B)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Validated against Zod RequestSchema</p>
              </div>
            </div>

            <form onSubmit={handleTestRAG} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Natural Language Query
                </label>
                <textarea
                  rows={3}
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium dark:text-white outline-none focus:border-indigo-500 transition-colors"
                  placeholder="e.g. What information is needed for a strength outline?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Deterministic Metadata Pre-Filter (goal)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['strength', 'endurance', 'general'].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`py-2 px-3 rounded-xl text-xs font-black uppercase transition-all ${
                        goal === g
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  Pre-filters documents: <code className="text-indigo-500">goal in ['{goal}', 'general']</code>
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-black text-sm rounded-2xl shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Embedding & Retrieving Evidence...
                    </>
                  ) : (
                    <>
                      <Play size={16} /> Execute Request-Time RAG
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Preset Queries */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
              <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">Sample Test Scenarios:</span>
              {[
                { q: "What information is needed before making a strength plan?", g: "strength" },
                { q: "What are the rules regarding food allergies and dietary restrictions?", g: "general" },
                { q: "How should long distance cardio and zone 2 aerobic sessions be structured?", g: "endurance" },
                { q: "How to file income tax returns for agricultural land in Punjab?", g: "general" }
              ].map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setQuestion(sample.q); setGoal(sample.g); }}
                  className="w-full text-left text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium transition-colors flex items-center gap-2"
                >
                  <ArrowRight size={12} className="text-indigo-500 shrink-0" />
                  <span className="truncate">{sample.q}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RAG Execution Trace & Structured Reply Output */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pipeline Stage Indicators */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/20 dark:shadow-none">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">Pipeline Execution Stages</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className={`p-3 rounded-2xl border transition-all ${
                  isLoading ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600' :
                  response ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' :
                  'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500'
                }`}>
                  <span className="block text-[10px] font-black uppercase">1. Embed Query</span>
                  <span className="text-xs font-bold">1,536 Dims</span>
                </div>

                <div className={`p-3 rounded-2xl border transition-all ${
                  isLoading ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600' :
                  response ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' :
                  'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500'
                }`}>
                  <span className="block text-[10px] font-black uppercase">2. Pre-Filter</span>
                  <span className="text-xs font-bold">goal & corpus</span>
                </div>

                <div className={`p-3 rounded-2xl border transition-all ${
                  isLoading ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600' :
                  response ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' :
                  'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500'
                }`}>
                  <span className="block text-[10px] font-black uppercase">3. Vector Search</span>
                  <span className="text-xs font-bold">HNSW Cosine</span>
                </div>

                <div className={`p-3 rounded-2xl border transition-all ${
                  isLoading ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600' :
                  response ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' :
                  'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500'
                }`}>
                  <span className="block text-[10px] font-black uppercase">4. Grounded Output</span>
                  <span className="text-xs font-bold">Zod Reply</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
                <AlertTriangle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Response Card */}
            {response && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      response.status === 'ok'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    }`}>
                      Status: {response.status}
                    </span>
                    {response.status === 'insufficient_context' && (
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        (Active Abstention Triggered)
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-extrabold text-slate-400">
                    Citations Cited: {response.sourceIds?.length || 0}
                  </span>
                </div>

                {/* Synthesized Answer */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Synthesized Answer</h4>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
                    {response.answer}
                  </div>
                </div>

                {/* Validated Citations and Provenance */}
                {response.sources && response.sources.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Verified Citation Provenance</h4>
                    <div className="space-y-2">
                      {response.sources.map((src, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl text-xs">
                          <span className="font-black px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px]">
                            {src.id}
                          </span>
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            Source Document ID: <code className="text-emerald-600 dark:text-emerald-400 font-mono">{src.sourceId}</code>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Information items if abstained */}
                {response.missingInformation && response.missingInformation.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 mb-2">Missing Information Detected</h4>
                    <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      {response.missingInformation.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Knowledge Base Corpus */}
      {activeTab === 'corpus' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Approved Source Corpus (fitai_demo_v1)</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Ingested via Pipeline A using RecursiveCharacterTextSplitter (chunkSize: 1000, chunkOverlap: 150)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(corpusData?.documents || []).map((doc) => (
              <div key={doc.id} className="p-5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Goal: {doc.goal}
                  </span>
                  <code className="text-[11px] font-mono text-slate-400">{doc.id}</code>
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{doc.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{doc.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Technical Architecture & Specs */}
      {activeTab === 'architecture' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-none space-y-8">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">GenAI Interview Defense Architecture</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-sm">
                <Layers size={18} />
                <span>Pipeline A: Knowledge Ingestion</span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                <li>• <strong>Document Loading:</strong> Approved domain policy and nutrition guidelines.</li>
                <li>• <strong>Recursive Character Splitter:</strong> <code className="text-indigo-500">chunkSize: 1000, chunkOverlap: 150</code>.</li>
                <li>• <strong>Deterministic Chunk IDs:</strong> SHA-256 hash of <code className="text-indigo-500">sourceId + "\n" + pageContent</code> for repeatable updates.</li>
                <li>• <strong>Embeddings:</strong> OpenAI <code className="text-indigo-500">text-embedding-3-small</code> (1,536 dims).</li>
                <li>• <strong>Index Definition:</strong> <code className="text-indigo-500">fitai_vector_index</code> with cosine similarity and metadata filters.</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-sm">
                <Cpu size={18} />
                <span>Pipeline B: Request-Time Processing</span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                <li>• <strong>Input Validation:</strong> Zod <code className="text-emerald-500">RequestSchema</code> checks length and enum values.</li>
                <li>• <strong>Pre-Filtering:</strong> Deterministic filter on <code className="text-emerald-500">corpusId</code> and <code className="text-emerald-500">goal in [goal, "general"]</code>.</li>
                <li>• <strong>Gating & Abstention:</strong> If 0 hits returned, abstains with <code className="text-emerald-500">insufficient_context</code>.</li>
                <li>• <strong>Evidence Assembly:</strong> Assembles token-bounded passages labeled with <code className="text-emerald-500">S1, S2, ...</code>.</li>
                <li>• <strong>Citation Validation:</strong> Validates model source citations, strictly rejecting hallucinated IDs.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
