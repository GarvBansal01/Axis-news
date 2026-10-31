import React, { useState, useEffect } from 'react';
import { Bell, X, Check, Volume2, Smartphone, Send } from 'lucide-react';
import { NewsArticle } from '../types';
import { playAudioChime } from '../utils/audioPlayer';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  unreadCount: number;
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
  unreadCount,
  onMarkAllRead
}) => {
  const [permissionState, setPermissionState] = useState<string>('default');
  const [testAlertMessage, setTestAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionState(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      setTestAlertMessage('Web Notifications are not supported in this browser engine.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionState(permission);
      if (permission === 'granted') {
        new Notification('AXIS · Alerts Active', {
          body: 'You will receive instant breaking news alerts on your device for World, AI, and Siliguri events.',
          icon: '/favicon.ico'
        });
        setTestAlertMessage('Push notifications enabled successfully!');
      } else {
        setTestAlertMessage('Notifications permission was dismissed or blocked.');
      }
    } catch {
      setTestAlertMessage('Browser security restricted permission prompt inside frame. In-app alerts remain active.');
    }
  };

  const triggerSimulatedAlert = (article: NewsArticle) => {
    playAudioChime();

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`⚡ AXIS BREAKING: ${article.locationScope}`, {
          body: `${article.title}\n\nTakeaway: ${article.takeaway}`,
          icon: '/favicon.ico'
        });
      } catch {
        // In-app fallback
      }
    }

    setTestAlertMessage(`⚡ Simulated Instant Alert: "${article.title.slice(0, 48)}..." sent.`);
    setTimeout(() => setTestAlertMessage(null), 4500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs font-sans">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 h-full p-5 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div className="space-y-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              <h2 className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Instant Alerts Hub
              </h2>
              {unreadCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
                  {unreadCount}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Web Push Permission Banner */}
          <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Device Notifications</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 capitalize">
                {permissionState}
              </span>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
              Get notified immediately when breaking global or Siliguri dispatches arrive.
            </p>

            {permissionState !== 'granted' ? (
              <button
                onClick={requestPermission}
                className="w-full py-1.5 px-3 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Bell className="w-3 h-3" />
                <span>Enable Push Notifications</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium font-mono">
                <Check className="w-3.5 h-3.5" />
                <span>Alerts active on this device</span>
              </div>
            )}
          </div>

          {/* Test Alert Banner feedback */}
          {testAlertMessage && (
            <div className="p-2.5 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span>{testAlertMessage}</span>
            </div>
          )}

          {/* Simulated Alerts Stream */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span className="uppercase">Recent Dispatches</span>
              <button
                onClick={onMarkAllRead}
                className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                Mark read
              </button>
            </div>

            <div className="space-y-2 max-h-[48vh] overflow-y-auto pr-1">
              {articles.slice(0, 6).map((art) => (
                <div
                  key={art.id}
                  className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900/60 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{art.sourceName}</span>
                    <span>{art.publishedAt}</span>
                  </div>

                  <h3
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer line-clamp-2 leading-snug"
                  >
                    {art.title}
                  </h3>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-zinc-400">{art.locationScope}</span>
                    <button
                      onClick={() => triggerSimulatedAlert(art)}
                      className="text-[11px] font-mono text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer"
                      title="Send test push alert"
                    >
                      <Send className="w-3 h-3" />
                      <span>Test Push</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400 text-center font-mono">
          AXIS Push Service · Pure factual alerts
        </div>
      </div>
    </div>
  );
};
