import React, { useState } from 'react';
import { X, Key, Check, Globe, Twitter, ExternalLink, Sparkles, Shield, AlertCircle, RefreshCw } from 'lucide-react';
import { getLiveApiStatus } from '../services/liveNewsService';

interface ApiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeysUpdated: () => void;
}

export const ApiConfigModal: React.FC<ApiConfigModalProps> = ({
  isOpen,
  onClose,
  onKeysUpdated
}) => {
  const [gnewsKey, setGnewsKey] = useState(() => localStorage.getItem('axis_gnews_key') || '');
  const [xToken, setXToken] = useState(() => localStorage.getItem('axis_x_token') || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const status = getLiveApiStatus();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (gnewsKey.trim()) {
      localStorage.setItem('axis_gnews_key', gnewsKey.trim());
    } else {
      localStorage.removeItem('axis_gnews_key');
    }

    if (xToken.trim()) {
      localStorage.setItem('axis_x_token', xToken.trim());
    } else {
      localStorage.removeItem('axis_x_token');
    }

    setSavedSuccess(true);
    onKeysUpdated();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="relative w-full max-w-xl my-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Key className="w-4 h-4" />
              </span>
              <h2 className="text-lg md:text-xl font-editorial font-bold text-zinc-900 dark:text-zinc-100">
                Live News & Twitter/X API Integration
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Configure real-time news streaming from Twitter (X), GNews, or Google News Wires.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Engine Status */}
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-1 text-xs">
          <div className="flex items-center justify-between font-mono">
            <span className="text-zinc-600 dark:text-zinc-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>Current Streaming Status:</span>
            </span>
            <strong className="text-emerald-700 dark:text-emerald-400">
              {status.activeProvider}
            </strong>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
            AXIS is already streaming real-world breaking dispatches 24/7 without requiring any paid keys. Adding custom keys below increases rate limits and adds Twitter/X dispatches.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* GNews API Section */}
          <div className="space-y-1.5 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span>GNews API Key (Recommended · 100 Free Requests/Day)</span>
              </label>
              <a
                href="https://gnews.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Sign up free on GNews.io, copy your API key, and paste it here for instant Indian & international news wires.
            </p>
            <input
              type="text"
              placeholder="e.g. 7f8a3b2c1d9e4f5a6b7c8d9e0f1a2b3c"
              value={gnewsKey}
              onChange={(e) => setGnewsKey(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Twitter / X API Section */}
          <div className="space-y-1.5 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Twitter className="w-3.5 h-3.5 text-sky-500" />
                <span>Twitter / X Bearer Token (Optional)</span>
              </label>
              <a
                href="https://developer.x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>X Developer Portal</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Paste your X API v2 Bearer Token or Apify Twitter Token to monitor breaking tweets from official accounts (@ANI, @DGCAIndia, @PIB_India, @ISRO).
            </p>
            <input
              type="password"
              placeholder="e.g. AAAAAAAAAAAAAAAAAAAAA..."
              value={xToken}
              onChange={(e) => setXToken(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Vercel Environment Variables Tip */}
          <div className="p-3 rounded-lg border border-amber-500/25 bg-amber-500/5 dark:bg-amber-950/20 text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>For Your Live Vercel Production Site</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              To make your keys permanent for all student visitors, go to <strong>Vercel Dashboard → axis-news → Settings → Environment Variables</strong> and add:
            </p>
            <code className="block p-1.5 rounded bg-zinc-100 dark:bg-zinc-900 font-mono text-[10.5px] text-zinc-800 dark:text-zinc-200">
              VITE_GNEWS_API_KEY=your_key_here<br />
              VITE_X_BEARER_TOKEN=your_token_here
            </code>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <span className="text-[11px] text-zinc-400">
              Keys are encrypted in browser local storage.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer shadow-xs transition-colors"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved & Streaming!</span>
                  </>
                ) : (
                  <span>Save & Connect</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
