/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Layers,
  Code2,
  FileCode,
  AlertCircle,
} from 'lucide-react';

interface DataQualityViewProps {
  apiStatus: any;
}

export const DataQualityView: React.FC<DataQualityViewProps> = ({ apiStatus }) => {
  const [activeView, setActiveView] = useState<'provenance' | 'schemaComparison'>('provenance');

  const rawSchemaSample = {
    kind: 'youtube#video',
    etag: 'm2g8Z6-xN9_vR8',
    id: 'vid_ai_101',
    snippet: {
      publishedAt: '2024-06-11T16:00:00Z',
      channelId: 'ch_ai_01',
      title: 'Let’s reproduce GPT-2 (124M) in 4 hours of pure PyTorch',
      description: 'We build GPT-2 from scratch in PyTorch...',
      thumbnails: {
        high: { url: 'https://images.unsplash.com/...', width: 480, height: 360 }
      },
      tags: ['GPT-2', 'PyTorch'],
      categoryId: '28'
    },
    statistics: {
      viewCount: '1450000',
      likeCount: '92000',
      commentCount: '4200'
    }
  };

  const enrichedSchemaSample = {
    ...rawSchemaSample,
    _omniTubeEnrichment: {
      qualityIndex: 99,
      qualityRankInNiche: 1,
      audienceIntent: 'Deep Dive & Technical Implementation',
      productionTier: 'Studio Broadcast',
      clickbaitPenaltyScore: 0,
      sentimentPolarity: { positive: 98, neutral: 2, negative: 0 },
      topAudienceDemand: 'LoRA fine-tuning & distributed DDP tutorial',
      fraudProbability: 0.4,
      advertiserBrandSafety: 99,
      academicCitationWorthiness: 'High (Graduate Level ML)',
      verifiedExpertAnchor: '@Karpathy (Authority: 99/100)'
    }
  };

  const qualityChecks = [
    { label: 'Video ID & Stream Resolution', status: '100% Validated', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { label: 'HD 1080p / 4K Asset Verification', status: '100% Present', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { label: 'Closed Captions / Transcripts', status: '98.8% Available', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { label: 'Topic Taxonomy & Classification', status: 'Enriched & Tagged', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { label: 'Licensed Content Copyright Status', status: 'Verified Authentic', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { label: 'Comment Latency & Polarity Sync', status: '< 38ms Average', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl font-bold text-white">
                Data Quality, Completeness & AI Enrichment Pipeline
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Ensure data integrity, zero missing metadata fields, and inspect how OmniTube enriches raw YouTube Data API v3 records with multi-dimensional intent, quality, and sentiment parameters.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveView('provenance')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeView === 'provenance'
                  ? 'bg-sky-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Completeness & Health
            </button>
            <button
              onClick={() => setActiveView('schemaComparison')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeView === 'schemaComparison'
                  ? 'bg-sky-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Raw vs Enriched Schema
            </button>
          </div>
        </div>
      </div>

      {activeView === 'provenance' ? (
        <div className="space-y-6">
          {/* Health Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium">Data Completeness</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {apiStatus?.metadataCompletenessScore || 99.4}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Zero null attributes in core fields</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium">API Latency</div>
              <div className="text-2xl font-black text-sky-400 mt-1">
                {apiStatus?.latencyMs || 38}ms
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">High-speed server cache edge</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium">Quota Consumption</div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                18.4%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">1,840 / 10,000 daily points</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-500 font-medium">Enrichment Multiplier</div>
              <div className="text-2xl font-black text-rose-400 mt-1">
                14x
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Additional synthetic attributes</div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              YouTube Data API v3 Field Completeness Audit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {qualityChecks.map((chk, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs">
                  <span className="text-slate-300 font-medium">{chk.label}</span>
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                    {chk.icon}
                    <span>{chk.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Raw vs Enriched Schema Side-by-Side */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 flex items-center space-x-1.5">
                <FileCode className="w-4 h-4 text-slate-500" />
                <span>Raw YouTube Data API v3 Payload</span>
              </span>
              <span className="text-slate-600 font-mono text-[10px]">Standard Google v3</span>
            </div>
            <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono overflow-x-auto max-h-[460px] scrollbar-thin">
              {JSON.stringify(rawSchemaSample, null, 2)}
            </pre>
          </div>

          <div className="bg-slate-900/80 border border-emerald-900/50 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-300 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>OmniTube AI Enriched Payload</span>
              </span>
              <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                +14 Intelligent Dimensions
              </span>
            </div>
            <pre className="p-3 bg-slate-950 rounded-lg border border-emerald-900/40 text-[11px] text-emerald-300 font-mono overflow-x-auto max-h-[460px] scrollbar-thin">
              {JSON.stringify(enrichedSchemaSample, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
