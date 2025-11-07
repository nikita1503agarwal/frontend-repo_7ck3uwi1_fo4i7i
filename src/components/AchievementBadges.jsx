import React from 'react';
import { Trophy, Flame, Sparkles } from 'lucide-react';

const badges = [
  { icon: Trophy, label: 'Top Performer', color: 'from-amber-500 to-yellow-500' },
  { icon: Flame, label: '7-day Streak', color: 'from-rose-500 to-orange-500' },
  { icon: Sparkles, label: 'Consistency Star', color: 'from-violet-500 to-indigo-500' },
];

const AchievementBadges = () => {
  return (
    <section className="w-full rounded-2xl bg-white/70 backdrop-blur border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {badges.map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white">
            <div className={`h-10 w-10 rounded-lg bg-gradient-to-tr ${color} grid place-items-center text-white`}>
              <Icon size={20} />
            </div>
            <span className="text-gray-800 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementBadges;
