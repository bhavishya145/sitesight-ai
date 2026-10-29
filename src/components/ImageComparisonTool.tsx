import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Columns2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  AlertTriangle,
  Download,
  Calendar,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import type {
  ConstructionProject,
  SiteImage,
  ComparisonRecord,
} from '../types/index.ts';

interface ImageComparisonToolProps {
  project: ConstructionProject;
  images: SiteImage[];
}

export const ImageComparisonTool: React.FC<ImageComparisonToolProps> = ({
  project,
  images,
}) => {
  // Select before and after images
  const defaultBefore = images.length > 1 ? images[images.length - 1] : images[0];
  const defaultAfter = images.length > 0 ? images[0] : null;

  const [beforeImageId, setBeforeImageId] = useState<string>(defaultBefore?.id || '');
  const [afterImageId, setAfterImageId] = useState<string>(defaultAfter?.id || '');
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [generatingComparison, setGeneratingComparison] = useState(false);
  const [customSummary, setCustomSummary] = useState<ComparisonRecord | null>(null);

  const beforeImg = images.find((i) => i.id === beforeImageId) || defaultBefore;
  const afterImg = images.find((i) => i.id === afterImageId) || defaultAfter;

  const handleRunAiComparison = async () => {
    if (!beforeImg || !afterImg) return;
    setGeneratingComparison(true);

    try {
      const res = await fetch('/api/compare-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beforeImageId: beforeImg.id,
          afterImageId: afterImg.id,
          projectId: project.id,
        }),
      });

      if (!res.ok) throw new Error('Comparison failed');
      const data: ComparisonRecord = await res.json();
      setCustomSummary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingComparison(false);
    }
  };

  const handleDownloadComparison = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-[#101A2C]">
            Visual Milestone Comparison Studio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Inspect physical delta between historical jobsite observations using interactive split overlay or synchronized side-by-side analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'slider'
                  ? 'bg-white text-[#101A2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Interactive Split Slider
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'side-by-side'
                  ? 'bg-white text-[#101A2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5" />
              Side-by-Side
            </button>
          </div>

          <button
            onClick={handleDownloadComparison}
            className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Image Selection Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        {/* Before Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            1. Select Baseline / Earlier Observation:
          </label>
          <select
            value={beforeImageId}
            onChange={(e) => {
              setBeforeImageId(e.target.value);
              setCustomSummary(null);
            }}
            className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#FF8A32]"
          >
            {images.map((img) => (
              <option key={img.id} value={img.id}>
                {img.captureDate} — {img.analysis.predictedStage} ({img.floor || 'Floor N/A'}, {img.zone || 'General'})
              </option>
            ))}
          </select>
        </div>

        {/* After Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            2. Select Progress / Later Observation:
          </label>
          <select
            value={afterImageId}
            onChange={(e) => {
              setAfterImageId(e.target.value);
              setCustomSummary(null);
            }}
            className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#FF8A32]"
          >
            {images.map((img) => (
              <option key={img.id} value={img.id}>
                {img.captureDate} — {img.analysis.predictedStage} ({img.floor || 'Floor N/A'}, {img.zone || 'General'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Synchronized Zoom Controls */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Zoom / Scale:</span>
          <button
            onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-slate-700 tabular-nums">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
            className="p-1.5 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {zoomLevel > 1 && (
            <button
              onClick={() => setZoomLevel(1)}
              className="text-[11px] text-[#FF8A32] underline hover:opacity-80"
            >
              Reset 100%
            </button>
          )}
        </div>

        {/* Framing and lighting advisory banner (per Section 10 rules) */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Note: Differing camera angles or cloud cover may influence visual comparisons.</span>
        </div>
      </div>

      {/* Comparison Viewport */}
      {beforeImg && afterImg ? (
        viewMode === 'slider' ? (
          /* Slider Mode */
          <div className="relative w-full h-[450px] sm:h-[520px] rounded-xl overflow-hidden border border-slate-300 shadow-md select-none bg-black">
            {/* Base Image (Before) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
            >
              <img
                src={beforeImg.imageUrl}
                alt="Baseline Observation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain sm:object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 z-10 bg-[#101A2C]/90 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur border border-white/20">
              <span className="font-bold text-[#FF8A32] block text-[10px] uppercase">BEFORE OBSERVATION</span>
              <span>{beforeImg.captureDate} · {beforeImg.analysis.predictedStage}</span>
            </div>

            {/* Top Image (After) with Clip Path */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
            >
              <img
                src={afterImg.imageUrl}
                alt="Progress Observation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain sm:object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 z-10 bg-[#101A2C]/90 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur border border-white/20 text-right">
              <span className="font-bold text-[#36C6B0] block text-[10px] uppercase">AFTER OBSERVATION</span>
              <span>{afterImg.captureDate} · {afterImg.analysis.predictedStage}</span>
            </div>

            {/* Split Drag Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.7)] cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#FF8A32] text-white flex items-center justify-center shadow-xl border-2 border-white">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Transparent Slider Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Before-and-after comparison slider"
            />
          </div>
        ) : (
          /* Side-by-Side Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Card */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Observation A (Baseline)</span>
                  <span className="text-slate-500 block text-[11px]">{beforeImg.captureDate}</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {beforeImg.analysis.predictedStage}
                </span>
              </div>
              <div
                className="aspect-16/10 bg-black overflow-hidden"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                <img
                  src={beforeImg.imageUrl}
                  alt="Observation A"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800 block mb-1">Identified Activities:</span>
                <p className="text-[11px]">{beforeImg.analysis.detectedActivities.join(', ')}</p>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Observation B (Current)</span>
                  <span className="text-slate-500 block text-[11px]">{afterImg.captureDate}</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#36C6B0]/20 text-[#101A2C] font-bold">
                  {afterImg.analysis.predictedStage}
                </span>
              </div>
              <div
                className="aspect-16/10 bg-black overflow-hidden"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                <img
                  src={afterImg.imageUrl}
                  alt="Observation B"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800 block mb-1">Identified Activities:</span>
                <p className="text-[11px]">{afterImg.analysis.detectedActivities.join(', ')}</p>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
          At least two photographic observations are required to execute a visual comparison.
        </div>
      )}

      {/* AI Delta Summary Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF8A32]" />
            <h3 className="font-bold text-sm text-[#101A2C]">
              AI-Generated Progress & Change Summary
            </h3>
          </div>
          <button
            onClick={handleRunAiComparison}
            disabled={generatingComparison}
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#101A2C] hover:bg-slate-800 disabled:bg-slate-400 rounded-md transition-colors"
          >
            {generatingComparison ? 'Synthesizing Delta...' : 'Re-analyze Progression'}
          </button>
        </div>

        <div className="text-xs text-slate-600 leading-relaxed space-y-3">
          <p>
            {customSummary
              ? customSummary.aiChangeSummary
              : `Progression recorded between ${beforeImg?.captureDate || 'earlier date'} and ${afterImg?.captureDate || 'later date'}. Observed structural transition from ${beforeImg?.analysis.predictedStage || 'earlier stage'} to ${afterImg?.analysis.predictedStage || 'current stage'}.`}
          </p>

          <div>
            <span className="font-bold text-slate-800 block mb-1.5 uppercase text-[10px] tracking-wider">
              Identifiable Physical Differences:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(customSummary?.detectedDifferences || [
                `Evolution from ${beforeImg?.analysis.predictedStage} to ${afterImg?.analysis.predictedStage}`,
                `Structural columns and load-bearing framing elevated across inspected floors`,
                `Perimeter safety guardrails and scaffold staging adjusted`,
                `Equipment deployment matched to active trade phase`,
              ]).map((diff, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-700"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#36C6B0] shrink-0 mt-0.5" />
                  <span>{diff}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
            * Comparison summary is an automated computer vision inference. Never use photographic comparisons as a sole metric for certifying subcontractor progress billing without physical quantity surveyor verification.
          </div>
        </div>
      </div>
    </div>
  );
};
