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

        {/* Layout: Left = Language Bars, Center = Heat Map, Right = Compact Completion Card */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left side: Language progress */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <LanguageProgressBars />
          </div>

          {/* Center: Heat map spans 2 columns on large screens */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <StudyHeatMap mode="solved" />
          </div>

          {/* Right side: Compact completion donut */}
          <div className="lg:col-span-1 order-3">
            <CompletionDonut solved={solved} attempted={attempted} unsolved={unsolved} />
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
