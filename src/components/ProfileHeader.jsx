import React from 'react';
import { User, Flame, Pencil } from 'lucide-react';

export default function ProfileHeader({ name, role, streakDays, onEdit }) {
  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 flex items-center justify-between gap-4">
      {/* Left: avatar + stacked name/role/edit */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-emerald-400">
          <User className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <div className="text-white font-semibold truncate">{name}</div>
          <div className="text-sm text-white/70 truncate">{role}</div>
          <button
            onClick={onEdit}
            className="mt-2 inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-1.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/30 transition"
          >
            <Pencil className="h-4 w-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Right: streak badge */}
      <div className="shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-400/20">
          <Flame className="h-5 w-5" />
          <span className="text-sm font-medium">{streakDays} day streak</span>
        </div>
      </div>
    </div>
  );
}
