import React, { useMemo } from 'react';

function StatRow({ color, label, value }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="text-sm text-zinc-300">{label}</span>
      </div>
      <span className="text-sm font-semibold text-zinc-100">{value}</span>
    </div>
  );
}

export default function CompletionDonut({ solved = 42, attempted = 18, unsolved = 8 }) {
  const { total, completedPct, remaining } = useMemo(() => {
    const totalCount = Math.max(1, solved + attempted + unsolved);
    const pct = Math.min(100, Math.max(0, Math.round((solved / totalCount) * 100)));
    const remainingCount = Math.max(0, totalCount - solved);
    return { total: totalCount, completedPct: pct, remaining: remainingCount };
  }, [solved, attempted, unsolved]);

  const size = 140; // svg size
  const stroke = 14; // stroke width
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - completedPct / 100);

  return (
    <section className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-xl p-5 sm:p-6 w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-white">Completion Overview</h3>
        <span className="text-xs sm:text-sm text-zinc-400">{total} total</span>
      </div>

      {/* Square bar (overall) */}
      <div className="mb-5">
        <div className="h-3 w-full rounded-md bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400"
            style={{ width: `${completedPct}%` }}
          />
        </div>
        <div className="mt-1.5 text-xs text-zinc-400">{completedPct}% completed</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Donut */}
        <div className="flex items-center justify-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
              {/* background ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#27272a"
                strokeWidth={stroke}
                fill="none"
              />
              {/* completed ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#grad)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                fill="none"
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#a3e635" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-white">{solved}</div>
              <div className="text-xs text-zinc-400">completed</div>
            </div>
          </div>
        </div>

        {/* Right stats */}
        <div className="">
          <StatRow color="bg-emerald-500" label="Solved" value={solved} />
          <StatRow color="bg-amber-400" label="Attempted" value={attempted} />
          <StatRow color="bg-rose-500" label="Unsolved" value={unsolved} />

          <div className="mt-4 text-xs text-zinc-400">
            Remaining: <span className="text-zinc-200 font-medium">{remaining}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
