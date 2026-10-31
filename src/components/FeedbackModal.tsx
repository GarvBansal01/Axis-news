import React, { useState } from 'react';
import { Star, X, Check, MessageSquare, ThumbsUp } from 'lucide-react';
import { AppFeedback } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFeedback: (feedback: AppFeedback) => void;
  feedbacks: AppFeedback[];
  currentUserEmail?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmitFeedback,
  feedbacks,
  currentUserEmail
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('News Accuracy');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [viewTab, setViewTab] = useState<'submit' | 'all'>('submit');

  if (!isOpen) return null;

  const categories = ['News Accuracy', 'Siliguri Local Coverage', 'App Speed & Zero Clutter', 'UI Design & Reading', 'Audio Narrator'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFeedback: AppFeedback = {
      id: `fb-${Date.now()}`,
      userEmail: currentUserEmail || 'student@nbu.ac.in',
      userName: currentUserEmail ? currentUserEmail.split('@')[0] : 'Campus Student',
      rating,
      category,
      comment: comment.trim(),
      timestamp: 'Just now'
    };

    onSubmitFeedback(newFeedback);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComment('');
      setViewTab('all');
    }, 1200);
  };

  const averageRating = (
    feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / (feedbacks.length || 1)
  ).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-editorial font-bold text-stone-900 dark:text-stone-100">
              Rate App & Student Feedback
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
          <button
            onClick={() => setViewTab('submit')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              viewTab === 'submit'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Leave a Review
          </button>

          <button
            onClick={() => setViewTab('all')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              viewTab === 'all'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Ratings ({averageRating} ★)</span>
          </button>
        </div>

        {viewTab === 'submit' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating Select */}
            <div className="text-center space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 font-mono-nums">
                Your Overall Rating
              </label>
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating || rating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-stone-300 dark:text-stone-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs text-stone-500 font-mono-nums">
                {rating === 5 ? 'Exceptional — Highly useful' : rating >= 4 ? 'Good — Very informative' : 'Needs improvement'}
              </span>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-nums mb-1.5">
                What are you reviewing?
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                      category === cat
                        ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-nums mb-1">
                Tell us what you like or what needs improvement:
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="e.g., The Bagdogra airport and AI mission summaries are super clear. Please add more tech internship notices!"
                className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your feedback has been saved and shared with the team.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Submit Student Review
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200">
              <div>
                <span className="text-2xl font-bold font-mono-nums text-stone-900 dark:text-stone-100">
                  {averageRating}
                </span>
                <span className="text-xs text-stone-500 font-mono-nums"> / 5.0</span>
                <div className="flex gap-1 text-amber-500 mt-0.5">
                  {'★★★★★'}
                </div>
              </div>
              <span className="text-xs text-stone-600 dark:text-stone-400 font-mono-nums">
                Based on {feedbacks.length} student reviews
              </span>
            </div>

            <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
              {feedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{fb.userName}</span>
                    <div className="flex text-amber-500">
                      {'★'.repeat(fb.rating)}
                    </div>
                  </div>

                  <span className="text-[11px] font-mono-nums uppercase text-indigo-700 dark:text-indigo-400 font-semibold">
                    {fb.category}
                  </span>

                  <p className="text-stone-700 dark:text-stone-300 italic font-editorial text-sm">
                    "{fb.comment}"
                  </p>

                  <span className="text-[10px] text-stone-400 font-mono-nums block pt-1">
                    {fb.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
