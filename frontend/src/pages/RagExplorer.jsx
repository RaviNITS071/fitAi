import React, { useState, useEffect } from 'react';
import { 
  Search, Play, AlertTriangle, BookOpen, ArrowRight, Loader2
} from 'lucide-react';
import { answerRAGQuestion, getCorpusKnowledge } from '../api/client';

export default function RagExplorer() {
  const [question, setQuestion] = useState('What information is needed before making a strength plan outline?');
  const [goal, setGoal] = useState('strength');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [corpusData, setCorpusData] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('test'); // 'test' | 'corpus'

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
      setError(err.response?.data?.error || err.message || "Query failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sports Science Guidelines & Knowledge Base
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Inspect the underlying exercise science documents and test contextual question answering.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="inline-flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('test')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'test'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Guidelines Q&A
          </button>
          <button
            onClick={() => setActiveTab('corpus')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'corpus'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Corpus Docs ({corpusData?.documentsCount || 9})
          </button>
        </div>
      </div>

      {activeTab === 'test' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Query Formulation Input Panel */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-card space-y-5">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Guidelines Query</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Retrieves verified sports medicine passages</p>
            </div>

            <form onSubmit={handleTestRAG} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Query Text
                </label>
                <textarea
                  rows={3}
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium dark:text-white outline-none focus:border-slate-900"
                  placeholder="e.g. What information is needed for a strength outline?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Training Focus Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['strength', 'endurance', 'general'].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold capitalize transition-colors border ${
                        goal === g
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-medium text-xs rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-emerald-500" />
                    <span>Retrieving Evidence...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} /> <span>Query Knowledge Base</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Preset Queries */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">Sample Scenarios:</span>
              {[
                { q: "What information is needed before making a strength plan?", g: "strength" },
                { q: "What are the rules regarding food allergies and dietary restrictions?", g: "general" },
                { q: "How should long distance cardio and zone 2 aerobic sessions be structured?", g: "endurance" }
              ].map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setQuestion(sample.q); setGoal(sample.g); }}
                  className="w-full text-left text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight size={11} className="text-slate-400 shrink-0" />
                  <span className="truncate">{sample.q}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Response Output */}
          <div className="lg:col-span-7 space-y-4">
            {error && (
              <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 p-3.5 rounded-lg text-xs font-medium flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            {response ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                    response.status === 'ok'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200'
                  }`}>
                    Status: {response.status}
                  </span>

                  <span className="text-xs text-slate-400 font-mono">
                    {response.sourceIds?.length || 0} Citations
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Grounded Output</h4>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60">
                    {response.answer}
                  </div>
                </div>

                {response.sources && response.sources.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Verified Document Citations</h4>
                    <div className="space-y-1.5">
                      {response.sources.map((src, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs">
                          <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px]">
                            {src.id}
                          </span>
                          <span className="text-slate-600 dark:text-slate-300">
                            {src.sourceId}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-card text-center text-slate-400 text-xs">
                Select a scenario or enter a custom query to evaluate verified guidance.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Knowledge Base Corpus */}
      {activeTab === 'corpus' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-card space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Approved Sports Science Corpus</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Source documents verifying workout progression, recovery, and Indian nutritional guidelines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(corpusData?.documents || []).map((doc) => (
              <div key={doc.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    Category: {doc.goal}
                  </span>
                  <code className="text-[10px] font-mono text-slate-400">{doc.id}</code>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-xs">{doc.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{doc.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
