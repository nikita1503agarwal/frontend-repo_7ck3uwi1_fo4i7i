import React from 'react';

export default function ProgressTracker({ completed = 32, total = 50 }) {
  const percent = Math.min(100, Math.round((completed / Math.max(1, total)) * 100));
  return (
    <div className="p-5 md:p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base md:text-lg font-semibold text-white">Overall Progress</h3>
        <span className="text-sm text-white/70">{completed}/{total}</span>
      </div>
      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-white/60">{percent}% complete</p>
    </div>
  );}
