import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Cpu,
  Save,
  CheckCircle2,
  Lock,
  Building,
  Mail,
  Info,
} from 'lucide-react';
import type { UserProfile } from '../types/index.ts';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
  onLogout,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [organization, setOrganization] = useState(user.organization);
  const [prefs, setPrefs] = useState(user.notificationPreferences);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      role,
      organization,
      notificationPreferences: prefs,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#101A2C]">
            Engineer Profile & Governance Settings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure technical auditor credentials, inspection notification rules, and statutory compliance standards.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile and inspection preferences successfully updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Details Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#101A2C] border-b border-slate-100 pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-[#FF8A32]" />
            Inspection Engineer Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#FF8A32]"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Registered Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#FF8A32]"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Technical Designation / Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#FF8A32]"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Organization / Auditing Body</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#FF8A32]"
                required
              />
            </div>
          </div>
        </div>

        {/* Vision AI Engine Status Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#101A2C] border-b border-slate-100 pb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#36C6B0]" />
            AI Vision Engine Architecture
          </h3>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block">
                Gemini 3.8 Flash Vision Pipeline (Server-Side)
              </span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Configured with multimodal reasoning across the 11 standardized construction stages. Extracts visible materials, equipment, and identifies category discrepancies between contractor tags and true photographic evidence.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Rules */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-[#101A2C] border-b border-slate-100 pb-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-500" />
            Notification & Quality Alert Rules
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.mismatchAlerts}
                onChange={(e) => setPrefs({ ...prefs, mismatchAlerts: e.target.checked })}
                className="w-4 h-4 rounded text-[#FF8A32] focus:ring-[#FF8A32]"
              />
              <div>
                <span className="font-semibold text-slate-800 block">
                  Category Mismatch Immediate Alerts
                </span>
                <span className="text-slate-500 text-[11px]">
                  Flag whenever contractor-submitted category conflicts with visual stage estimate.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.qualityIssues}
                onChange={(e) => setPrefs({ ...prefs, qualityIssues: e.target.checked })}
                className="w-4 h-4 rounded text-[#FF8A32] focus:ring-[#FF8A32]"
              />
              <div>
                <span className="font-semibold text-slate-800 block">
                  Low Quality & Blurry Image Rejection
                </span>
                <span className="text-slate-500 text-[11px]">
                  Notify site supervisor immediately when uploaded photos are too dark or obstructed.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={prefs.weeklySummaries}
                onChange={(e) => setPrefs({ ...prefs, weeklySummaries: e.target.checked })}
                className="w-4 h-4 rounded text-[#FF8A32] focus:ring-[#FF8A32]"
              />
              <div>
                <span className="font-semibold text-slate-800 block">
                  Weekly Client Dossier Compilation
                </span>
                <span className="text-slate-500 text-[11px]">
                  Generate automated 7-day milestone digest ready for engineering review.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Compliance & Standards */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#101A2C] border-b border-slate-100 pb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            Statutory Standards & Compliance Alignment
          </h3>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            SiteSight AI is aligned with Indian standard code of practice for plain and reinforced concrete (IS 456), National Building Code (NBC 2016), and Real Estate (Regulation and Development) Act (RERA) photographic milestone documentation guidelines.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
