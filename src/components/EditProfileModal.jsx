import React, { useEffect, useRef, useState } from 'react';

export default function EditProfileModal({ open, initial, onClose, onSave }) {
  const [name, setName] = useState(initial?.name || '');
  const [role, setRole] = useState(initial?.role || '');
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatarUrl || '');
  const inputRef = useRef(null);

  useEffect(() => {
    setName(initial?.name || '');
    setRole(initial?.role || '');
    setAvatarUrl(initial?.avatarUrl || '');
  }, [initial, open]);

  if (!open) return null;

  const onPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarUrl(String(ev.target?.result || ''));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave?.({ name, role, avatarUrl });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto rounded-2xl bg-neutral-900 border border-white/10 p-5 md:p-6">
        <h3 className="text-lg font-semibold text-white">Edit Profile</h3>
        <p className="text-sm text-white/60 mt-1">Update your display details</p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-white/80">Avatar</label>
            <div className="mt-2 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">None</div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm border border-white/15"
                  onClick={() => inputRef.current?.click()}
                >Upload</button>
                {avatarUrl && (
                  <button
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm border border-white/15"
                    onClick={() => setAvatarUrl('')}
                  >Remove</button>
                )}
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-white/80">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-2 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          <div>
            <label className="text-sm text-white/80">Career</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Frontend Developer"
              className="mt-2 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-xl bg-white text-black font-medium" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
