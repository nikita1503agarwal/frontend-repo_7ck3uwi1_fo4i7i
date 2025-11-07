import React from 'react';
import { CalendarClock, Check, BookOpen, Dumbbell } from 'lucide-react';

const items = [
  { time: 'Today', text: 'Completed "Module 3: Async Patterns"', icon: BookOpen, color: 'text-indigo-600' },
  { time: 'Yesterday', text: 'Workout: Upper Body - 45 mins', icon: Dumbbell, color: 'text-emerald-600' },
  { time: 'Mon', text: 'Checked off 3 tasks', icon: Check, color: 'text-amber-600' },
];

const ActivityTimeline = () => {
  return (
    <section className="w-full rounded-2xl bg-white/70 backdrop-blur border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <CalendarClock className="text-indigo-600" size={20} />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <ol className="relative border-l border-gray-200 ml-2 pl-6">
        {items.map(({ time, text, icon: Icon, color }) => (
          <li key={time} className="mb-6">
            <span className={`absolute -left-2 top-0 h-4 w-4 rounded-full bg-white border-2 border-gray-200 grid place-items-center`}>
              <Icon size={12} className={color} />
            </span>
            <div className="text-sm text-gray-500">{time}</div>
            <div className="text-gray-800">{text}</div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ActivityTimeline;
