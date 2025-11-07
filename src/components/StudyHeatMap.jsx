import React, { useMemo } from 'react';

function generateDays(weeks = 12) {
  const days = [];
  const today = new Date();
  const totalDays = weeks * 7;
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }
  return days;
}

function intensityToColor(level) {
  switch (level) {
    case 0:
      return 'bg-white/10';
    case 1:
      return 'bg-emerald-500/30';
    case 2:
      return 'bg-emerald-400/50';
    case 3:
      return 'bg-emerald-400/70';
    case 4:
      return 'bg-emerald-300';
    default:
      return 'bg-white/10';
  }
}

export default function StudyHeatMap({ mode = 'solved' }) {
  const days = useMemo(() => generateDays(12), []);
  // Fake intensities for UI (0-4). When wiring backend, replace with real values.
  const data = useMemo(() => days.map((_, i) => (i % 11 === 0 ? 3 : i % 7 === 0 ? 2 : i % 5 === 0 ? 1 : 0)), [days]);

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Study Heat Map</h3>
        <span className="text-xs text-white/60">Mode: {mode}</span>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-1 sm:gap-1.5">
        {days.map((d, idx) => (
          <div key={idx} className="flex flex-col gap-1 sm:gap-1.5">
            <div className={`h-3.5 sm:h-4 w-full rounded ${intensityToColor(data[idx])}`} />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/50">Last 12 weeks of activity.</p>
    </div>
  );
}
