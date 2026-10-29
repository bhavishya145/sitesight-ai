import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Filter,
  ShieldAlert,
  Clock,
  ArrowRight,
  Eye,
  Check,
} from 'lucide-react';
import type { SystemAlert, ConstructionProject } from '../types/index.ts';

interface AlertsCenterProps {
  alerts: SystemAlert[];
  projects: ConstructionProject[];
  onUpdateAlertStatus: (alertId: string, status: 'acknowledged' | 'resolved') => void;
  onNavigate: (tab: string) => void;
}

export const AlertsCenter: React.FC<AlertsCenterProps> = ({
  alerts,
  projects,
  onUpdateAlertStatus,
  onNavigate,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'acknowledged' | 'resolved'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredAlerts = alerts.filter((alt) => {
    if (statusFilter !== 'all' && alt.status !== statusFilter) return false;
    if (severityFilter !== 'all' && alt.severity !== severityFilter) return false;
    return true;
  });

  const unresolvedCount = alerts.filter((a) => a.status === 'unresolved').length;
  const highSeverityCount = alerts.filter((a) => a.severity === 'high' && a.status === 'unresolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#101A2C]">
            Alerts & Inspection Exceptions Center
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Active category mismatches, unreviewed model predictions, and scheduled milestone anomalies requiring engineer intervention.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded bg-red-50 text-red-700 font-bold border border-red-200">
            {highSeverityCount} Critical Flags
          </span>
          <span className="text-xs px-2.5 py-1 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200">
            {unresolvedCount} Unresolved
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter By:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-md border border-slate-300 bg-white"
          >
            <option value="all">All Statuses ({alerts.length})</option>
            <option value="unresolved">Unresolved ({unresolvedCount})</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-md border border-slate-300 bg-white"
          >
            <option value="all">All Severities</option>
            <option value="high">High Severity</option>
            <option value="medium">Medium Severity</option>
            <option value="low">Low Severity</option>
          </select>
        </div>

        <span className="font-mono text-slate-500">
          Showing {filteredAlerts.length} exceptions
        </span>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500">
            No inspection exceptions match your filter criteria.
          </div>
        ) : (
          filteredAlerts.map((alt) => {
            const isResolved = alt.status === 'resolved';

            return (
              <div
                key={alt.id}
                className={`p-5 rounded-xl border transition-all ${
                  isResolved
                    ? 'bg-slate-50/70 border-slate-200 opacity-70'
                    : alt.severity === 'high'
                    ? 'bg-red-50/40 border-red-200'
                    : 'bg-amber-50/40 border-amber-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        alt.severity === 'high'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#101A2C]">{alt.title}</span>
                        <span
                          className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                            alt.severity === 'high'
                              ? 'bg-red-200 text-red-900'
                              : 'bg-amber-200 text-amber-900'
                          }`}
                        >
                          {alt.severity}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-slate-800">{alt.projectName}</span>
                        <span>·</span>
                        <span className="font-mono">{new Date(alt.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    {alt.status === 'unresolved' && (
                      <button
                        onClick={() => onUpdateAlertStatus(alt.id, 'acknowledged')}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                    {alt.status !== 'resolved' && (
                      <button
                        onClick={() => onUpdateAlertStatus(alt.id, 'resolved')}
                        className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Mark Resolved
                      </button>
                    )}
                    {isResolved && (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Resolved
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-700 pl-9.5 leading-relaxed">
                  {alt.explanation}
                </p>

                {/* Suggested Action */}
                <div className="mt-3 ml-9.5 p-2.5 rounded bg-white/80 border border-slate-200/80 text-xs text-slate-800 flex items-start gap-2">
                  <span className="font-bold text-[#FF8A32] shrink-0">Protocol Action:</span>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span>{alt.suggestedAction}</span>
                    <button
                      onClick={() => onNavigate(alt.type === 'category_mismatch' ? 'analysis' : 'timeline')}
                      className="text-[#FF8A32] font-bold hover:underline shrink-0 text-right"
                    >
                      Open Target Record →
                    </button>
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
