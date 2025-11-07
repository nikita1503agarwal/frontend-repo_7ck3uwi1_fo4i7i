import React from 'react';

function clampPercent(v) {
  if (typeof v !== 'number' || Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(100, v));
}

const gradients = [
  'from-purple-400 via-fuchsia-400 to-pink-400',
  'from-emerald-400 via-cyan-400 to-sky-400',
  'from-amber-400 via-orange-400 to-rose-400',
  'from-blue-400 via-indigo-400 to-violet-400',
];

export default function LanguageProgressBars({ items = [] }) {
  const list = items.length
    ? items
    : [
        { label: 'JavaScript', value: 78 },
        { label: 'Python', value: 64 },
        { label: 'TypeScript', value: 52 },
        { label: 'Rust', value: 28 },
      ];

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
      <h3 className="text-white font-semibold">Language Progress</h3>
      <div className="mt-4 space-y-4">
        {list.map((item, idx) => {
          const pct = clampPercent(item.value);
          const g = gradients[idx % gradients.length];
          return (
            <div key={item.label} className="">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">{item.label}</span>
                <span className="text-white/60">{pct}%</span>
              </div>
              <div className="mt-2 h-2.5 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${g}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
