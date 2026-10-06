/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Video,
  Award,
  Sparkles,
  Flame,
  ThumbsUp,
  MessageSquare,
  Eye,
  SlidersHorizontal,
  BookmarkCheck,
  ShieldCheck,
  Tag,
  ArrowRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { YouTubeEnrichedVideo } from '../types.js';

interface QualityVideoDiscoveryProps {
  videos: YouTubeEnrichedVideo[];
  selectedNiche: string;
  onAnalyzeVideo: (video: YouTubeEnrichedVideo) => void;
  onOpenCustomReportModal: () => void;
}

export const QualityVideoDiscovery: React.FC<QualityVideoDiscoveryProps> = ({
  videos,
  selectedNiche,
  onAnalyzeVideo,
  onOpenCustomReportModal,
}) => {
  const [sortBy, setSortBy] = useState<'quality' | 'views' | 'likes' | 'comments' | 'sentiment'>('quality');
  const [guideOnly, setGuideOnly] = useState(false);
  const [intentFilter, setIntentFilter] = useState<string>('all');

  const filteredVideos = videos
    .filter((v) => {
      const matchesNiche = selectedNiche === 'all' || v.niche.toLowerCase() === selectedNiche.toLowerCase();
      const matchesGuide = !guideOnly || v.isBestOfGuide;
      const matchesIntent = intentFilter === 'all' || v.audienceIntent === intentFilter;
      return matchesNiche && matchesGuide && matchesIntent;
    })
    .sort((a, b) => {
      if (sortBy === 'views') return b.viewCount - a.viewCount;
      if (sortBy === 'likes') return b.likeCount - a.likeCount;
      if (sortBy === 'comments') return b.commentCount - a.commentCount;
      if (sortBy === 'sentiment') return b.sentimentScore - a.sentimentScore;
      return b.qualityIndex - a.qualityIndex;
    });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-rose-400" />
              <h2 className="text-xl font-bold text-white">
                Quality-First Video Discovery & "Best-Of" Topic Guides
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Popularity does not equal quality. The OmniTube Quality Index computes informational density, comment-to-view ratios, and penalizes sensational clickbait to spotlight true masterworks.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setGuideOnly(!guideOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition border ${
                guideOnly
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{guideOnly ? 'Showing "Best-Of" Guides Only' : 'Filter "Best-Of" Curated Guides'}</span>
            </button>
          </div>
        </div>

        {/* Filter and Sorting Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Audience Intent:</span>
            {['all', 'Tutorial', 'Deep Dive', 'Teaser/Trailer', 'Review & Critique', 'Talent Showcase'].map((intent) => (
              <button
                key={intent}
                onClick={() => setIntentFilter(intent)}
                className={`text-xs px-2.5 py-1 rounded-md transition ${
                  intentFilter === intent
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {intent === 'all' ? 'All Formats' : intent}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400">Sort Ranking:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 text-xs font-medium text-slate-200 border border-slate-800 rounded px-2.5 py-1 focus:outline-none focus:border-rose-500"
            >
              <option value="quality">⭐ Quality Index (Substance over Clickbait)</option>
              <option value="views">👁️ Raw View Count (Popularity)</option>
              <option value="likes">👍 Like Count</option>
              <option value="comments">💬 Comment Count (Engagement Depth)</option>
              <option value="sentiment">❤️ Sentiment Positivity Score</option>
            </select>
          </div>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden flex flex-col justify-between transition group shadow-sm"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white font-medium">
                  {video.duration}
                </span>

                {/* Quality Score Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-slate-950/90 backdrop-blur-md border border-slate-700/80 flex items-center space-x-1.5 shadow-lg">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-black text-amber-300">
                    Quality {video.qualityIndex}/100
                  </span>
                </div>

                {video.isBestOfGuide && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                    Curated Best-Of
                  </div>
                )}
              </div>

              {/* Body Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">{video.channelTitle}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-300">
                    {video.productionTier}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition line-clamp-2">
                  {video.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {video.summary}
                </p>

                {/* Enriched Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 border border-rose-800/60">
                    {video.audienceIntent}
                  </span>
                  {video.tags.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Metrics & Action */}
            <div className="p-4 pt-0 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-t border-b border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-500">Views</div>
                  <div className="font-bold text-slate-200 mt-0.5">{formatNumber(video.viewCount)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Likes</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{formatNumber(video.likeCount)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Comments</div>
                  <div className="font-bold text-sky-400 mt-0.5">{formatNumber(video.commentCount)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-400">
                  Clickbait Penalty: <strong className="text-slate-300">{video.clickbaitPenaltyScore}%</strong>
                </div>

                <button
                  onClick={() => onAnalyzeVideo(video)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Analyze Comments</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400">
          <p className="text-sm">No videos found matching the current criteria.</p>
        </div>
      )}
    </div>
  );
};
