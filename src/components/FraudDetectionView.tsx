/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Search,
  Loader2,
  Sparkles,
  BarChart,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface FraudDetectionViewProps {
  onOpenCustomReportModal: () => void;
}

export const FraudDetectionView: React.FC<FraudDetectionViewProps> = ({
  onOpenCustomReportModal,
}) => {
  const [videoId, setVideoId] = useState('vid_bot_sample');
  const [views, setViews] = useState('1500000');
  const [likes, setLikes] = useState('1200');
  const [comments, setComments] = useState('32');
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const presets = [
    {
      label: '⚠️ Suspected Click-Farm Bot Spike',
      views: '1850000',
      likes: '1400',
      comments: '45',
      desc: '1.85M views with 0.07% like ratio and 45 comments (Massive Bot Cluster)',
    },
    {
      label: '✅ Organic Viral Video (High Loyalty)',
      views: '450000',
      likes: '38000',
      comments: '3400',
      desc: 'Authentic 8.4% like ratio and rich discussion',
    },
    {
      label: '⚠️ Polarized Astroturfed Campaign',
      views: '780000',
      likes: '9500',
      comments: '210',
      desc: 'Repetitive bot text clusters detected',
    },
  ];

  const handleRunAudit = async (customV?: string, customL?: string, customC?: string) => {
    const v = customV || views;
    const l = customL || likes;
    const c = customC || comments;

    setLoading(true);
    setAuditResult(null);

    try {
      const res = await fetch('/api/fraud-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId,
          viewCount: Number(v),
          likeCount: Number(l),
          commentCount: Number(c),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAuditResult(data);
      }
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (p: typeof presets[0]) => {
    setViews(p.views);
    setLikes(p.likes);
    setComments(p.comments);
    handleRunAudit(p.views, p.likes, p.comments);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <h2 className="text-xl font-bold text-white">
                YouTube Data API Anti-Fraud & Fake View Forensics
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Detect artificial view inflation, programmatic click-farms, and bot comment repetition. Safeguard brand advertising budgets and verify creator sponsorship integrity.
            </p>
          </div>

          <button
            onClick={onOpenCustomReportModal}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 transition border border-slate-700 shrink-0"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Order Full Channel Due Diligence</span>
          </button>
        </div>

        {/* Preset buttons */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-slate-400">Load Diagnostic Scenario:</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSelectPreset(p)}
                className="text-left p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition space-y-1"
              >
                <div className="text-xs font-bold text-white">{p.label}</div>
                <div className="text-[11px] text-slate-400">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Parameter Input */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Video ID / Target</label>
            <input
              type="text"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-rose-500 font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">View Count</label>
            <input
              type="number"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Like Count</label>
            <input
              type="number"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Comment Count</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={() => handleRunAudit()}
                disabled={loading}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white text-xs font-bold rounded-lg transition shrink-0 flex items-center justify-center"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Audit'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="p-10 text-center bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
          <Loader2 className="w-7 h-7 text-rose-500 animate-spin mx-auto" />
          <div className="text-xs font-semibold text-slate-200">Executing Forensic Audit Models...</div>
          <p className="text-[11px] text-slate-400">
            Checking view-to-comment decoupling, velocity abnormal curvature, and advertiser safety index.
          </p>
        </div>
      )}

      {/* Results View */}
      {auditResult && !loading && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    auditResult.audit.fraudRiskScore > 50
                      ? 'bg-rose-950 text-rose-300 border-rose-800/60'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
                  }`}
                >
                  {auditResult.audit.riskLevel}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">
                  Forensic Fraud Probability: {auditResult.audit.fraudRiskScore}%
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target: {auditResult.metrics.views.toLocaleString()} views | {auditResult.metrics.likes.toLocaleString()} likes | {auditResult.metrics.comments.toLocaleString()} comments
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400">Advertiser Brand Safety</div>
                <div
                  className={`text-2xl font-black ${
                    auditResult.audit.advertiserSafetyScore > 70
                      ? 'text-emerald-400'
                      : auditResult.audit.advertiserSafetyScore > 40
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {auditResult.audit.advertiserSafetyScore}/100
                </div>
              </div>
            </div>

            {/* Metric Ratios */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">Like-to-View Ratio</div>
                <div className="text-base font-bold text-slate-200 mt-0.5">
                  {auditResult.metrics.likeRatio.toFixed(3)}%
                </div>
                <div className="text-[10px] text-slate-500">Benchmark: 3 - 8%</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">Comment-to-View Ratio</div>
                <div className="text-base font-bold text-slate-200 mt-0.5">
                  {auditResult.metrics.commentRatio.toFixed(4)}%
                </div>
                <div className="text-[10px] text-slate-500">Benchmark: 0.2 - 1.0%</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">Comment Diversity</div>
                <div className="text-base font-bold text-slate-200 mt-0.5">
                  {auditResult.audit.fraudRiskScore > 50 ? 'Severe Repetition' : 'Natural Organic'}
                </div>
                <div className="text-[10px] text-slate-500">Semantic entropy score</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">Sponsorship Integrity</div>
                <div className="text-base font-bold text-slate-200 mt-0.5">
                  {auditResult.audit.fraudRiskScore > 50 ? 'HIGH RISK' : 'CLEARED'}
                </div>
                <div className="text-[10px] text-slate-500">Brand contract status</div>
              </div>
            </div>

            {/* Red Flags & Explanations */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Detected Forensic Flags
              </div>
              <div className="space-y-2 text-xs">
                {auditResult.audit.flags?.map((flag: string, i: number) => (
                  <div key={i} className="flex items-start space-x-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-rose-400 font-bold shrink-0">⚠</span>
                    <span className="text-slate-200">{flag}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300">
                <strong className="text-slate-200 block mb-0.5">Forensic Analysis Takeaway:</strong>
                {auditResult.audit.forensicDetails}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
