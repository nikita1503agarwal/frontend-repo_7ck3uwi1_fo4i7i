import React, { useState } from 'react';
import HeroSpline from './components/HeroSpline';
import ProfileHeader from './components/ProfileHeader';
import ProgressTracker from './components/ProgressTracker';
import StudyHeatMap from './components/StudyHeatMap';
import LanguageProgressBars from './components/LanguageProgressBars';
import EditProfileModal from './components/EditProfileModal';
import CompletionDonut from './components/CompletionDonut';

export default function App() {
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    role: 'Full‑Stack Learner',
    streakDays: 14,
    avatarUrl: '',
  });
  const [editing, setEditing] = useState(false);

  // Example counts used for the donut and stats
  const solved = 72;
  const attempted = 21;
  const unsolved = 9;

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSpline />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 -mt-12 space-y-6">
        <ProfileHeader
          name={profile.name}
          role={profile.role}
          streakDays={profile.streakDays}
          onEdit={() => setEditing(true)}
        />

        <ProgressTracker overall={66} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StudyHeatMap mode="solved" />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <CompletionDonut solved={solved} attempted={attempted} unsolved={unsolved} />
            <LanguageProgressBars />
          </div>
        </div>
      </main>

      <EditProfileModal
        open={editing}
        initial={profile}
        onClose={() => setEditing(false)}
        onSave={(data) => setProfile((p) => ({ ...p, ...data }))}
      />
    </div>
  );
}
