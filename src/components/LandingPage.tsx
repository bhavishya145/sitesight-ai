import React, { useState } from 'react';
import {
  Camera,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  BarChart3,
  Calendar,
  Building2,
  Compass,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Logo } from './Logo.tsx';
import { HumanVerificationBanner } from './HumanVerificationBanner.tsx';

interface LandingPageProps {
  onOpenApp: (tab?: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenApp, onOpenAuth }) => {
  const [activeShowcase, setActiveShowcase] = useState<'assessment' | 'comparison' | 'timeline' | 'reports'>('assessment');
  const [sliderPosition, setSliderPosition] = useState(55);

  return (
    <div className="min-h-screen bg-[#F5F6F3] text-[#101A2C] flex flex-col">
      {/* Top Bar - Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand element */}
          <div className="shrink-0">
            <Logo size="md" showTagline={false} />
          </div>

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#platform" className="hover:text-[#101A2C] transition-colors whitespace-nowrap shrink-0">
              Platform
            </a>
            <a href="#how-it-works" className="hover:text-[#101A2C] transition-colors whitespace-nowrap shrink-0">
              How It Works
            </a>
            <a href="#features" className="hover:text-[#101A2C] transition-colors whitespace-nowrap shrink-0">
              Features
            </a>
            <a href="#use-cases" className="hover:text-[#101A2C] transition-colors whitespace-nowrap shrink-0">
              Use Cases
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-xs font-semibold text-slate-700 hover:text-[#101A2C] px-3 py-2 transition-colors whitespace-nowrap"
            >
              Sign In
            </button>
            <button
              onClick={() => onOpenApp('dashboard')}
              className="px-4 py-2 text-xs font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-all shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              Start Monitoring
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-200/70 bg-blueprint-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-semibold text-[#101A2C]">
                <span className="w-2 h-2 rounded-full bg-[#36C6B0]" />
                <span>Next-Gen Computer Vision for Construction Sites</span>
                <span className="text-slate-400">·</span>
                <span className="text-[#FF8A32]">v2.4 Active</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101A2C] tracking-tight leading-[1.15] text-balance">
                Your Construction Site. <br />
                <span className="text-[#101A2C] relative inline-block">
                  Understood by AI.
                  <span className="absolute left-0 bottom-1 w-full h-1.5 bg-[#FF8A32]/40 rounded -z-10" />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Turn everyday site photographs into construction-stage insights, visual progress comparisons, and actionable reports — without relying on constant manual site visits.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenApp('analysis')}
                  className="px-5 py-3 text-sm font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-all shadow hover:shadow-md active:scale-[0.98] flex items-center gap-2 whitespace-nowrap"
                >
                  <Camera className="w-4 h-4" />
                  Analyze a Site Image
                </button>
                <button
                  onClick={() => onOpenApp('dashboard')}
                  className="px-5 py-3 text-sm font-semibold text-[#101A2C] bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-all shadow-xs hover:shadow active:scale-[0.98] flex items-center gap-2 whitespace-nowrap"
                >
                  <Layers className="w-4 h-4 text-slate-500" />
                  Explore the Dashboard
                </button>
              </div>

              {/* Engineering Protocol Micro-Badge */}
              <div className="pt-2">
                <HumanVerificationBanner compact />
              </div>
            </div>

            {/* Right Column: High-Fidelity Realistic Product Mockup */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                {/* Mockup Window Chrome */}
                <div className="bg-[#101A2C] px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-xs font-mono text-slate-400">
                      SiteSight // BLR-BTG-C / Tower C
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
                      LIVE INFERENCE · 95% CONFIDENCE
                    </span>
                  </div>
                </div>

                {/* Construction Photograph with Vision Inspection Overlays */}
                <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
                  <img
                    src="/src/assets/images/hero_construction_site_1793248327976.jpg"
                    alt="Active high-rise superstructure construction site"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Scrim for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101A2C]/90 via-transparent to-black/30 pointer-events-none" />

                  {/* Vision Bounding Indicators (Simulated Engineering HUD) */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/60 text-xs shadow-md">
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Detected Stage
                    </div>
                    <div className="font-extrabold text-[#101A2C] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#36C6B0]" />
                      Superstructure & Framework
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 text-xs text-white">
                    <div className="text-[10px] uppercase font-medium text-slate-400">
                      Observation Date
                    </div>
                    <div className="font-mono font-medium text-teal-300">24 Oct 2026 · Level 10-12</div>
                  </div>

                  {/* Bottom Insight Bar in Mockup */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#101A2C]/95 backdrop-blur border border-slate-700/80 text-white text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 font-semibold text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#36C6B0]" />
                        <span>Visible Evidence: Slipform Concrete Core + Composite Steel Beams</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        Pending Eng. Sign-off
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#FF8A32] h-full rounded-full w-[65%]" />
                    </div>
                  </div>
                </div>

                {/* Sub-card: Interactive preview trigger */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">VERIFIED MILESTONE</span>
                      <span className="font-semibold text-slate-900">Floor 10 Pour Approved</span>
                    </div>
                    <div className="h-6 w-px bg-slate-200" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">NEXT SCHEDULE</span>
                      <span className="font-semibold text-slate-900">Level 11 Shuttering</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenApp('analysis')}
                    className="text-xs font-bold text-[#FF8A32] hover:text-[#e87a26] flex items-center gap-1 transition-colors"
                  >
                    View Full Analysis
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Value Section */}
      <section id="platform" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-xs font-bold text-[#FF8A32] uppercase tracking-wider mb-2">
              Objective Construction Intelligence
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#101A2C] tracking-tight">
              Built for Technical Auditors, Developers & Project Heads
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Manual site visits across multiple Indian metros cannot scale. SiteSight AI gives engineering leadership verifiable visual records and automated anomaly detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit Card 1 */}
            <div className="p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-all bg-[#FDFDFD] shadow-xs hover:shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#101A2C] text-[#36C6B0] flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                Monitor Multi-City Portfolios Remotely
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Track active residential, commercial, and industrial sites across Bengaluru, Hyderabad, Pune, Mumbai, and Delhi NCR from a single centralized dashboard.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-all bg-[#FDFDFD] shadow-xs hover:shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#101A2C] text-[#FF8A32] flex items-center justify-center mb-4">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                Track Visual Changes Over Time
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Perform split-view before-and-after comparisons between baseline excavation photos and current elevations to verify actual structural growth.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-all bg-[#FDFDFD] shadow-xs hover:shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#101A2C] text-amber-400 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                Detect Mismatched & Irrelevant Uploads
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Flag discrepancies immediately when a contractor tags an upload as "Masonry" while the vision engine detects foundation trench rebar.
              </p>
            </div>

            {/* Benefit Card 4 */}
            <div className="p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-all bg-[#FDFDFD] shadow-xs hover:shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#101A2C] text-[#36C6B0] flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                Generate Standardized Progress Reports
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Export daily monitoring summaries and weekly client audit dossiers with photographic evidence, observed stages, and engineer sign-offs.
              </p>
            </div>

            {/* Benefit Card 5 */}
            <div className="p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-all bg-[#FDFDFD] shadow-xs hover:shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#101A2C] text-indigo-400 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                Maintain an Immutable Visual Record
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Build a permanent, chronological timeline of construction observations organized by floor, block, and zone to resolve contractor disputes.
              </p>
            </div>

            {/* Benefit Card 6 */}
            <div className="p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-all bg-[#FDFDFD] shadow-xs hover:shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#101A2C] text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                Human-in-the-Loop Governance
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                AI estimates are never accepted blindly. Licensed site engineers review, confirm, or correct every stage prediction to preserve engineering rigor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#F5F6F3] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-xs font-bold text-[#FF8A32] uppercase tracking-wider mb-2">
              Workflow Architecture
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#101A2C] tracking-tight">
              From Site Camera to Certified Progress Dossier
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Four streamlined steps designed to seamlessly integrate into standard construction supervision routines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-extrabold text-slate-200 font-mono mb-2">01</div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                Create Project & Define Activities
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Register project location, client details, scheduled milestones, target completion dates, and establish a baseline photograph.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-extrabold text-slate-200 font-mono mb-2">02</div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                Upload Site Photographs
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Site supervisors upload daily images tagged with capture dates, floor, block, zone, and optional field inspection notes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-extrabold text-[#FF8A32] font-mono mb-2">03</div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                AI Vision Stage Analysis
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Computer vision detects visible materials, equipment, and structural activities, predicting stage and flagging category mismatches.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
              <div className="text-3xl font-extrabold text-[#36C6B0] font-mono mb-2">04</div>
              <h4 className="text-base font-bold text-[#101A2C] mb-2">
                Compare & Generate Reports
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engineers review and verify stage predictions, compare timeline changes side-by-side, and export standardized audit reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature Showcase */}
      <section id="features" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-xs font-bold text-[#FF8A32] uppercase tracking-wider mb-2">
              Feature Deep-Dive
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#101A2C] tracking-tight">
              Interactive Tool Previews
            </h3>
            <p className="mt-3 text-slate-600 text-sm">
              Explore the core capabilities available in the SiteSight AI platform.
            </p>
          </div>

          {/* Feature Tabs (Functional Buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveShowcase('assessment')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeShowcase === 'assessment'
                  ? 'bg-[#101A2C] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              AI Stage Assessment
            </button>
            <button
              onClick={() => setActiveShowcase('comparison')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeShowcase === 'comparison'
                  ? 'bg-[#101A2C] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setActiveShowcase('timeline')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeShowcase === 'timeline'
                  ? 'bg-[#101A2C] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Construction Timeline
            </button>
            <button
              onClick={() => setActiveShowcase('reports')}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeShowcase === 'reports'
                  ? 'bg-[#101A2C] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Automated Progress Reports
            </button>
          </div>

          {/* Interactive Feature Panel */}
          <div className="bg-[#F8F9FA] rounded-xl border border-slate-200 p-6 lg:p-8">
            {activeShowcase === 'assessment' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-md">
                    <img
                      src="/src/assets/images/site_superstructure_stage_1793248329534.jpg"
                      alt="Superstructure stage observation"
                      referrerPolicy="no-referrer"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#101A2C]/90 text-white text-xs px-3 py-1 rounded backdrop-blur font-mono">
                      CONFIDENCE: 96% (ESTIMATE)
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <span>STAGE CLASSIFICATION</span>
                    <span>·</span>
                    <span className="text-[#36C6B0] font-bold">MATCH CONFIRMED</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#101A2C]">
                    Structural Framework & Superstructure
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    AI visual analysis identifies reinforced concrete column casting, yellow staging propping for upper level slab casting, and perimeter netting.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#36C6B0] shrink-0" />
                      <span>Identified: Formwork propping, crane hoisting, steel rebar</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#36C6B0] shrink-0" />
                      <span>Suitability: Optimal clarity and lighting</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-[#FF8A32] shrink-0" />
                      <span>Verification: Human engineer review required</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => onOpenApp('analysis')}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-colors"
                    >
                      Try Image Analysis Tool
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeShowcase === 'comparison' && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto">
                  <h4 className="text-lg font-bold text-[#101A2C]">
                    Interactive Before-and-After Slider
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Drag the slider to compare baseline foundation excavation (Feb 2026) with current superstructure progress (Jul 2026).
                  </p>
                </div>

                {/* Slider Component */}
                <div className="relative max-w-4xl mx-auto h-80 rounded-lg overflow-hidden border border-slate-300 shadow-md select-none">
                  {/* Before Image (Foundation) */}
                  <img
                    src="/src/assets/images/site_foundation_stage_1793248328718.jpg"
                    alt="Baseline Foundation"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#101A2C]/80 text-white text-xs px-2.5 py-1 rounded backdrop-blur">
                    BEFORE: 10 Feb 2026 (Foundation)
                  </div>

                  {/* After Image (Superstructure) with clip path */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                  >
                    <img
                      src="/src/assets/images/site_superstructure_stage_1793248329534.jpg"
                      alt="After Superstructure"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#101A2C]/80 text-white text-xs px-2.5 py-1 rounded backdrop-blur">
                      AFTER: 18 Jul 2026 (Superstructure L6)
                    </div>
                  </div>

                  {/* Slider Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize z-20"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FF8A32] text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Invisible Range Input for Dragging */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  />
                </div>

                <div className="max-w-xl mx-auto text-center pt-2">
                  <button
                    onClick={() => onOpenApp('comparisons')}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#101A2C] hover:bg-slate-800 rounded-md transition-colors"
                  >
                    Launch Full Comparison Studio
                  </button>
                </div>
              </div>
            )}

            {activeShowcase === 'timeline' && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto">
                  <h4 className="text-lg font-bold text-[#101A2C]">
                    Multi-Milestone Stage Progression
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Visual milestone tracker spanning the 11 stages of construction from Site Preparation to Handover.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="aspect-16/10 rounded overflow-hidden mb-3">
                      <img
                        src="/src/assets/images/site_foundation_stage_1793248328718.jpg"
                        alt="Stage 1"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">10 FEB 2026</span>
                    <h5 className="font-bold text-sm text-[#101A2C]">Foundation (Raft Footing)</h5>
                    <span className="inline-block mt-2 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Engineer Confirmed
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="aspect-16/10 rounded overflow-hidden mb-3">
                      <img
                        src="/src/assets/images/site_superstructure_stage_1793248329534.jpg"
                        alt="Stage 2"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">18 JUL 2026</span>
                    <h5 className="font-bold text-sm text-[#101A2C]">Superstructure (Floor 6)</h5>
                    <span className="inline-block mt-2 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Engineer Confirmed
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="aspect-16/10 rounded overflow-hidden mb-3">
                      <img
                        src="/src/assets/images/hero_construction_site_1793248327976.jpg"
                        alt="Stage 3"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">24 OCT 2026</span>
                    <h5 className="font-bold text-sm text-[#101A2C]">Superstructure (Floor 10-12)</h5>
                    <span className="inline-block mt-2 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Pending Verification
                    </span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => onOpenApp('timeline')}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#101A2C] hover:bg-slate-800 rounded-md transition-colors"
                  >
                    Open Project Timeline
                  </button>
                </div>
              </div>
            )}

            {activeShowcase === 'reports' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#FF8A32]" />
                      <span className="font-bold text-sm text-[#101A2C]">REP-2026-W42-BTG</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">WEEKLY DOSSIER</span>
                  </div>
                  <div className="text-xs space-y-2 text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-800">Project:</span> Brigade Tech Gardens - Tower C
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Period:</span> 18 Oct 2026 to 25 Oct 2026
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Auditor:</span> Er. Rajesh K. Varma
                    </div>
                    <p className="pt-2 text-slate-700 italic border-t border-slate-100">
                      "Photographic evidence confirms Floor 10 structural composite deck erection. Human review verification rate: 86%."
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onOpenApp('reports')}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#101A2C] hover:bg-slate-800 rounded-md transition-colors"
                    >
                      Generate New Report
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-6 space-y-3">
                  <h4 className="text-lg font-bold text-[#101A2C]">
                    Automated & Certified Reporting Dossiers
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Generate structured Daily, Weekly, and Monthly monitoring summaries. Includes observed stages, before/after comparisons, unresolved alerts, and statutory audit disclaimers ready for PDF export or print.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#36C6B0]" />
                      <span>One-click PDF and CSV tabular exports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#36C6B0]" />
                      <span>Engineer sign-off and correction audit trails</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#36C6B0]" />
                      <span>Compliant with Indian construction monitoring standards</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-[#F5F6F3] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-xs font-bold text-[#FF8A32] uppercase tracking-wider mb-2">
              Stakeholder Applications
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#101A2C] tracking-tight">
              Empowering the Entire Construction Ecosystem
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-[#FF8A32] uppercase tracking-wider block mb-2">
                For Real Estate Developers
              </span>
              <h4 className="font-bold text-base text-[#101A2C] mb-2">
                Executive Oversight & Investor Confidence
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maintain continuous visual verification of contractor milestones without waiting for monthly billing disputes or delayed physical site audits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-[#36C6B0] uppercase tracking-wider block mb-2">
                For Technical Auditors & Banks
              </span>
              <h4 className="font-bold text-base text-[#101A2C] mb-2">
                Lender Due Diligence & Fund Disbursal
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verify milestone completion against photographic evidence before authorizing construction loan drawdowns or RERA escrow releases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-2">
                For Project Management Consultants
              </span>
              <h4 className="font-bold text-base text-[#101A2C] mb-2">
                Automated Quality & Schedule Governance
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standardize daily site photograph logs, catch sequence mismatches early, and deliver branded progress dossiers to institutional clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#101A2C] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Transform Your Construction Monitoring?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experience how SiteSight AI combines computer vision with human engineer verification to bring total transparency to construction sites.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenApp('dashboard')}
              className="px-6 py-3 text-sm font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-all shadow-md active:scale-[0.98]"
            >
              Access Project Dashboard
            </button>
            <button
              onClick={() => onOpenApp('analysis')}
              className="px-6 py-3 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-all active:scale-[0.98]"
            >
              Analyze a Site Image
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <Logo size="md" showTagline />
              <p className="text-xs text-slate-500 leading-relaxed">
                Intelligent construction progress monitoring platform delivering photographic stage verification, visual comparisons, and audit dossiers.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#101A2C] uppercase tracking-wider mb-3">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><button onClick={() => onOpenApp('dashboard')} className="hover:text-[#101A2C]">Project Portfolio</button></li>
                <li><button onClick={() => onOpenApp('analysis')} className="hover:text-[#101A2C]">Image Analysis</button></li>
                <li><button onClick={() => onOpenApp('timeline')} className="hover:text-[#101A2C]">Progress Timeline</button></li>
                <li><button onClick={() => onOpenApp('comparisons')} className="hover:text-[#101A2C]">Visual Comparisons</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#101A2C] uppercase tracking-wider mb-3">
                Governance & Reports
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><button onClick={() => onOpenApp('reports')} className="hover:text-[#101A2C]">Monitoring Dossiers</button></li>
                <li><button onClick={() => onOpenApp('alerts')} className="hover:text-[#101A2C]">Alerts & Mismatches</button></li>
                <li><span className="text-slate-400">IS 456 / NBC Standards</span></li>
                <li><span className="text-slate-400">Technical Auditor Logs</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#101A2C] uppercase tracking-wider mb-3">
                Engineering Disclaimer
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All AI-derived stage assessments and activities are advisory estimates based solely on 2D image analysis. Certified structural sign-offs require mandatory inspection by a registered structural engineer.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <div>
              © 2026 SiteSight AI. All rights reserved.
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-700 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-700 cursor-pointer">Security Protocol</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
