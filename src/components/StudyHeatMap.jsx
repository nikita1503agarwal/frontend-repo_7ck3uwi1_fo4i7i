import React, { useMemo, useState } from 'react';
import { CalendarDays, Layers } from 'lucide-react';

// Utility to generate the last 12 weeks of dates (84 days)
function getLastNDates(n) {
  const dates = [];
  const today = new Date();
  // Normalize to start of day
  today.setHours(0, 0, 0, 0);
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d);
  }
  return dates;
}

// Build week columns like GitHub heatmap: columns = weeks, rows = days (Sun..Sat)
function groupByWeek(dates) {
  const weeks = [];
  let week = [];
  dates.forEach((date) => {
    // JavaScript: 0 = Sunday ... 6 = Saturday
    const day = date.getDay();
    week.push(date);
    if (day === 6) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) {
    // pad remaining to Saturday with future placeholders (won't render)
    weeks.push(week);
  }
  return weeks;
}

function intensityToColor(value, mode) {
  // value 0..4
  const palettes = {
    solved: [
      'bg-gray-800',
      'bg-emerald-800/70',
      'bg-emerald-700',
      'bg-emerald-600',
      'bg-emerald-400',
    ],
    attempted: [
      'bg-gray-800',
      'bg-sky-800/70',
      'bg-sky-700',
      'bg-sky-600',
      'bg-sky-400',
    ],
  };
  return palettes[mode][Math.max(0, Math.min(4, value))];
}

export default function StudyHeatMap() {
  const [mode, setMode] = useState('solved'); // 'solved' | 'attempted'

  // Fake sample data for demo: deterministic-ish based on date string
  const data = useMemo(() => {
    const days = getLastNDates(84);
    return days.map((d) => {
      const key = d.toISOString().slice(0, 10);
      // Simple hash to keep values stable per date
      let hash = 0;
      for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 997;
      const solved = Math.floor(((hash % 100) / 100) * 4); // 0..3
      const attempted = Math.floor((((hash * 7) % 100) / 100) * 4); // 0..3
      return { date: d, solved, attempted };
    });
  }, []);

  const weeks = useMemo(() => groupByWeek(data.map((d) => d.date)), [data]);
  const map = useMemo(() => {
    const m = new Map();
    data.forEach((d) => {
      m.set(d.date.toDateString(), d);
    });
    return m;
  }, [data]);

  const legendSteps = [0, 1, 2, 3, 4];

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-white/80" />
          <h3 className="text-base md:text-lg font-semibold text-white">Study Heat Map</h3>
        </div>
        <div className="inline-flex items-center rounded-lg bg-white/10 p-1 text-sm">
          <button
            className={`px-3 py-1 rounded-md transition ${
              mode === 'solved' ? 'bg-white/20 shadow text-white' : 'text-white/70'
            }`}
            onClick={() => setMode('solved')}
          >
            Solved
          </button>
          <button
            className={`px-3 py-1 rounded-md transition ${
              mode === 'attempted' ? 'bg-white/20 shadow text-white' : 'text-white/70'
            } flex items-center gap-1`}
            onClick={() => setMode('attempted')}
          >
            <Layers className="w-4 h-4" /> Attempted
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Weekday labels */}
        <div className="flex flex-col text-xs text-white/50 pt-6 gap-[6px]">
          {['Sun', 'Tue', 'Thu', 'Sat'].map((d) => (
            <span key={d} className="h-3.5 leading-3.5">{d}</span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="overflow-x-auto">
          <div className="flex gap-1">
            {weeks.map((weekDates, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const date = weekDates.find((d) => d.getDay() === dayIndex);
                  if (!date) {
                    return <div key={dayIndex} className="w-3.5 h-3.5 bg-white/10 rounded" />;
                  }
                  const d = map.get(date.toDateString());
                  const value = mode === 'solved' ? d.solved : d.attempted;
                  const bg = intensityToColor(value, mode);
                  const tooltip = `${date.toLocaleDateString()} — ${
                    mode === 'solved' ? `${d.solved} solved` : `${d.attempted} attempted`
                  }`;
                  return (
                    <div
                      key={dayIndex}
                      className={`w-3.5 h-3.5 rounded transition-colors ${bg}`}
                      title={tooltip}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {legendSteps.map((s) => (
              <span
                key={s}
                className={`w-3.5 h-3.5 rounded ${intensityToColor(s, mode)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
        <div className="text-xs text-white/60">Last 12 weeks</div>
      </div>
    </div>
  );
}
