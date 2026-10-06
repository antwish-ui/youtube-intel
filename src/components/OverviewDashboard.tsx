/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  BarChart3,
  Flame,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  Zap,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { NicheGapInsight } from '../types.js';
import { NavTab } from './Navbar.js';

interface OverviewDashboardProps {
  nicheGaps: NicheGapInsight[];
  selectedNiche: string;
  onNavigateTab: (tab: NavTab) => void;
  onOpenCustomReportModal: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  nicheGaps,
  selectedNiche,
  onNavigateTab,
  onOpenCustomReportModal,
}) => {
  const [activeCompetitorMetric, setActiveCompetitorMetric] = useState<'velocity' | 'cadence' | 'retention'>('velocity');

  // Competitor benchmarking mock models
  const competitorBenchmarking = [
    {
      channel: 'Leading Incumbent A',
      niche: 'AI & Robotics',
      viewsPerDay: '340K',
      engagementRate: '5.2%',
      uploadCadence: '1x / week',
      retentionScore: '68%',
      dominantFormat: 'Longform 45m+ Code Walkthrough',
    },
    {
      channel: 'Fast-Growing Challenger B',
      niche: 'Luxury Fashion',
      viewsPerDay: '185K',
      engagementRate: '9.4%',
      uploadCadence: '3x / week',
      retentionScore: '74%',
      dominantFormat: 'Editorial Archival Essays',
    },
    {
      channel: 'Studio Anchor Network C',
      niche: 'Cinema & Hollywood',
      viewsPerDay: '890K',
      engagementRate: '4.8%',
      uploadCadence: 'Daily',
      retentionScore: '59%',
      dominantFormat: 'Teaser & Breakdown Reaction',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Executive Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 p-6 md:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Turn YouTube Data API v3 into Direct Business Answers</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Niche Intelligence, White Space Discovery & Competitor Benchmarks
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Eliminate creative guesswork. OmniTube enriches YouTube Data API v3 records with quality-first
            scoring, comment polarity analysis for movie trailers and luxury fashion teasers, and early-warning talent scouting.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTab('comments')}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs flex items-center space-x-1.5 transition shadow-lg shadow-rose-950/40"
            >
              <span>Analyze Video Comments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('fashion')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center space-x-1.5 transition border border-slate-700"
            >
              <span>Prada & Chanel Teaser Intel</span>
            </button>
            <button
              onClick={() => onNavigateTab('movies')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center space-x-1.5 transition border border-slate-700"
            >
              <span>Hollywood Box Office Pulse</span>
            </button>
          </div>
        </div>

        {/* Ambient glow accent */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Verified Expert Channels</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">128+</div>
          <p className="text-[11px] text-emerald-400 font-medium mt-1">Authority Index &gt; 90%</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Quality-to-Popularity Delta</span>
            <TrendingUp className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white">+42.6%</div>
          <p className="text-[11px] text-slate-400 mt-1">Higher comment engagement in curated videos</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Teaser Sentiment Accuracy</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">96.8%</div>
          <p className="text-[11px] text-amber-400 font-medium mt-1">Predicts opening launch buzz</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Data API v3 Completeness</span>
            <CheckCircle className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white">99.4%</div>
          <p className="text-[11px] text-sky-400 font-medium mt-1">Captions, HD, Licensed metadata verified</p>
        </div>
      </div>

      {/* "What to Make & Why" Section (Niche Gaps) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>"What to Make & Why" — Niche Gaps & Content White Space</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              High audience demand meets low competitive supply. Model calculated from YouTube search velocities and unresolved viewer comment questions.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            {selectedNiche === 'all' ? 'All Disciplines' : selectedNiche}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nicheGaps.map((gap, i) => (
            <div
              key={i}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 transition group shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {gap.niche}
                  </span>
                  <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition">
                    {gap.whiteSpaceTopic}
                  </h4>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-slate-400">Opportunity</div>
                  <div className="text-lg font-black text-emerald-400">
                    {gap.projectedOpportunityScore}/100
                  </div>
                </div>
              </div>

              {/* Archetype & Strategy */}
              <div className="space-y-2 bg-slate-950/60 rounded-lg p-3 border border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold">Recommended Title Archetype:</span>
                  <p className="text-slate-200 font-mono mt-0.5">"{gap.recommendedTitleArchetype}"</p>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Target Thumbnail Concept:</span>
                  <p className="text-slate-300 mt-0.5">{gap.targetThumbnailAngle}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-300">{gap.optimalUploadWindow}</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-medium">
                  Supply: {gap.currentSupplySaturation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Column: Optimal Upload Timing Heatmap + Competitor Benchmarking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Optimal Upload Heatmap */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-rose-400" />
              <h4 className="text-sm font-bold text-white">Optimal Upload Timing Heatmap</h4>
            </div>
            <span className="text-[11px] text-slate-400">Peak Viewer Engagement (UTC)</span>
          </div>

          <p className="text-xs text-slate-400">
            Aggregated viewer comment velocity and first-4-hour retention across the {selectedNiche} cluster.
          </p>

          <div className="space-y-2 pt-2">
            {[
              { day: 'Monday', bestWindow: '14:00 - 16:00 UTC', index: 82, badge: 'Strong' },
              { day: 'Tuesday', bestWindow: '15:00 - 18:00 UTC', index: 94, badge: 'Peak Viral' },
              { day: 'Wednesday', bestWindow: '13:00 - 15:00 UTC', index: 88, badge: 'Very High' },
              { day: 'Thursday', bestWindow: '15:00 - 18:00 UTC', index: 96, badge: 'Peak Viral' },
              { day: 'Friday', bestWindow: '18:00 - 21:00 UTC', index: 91, badge: 'High Entertainment' },
              { day: 'Saturday', bestWindow: '11:00 - 14:00 UTC', index: 79, badge: 'Moderate' },
              { day: 'Sunday', bestWindow: '16:00 - 20:00 UTC', index: 95, badge: 'Peak Longform' },
            ].map((slot, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-slate-950/70 border border-slate-800/60">
                <span className="w-24 font-medium text-slate-300">{slot.day}</span>
                <span className="text-slate-400 font-mono">{slot.bestWindow}</span>
                <div className="flex items-center space-x-2 w-32 justify-end">
                  <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full"
                      style={{ width: `${slot.index}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-200 text-[11px]">{slot.index}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearest Competitor Benchmarking */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-sky-400" />
              <h4 className="text-sm font-bold text-white">Nearest Competitor Benchmarking</h4>
            </div>
            <button
              onClick={onOpenCustomReportModal}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-medium"
            >
              Request Custom Audit &rarr;
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Real-time metric telemetry comparing top tier channels in this vertical.
          </p>

          <div className="space-y-3 pt-2">
            {competitorBenchmarking.map((comp, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{comp.channel}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/50">
                    {comp.niche}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Views / Day</div>
                    <div className="font-bold text-slate-200 mt-0.5">{comp.viewsPerDay}</div>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Engagement</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{comp.engagementRate}</div>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-500">Retention Score</div>
                    <div className="font-bold text-rose-300 mt-0.5">{comp.retentionScore}</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Cadence: <strong className="text-slate-300">{comp.uploadCadence}</strong></span>
                  <span className="text-slate-500 truncate max-w-[200px]">Format: {comp.dominantFormat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
