import React from 'react';
import { Pencil, Flame } from 'lucide-react';

export default function ProfileHeader({ name, role, streak, avatarUrl, onEdit }) {
  const initial = name?.[0]?.toUpperCase?.() || 'U';

  return (
    <div className="flex items-center justify-between p-5 md:p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
      {/* Left side: avatar + vertical stack of name/role + edit button */}
      <div className="flex items-center gap-4 md:gap-5">
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 border border-white/10 flex items-center justify-center">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl md:text-2xl font-semibold text-white/80">{initial}</span>
          )}
        </div>
        <div className="min-w-0 flex flex-col">
          <h2 className="text-lg md:text-xl font-semibold text-white truncate">{name}</h2>
          <p className="text-sm text-white/60 mt-0.5 truncate">{role}</p>
          <div className="mt-3">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white transition text-sm"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right side: streak badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-300/20">
        <Flame className="w-4 h-4" />
        <span className="text-xs font-medium">{streak} day streak</span>
      </div>
    </div>
  );
}
