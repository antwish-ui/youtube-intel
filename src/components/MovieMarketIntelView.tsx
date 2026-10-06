/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Film,
  Sparkles,
  Clapperboard,
  Users,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { MovieMarketIntel } from '../types.js';

interface MovieMarketIntelViewProps {
  movies: MovieMarketIntel[];
  onOpenCustomReportModal: () => void;
  onAnalyzeComments: (videoId: string, title: string) => void;
}

export const MovieMarketIntelView: React.FC<MovieMarketIntelViewProps> = ({
  movies,
  onOpenCustomReportModal,
  onAnalyzeComments,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieMarketIntel>(movies[0] || null);

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
              <Film className="w-5 h-5 text-rose-400" />
              <h2 className="text-xl font-bold text-white">
                Studio Box Office & Trailer Market Intelligence
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Movie studios and distributors use YouTube trailer comment velocity, casting sentiment, and VFX reaction metrics to model opening weekend domestic & international box office tracking.
            </p>
          </div>

          <button
            onClick={onOpenCustomReportModal}
            className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commission Box Office Model</span>
          </button>
        </div>

        {/* Movie Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {movies.map((mov) => {
            const isSelected = selectedMovie?.id === mov.id;
            return (
              <div
                key={mov.id}
                onClick={() => setSelectedMovie(mov)}
                className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-950/40 border-rose-500/80 shadow-md shadow-rose-950/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-300">
                      {mov.studio}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {mov.releaseWindow}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">{mov.movieTitle}</h4>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center space-x-1 text-amber-400 font-bold">
                    <span>Hype {mov.boxOfficeHypeIndex}/100</span>
                  </div>
                  <span className="text-slate-500">{formatNumber(mov.views)} views</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Movie Detailed Intelligence */}
      {selectedMovie && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {selectedMovie.trailerType}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">• Release: {selectedMovie.releaseWindow}</span>
              </div>
              <h3 className="text-xl font-black text-white mt-1.5">{selectedMovie.movieTitle}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official YouTube Data API v3 trailer audit ({formatNumber(selectedMovie.commentsAnalyzed)} comments sampled)
              </p>
            </div>

            <button
              onClick={() => onAnalyzeComments(selectedMovie.videoId, selectedMovie.videoTitle)}
              className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition shrink-0"
            >
              <span>Examine Trailer Comments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* KPI Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium">Box Office Hype Index</div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {selectedMovie.boxOfficeHypeIndex}/100
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Projected tentpole trajectory</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium">Trailer Sentiment</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {selectedMovie.sentimentScore}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Audience praise vs backlash</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium">Lead Actor Approval</div>
              <div className="text-2xl font-black text-rose-300 mt-1">
                {selectedMovie.castingReception.leadActorApproval}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Casting alignment score</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium">Director Signature Score</div>
              <div className="text-2xl font-black text-sky-400 mt-1">
                {selectedMovie.castingReception.directorStyleScore}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Auteur brand loyalty</div>
            </div>
          </div>

          {/* CGI & Delta Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                VFX / Practical In-Camera Tone Reception
              </span>
              <p className="text-slate-200">{selectedMovie.cgiToneReception}</p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Trailer vs Teaser Sentiment Delta
              </span>
              <p className="text-slate-200">{selectedMovie.trailerVsTeaserDelta}</p>
            </div>
          </div>

          {/* Fan Theories and Risk Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-1.5 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>Viral Viewer Theories Driving Secondary Buzz</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedMovie.topViewerTheories.map((theory, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{theory}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Studio Risk Factors & Marketing Adjustments</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedMovie.riskFactors.map((risk, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
