import React, { useState } from 'react';
import { Laugh, Plus, ShieldCheck, Sparkles, AlertTriangle, ThumbsUp, Share2, Check, Filter } from 'lucide-react';
import { MemeItem } from '../types';
import { verifyMemeSubmission } from '../data/memesData';

interface MemeLoungeProps {
  memes: MemeItem[];
  onAddMeme: (meme: MemeItem) => void;
  onUpvote: (id: string) => void;
}

export const MemeLounge: React.FC<MemeLoungeProps> = ({
  memes,
  onAddMeme,
  onUpvote
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [punchline, setPunchline] = useState('');
  const [category, setCategory] = useState<'coding' | 'exams' | 'campus_life' | 'ai_humor'>('campus_life');
  const [author, setAuthor] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    approved: boolean;
    score: number;
    reason: string;
  } | null>(null);

  const tags = ['all', 'Debugging', 'Semester Exams', 'Hostel Life', 'AI Frontier'];

  const filteredMemes = memes.filter((meme) => {
    if (selectedTag === 'all') return true;
    return meme.tag === selectedTag;
  });

  const handleShare = (meme: MemeItem) => {
    const text = `😂 "${meme.title}"\n\n${meme.punchline}\n\n— By ${meme.author} on The Daily Brief Meme Lounge`;
    navigator.clipboard.writeText(text);
    setCopiedId(meme.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunAiVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !punchline.trim()) return;

    setIsAnalyzing(true);
    setVerificationResult(null);

    // Simulate AI Agent inspection delay
    setTimeout(() => {
      const result = verifyMemeSubmission(title, punchline);
      setIsAnalyzing(false);
      setVerificationResult(result);

      if (result.approved) {
        // Auto publish after passing AI moderation
        setTimeout(() => {
          const newMeme: MemeItem = {
            id: `meme-${Date.now()}`,
            title: title.trim(),
            punchline: punchline.trim(),
            category,
            author: author.trim() || 'Anonymous Student',
            upvotes: 1,
            aiVerifiedClean: true,
            aiVerificationReason: result.reason,
            createdAt: 'Just now',
            tag: category === 'coding' ? 'Debugging' : category === 'exams' ? 'Semester Exams' : category === 'ai_humor' ? 'AI Frontier' : 'Hostel Life'
          };
          onAddMeme(newMeme);
          setTitle('');
          setPunchline('');
          setAuthor('');
          setVerificationResult(null);
          setIsSubmitModalOpen(false);
        }, 1500);
      }
    }, 800);
  };

  return (
    <div className="py-6 space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/40 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900 dark:text-indigo-300">
            <Laugh className="w-4 h-4 text-indigo-600" />
            <span className="uppercase tracking-wider">Campus & Tech Humor</span>
            <span aria-hidden="true">·</span>
            <span className="font-normal text-stone-600 dark:text-stone-400">100% Wholesome & Campus-Safe</span>
          </div>
          <h2 className="text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100 mt-1">
            The Student Meme Lounge
          </h2>
          <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Bored between lectures or debugging at 2 AM? Take a quick mental breather. All community submissions are strictly vetted by our automated AI Safety Agent to guarantee zero vulgarity or toxicity.
          </p>
        </div>

        <button
          onClick={() => {
            setVerificationResult(null);
            setIsSubmitModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-700 text-white hover:bg-indigo-800 text-xs font-semibold transition-all shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post a Clean Meme</span>
        </button>
      </div>

      {/* Tag Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedTag === tag
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          >
            {tag === 'all' ? 'All Memes' : `#${tag}`}
          </button>
        ))}
      </div>

      {/* Memes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMemes.map((meme) => (
          <div
            key={meme.id}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono-nums font-semibold uppercase text-stone-700 dark:text-stone-300">
                  #{meme.tag}
                </span>

                <div
                  className="flex items-center gap-1 text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60"
                  title={meme.aiVerificationReason}
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>AI Verified Clean</span>
                </div>
              </div>

              <h3 className="text-lg font-editorial font-bold text-stone-900 dark:text-stone-100">
                {meme.title}
              </h3>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 text-sm md:text-base font-editorial text-stone-800 dark:text-stone-200 italic leading-relaxed">
                "{meme.punchline}"
              </div>
            </div>

            {/* Bottom Meta & Upvote Bar */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span>By <strong>{meme.author}</strong></span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-nums">{meme.createdAt}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpvote(meme.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-stone-700 dark:text-stone-300 cursor-pointer font-medium"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-mono-nums font-semibold">{meme.upvotes}</span>
                </button>

                <button
                  onClick={() => handleShare(meme)}
                  className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Share joke"
                >
                  {copiedId === meme.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal with AI Verification Guardrail */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-editorial font-bold text-stone-900 dark:text-stone-100">
                  Submit a Wholesome Campus Meme
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Every submission is analyzed by our automated AI content safety agent before publication.
                </p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRunAiVerification} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-nums mb-1">
                  Meme Title / Scenario
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., When the semester exam has a 15-mark question on Page 400..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-nums mb-1">
                  The Punchline / Joke
                </label>
                <textarea
                  required
                  rows={3}
                  value={punchline}
                  onChange={(e) => setPunchline(e.target.value)}
                  placeholder="e.g., Me: But sir, you said only Chapter 1 is coming! Professor: Yes, and that question is what you should have discovered on your own journey..."
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-nums mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  >
                    <option value="campus_life">Hostel & Campus Life</option>
                    <option value="exams">Semester Exams & Viva</option>
                    <option value="coding">Coding & Debugging</option>
                    <option value="ai_humor">AI & Tech Humor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-nums mb-1">
                    Your Name / College
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g., Rohan (NBU Siliguri)"
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* AI Verification Status Card */}
              {isAnalyzing && (
                <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                  <span>AI Content Safety Agent is inspecting your meme for vulgarity and wholesomeness...</span>
                </div>
              )}

              {verificationResult && (
                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    verificationResult.approved
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                      : 'bg-red-50 dark:bg-red-950/40 border-red-300 text-red-900 dark:text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {verificationResult.approved ? (
                      <>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>AI Safety Approved! Publishing to Campus Stream...</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>Submission Flagged by AI Safety Guardrail</span>
                      </>
                    )}
                  </div>
                  <p>{verificationResult.reason}</p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-700 text-white text-xs font-semibold hover:bg-indigo-800 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Verify with AI & Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
