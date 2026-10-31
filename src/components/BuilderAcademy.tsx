import React, { useState } from 'react';
import { Code2, Rocket, DollarSign, CheckCircle2, HelpCircle, ArrowRight, RotateCcw, Lightbulb, ExternalLink } from 'lucide-react';
import { builderModules, deploymentGuide } from '../data/builderData';

export const BuilderAcademy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modules' | 'deploy' | 'monetization'>('modules');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(builderModules[0].id);
  
  // Quiz states
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showSimplifiedExplanation, setShowSimplifiedExplanation] = useState<Record<string, boolean>>({});

  const activeModule = builderModules.find((m) => m.id === selectedModuleId) || builderModules[0];
  const userSelectedOption = quizAnswers[activeModule.id];
  const hasAnswered = userSelectedOption !== undefined;
  const isCorrect = hasAnswered && userSelectedOption === activeModule.studentQuiz.correctIndex;

  const handleSelectQuizOption = (optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [activeModule.id]: optionIndex
    }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers((prev) => {
      const copy = { ...prev };
      delete copy[activeModule.id];
      return copy;
    });
  };

  const toggleSimplify = () => {
    setShowSimplifiedExplanation((prev) => ({
      ...prev,
      [activeModule.id]: !prev[activeModule.id]
    }));
  };

  const completedCount = Object.keys(quizAnswers).filter((modId) => {
    const mod = builderModules.find((m) => m.id === modId);
    return mod && quizAnswers[modId] === mod.studentQuiz.correctIndex;
  }).length;

  return (
    <div className="py-6 space-y-6 max-w-5xl mx-auto">
      {/* Academy Banner */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 md:p-8 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300 font-mono-nums">
          <Code2 className="w-4 h-4" />
          <span>Student Builder & Deployment Academy</span>
          <span aria-hidden="true">·</span>
          <span>Learn by Building</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-editorial font-bold leading-tight">
          How This Exact App Was Built & How You Can Deploy It
        </h2>

        <p className="text-xs md:text-sm text-indigo-100 max-w-3xl leading-relaxed">
          Welcome to the engineering companion! You asked to understand how this website is constructed, where to deploy your backend, and how to turn real software into an ethical student venture. Explore the interactive modules below, take the developer quizzes, and read the deployment roadmap.
        </p>

        {/* Progress Strip */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono-nums">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-400">
              {completedCount} of {builderModules.length} Modules Mastered
            </span>
            <div className="w-24 h-1.5 bg-indigo-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-300"
                style={{ width: `${(completedCount / builderModules.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-indigo-200">
            Current Rank: {completedCount === builderModules.length ? 'Senior Full-Stack Architect 🚀' : completedCount >= 3 ? 'Intermediate App Builder 🛠️' : 'Junior Student Developer 🌱'}
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2 text-xs md:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'modules'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Interactive Code Modules & Quizzes</span>
        </button>

        <button
          onClick={() => setActiveTab('deploy')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'deploy'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Rocket className="w-4 h-4" />
          <span>Where & How to Deploy Live (Vercel & Cloud)</span>
        </button>

        <button
          onClick={() => setActiveTab('monetization')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'monetization'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Student Monetization Blueprint</span>
        </button>
      </div>

      {/* Tab 1: Interactive Code Modules */}
      {activeTab === 'modules' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Module Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono-nums px-1">
              Select Architecture Topic
            </h3>
            <div className="space-y-1.5">
              {builderModules.map((mod) => {
                const isSelected = mod.id === selectedModuleId;
                const isPassed = quizAnswers[mod.id] === mod.studentQuiz.correctIndex;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModuleId(mod.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="truncate">{mod.title}</span>
                      {isPassed && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {mod.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Module Detail */}
          <div className="lg:col-span-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono-nums font-semibold uppercase text-indigo-700 dark:text-indigo-400">
                ARCHITECTURE BREAKDOWN
              </span>
              <h3 className="text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100 mt-1">
                {activeModule.title}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5 font-mono-nums">
                {activeModule.subtitle}
              </p>
            </div>

            {/* Plain English vs Simple Analogy Toggle */}
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>The Plain English Concept</span>
                </div>

                <button
                  onClick={toggleSimplify}
                  className="text-[11px] text-indigo-700 dark:text-indigo-300 hover:underline font-semibold cursor-pointer"
                >
                  {showSimplifiedExplanation[activeModule.id] ? 'Show Standard Explanation' : 'Explain Again in Simpler Terms'}
                </button>
              </div>

              <p className="text-xs md:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                {showSimplifiedExplanation[activeModule.id]
                  ? `💡 Super-Simple Student Analogy: Imagine you have a physical spiral notebook with 100 pages of notes. Instead of flipping through all 100 pages every time someone asks a question, this code creates colorful sticky tabs on the edges. When you click a tab, the notebook opens directly to that page instantly with zero paper tears!`
                  : activeModule.plainEnglishConcept}
              </p>
            </div>

            {/* Real Code Snippet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono-nums">
                <span>Production TypeScript Implementation</span>
                <span>Exact code from this project</span>
              </div>
              <pre className="p-4 rounded-xl bg-stone-950 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800">
                <code>{activeModule.codeSnippet}</code>
              </pre>
            </div>

            {/* Interactive Student Quiz */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 font-mono-nums">
                    Test Your Knowledge
                  </h4>
                </div>
                {hasAnswered && (
                  <button
                    onClick={handleResetQuiz}
                    className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Try Again</span>
                  </button>
                )}
              </div>

              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {activeModule.studentQuiz.question}
              </p>

              <div className="space-y-2">
                {activeModule.studentQuiz.options.map((opt, idx) => {
                  let buttonStyle = 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:border-indigo-400';
                  
                  if (hasAnswered) {
                    if (idx === activeModule.studentQuiz.correctIndex) {
                      buttonStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (idx === userSelectedOption) {
                      buttonStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200';
                    } else {
                      buttonStyle = 'opacity-50 border-stone-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectQuizOption(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2.5 cursor-pointer ${buttonStyle}`}
                    >
                      <span className="font-mono-nums font-semibold shrink-0">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quiz Result Banner */}
              {hasAnswered && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-1 ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                      : 'bg-red-50 dark:bg-red-950/40 border-red-300 text-red-900 dark:text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct! Outstanding Developer Intuition!</span>
                      </>
                    ) : (
                      <>
                        <span>Not quite right. Here is why:</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed">{activeModule.studentQuiz.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Deployment Guide */}
      {activeTab === 'deploy' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono-nums font-semibold uppercase text-indigo-700 dark:text-indigo-400">
              PRODUCTION DEPLOYMENT BLUEPRINT
            </span>
            <h3 className="text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100 mt-1">
              {deploymentGuide.title}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {deploymentGuide.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {deploymentGuide.sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-stone-200/60 dark:border-stone-700/60 pb-2">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {sec.step}
                  </h4>
                  <span className="text-xs font-mono-nums font-semibold text-indigo-700 dark:text-indigo-400">
                    {sec.summary}
                  </span>
                </div>

                <ul className="space-y-2 text-xs md:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {sec.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-stone-100 mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Direct Terminal Commands Cheat Sheet */}
          <div className="p-5 rounded-xl bg-stone-950 text-stone-100 space-y-3 font-mono text-xs border border-stone-800">
            <span className="text-emerald-400 font-bold block">
              🚀 Direct 3-Step Terminal Commands to Push to Vercel:
            </span>
            <div className="space-y-1.5 text-stone-300">
              <p># 1. Build your production bundle locally:</p>
              <p className="text-amber-300">npm run build</p>
              <p># 2. Install Vercel CLI (or connect GitHub repository):</p>
              <p className="text-amber-300">npm install -g vercel</p>
              <p># 3. Deploy live with HTTPS in 30 seconds:</p>
              <p className="text-amber-300">vercel --prod</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Monetization Roadmap */}
      {activeTab === 'monetization' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono-nums font-semibold uppercase text-emerald-700 dark:text-emerald-400">
              ETHICAL REVENUE GENERATION
            </span>
            <h3 className="text-2xl font-editorial font-bold text-stone-900 dark:text-stone-100 mt-1">
              How a Student Can Monetize This App Without Annoying Paywalls
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Practical business advice so your hard work and time spent building yields real career and financial returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 space-y-2.5">
              <span className="text-2xl">🤝</span>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                1. Local Tech & Campus Sponsorships
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Reach out to regional coding bootcamps, laptop repair centers in Siliguri, or coaching institutes. Offer a discrete, high-dignity "Featured Regional Opportunity" card in the feed. A single sponsor paying ₹3,000–₹5,000/month covers all your server and domain costs!
              </p>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 space-y-2.5">
              <span className="text-2xl">📚</span>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                2. Curated Exam & Book Affiliates
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                When students read the daily sloka or news on competitive exams (UPSC, WBJEE, GATE), provide 1-click links to recommended preparation books on Amazon India via Amazon Associates. You earn 5%–9% on every book purchased.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 space-y-2.5">
              <span className="text-2xl">☕</span>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                3. "Buy Me a Chai" / Student UPI QR
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Add a friendly UPI QR code or BuyMeACoffee badge. When students find your 60-second digests save them 2 hours of doom-scrolling every morning, they are genuinely happy to send a ₹50 or ₹100 tip to support student software.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 space-y-2.5">
              <span className="text-2xl">🎓</span>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                4. Symbolic Micro-Pass for Exam Packs
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Never paywall everyday news. Instead, if you later add downloadable PDF exam revision digests or AI quiz packs, offer a symbolic ₹49/month student pass. It's affordable for college students and provides predictable recurring cash flow.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
