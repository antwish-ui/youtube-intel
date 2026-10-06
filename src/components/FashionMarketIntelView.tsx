/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shirt,
  Sparkles,
  TrendingUp,
  ShoppingBag,
  Music,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Percent,
} from 'lucide-react';
import { FashionMarketIntel } from '../types.js';

interface FashionMarketIntelViewProps {
  campaigns: FashionMarketIntel[];
  onOpenCustomReportModal: () => void;
  onAnalyzeComments: (videoId: string, title: string) => void;
}

export const FashionMarketIntelView: React.FC<FashionMarketIntelViewProps> = ({
  campaigns,
  onOpenCustomReportModal,
  onAnalyzeComments,
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<FashionMarketIntel>(campaigns[0] || null);

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
              <Shirt className="w-5 h-5 text-rose-400" />
              <h2 className="text-xl font-bold text-white">
                Luxury Fashion Market Intelligence (Prada, Chanel, LVMH)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Harness early YouTube teaser data to measure public sentiment, aesthetic alignment, soundtrack resonance, and immediate purchase intent before runway and retail launch.
            </p>
          </div>

          <button
            onClick={onOpenCustomReportModal}
            className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commission Luxury Brand Teardown</span>
          </button>
        </div>

        {/* Brand Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {campaigns.map((camp) => {
            const isSelected = selectedCampaign?.id === camp.id;
            return (
              <div
                key={camp.id}
                onClick={() => setSelectedCampaign(camp)}
                className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-950/40 border-rose-500/80 shadow-md shadow-rose-950/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      {camp.brand}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {camp.season}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 mt-1 line-clamp-1">
                    {camp.campaignTitle}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center space-x-1 text-emerald-400 font-semibold">
                    <span>{camp.sentimentScore}% Positive</span>
                  </div>
                  <span className="text-slate-500">{formatNumber(camp.views)} views</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Campaign Detailed Analytics */}
      {selectedCampaign && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {selectedCampaign.brand}
                </span>
                <span className="text-xs text-slate-400 font-mono">• {selectedCampaign.publishedDate}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1.5">{selectedCampaign.videoTitle}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedCampaign.demographicInsight}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onAnalyzeComments(selectedCampaign.videoId, selectedCampaign.videoTitle)}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition"
              >
                <span>Full Comment Collation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Metric KPI Gauges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium">Public Sentiment</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {selectedCampaign.sentimentScore}/100
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{selectedCampaign.overallSentiment}</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium flex items-center space-x-1">
                <span>Aesthetic Approval</span>
              </div>
              <div className="text-2xl font-black text-rose-300 mt-1">
                {selectedCampaign.aestheticApproval}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Garment silhouettes & tailoring</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium flex items-center space-x-1">
                <Music className="w-3.5 h-3.5 text-sky-400" />
                <span>Soundtrack Buzz</span>
              </div>
              <div className="text-2xl font-black text-sky-400 mt-1">
                {selectedCampaign.soundtrackBuzz}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Viral audio replication index</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium flex items-center space-x-1">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>Buy Intent Mentions</span>
              </div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {selectedCampaign.purchaseIntentMentionRate}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Commercial pre-order demand</div>
            </div>
          </div>

          {/* Deep-dive points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>What Won The Audience Over</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedCampaign.keyPraisePoints.map((point, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Audience Hesitations & Criticisms</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedCampaign.keyCriticismPoints.map((point, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Executive Strategic Takeaway */}
          <div className="bg-gradient-to-r from-rose-950/30 to-amber-950/30 p-4 rounded-xl border border-rose-900/50 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
              Merchandising & Production Strategic Guidance
            </span>
            <p className="text-slate-200 leading-relaxed font-medium">
              {selectedCampaign.strategicTakeaway}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
