import React from 'react';

const gradients = {
  javascript: 'from-yellow-400 via-amber-400 to-orange-400',
  typescript: 'from-sky-400 via-blue-400 to-indigo-400',
  python: 'from-emerald-400 via-teal-400 to-cyan-400',
  java: 'from-red-400 via-rose-400 to-pink-400',
  go: 'from-cyan-400 via-sky-400 to-blue-400',
  rust: 'from-orange-400 via-amber-500 to-yellow-500',
  csharp: 'from-violet-400 via-purple-400 to-fuchsia-400',
};

function LangRow({ label, percent }) {
  const pct = Math.max(0, Math.min(100, Number(percent) || 0));
  const key = label?.toLowerCase?.() || '';
  const grad = gradients[key] || 'from-indigo-400 via-fuchsia-400 to-pink-400';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/90">{label}</span>
        <span className="text-xs text-white/60">{pct}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${grad}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function LanguageProgressBars({ data }) {
  const items = data && Array.isArray(data) ? data : [
    { label: 'JavaScript', percent: 82 },
    { label: 'TypeScript', percent: 68 },
    { label: 'Python', percent: 74 },
    { label: 'Go', percent: 41 },
  ];

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-white">Language Progress</h3>
        <span className="text-xs text-white/50">Across recent challenges</span>
      </div>
      <div className="space-y-4">
        {items.map((it) => (
          <LangRow key={it.label} label={it.label} percent={it.percent} />
        ))}
      </div>
    </div>
  );
}
