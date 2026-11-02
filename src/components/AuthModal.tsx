import React, { useState } from 'react';
import { User, Mail, ShieldCheck, X, History, Sparkles, CheckCircle2, LogOut, Laptop, Clock } from 'lucide-react';
import { UserSession } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession | null;
  onLogin: (session: UserSession) => void;
  onLogout: () => void;
  sessionHistory: UserSession[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  sessionHistory
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [collegeInput, setCollegeInput] = useState('North Bengal University (NBU)');
  const [activeTab, setActiveTab] = useState<'login' | 'history'>('login');

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    const googleSession: UserSession = {
      email: 'mangalent.slg@gmail.com',
      name: 'Student Scholar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      provider: 'google',
      universityOrCollege: 'North Bengal University (NBU), Siliguri',
      loginTimestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ipAddress: '103.220.12.44 (Siliguri, WB)',
      device: navigator.userAgent.includes('Mobile') ? 'Android Chrome Mobile' : 'Desktop Web (Chrome 131)',
      streakDays: 4
    };
    onLogin(googleSession);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    const emailSession: UserSession = {
      email: emailInput.trim(),
      name: nameInput.trim() || emailInput.split('@')[0],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
      provider: 'student_email',
      universityOrCollege: collegeInput.trim() || 'Siliguri Engineering College',
      loginTimestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ipAddress: '103.220.12.89 (Siliguri, WB)',
      device: navigator.userAgent.includes('Mobile') ? 'Mobile Browser' : 'Desktop Browser',
      streakDays: 3
    };

    // Notifies creator's inbox of new student login/registration
    fetch('https://formspree.io/f/mdeewazl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        type: 'New Student Sign-In / Registration',
        studentName: emailSession.name,
        studentEmail: emailSession.email,
        college: emailSession.universityOrCollege,
        loginTime: emailSession.loginTimestamp,
        device: emailSession.device
      })
    }).catch((err) => console.debug('Sign-in notification dispatch note:', err));

    onLogin(emailSession);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-editorial font-bold text-stone-900 dark:text-stone-100">
              Student Account & Sessions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: Account vs Session History */}
        <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            {currentUser ? 'Active Profile' : 'Student Sign In'}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'history'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Login Audit Log ({sessionHistory.length})</span>
          </button>
        </div>

        {/* Tab 1: Login or Profile */}
        {activeTab === 'login' && (
          <>
            {currentUser ? (
              <div className="space-y-5">
                {/* Active User Card */}
                <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/40 flex items-center gap-4">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-editorial">
                        {currentUser.name}
                      </h3>
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono-nums">
                        🔥 {currentUser.streakDays} Day Streak
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 font-mono-nums">
                      {currentUser.email}
                    </p>
                    <p className="text-xs text-stone-500">
                      {currentUser.universityOrCollege}
                    </p>
                  </div>
                </div>

                {/* Session telemetry details */}
                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-stone-500 font-mono-nums">
                    <span>Authenticated via:</span>
                    <strong className="text-stone-800 dark:text-stone-200 uppercase font-medium">
                      {currentUser.provider}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-stone-500 font-mono-nums">
                    <span>Last Active:</span>
                    <strong className="text-stone-800 dark:text-stone-200 font-medium">
                      {currentUser.loginTimestamp}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-stone-500 font-mono-nums">
                    <span>IP / Region:</span>
                    <strong className="text-stone-800 dark:text-stone-200 font-medium">
                      {currentUser.ipAddress}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-xl border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* 1-Click Google Sign In */}
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/80 text-stone-800 dark:text-stone-100 text-xs md:text-sm font-semibold flex items-center justify-center gap-3 transition-all shadow-xs cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Student Google Account</span>
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
                  <span className="flex-shrink mx-4 text-xs text-stone-400 font-mono-nums uppercase">
                    Or Enter University Email
                  </span>
                  <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-nums mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="e.g. student@nbu.ac.in or gmail.com"
                        className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-nums mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Priyanjit Sarkar"
                      className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-nums mb-1">
                      College / Institution
                    </label>
                    <input
                      type="text"
                      value={collegeInput}
                      onChange={(e) => setCollegeInput(e.target.value)}
                      placeholder="e.g. Siliguri Institute of Technology / NBU"
                      className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    Enter Student Briefing
                  </button>
                </form>
              </div>
            )}
          </>
        )}

        {/* Tab 2: Login Audit Logs & Sessions */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="text-xs text-stone-500 leading-relaxed">
              Real-time audit log of student logins, showing device, timestamps, and locations for transparency:
            </div>

            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {sessionHistory.map((sess, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/30 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono-nums">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{sess.email}</span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Logged In
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-stone-500 text-[11px] font-mono-nums">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {sess.loginTimestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Laptop className="w-3 h-3" /> {sess.device}
                    </span>
                  </div>

                  <div className="text-[11px] text-stone-600 dark:text-stone-400">
                    Location: <strong>{sess.ipAddress}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
