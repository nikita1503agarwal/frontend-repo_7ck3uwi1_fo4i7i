import React from 'react';
import { CheckCircle2, Clock, Target } from 'lucide-react';

const ProgressTracker = ({ progress = 62, completed = 14, total = 22 }) => {
  const pct = Math.min(100, Math.max(0, progress));
  const remaining = Math.max(0, total - completed);
  return (
    <section className="w-full rounded-2xl bg-white/70 backdrop-blur border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Target className="text-indigo-600" size={20} /> Progress
        </h2>
        <span className="text-sm text-gray-500">{completed}/{total} completed</span>
      </div>

      <div className="w-full bg-gray-200/70 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <CheckCircle2 className="text-emerald-600" size={18} />
          <span>{completed} completed</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="text-amber-600" size={18} />
          <span>{remaining} remaining</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-gray-700">
          <Target className="text-indigo-600" size={18} />
          <span>{pct}% overall</span>
        </div>
      </div>
    </section>
  );
};

export default ProgressTracker;
