import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Filter,
  Check,
  X,
  Edit2,
  ShieldCheck,
  Building2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import type {
  ConstructionProject,
  SiteImage,
  ConstructionStage,
} from '../types/index.ts';

interface ProgressTimelineViewProps {
  project: ConstructionProject;
  images: SiteImage[];
  onVerifyImage: (imageId: string, status: 'confirmed' | 'corrected' | 'rejected', stage?: ConstructionStage, notes?: string) => void;
  onNavigate: (tab: string) => void;
}

const ALL_STAGES: ConstructionStage[] = [
  'Site preparation',
  'Excavation',
  'Foundation',
  'Plinth and ground-level work',
  'Structural framework and superstructure',
  'Masonry and walls',
  'Roofing',
  'Facade and exterior finishing',
  'Plumbing and electrical services',
  'Interior finishing',
  'Final inspection and handover',
];

export const ProgressTimelineView: React.FC<ProgressTimelineViewProps> = ({
  project,
  images,
  onVerifyImage,
  onNavigate,
}) => {
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('all');
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editStage, setEditStage] = useState<ConstructionStage>('Foundation');
  const [editNotes, setEditNotes] = useState('');

  // Extract unique zones
  const zones = Array.from(new Set(images.map((img) => img.zone).filter(Boolean)));

  // Filter images
  const filteredImages = images.filter((img) => {
    if (selectedStageFilter !== 'all' && img.analysis.predictedStage !== selectedStageFilter) {
      return false;
    }
    if (selectedZoneFilter !== 'all' && img.zone !== selectedZoneFilter) {
      return false;
    }
    return true;
  });

  // Calculate current stage index in full 11-step sequence
  const currentStageIndex = ALL_STAGES.indexOf(project.currentEstimatedStage);

  return (
    <div className="space-y-6">
      {/* Header & Overall Stage Tracker */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A32]">
                Chronological Progress Timeline
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono text-slate-500">{project.projectCode}</span>
            </div>
            <h2 className="text-xl font-bold text-[#101A2C] mt-0.5">{project.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('analysis')}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-colors"
            >
              + Ingest New Observation
            </button>
            <button
              onClick={() => onNavigate('comparisons')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              Compare Milestones
            </button>
          </div>
        </div>

        {/* 11-Stage Progression Tracker */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-800">
              Stage Lifecycle Tracker: {project.currentEstimatedStage}
            </span>
            <span className="font-mono text-slate-500">
              Stage {currentStageIndex + 1} of {ALL_STAGES.length}
            </span>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex items-center min-w-[700px] gap-1">
              {ALL_STAGES.map((stg, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={stg} className="flex-1 flex flex-col items-center group relative">
                    <div
                      className={`w-full h-2 rounded-full transition-all ${
                        isPassed
                          ? 'bg-[#36C6B0]'
                          : isCurrent
                          ? 'bg-[#FF8A32] ring-2 ring-orange-200'
                          : 'bg-slate-200'
                      }`}
                    />
                    <span
                      className={`text-[9px] mt-1 text-center truncate w-full ${
                        isCurrent
                          ? 'font-bold text-[#FF8A32]'
                          : isPassed
                          ? 'font-medium text-slate-700'
                          : 'text-slate-400'
                      }`}
                      title={stg}
                    >
                      {stg.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Observations:</span>
          </div>

          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#FF8A32]"
          >
            <option value="all">All Stages ({images.length})</option>
            {ALL_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {zones.length > 0 && (
            <select
              value={selectedZoneFilter}
              onChange={(e) => setSelectedZoneFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#FF8A32]"
            >
              <option value="all">All Zones</option>
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing {filteredImages.length} of {images.length} observations
        </div>
      </div>

      {/* Timeline Observation Cards */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 before:z-0">
        {filteredImages.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
            No photographic observations match the selected stage or zone filters.
          </div>
        ) : (
          filteredImages.map((img, index) => {
            const isEditing = editingImageId === img.id;

            return (
              <div key={img.id} className="relative z-10 pl-12">
                {/* Timeline Node Marker */}
                <div className="absolute left-3.5 top-5 w-4 h-4 rounded-full bg-white border-2 border-[#FF8A32] flex items-center justify-center -translate-x-1/2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF8A32]" />
                </div>

                {/* Timeline Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:border-slate-300 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    {/* Image Column (4 cols) */}
                    <div className="md:col-span-4 relative bg-black aspect-16/10 md:aspect-auto">
                      <img
                        src={img.imageUrl}
                        alt={img.fileName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-[#101A2C]/80 backdrop-blur px-2 py-0.5 rounded text-[11px] font-mono text-white">
                        {img.captureDate}
                      </div>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-[#FF8A32] px-2 py-0.5 rounded text-[10px] font-extrabold uppercase text-white tracking-wide">
                          Latest Observation
                        </div>
                      )}
                    </div>

                    {/* Metadata & Engineering Sign-Off Column (8 cols) */}
                    <div className="md:col-span-8 p-5 space-y-4">
                      {/* Top status header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-400">STAGE ESTIMATE</span>
                            {img.analysis.categoryMismatch && (
                              <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                                CATEGORY MISMATCH
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-[#101A2C] mt-0.5">
                            {img.analysis.predictedStage}
                          </h4>
                        </div>

                        {/* Engineer Review Badge */}
                        <div className="shrink-0">
                          {img.reviewStatus === 'confirmed' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Engineer Confirmed
                            </span>
                          )}
                          {img.reviewStatus === 'corrected' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                              Corrected to: {img.verifiedCategory}
                            </span>
                          )}
                          {img.reviewStatus === 'pending_review' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                              <AlertTriangle className="w-3.5 h-3.5 text-[#FF8A32]" />
                              Pending Sign-off
                            </span>
                          )}
                          {img.reviewStatus === 'rejected' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-50 text-red-800 border border-red-200 text-xs font-semibold">
                              <X className="w-3.5 h-3.5 text-red-600" />
                              Observation Rejected
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Location & Analysis Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">FLOOR / BLOCK</span>
                          <span className="font-semibold text-slate-800">{img.floor || 'Floor N/A'} · {img.block || 'Block N/A'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">ZONE / GRID</span>
                          <span className="font-semibold text-slate-800">{img.zone || 'General Site'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">AI CONFIDENCE</span>
                          <span className="font-mono font-bold text-[#36C6B0]">{Math.round(img.analysis.stageConfidence * 100)}% (estimate)</span>
                        </div>
                      </div>

                      {/* Visible Activities */}
                      <div>
                        <span className="text-slate-500 block text-[11px] font-semibold mb-1">
                          Visible Activities Detected:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {img.analysis.detectedActivities.map((act, i) => (
                            <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>

                      {img.reviewNotes && (
                        <div className="p-2.5 rounded bg-slate-50 text-xs text-slate-600 border border-slate-100">
                          <strong className="text-slate-800">Engineer Remarks:</strong> {img.reviewNotes}
                          {img.reviewerName && <span className="text-slate-400 block text-[10px] mt-0.5">— {img.reviewerName}</span>}
                        </div>
                      )}

                      {/* Inline Verification Controls */}
                      {isEditing ? (
                        <div className="p-3 rounded-lg bg-orange-50/60 border border-orange-200 space-y-3">
                          <span className="text-xs font-bold text-orange-950 block">
                            Audit Action for {img.fileName}
                          </span>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Select Stage:
                            </label>
                            <select
                              value={editStage}
                              onChange={(e) => setEditStage(e.target.value as ConstructionStage)}
                              className="w-full px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                            >
                              {ALL_STAGES.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <input
                              type="text"
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="Audit sign-off note (e.g. Confirmed column tie spacing)..."
                              className="w-full px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                onVerifyImage(img.id, 'confirmed', editStage, editNotes);
                                setEditingImageId(null);
                              }}
                              className="px-3 py-1 text-xs font-bold text-white bg-emerald-600 rounded hover:bg-emerald-700"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onVerifyImage(img.id, 'corrected', editStage, editNotes);
                                setEditingImageId(null);
                              }}
                              className="px-3 py-1 text-xs font-bold text-white bg-[#FF8A32] rounded hover:bg-[#e87a26]"
                            >
                              Save Correction
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingImageId(null)}
                              className="px-3 py-1 text-xs text-slate-600 hover:text-slate-900"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingImageId(img.id);
                              setEditStage(img.analysis.predictedStage);
                              setEditNotes(img.reviewNotes || '');
                            }}
                            className="text-xs font-semibold text-[#FF8A32] hover:underline flex items-center gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            {img.reviewStatus === 'pending_review' ? 'Review & Verify' : 'Edit Engineer Sign-off'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
