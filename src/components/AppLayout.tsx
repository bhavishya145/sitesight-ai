import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Camera,
  Layers,
  SlidersHorizontal,
  FileText,
  AlertTriangle,
  Settings,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { Logo } from './Logo.tsx';
import type {
  ConstructionProject,
  SystemAlert,
  UserProfile,
} from '../types/index.ts';

interface AppLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  projects: ConstructionProject[];
  selectedProject: ConstructionProject;
  onSelectProject: (project: ConstructionProject) => void;
  alerts: SystemAlert[];
  user: UserProfile;
  onLogout: () => void;
  onBackToLanding: () => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentTab,
  onSelectTab,
  projects,
  selectedProject,
  onSelectProject,
  alerts,
  user,
  onLogout,
  onBackToLanding,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unresolvedAlertsCount = alerts.filter((a) => a.status === 'unresolved').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'My Projects', icon: Building2 },
    { id: 'analysis', label: 'Image Analysis', icon: Camera },
    { id: 'timeline', label: 'Progress Timeline', icon: Layers },
    { id: 'comparisons', label: 'Comparisons', icon: SlidersHorizontal },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: unresolvedAlertsCount > 0 ? unresolvedAlertsCount : undefined },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F5F6F3] text-[#101A2C] flex">
      {/* Sidebar (Desktop 260px) */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-30 bg-[#101A2C] text-white border-r border-slate-800">
        {/* Brand Lockup */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
          <Logo size="sm" lightMode />
        </div>

        {/* Project Selector Mini-Widget in Sidebar */}
        <div className="p-4 border-b border-slate-800/80">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
            Active Construction Scope
          </label>
          <div className="relative">
            <select
              value={selectedProject.id}
              onChange={(e) => {
                const found = projects.find((p) => p.id === e.target.value);
                if (found) onSelectProject(found);
              }}
              className="w-full text-xs font-semibold text-white bg-slate-900 border border-slate-700 rounded-md py-2 px-2.5 pr-8 appearance-none focus:outline-none focus:border-[#FF8A32]"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
          <div className="mt-1.5 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="truncate">{selectedProject.city}</span>
            <span className="font-mono text-[#36C6B0]">{selectedProject.projectCode}</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#FF8A32] text-white font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white text-[#FF8A32]' : 'bg-red-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer: Back to Landing & Engineer badge */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <button
            onClick={onBackToLanding}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Landing Page</span>
          </button>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <div className="w-7 h-7 rounded-full bg-[#FF8A32] text-white font-extrabold flex items-center justify-center text-xs shrink-0">
              {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div className="overflow-hidden">
              <div className="font-semibold text-white truncate text-[11px]">{user.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{user.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-md text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Trail */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">SiteSight Platform</span>
              <span>/</span>
              <span className="font-bold text-[#101A2C] capitalize">{currentTab}</span>
              <span>/</span>
              <span className="text-slate-400 font-mono">{selectedProject.projectCode}</span>
            </div>
          </div>

          {/* Right Header Zone */}
          <div className="flex items-center gap-3">
            {/* Calendar Date Indicator */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <span>{currentDateFormatted}</span>
            </div>

            <div className="h-4 w-px bg-slate-200 hidden md:block" />

            {/* Human Verification Indicator Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-teal-50 border border-teal-200 text-teal-900 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#36C6B0]" />
              <span>Human-Verified Protocol</span>
            </div>

            {/* Alert Bell Shortcut */}
            <button
              onClick={() => onSelectTab('alerts')}
              className="relative p-2 rounded-md text-slate-600 hover:text-[#101A2C] hover:bg-slate-100 transition-colors"
              title="Exceptions & Alerts"
            >
              <Bell className="w-4 h-4" />
              {unresolvedAlertsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </button>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-100 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-full bg-[#101A2C] text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 text-xs z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900 block truncate">{user.name}</span>
                    <span className="text-slate-500 block truncate text-[11px]">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectTab('settings');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 border-t border-slate-100"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Slide-out Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 bg-[#101A2C] text-white flex flex-col z-50 p-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <Logo size="sm" lightMode />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-1 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg ${
                        isActive ? 'bg-[#FF8A32] text-white font-bold' : 'text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.2 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    onBackToLanding();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-xs text-slate-300 hover:text-white"
                >
                  Landing Page
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-xs text-red-400"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
