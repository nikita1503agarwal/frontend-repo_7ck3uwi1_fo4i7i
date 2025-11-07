import React, { useState } from 'react';
import HeroSpline from './components/HeroSpline';
import ProfileHeader from './components/ProfileHeader';
import ProgressTracker from './components/ProgressTracker';
import LanguageProgressBars from './components/LanguageProgressBars';
import EditProfileModal from './components/EditProfileModal';

export default function App() {
  const [openEdit, setOpenEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    role: 'Full‑Stack Developer',
    streak: 12,
    avatarUrl: '',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-6 md:space-y-8">
        <HeroSpline />

        <ProfileHeader
          name={profile.name}
          role={profile.role}
          streak={profile.streak}
          avatarUrl={profile.avatarUrl}
          onEdit={() => setOpenEdit(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-5 lg:col-span-2">
            <ProgressTracker completed={34} total={50} />
            <LanguageProgressBars />
          </div>

          <div className="space-y-5">
            <div className="p-5 md:p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
              <h3 className="text-base md:text-lg font-semibold text-white">Recent Activity</h3>
              <ul className="mt-3 space-y-3 text-sm text-white/80">
                <li>Completed: Binary Search Trees</li>
                <li>Attended: Weekly DS&A session</li>
                <li>Started: React Context deep dive</li>
                <li>Reviewed: Async patterns in JS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        open={openEdit}
        initial={profile}
        onClose={() => setOpenEdit(false)}
        onSave={(val) => setProfile((p) => ({ ...p, ...val }))}
      />
    </div>
  );
}
