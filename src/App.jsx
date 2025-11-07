import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProgressTracker from './components/ProgressTracker';
import AchievementBadges from './components/AchievementBadges';
import ActivityTimeline from './components/ActivityTimeline';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-violet-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Profile</h1>
          <p className="text-gray-600 mt-1">Track your progress, streaks, and recent activity.</p>
        </div>

        {/* Profile Header */}
        <ProfileHeader name="Alex Johnson" role="Full‑Stack Learner" streak={8} />

        {/* Main Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProgressTracker progress={62} completed={14} total={22} />
            <AchievementBadges />
          </div>
          <div className="lg:col-span-1">
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
