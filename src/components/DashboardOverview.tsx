import React from 'react';
import {
  Building2,
  Camera,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import type {
  ConstructionProject,
  SiteImage,
  SystemAlert,
  MonitoringReport,
} from '../types/index.ts';

interface DashboardOverviewProps {
  projects: ConstructionProject[];
  images: SiteImage[];
  alerts: SystemAlert[];
  reports: MonitoringReport[];
  selectedProject: ConstructionProject;
  onSelectProject: (project: ConstructionProject) => void;
  onNavigate: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  projects,
  images,
  alerts,
  reports,
  selectedProject,
  onSelectProject,
  onNavigate,
}) => {
  const unresolvedAlerts = alerts.filter((a) => a.status === 'unresolved');
  const pendingReviews = images.filter((img) => img.reviewStatus === 'pending_review');
  const confirmedImages = images.filter((img) => img.reviewStatus === 'confirmed' || img.reviewStatus === 'corrected');

  // Compute stage distribution across all images
  const stageCounts: Record<string, number> = {};
  images.forEach((img) => {
    const stage = img.analysis.predictedStage;
    stageCounts[stage] = (stageCounts[stage] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Scope and Disclaimer banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A32]">
              Active Scope: {selectedProject.name}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-slate-500">{selectedProject.projectCode}</span>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            {selectedProject.location}, {selectedProject.city} · Client: {selectedProject.clientName}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('analysis')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-all shadow-xs flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            Upload Site Photo
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
          >
            Switch Project
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#101A2C] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#101A2C] font-mono tabular-nums">
            {projects.length}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
            <span>Across Bengaluru, Hyderabad, Pune</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Photographs Analyzed
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#36C6B0] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#101A2C] font-mono tabular-nums">
            {images.length}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
            <span className="text-emerald-600 font-semibold">{confirmedImages.length} verified</span>
            <span>·</span>
            <span>{pendingReviews.length} pending review</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Attention Required
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#FF8A32] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#101A2C] font-mono tabular-nums">
            {unresolvedAlerts.length}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-700 mt-1">
            <span>Category mismatch & pending audits</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Manual Schedule Progress
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#101A2C] font-mono tabular-nums">
            {selectedProject.manualProgressPercent}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1 truncate">
            Target Handover: {selectedProject.expectedCompletionDate}
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Recent Uploads & Verification Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Project Progress Bar & Current Stage Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Current Inferred Stage
                </span>
                <h3 className="text-lg font-bold text-[#101A2C]">
                  {selectedProject.currentEstimatedStage}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Audited Verification Rate</span>
                <span className="text-sm font-extrabold text-[#36C6B0] font-mono">
                  {Math.round((selectedProject.verifiedImagesCount / Math.max(1, selectedProject.totalImagesCount)) * 100)}% Verified
                </span>
              </div>
            </div>

            {/* Milestones Progress Tracker */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Milestone Track ({selectedProject.milestones.length} defined)</span>
                <span className="text-slate-400">IS 456 Compliant Tracking</span>
              </div>
              <div className="space-y-2">
                {selectedProject.milestones.map((m) => (
                  <div key={m.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {m.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {m.status === 'in_progress' && <span className="w-2 h-2 rounded-full bg-[#FF8A32]" />}
                        {m.status === 'upcoming' && <span className="w-2 h-2 rounded-full bg-slate-300" />}
                        <span className="font-semibold text-slate-800">{m.title}</span>
                      </div>
                      <span className="font-mono text-slate-500 tabular-nums">
                        {m.progressPercent}% · Target: {m.targetDate}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          m.status === 'completed' ? 'bg-emerald-500' : 'bg-[#FF8A32]'
                        }`}
                        style={{ width: `${m.progressPercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Image Uploads with Inspection Status */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#101A2C]">
                  Recent Site Observations & Vision Audits
                </h3>
                <p className="text-xs text-slate-500">
                  Latest photographic uploads with AI stage classification and engineer verification state.
                </p>
              </div>
              <button
                onClick={() => onNavigate('timeline')}
                className="text-xs font-bold text-[#FF8A32] hover:text-[#e87a26] flex items-center gap-1"
              >
                View Timeline
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {images.map((img) => (
                <div key={img.id} className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-14 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <img
                        src={img.imageUrl}
                        alt={img.fileName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{img.analysis.predictedStage}</span>
                        {img.analysis.categoryMismatch && (
                          <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded">
                            MISMATCH
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{img.captureDate}</span>
                        <span>·</span>
                        <span>{img.floor || 'Floor N/A'}</span>
                        <span>·</span>
                        <span className="font-mono text-slate-600">
                          {Math.round(img.analysis.stageConfidence * 100)}% model estimate
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {img.reviewStatus === 'confirmed' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                        <CheckCircle2 className="w-3 h-3" />
                        Confirmed
                      </span>
                    ) : (
                      <button
                        onClick={() => onNavigate('timeline')}
                        className="text-[11px] font-semibold text-[#FF8A32] hover:bg-orange-50 border border-orange-200 px-2.5 py-1 rounded transition-colors"
                      >
                        Verify Stage
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Alerts, Reports & Distribution */}
        <div className="lg:col-span-4 space-y-6">
          {/* Actionable Alerts Panel */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-[#101A2C] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#FF8A32]" />
                Urgent Audits & Alerts
              </h3>
              <button
                onClick={() => onNavigate('alerts')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                View all ({unresolvedAlerts.length})
              </button>
            </div>

            {unresolvedAlerts.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">No outstanding alerts.</p>
            ) : (
              <div className="space-y-3">
                {unresolvedAlerts.slice(0, 3).map((alt) => (
                  <div
                    key={alt.id}
                    className={`p-3 rounded-lg border text-xs ${
                      alt.severity === 'high'
                        ? 'bg-red-50/70 border-red-200 text-red-950'
                        : 'bg-amber-50/70 border-amber-200 text-amber-950'
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center justify-between">
                      <span>{alt.title}</span>
                      <span className="text-[10px] uppercase font-mono px-1 rounded bg-white/80">
                        {alt.severity}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-90 line-clamp-2 mb-2">{alt.explanation}</p>
                    <button
                      onClick={() => onNavigate(alt.type === 'category_mismatch' ? 'analysis' : 'alerts')}
                      className="text-[11px] font-bold underline hover:opacity-80"
                    >
                      Resolve Discrepancy →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Construction Stage Distribution */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-sm text-[#101A2C] mb-1">Stage Distribution</h3>
            <p className="text-xs text-slate-500 mb-3">Observations by detected construction phase.</p>

            <div className="space-y-2">
              {Object.entries(stageCounts).map(([stage, count]) => (
                <div key={stage} className="text-xs">
                  <div className="flex items-center justify-between text-slate-700 mb-1">
                    <span className="truncate pr-2 font-medium">{stage}</span>
                    <span className="font-mono text-slate-500 shrink-0">{count} obs</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#36C6B0] h-full rounded-full"
                      style={{ width: `${Math.min(100, (count / images.length) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports Widget */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-[#101A2C]">Latest Reports</h3>
              <button
                onClick={() => onNavigate('reports')}
                className="text-xs text-[#FF8A32] font-semibold hover:underline"
              >
                All Reports
              </button>
            </div>

            <div className="space-y-2.5">
              {reports.slice(0, 2).map((rep) => (
                <div key={rep.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs">
                  <div className="flex items-center justify-between font-mono text-slate-500 mb-0.5">
                    <span>{rep.reportCode}</span>
                    <span>{rep.reportType.toUpperCase()}</span>
                  </div>
                  <div className="font-bold text-slate-800 truncate">{rep.projectName}</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {rep.imagesReviewedCount} images · {rep.generatedBy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
