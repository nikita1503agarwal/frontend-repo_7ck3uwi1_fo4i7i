import React, { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProgressTracker from './components/ProgressTracker';
import StudyHeatMap from './components/StudyHeatMap';
import ActivityTimeline from './components/ActivityTimeline';
import EditProfileModal from './components/EditProfileModal';

function App() {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    role: 'Full‑Stack Learner',
    streak: 8,
    avatarUrl: '',
  });
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-violet-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Profile</h1>
          <p className="text-gray-600 mt-1">Track your progress, streaks, and recent activity.</p>
        </div>

        {/* Profile Header */}
        <ProfileHeader
          name={profile.name}
          role={profile.role}
          streak={profile.streak}
          avatarUrl={profile.avatarUrl}
          onEdit={() => setOpenEdit(true)}
        />

        {/* Main Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProgressTracker progress={62} completed={14} total={22} />
            <StudyHeatMap />
          </div>
          <div className="lg:col-span-1">
            <ActivityTimeline />
          </div>
        </div>
      </div>

      <EditProfileModal
        open={openEdit}
        initial={profile}
        onClose={() => setOpenEdit(false)}
        onSave={(updates) => setProfile((p) => ({ ...p, ...updates }))}
      />
    </div>
  );
}

export default App;
