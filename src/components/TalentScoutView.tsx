/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  UserCheck,
  Sparkles,
  TrendingUp,
  Headphones,
  Flame,
  Award,
  Download,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { TalentScoutCandidate } from '../types.js';

interface TalentScoutViewProps {
  candidates: TalentScoutCandidate[];
  onOpenCustomReportModal: () => void;
  onAnalyzeCandidateVideo: (videoId: string, title: string) => void;
}

export const TalentScoutView: React.FC<TalentScoutViewProps> = ({
  candidates,
  onOpenCustomReportModal,
  onAnalyzeCandidateVideo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeScoutDossier, setActiveScoutDossier] = useState<TalentScoutCandidate | null>(null);

  const categories = [
    { id: 'all', label: 'All Scouting Sectors' },
    { id: 'Indie Musician / Vocalist', label: 'Music & Vocalists' },
    { id: 'Filmmaker / Cinematographer', label: 'Directors & DP' },
    { id: 'Fashion Designer', label: 'Couture & Fashion' },
    { id: 'AI Researcher', label: 'AI Researchers' },
  ];

  const filteredCandidates = candidates.filter(
    (c) => selectedCategory === 'all' || c.category === selectedCategory
  );

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">
                Emerging Talent & Artist Scout Radar (A&R / Studio Scouts)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Identify breakout creators and musicians before mainstream algorithmic saturation. Algorithmic alerts triggered by &gt;100% 30-day growth velocity and disproportionate organic comment loyalty.
            </p>
          </div>

          <button
            onClick={onOpenCustomReportModal}
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commission Bespoke Talent Roster</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 pt-1 overflow-x-auto scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition font-medium ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Creator Info Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={candidate.avatarUrl}
                    alt={candidate.creatorName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center space-x-1.5">
                      <span>{candidate.creatorName}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                        {candidate.category}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{candidate.channelHandle}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Label Readiness</div>
                  <div className="text-xl font-black text-emerald-400">{candidate.labelReadinessScore}/100</div>
                  <span className="text-[10px] text-emerald-300">Priority Scout</span>
                </div>
              </div>

              {/* Signature Style */}
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500">Aesthetic / Sonic Signature</span>
                <p className="text-slate-200 mt-0.5">{candidate.signatureStyle}</p>
              </div>

              {/* Viral Hit Showcase */}
              <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 text-xs flex items-center justify-between gap-2">
                <div className="truncate">
                  <span className="text-[10px] text-slate-500 block">Breakout Hit Video:</span>
                  <span className="text-slate-300 font-medium truncate">"{candidate.viralHitTitle}"</span>
                </div>
                <button
                  onClick={() => onAnalyzeCandidateVideo(candidate.viralHitVideoId, candidate.viralHitTitle)}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] shrink-0 transition flex items-center space-x-1"
                >
                  <MessageSquare className="w-3 h-3 text-rose-400" />
                  <span>Comments</span>
                </button>
              </div>

              {/* Scout Memo */}
              <p className="text-xs text-slate-300 italic bg-emerald-950/20 p-2.5 rounded border border-emerald-900/30">
                "{candidate.recommendationReason}"
              </p>
            </div>

            {/* Velocity Matrix */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[9px] text-slate-500 uppercase">Subscribers</div>
                  <div className="font-bold text-slate-200 mt-0.5">{formatNumber(candidate.subscribers)}</div>
                </div>
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[9px] text-slate-500 uppercase">30d Velocity</div>
                  <div className="font-bold text-emerald-400 mt-0.5">+{candidate.growthVelocity30d}%</div>
                </div>
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[9px] text-slate-500 uppercase">Engagement</div>
                  <div className="font-bold text-sky-400 mt-0.5">{candidate.organicEngagementRate}%</div>
                </div>
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                  <div className="text-[9px] text-slate-500 uppercase">Loyalty Ratio</div>
                  <div className="font-bold text-amber-400 mt-0.5">{candidate.commentLoyaltyRatio} / 1k</div>
                </div>
              </div>

              <button
                onClick={() => setActiveScoutDossier(candidate)}
                className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition border border-slate-700"
              >
                <span>Open Full A&R Talent Dossier</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* A&R Dossier Modal */}
      {activeScoutDossier && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 text-slate-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={activeScoutDossier.avatarUrl}
                  alt={activeScoutDossier.creatorName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-1.5">
                    <span>{activeScoutDossier.creatorName}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">{activeScoutDossier.channelHandle}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveScoutDossier(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 font-semibold uppercase text-[10px]">A&R Intelligence Assessment</span>
                <p className="text-emerald-400 font-medium text-sm mt-0.5">Label Readiness: {activeScoutDossier.labelReadinessScore}/100</p>
              </div>
              <div>
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Organic Demand Signals</span>
                <p className="text-slate-300 mt-0.5">{activeScoutDossier.recommendationReason}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setActiveScoutDossier(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setActiveScoutDossier(null);
                  onOpenCustomReportModal();
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Executive Signing Pack</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
