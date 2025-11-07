import React, { useEffect, useRef, useState } from 'react';
import { X, Upload } from 'lucide-react';

export default function EditProfileModal({ open, initial, onClose, onSave }) {
  const [name, setName] = useState(initial?.name || '');
  const [career, setCareer] = useState(initial?.role || '');
  const [avatar, setAvatar] = useState(initial?.avatarUrl || '');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      setName(initial?.name || '');
      setCareer(initial?.role || '');
      setAvatar(initial?.avatarUrl || '');
    }
  }, [open, initial]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result?.toString() || '');
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: name.trim(), role: career.trim(), avatarUrl: avatar });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-gray-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="edit-profile-title" className="text-xl font-semibold text-gray-900">Edit Profile</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar preview"
                  className="h-20 w-20 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 grid place-items-center text-white text-3xl font-semibold">
                  {name?.[0] || 'U'}
                </div>
              )}
            </div>
            <div>
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">
                <Upload className="w-4 h-4" /> Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
              </label>
              {avatar && (
                <button
                  type="button"
                  className="ml-3 text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => setAvatar('')}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Career</label>
            <input
              type="text"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              placeholder="e.g., Frontend Developer, Data Scientist"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
