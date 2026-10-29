import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Info,
  Calendar,
  Building2,
} from 'lucide-react';
import type { ConstructionProject, SiteImage } from '../types/index.ts';

interface AnalyticsViewProps {
  projects: ConstructionProject[];
  images: SiteImage[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ projects, images }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

  const filteredImages = selectedProjectId === 'all'
    ? images
    : images.filter((img) => img.projectId === selectedProjectId);

  const totalImages = filteredImages.length;
  const verifiedCount = filteredImages.filter((img) => img.reviewStatus === 'confirmed' || img.reviewStatus === 'corrected').length;
  const mismatchCount = filteredImages.filter((img) => img.analysis.categoryMismatch).length;
  const verificationRate = totalImages > 0 ? Math.round((verifiedCount / totalImages) * 100) : 0;
  const mismatchRate = totalImages > 0 ? Math.round((mismatchCount / totalImages) * 100) : 0;

  // Stage distribution
  const stageCounts: Record<string, number> = {};
  filteredImages.forEach((img) => {
    const s = img.analysis.predictedStage;
    stageCounts[s] = (stageCounts[s] || 0) + 1;
  });

  const handleExportAnalyticsCSV = () => {
    const csvRows = [
      ['Metric', 'Value', 'Calculation Method'],
      ['Total Photographic Observations', totalImages.toString(), 'Count of authenticated image uploads in scope'],
      ['Engineer Verification Rate', `${verificationRate}%`, 'Verified observations divided by total uploads'],
      ['Category Mismatch Rate', `${mismatchRate}%`, 'Flagged visual activity discrepancies divided by total uploads'],
      ['Stage Breakdown', JSON.stringify(stageCounts), 'Histogram of AI inferred stages'],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SiteSight_Analytics_${selectedProjectId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#101A2C]">
            Portfolio Intelligence & Monitoring Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit governance statistics, category alignment ratios, and observation distributions across projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="text-xs font-semibold text-slate-800 px-3 py-1.5 rounded-md border border-slate-300 bg-white"
          >
            <option value="all">All Projects Portfolio</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportAnalyticsCSV}
            className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download Data
          </button>
        </div>
      </div>

      {/* Metric Calculation Advisory Note */}
      <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Measurement Methodology:</strong> Photographic observation density reflects supervisory monitoring frequency and does not equate to physical % completion. True physical progress is measured separately via engineer bill-of-quantities (BOQ) and certified milestones.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Audited Observations
          </span>
          <div className="text-2xl font-extrabold text-[#101A2C] font-mono tabular-nums">
            {totalImages}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">In selected portfolio scope</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Verification Rate
          </span>
          <div className="text-2xl font-extrabold text-[#36C6B0] font-mono tabular-nums">
            {verificationRate}%
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">{verifiedCount} confirmed by engineers</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Category Mismatch Rate
          </span>
          <div className="text-2xl font-extrabold text-amber-600 font-mono tabular-nums">
            {mismatchRate}%
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">{mismatchCount} uploads required reclassification</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Monitoring Frequency
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 font-mono tabular-nums">
            2.8 / wk
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Average photographic logging rate</span>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stage Distribution Chart */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-[#101A2C]">
              Stage-wise Observation Distribution
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of photographic evidence categorized across construction phases.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {Object.keys(stageCounts).length === 0 ? (
              <p className="text-xs text-slate-400">No data available for this selection.</p>
            ) : (
              Object.entries(stageCounts).map(([stage, count]) => {
                const pct = Math.round((count / totalImages) * 100);
                return (
                  <div key={stage} className="text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-medium truncate pr-2">{stage}</span>
                      <span className="font-mono text-slate-500 tabular-nums">
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#36C6B0] h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Project Comparison Table */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-[#101A2C]">
              Project Governance Comparison
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Scheduled progress versus photographic audit coverage by project.
            </p>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {projects.map((p) => (
              <div key={p.id} className="py-3 space-y-1.5 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{p.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                    {p.city}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Phase: {p.currentEstimatedStage}</span>
                  <span className="font-mono font-semibold text-slate-800">
                    Schedule: {p.manualProgressPercent}%
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="text-emerald-700 font-medium">
                    {p.verifiedImagesCount} / {p.totalImagesCount} verified
                  </span>
                  <span>·</span>
                  <span className={p.flaggedIssuesCount > 0 ? 'text-red-600 font-semibold' : 'text-slate-400'}>
                    {p.flaggedIssuesCount} flagged issues
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
