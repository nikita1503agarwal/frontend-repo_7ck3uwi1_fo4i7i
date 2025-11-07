import React from 'react';
import { User, Settings, Share2 } from 'lucide-react';

const ProfileHeader = ({ name, role, streak }) => {
  return (
    <section className="w-full rounded-2xl bg-white/70 backdrop-blur border border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 grid place-items-center text-white text-3xl font-semibold shadow">
            {name?.[0] || 'U'}
          </div>
          <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow">{streak}d 🔥</span>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
          <p className="text-gray-600 mt-1">{role}</p>
          <div className="mt-4 flex gap-3 justify-center sm:justify-start">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
              <User size={18} /> Edit Profile
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
              <Share2 size={18} /> Share
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
