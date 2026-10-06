/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  RefreshCw,
  TrendingUp,
  Share2,
  FileText,
} from 'lucide-react';
import { YouTubeEnrichedVideo } from '../types.js';

interface CommentSentimentAnalyzerProps {
  initialVideo?: YouTubeEnrichedVideo | null;
  onOpenCustomReportModal: () => void;
}

export const CommentSentimentAnalyzer: React.FC<CommentSentimentAnalyzerProps> = ({
  initialVideo,
  onOpenCustomReportModal,
}) => {
  const [videoUrl, setVideoUrl] = useState(
    initialVideo ? `https://youtube.com/watch?v=${initialVideo.id}` : 'https://youtube.com/watch?v=vid_ai_101'
  );
  const [videoTitle, setVideoTitle] = useState(
    initialVideo ? initialVideo.title : 'Let’s reproduce GPT-2 (124M) in 4 hours of pure PyTorch'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [rawComments, setRawComments] = useState<any[]>([]);
  const [customCommentInput, setCustomCommentInput] = useState('');

  const sampleQuickPicks = [
    {
      id: 'vid_ai_101',
      title: 'Andrej Karpathy - Reproducing GPT-2 in PyTorch',
      type: 'Technical Masterclass',
    },
    {
      id: 'vid_fash_202',
      title: 'Prada Holiday Teaser: The Velvet Mirage',
      type: 'Fashion Campaign',
    },
    {
      id: 'vid_mov_301',
      title: 'CHRONOS: Official IMAX Trailer (Christopher Nolan)',
      type: 'Hollywood Blockbuster',
    },
    {
      id: 'vid_tal_401',
      title: 'Sienna Raye - "Echoes in the Lavender" (Acoustic)',
      type: 'Emerging Talent Showcase',
    },
  ];

  const handleQuickPick = (pick: { id: string; title: string }) => {
    setVideoUrl(`https://youtube.com/watch?v=${pick.id}`);
    setVideoTitle(pick.title);
    handleAnalyzeComments(pick.id, pick.title);
  };

  const extractVideoId = (input: string) => {
    if (!input) return 'vid_ai_101';
    if (input.includes('v=')) return input.split('v=')[1]?.split('&')[0] || input;
    if (input.includes('youtu.be/')) return input.split('youtu.be/')[1]?.split('?')[0] || input;
    return input.trim();
  };

  const handleAnalyzeComments = async (overrideId?: string, overrideTitle?: string) => {
    const vidId = overrideId || extractVideoId(videoUrl);
    const title = overrideTitle || videoTitle || 'YouTube Video';

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/comments/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId: vidId,
          videoTitle: title,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.analysis);
        setRawComments(data.rawComments || []);
      }
    } catch (err) {
      console.error('Failed to analyze comments:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-rose-400" />
              <h2 className="text-xl font-bold text-white">
                YouTube Comment Sentiment & Audience Feedback Collation
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Capture and synthesize thousands of YouTube viewer comments using YouTube Data API v3 and Gemini 3.8 Flash. Identify exact audience praises, friction points, and creator action items.
            </p>
          </div>

          <button
            onClick={onOpenCustomReportModal}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 transition border border-slate-700 shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Executive Brief</span>
          </button>
        </div>

        {/* Input Bar */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Paste YouTube Video URL or Video ID (e.g., https://youtube.com/watch?v=...)..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
            />
            <button
              onClick={() => handleAnalyzeComments()}
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white text-xs font-bold flex items-center justify-center space-x-2 transition shadow-md shadow-rose-950/50 shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Collating Comments...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Synthesize Comments</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Curated Presets */}
          <div className="flex items-center space-x-2 pt-1 overflow-x-auto scrollbar-none text-xs">
            <span className="text-slate-500 font-semibold shrink-0">Quick Presets:</span>
            {sampleQuickPicks.map((pick) => (
              <button
                key={pick.id}
                onClick={() => handleQuickPick(pick)}
                className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 whitespace-nowrap transition flex items-center space-x-1"
              >
                <span>{pick.title}</span>
                <span className="text-[10px] text-slate-500">({pick.type})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading state skeleton */}
      {loading && (
        <div className="p-12 text-center bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
          <Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
          <div className="text-sm font-semibold text-slate-200">
            Capturing comments with YouTube Data API v3 & clustering viewer sentiment...
          </div>
          <p className="text-xs text-slate-400">
            Gemini 3.8 Flash is calculating emotional polarity, extracting liked/disliked features, and synthesizing creator action items.
          </p>
        </div>
      )}

      {/* Analysis Results View */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Polarity Summary & Verdict */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  Audience Verdict
                </span>
                <h3 className="text-base font-bold text-white mt-1.5">{result.overallVerdict}</h3>
              </div>

              {/* Sentiment distribution bar */}
              <div className="w-full md:w-80 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-emerald-400">{result.sentimentBreakdown.positivePercentage}% Liked</span>
                  <span className="text-slate-400">{result.sentimentBreakdown.neutralPercentage}% Neutral</span>
                  <span className="text-rose-400">{result.sentimentBreakdown.negativePercentage}% Disliked</span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${result.sentimentBreakdown.positivePercentage}%` }}
                    title="Positive"
                  />
                  <div
                    className="bg-slate-500 h-full"
                    style={{ width: `${result.sentimentBreakdown.neutralPercentage}%` }}
                    title="Neutral"
                  />
                  <div
                    className="bg-rose-500 h-full"
                    style={{ width: `${result.sentimentBreakdown.negativePercentage}%` }}
                    title="Negative"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Two Columns: What Viewers Liked vs What Viewers Disliked */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What Viewers Liked */}
            <div className="bg-slate-900/80 border border-emerald-900/40 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400">
                <ThumbsUp className="w-4 h-4" />
                <h4 className="text-sm font-bold uppercase tracking-wider">
                  What Viewers Specifically Liked / Praised
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {result.likedAspects?.map((aspect: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2 bg-slate-950/60 p-3 rounded-lg border border-emerald-950/60">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span className="leading-relaxed">{aspect}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Viewers Disliked */}
            <div className="bg-slate-900/80 border border-rose-900/40 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-2 text-rose-400">
                <ThumbsDown className="w-4 h-4" />
                <h4 className="text-sm font-bold uppercase tracking-wider">
                  What Viewers Disliked / Criticized / Questioned
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                {result.dislikedAspects?.map((aspect: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2 bg-slate-950/60 p-3 rounded-lg border border-rose-950/60">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span className="leading-relaxed">{aspect}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Viewer Feature Requests & Creator Action Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Viewer Requests */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-sky-400">
                <HelpCircle className="w-4 h-4" />
                <h4 className="text-sm font-bold">Viewer Demand & Unanswered Inquiries</h4>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                {result.viewerDemands?.map((demand: string, i: number) => (
                  <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    <span>{demand}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Creator Action Items */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400">
                <Sparkles className="w-4 h-4" />
                <h4 className="text-sm font-bold">Actionable Creator Strategy Playbook</h4>
              </div>
              <div className="space-y-2 text-xs text-slate-200">
                {result.creatorActionItems?.map((item: string, i: number) => (
                  <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-start space-x-2">
                    <span className="text-amber-400 font-bold shrink-0">{i + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collated Raw Comments Stream */}
          {rawComments.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider">
                  Raw Sample Comments ({rawComments.length} collated)
                </span>
                <span className="text-slate-500 font-mono">Filtered by relevance & like velocity</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
                {rawComments.map((comm, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="font-semibold text-slate-300">@{comm.author}</span>
                      <div className="flex items-center space-x-3">
                        <span>👍 {comm.likes}</span>
                        <span>{comm.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-slate-300">{comm.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
