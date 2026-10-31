import React from 'react';
import { 
  Bell, 
  Bookmark, 
  Sun, 
  Moon, 
  RefreshCw,
  Phone,
  User
} from 'lucide-react';
import { UserSession } from '../types';

interface MastheadProps {
  savedCount: number;
  unreadAlertsCount: number;
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
  onOpenContact: () => void;
  onRefreshFeed: () => void;
  isRefreshing: boolean;
  currentUser: UserSession | null;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onToggleSavedOnly: () => void;
  isSavedOnly: boolean;
}

export const Masthead: React.FC<MastheadProps> = ({
  savedCount,
  unreadAlertsCount,
  onOpenNotifications,
  onOpenAuth,
  onOpenContact,
  onRefreshFeed,
  isRefreshing,
  currentUser,
  darkMode,
  setDarkMode,
  onToggleSavedOnly,
  isSavedOnly
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (isSavedOnly) onToggleSavedOnly();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-bold text-sm tracking-widest font-mono">
              A
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
                AXIS
              </span>
            </div>
          </button>

          {/* Live Stream Pulse Marker */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-[10px] font-mono font-medium text-emerald-700 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>

        {/* Right: Functional Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Refresh / Check for latest news */}
          <button
            onClick={onRefreshFeed}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Refresh feed with latest dispatches"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-zinc-900 dark:text-zinc-100' : ''}`} />
            <span className="hidden md:inline">Sync</span>
          </button>

          {/* Saved Filter Toggle */}
          <button
            onClick={onToggleSavedOnly}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
              isSavedOnly
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent font-bold'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title="View saved items"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSavedOnly ? 'fill-current' : ''}`} />
            <span className="font-mono text-[11px]">{savedCount}</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Instant Alerts"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Contact / Callback Request */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer shadow-xs"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">Connect</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Student Profile */}
          <button
            onClick={onOpenAuth}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Account"
          >
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <User className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
