import React, { useState } from 'react';
import { CustomNames } from '../types';
import { PRESET_NAME_PACKAGES } from '../utils/nameFormatter';
import { UserCheck, Sparkles, Check, X, ShieldAlert, Users, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/sound';

interface NameManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customNames: CustomNames;
  onSaveNames: (newNames: CustomNames) => void;
}

export const NameManagerModal: React.FC<NameManagerModalProps> = ({
  isOpen,
  onClose,
  customNames,
  onSaveNames,
}) => {
  const [formData, setFormData] = useState<CustomNames>({ ...customNames });
  const [activeTab, setActiveTab] = useState<'FORM' | 'PRESETS'>('FORM');

  if (!isOpen) return null;

  const handleChange = (field: keyof CustomNames, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (pkg: typeof PRESET_NAME_PACKAGES[0]) => {
    sounds.playClick();
    setFormData({ ...pkg.names });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playPaperFlip();
    onSaveNames(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-600/40 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border-b border-amber-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-amber-200">
                Provide & Custom Character Names
              </h2>
              <p className="text-xs text-amber-400/80">
                Specify custom names for the detective, victim, and suspects at any time.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-5 pt-3">
          <button
            onClick={() => setActiveTab('FORM')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'FORM'
                ? 'border-amber-500 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Custom Name Inputs
          </button>
          <button
            onClick={() => setActiveTab('PRESETS')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'PRESETS'
                ? 'border-amber-500 text-amber-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Quick Name Packages
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'FORM' ? (
            <form id="name-form" onSubmit={handleSubmit} className="space-y-4">
              
              {/* Lead Roles Section */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block">
                  Lead Roles
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      🕵️ Detective Name
                    </label>
                    <input
                      type="text"
                      value={formData.detective}
                      onChange={(e) => handleChange('detective', e.target.value)}
                      placeholder="e.g. Detective Vance"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-amber-100 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      💀 Victim Name
                    </label>
                    <input
                      type="text"
                      value={formData.victim}
                      onChange={(e) => handleChange('victim', e.target.value)}
                      placeholder="e.g. Lord Sterling"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-rose-200 focus:outline-none focus:border-rose-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    🏰 Crime Scene / Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g. Blackwood Manor"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Suspects Section */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block">
                  Suspect Names (Will replace in conversation & clues)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      👤 Suspect 1 Name
                    </label>
                    <input
                      type="text"
                      value={formData.suspect1}
                      onChange={(e) => handleChange('suspect1', e.target.value)}
                      placeholder="e.g. Benedict / Bob"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      👤 Suspect 2 Name
                    </label>
                    <input
                      type="text"
                      value={formData.suspect2}
                      onChange={(e) => handleChange('suspect2', e.target.value)}
                      placeholder="e.g. Dr. Cross / Clara"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      👤 Suspect 3 Name
                    </label>
                    <input
                      type="text"
                      value={formData.suspect3}
                      onChange={(e) => handleChange('suspect3', e.target.value)}
                      placeholder="e.g. Victoria / David"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      👤 Suspect 4 Name
                    </label>
                    <input
                      type="text"
                      value={formData.suspect4}
                      onChange={(e) => handleChange('suspect4', e.target.value)}
                      placeholder="e.g. Julian / Emma"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

            </form>
          ) : (
            /* Presets Tab */
            <div className="space-y-3">
              <p className="text-xs text-slate-400 mb-2">
                Click any preset theme to load pre-formatted character name packages:
              </p>
              {PRESET_NAME_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handleApplyPreset(pkg)}
                  className="p-4 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <h3 className="text-sm font-serif font-bold text-amber-200 group-hover:text-amber-300">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-400">{pkg.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="text-[10px] bg-slate-900 text-amber-400 px-2 py-0.5 rounded border border-slate-700">
                        Victim: {pkg.names.victim}
                      </span>
                      <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        Suspects: {pkg.names.suspect1}, {pkg.names.suspect2}, {pkg.names.suspect3}, {pkg.names.suspect4}
                      </span>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-500/50 group-hover:text-amber-400 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="name-form"
            onClick={(e) => {
              if (activeTab === 'PRESETS') {
                handleSubmit(e);
              }
            }}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-900/30 transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Apply Character Names</span>
          </button>
        </div>

      </div>
    </div>
  );
};
