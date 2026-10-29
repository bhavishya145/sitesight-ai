import React, { useState } from 'react';
import {
  Building2,
  Plus,
  MapPin,
  Calendar,
  User,
  Layers,
  Edit2,
  Trash2,
  Archive,
  ArrowRight,
  Camera,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import type { ConstructionProject, ProjectType, ConstructionStage } from '../types/index.ts';

interface ProjectManagerProps {
  projects: ConstructionProject[];
  selectedProject: ConstructionProject;
  onSelectProject: (project: ConstructionProject) => void;
  onProjectCreated: (newProject: ConstructionProject) => void;
  onProjectUpdated: (updatedProject: ConstructionProject) => void;
  onProjectDeleted: (projectId: string) => void;
  onNavigate: (tab: string) => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  onProjectCreated,
  onProjectUpdated,
  onProjectDeleted,
  onNavigate,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ConstructionProject | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [type, setType] = useState<ProjectType>('commercial');
  const [clientName, setClientName] = useState('');
  const [projectManager, setProjectManager] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedCompletionDate, setExpectedCompletionDate] = useState('2028-12-31');
  const [description, setDescription] = useState('');
  const [manualProgress, setManualProgress] = useState(10);
  const [currentStage, setCurrentStage] = useState<ConstructionStage>('Foundation');
  const [baselineImageUrl, setBaselineImageUrl] = useState('/src/assets/images/site_foundation_stage_1793248328718.jpg');

  const openCreateModal = () => {
    setEditingProject(null);
    setName('');
    setProjectCode(`PRJ-${Math.floor(100 + Math.random() * 900)}`);
    setLocation('');
    setCity('Bengaluru');
    setState('Karnataka');
    setType('commercial');
    setClientName('');
    setProjectManager('Er. Rajesh K. Varma');
    setStartDate(new Date().toISOString().split('T')[0]);
    setExpectedCompletionDate('2028-06-30');
    setDescription('');
    setManualProgress(15);
    setCurrentStage('Foundation');
    setShowCreateModal(true);
  };

  const openEditModal = (p: ConstructionProject) => {
    setEditingProject(p);
    setName(p.name);
    setProjectCode(p.projectCode);
    setLocation(p.location);
    setCity(p.city);
    setState(p.state);
    setType(p.type);
    setClientName(p.clientName);
    setProjectManager(p.projectManager);
    setStartDate(p.startDate);
    setExpectedCompletionDate(p.expectedCompletionDate);
    setDescription(p.description);
    setManualProgress(p.manualProgressPercent);
    setCurrentStage(p.currentEstimatedStage);
    setBaselineImageUrl(p.baselineImageUrl);
    setShowCreateModal(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProject) {
      // Update
      try {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            projectCode,
            location,
            city,
            state,
            type,
            clientName,
            projectManager,
            startDate,
            expectedCompletionDate,
            description,
            manualProgressPercent: manualProgress,
            currentEstimatedStage: currentStage,
            baselineImageUrl,
          }),
        });
        if (!res.ok) throw new Error('Update failed');
        const updated = await res.json();
        onProjectUpdated(updated);
        setShowCreateModal(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      // Create
      try {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            projectCode,
            location,
            city,
            state,
            type,
            clientName,
            projectManager,
            startDate,
            expectedCompletionDate,
            description,
            baselineImageUrl,
            currentEstimatedStage: currentStage,
          }),
        });
        if (!res.ok) throw new Error('Create failed');
        const created = await res.json();
        onProjectCreated(created);
        setShowCreateModal(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteProject = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This removes all associated images and reports.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        onProjectDeleted(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#101A2C]">
            Construction Project Portfolio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage active developments, assign site managers, establish baseline survey photos, and configure milestones.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-3.5 py-2 text-xs font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Create New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => {
          const isSelected = selectedProject.id === p.id;

          return (
            <div
              key={p.id}
              className={`bg-white rounded-xl border transition-all shadow-xs overflow-hidden flex flex-col ${
                isSelected
                  ? 'border-[#101A2C] ring-2 ring-[#101A2C]/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Baseline Image Header */}
              <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
                <img
                  src={p.baselineImageUrl}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur uppercase">
                    {p.type}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF8A32] text-white font-bold">
                    {p.projectCode}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h3 className="font-bold text-sm leading-tight drop-shadow-sm truncate">
                    {p.name}
                  </h3>
                  <div className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#36C6B0]" />
                    <span className="truncate">{p.city}, {p.state}</span>
                  </div>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Current Phase:</span>
                    <span className="font-bold text-[#101A2C] text-right truncate max-w-[160px]">
                      {p.currentEstimatedStage}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Client / Developer:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[160px]">
                      {p.clientName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Project Manager:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[160px]">
                      {p.projectManager}
                    </span>
                  </div>

                  {/* Manual Progress Bar vs Photos */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500 font-semibold">Manual Progress Track</span>
                      <span className="font-mono font-bold text-slate-800">{p.manualProgressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#FF8A32] h-full rounded-full"
                        style={{ width: `${p.manualProgressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>{p.totalImagesCount} photographic records</span>
                    <span className="text-emerald-700 font-semibold">{p.verifiedImagesCount} verified</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      onSelectProject(p);
                      onNavigate('dashboard');
                    }}
                    className={`px-3 py-1.5 rounded-md font-bold text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#101A2C] text-white'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? 'Active Scope' : 'Select Scope'}
                  </button>

                  <div className="flex items-center gap-1 text-slate-500">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 hover:text-slate-900 hover:bg-slate-100 rounded"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {projects.length > 1 && (
                      <button
                        onClick={() => handleDeleteProject(p.id, p.name)}
                        className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 text-[#101A2C] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#101A2C]">
                {editingProject ? 'Edit Construction Project' : 'Register New Construction Project'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Prestige Tech Park 4"
                    className="w-full px-3 py-1.5 rounded border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Code</label>
                  <input
                    type="text"
                    value={projectCode}
                    onChange={(e) => setProjectCode(e.target.value)}
                    placeholder="e.g. BLR-PTP-04"
                    className="w-full px-3 py-1.5 rounded border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Asset Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ProjectType)}
                    className="w-full px-3 py-1.5 rounded border border-slate-300 bg-white"
                  >
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                    <option value="industrial">Industrial</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Site Address / Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Marathahalli-Sarjapur Outer Ring Road"
                  className="w-full px-3 py-1.5 rounded border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Client Developer *</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Prestige Estates Ltd"
                    className="w-full px-3 py-1.5 rounded border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Manager / Lead Engineer</label>
                  <input
                    type="text"
                    value={projectManager}
                    onChange={(e) => setProjectManager(e.target.value)}
                    placeholder="e.g. Er. Sunita Rao"
                    className="w-full px-3 py-1.5 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Expected Completion</label>
                  <input
                    type="date"
                    value={expectedCompletionDate}
                    onChange={(e) => setExpectedCompletionDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Description & Scope</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Describe building specifications, floor count, structural system..."
                  className="w-full px-3 py-1.5 rounded border border-slate-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-colors"
                >
                  {editingProject ? 'Save Changes' : 'Register Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
