import React from 'react';

function clampPercent(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

export default function ProgressTracker({ overall = 62 }) {
  const pct = clampPercent(overall);
  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Overall Progress</h3>
        <span className="text-white/70 text-sm">{pct}%</span>
      </div>
      <div className="mt-3 h-3 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-white/60">This reflects your combined learning across topics.</p>
    </div>
  );
}
