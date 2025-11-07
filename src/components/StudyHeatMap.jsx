import React, { useMemo, useState } from 'react';

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function formatDate(d) {
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function generateLast12Weeks() {
  // Build 12 columns (weeks), each with up to 7 days (Sun-Sat), ending today
  const today = startOfDay(new Date());
  const weeks = [];

  // Find last Sunday to align columns
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - today.getDay());

  // Generate 12 weeks back from lastSunday (inclusive)
  for (let w = 11; w >= 0; w--) {
    const start = new Date(lastSunday);
    start.setDate(lastSunday.getDate() - w * 7);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      if (d > today) break; // Don't include future days in current week
      days.push(startOfDay(d));
    }
    weeks.push(days);
  }
  return weeks; // Array<weekDays[]>
}

function levelColor(level) {
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
  const weeks = useMemo(() => generateLast12Weeks(), []);

  // Generate mock data with both solved and attempted for each day
  const data = useMemo(() => {
    const map = new Map();
    weeks.flat().forEach((date, idx) => {
      const base = (idx * 7) % 13;
      const attempted = Math.floor((base % 6) + (idx % 3));
      const solved = Math.max(0, Math.min(attempted, Math.floor(attempted - (idx % 2))));
      map.set(+date, { date, solved, attempted });
    });
    return map; // key: ms timestamp
  }, [weeks]);

  const [hover, setHover] = useState(null); // {x,y, entry}
  const [localMode, setLocalMode] = useState(mode);

  const metricFor = (entry) => (localMode === 'attempted' ? entry.attempted : entry.solved);

  // Map numeric metric to 0-4 levels (simple bucketization)
  const toLevel = (entry) => {
    const m = metricFor(entry);
    if (m === 0) return 0;
    if (m === 1) return 1;
    if (m === 2) return 2;
    if (m <= 4) return 3;
    return 4;
  };

  return (
    <div className="relative w-full bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-white font-semibold">Study Heat Map</h3>
        <div className="inline-flex rounded-lg overflow-hidden border border-white/10">
          <button
            className={`px-3 py-1.5 text-sm ${localMode === 'solved' ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/5'}`}
            onClick={() => setLocalMode('solved')}
          >Solved</button>
          <button
            className={`px-3 py-1.5 text-sm ${localMode === 'attempted' ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/5'}`}
            onClick={() => setLocalMode('attempted')}
          >Attempted</button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-1 sm:gap-1.5">
        {weeks.map((weekDays, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1 sm:gap-1.5">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const date = weekDays[i];
              const entry = date ? data.get(+date) : null;
              const level = entry ? toLevel(entry) : 0;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!entry}
                  className={`h-3.5 sm:h-4 w-3.5 sm:w-4 rounded ${entry ? levelColor(level) + ' hover:ring-2 hover:ring-white/30 transition' : 'bg-transparent'}`}
                  onMouseEnter={(e) =>
                    entry && setHover({ x: e.clientX, y: e.clientY, entry })
                  }
                  onMouseMove={(e) =>
                    entry && setHover({ x: e.clientX, y: e.clientY, entry })
                  }
                  onMouseLeave={() => setHover(null)}
                  aria-label={entry ? `${formatDate(entry.date)}: ${entry.solved} solved, ${entry.attempted} attempted` : 'No data'}
                />
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/50">Last 12 weeks of activity. Hover squares to see solved vs attempted.</p>

      {hover && (
        <div
          className="pointer-events-none fixed z-50 px-3 py-2 rounded-md bg-neutral-900/95 border border-white/10 shadow-xl"
          style={{ left: hover.x + 12, top: hover.y + 12 }}
        >
          <div className="text-xs text-white/70">{formatDate(hover.entry.date)}</div>
          <div className="mt-1 text-sm text-white">
            <span className="text-emerald-300 font-medium">{hover.entry.solved}</span> solved
            <span className="mx-2 text-white/30">•</span>
            <span className="text-cyan-300 font-medium">{hover.entry.attempted}</span> attempted
          </div>
        </div>
      )}
    </div>
  );
}
