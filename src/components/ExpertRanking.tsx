/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Award,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  Users,
  Eye,
  Percent,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { YouTubeChannelExpert } from '../types.js';

interface ExpertRankingProps {
  channels: YouTubeChannelExpert[];
  selectedNiche: string;
  onSelectNiche: (niche: string) => void;
  onOpenCustomReportModal: () => void;
}

export const ExpertRanking: React.FC<ExpertRankingProps> = ({
  channels,
  selectedNiche,
  onSelectNiche,
  onOpenCustomReportModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'authority' | 'subscribers' | 'engagement' | 'views'>('authority');
  const [selectedChannel, setSelectedChannel] = useState<YouTubeChannelExpert | null>(null);

  const filteredChannels = channels
    .filter((ch) => {
      const matchesNiche = selectedNiche === 'all' || ch.niche.toLowerCase() === selectedNiche.toLowerCase();
      const matchesSearch =
        ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ch.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ch.primarySpecialty.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesNiche && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'subscribers') return b.subscribers - a.subscribers;
      if (sortBy === 'engagement') return b.averageEngagementRate - a.averageEngagementRate;
      if (sortBy === 'views') return b.totalViews - a.totalViews;
      return b.authorityScore - a.authorityScore;
    });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">
                Niche Authority Leaderboard & Expert Verification
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Algorithms rank channels by verifiable domain expertise, peer citations, pedagogical rigor, and audience comment sentiment depth rather than superficial view counts.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenCustomReportModal}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Commission Expert Audit</span>
            </button>
          </div>
        </div>

        {/* Search and Sort Tooling */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search experts by name, handle, specialty (e.g. 'Transformer', 'Couture', 'IMAX')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-rose-500 placeholder-slate-500"
            />
          </div>

          <div className="md:col-span-5 flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400 shrink-0">Rank by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            >
              <option value="authority">Authority Score (Domain Credibility)</option>
              <option value="engagement">Engagement Rate (Community Loyalty)</option>
              <option value="subscribers">Subscriber Count</option>
              <option value="views">Lifetime Video Views</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expert Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChannels.map((expert, idx) => (
          <div
            key={expert.id}
            onClick={() => setSelectedChannel(expert)}
            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 cursor-pointer transition shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Top row: Avatar, Info, Authority Pill */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={expert.avatarUrl}
                      alt={expert.title}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                    />
                    {expert.verifiedExpert && (
                      <span className="absolute -bottom-1 -right-1 bg-sky-500 text-white rounded-full p-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white hover:text-rose-300 transition line-clamp-1">
                      {expert.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{expert.handle}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {expert.niche}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Authority</div>
                  <div className="text-xl font-black text-amber-400">{expert.authorityScore}</div>
                  <span className="text-[10px] text-slate-500">#{expert.citationRank} in field</span>
                </div>
              </div>

              {/* Credibility & Specialty */}
              <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="text-[11px] text-emerald-400 font-medium flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{expert.credibilityIndex}</span>
                </div>
                <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                  <strong className="text-slate-200">Core Specialty:</strong> {expert.primarySpecialty}
                </p>
              </div>

              {/* Notable Work */}
              <div className="text-xs text-slate-400 line-clamp-1">
                <span className="text-slate-500 font-medium">Flagship Reference: </span>
                <span className="text-slate-300 italic">{expert.notableWork}</span>
              </div>
            </div>

            {/* Bottom Stats Grid */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center text-xs">
              <div className="bg-slate-950/50 p-1.5 rounded border border-slate-800/50">
                <div className="text-[10px] text-slate-500 flex items-center justify-center space-x-1">
                  <Users className="w-2.5 h-2.5" />
                  <span>Subs</span>
                </div>
                <div className="font-bold text-slate-200 mt-0.5">{formatNumber(expert.subscribers)}</div>
              </div>

              <div className="bg-slate-950/50 p-1.5 rounded border border-slate-800/50">
                <div className="text-[10px] text-slate-500 flex items-center justify-center space-x-1">
                  <Percent className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Engage</span>
                </div>
                <div className="font-bold text-emerald-400 mt-0.5">{expert.averageEngagementRate}%</div>
              </div>

              <div className="bg-slate-950/50 p-1.5 rounded border border-slate-800/50">
                <div className="text-[10px] text-slate-500 flex items-center justify-center space-x-1">
                  <Eye className="w-2.5 h-2.5" />
                  <span>Views</span>
                </div>
                <div className="font-bold text-slate-200 mt-0.5">{formatNumber(expert.totalViews)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400">
          <p className="text-sm">No expert channels found matching "{searchTerm}".</p>
          <button
            onClick={() => {
              setSearchTerm('');
              onSelectNiche('all');
            }}
            className="mt-3 text-xs text-rose-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Modal Detail Dossier if Channel Clicked */}
      {selectedChannel && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 text-slate-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedChannel.avatarUrl}
                  alt={selectedChannel.title}
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-700"
                />
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-1.5">
                    <span>{selectedChannel.title}</span>
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedChannel.handle}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedChannel(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Credential Audit</span>
                <p className="text-emerald-400 font-medium text-sm mt-0.5">{selectedChannel.credibilityIndex}</p>
              </div>
              <div>
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Domain Mastery</span>
                <p className="text-slate-200 mt-0.5">{selectedChannel.primarySpecialty}</p>
              </div>
              <div>
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Signature Academic / Industry Citation</span>
                <p className="text-slate-300 italic mt-0.5">"{selectedChannel.notableWork}"</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500">Authority</div>
                <div className="text-base font-bold text-amber-400">{selectedChannel.authorityScore}/100</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500">Engagement</div>
                <div className="text-base font-bold text-emerald-400">{selectedChannel.averageEngagementRate}%</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500">Consistency</div>
                <div className="text-base font-bold text-sky-400">{selectedChannel.consistencyScore}%</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500">Active Years</div>
                <div className="text-base font-bold text-slate-200">{selectedChannel.yearsActive} yrs</div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setSelectedChannel(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  setSelectedChannel(null);
                  onOpenCustomReportModal();
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white"
              >
                Request Competitive Audit on {selectedChannel.handle}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
