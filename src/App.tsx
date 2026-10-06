/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar.js';
import { OverviewDashboard } from './components/OverviewDashboard.js';
import { ExpertRanking } from './components/ExpertRanking.js';
import { QualityVideoDiscovery } from './components/QualityVideoDiscovery.js';
import { CommentSentimentAnalyzer } from './components/CommentSentimentAnalyzer.js';
import { FashionMarketIntelView } from './components/FashionMarketIntelView.js';
import { MovieMarketIntelView } from './components/MovieMarketIntelView.js';
import { TalentScoutView } from './components/TalentScoutView.js';
import { FraudDetectionView } from './components/FraudDetectionView.js';
import { DataQualityView } from './components/DataQualityView.js';
import { CustomAnalysisModal } from './components/CustomAnalysisModal.js';
import { SupportModal } from './components/SupportModal.js';
import {
  YouTubeChannelExpert,
  YouTubeEnrichedVideo,
  FashionMarketIntel,
  MovieMarketIntel,
  TalentScoutCandidate,
  NicheGapInsight,
} from './types.js';
import { Sparkles, ShieldCheck, Database, Award, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [apiStatus, setApiStatus] = useState<any>(null);

  // Data sets
  const [experts, setExperts] = useState<YouTubeChannelExpert[]>([]);
  const [videos, setVideos] = useState<YouTubeEnrichedVideo[]>([]);
  const [fashionIntel, setFashionIntel] = useState<FashionMarketIntel[]>([]);
  const [movieIntel, setMovieIntel] = useState<MovieMarketIntel[]>([]);
  const [talentScout, setTalentScout] = useState<TalentScoutCandidate[]>([]);
  const [nicheGaps, setNicheGaps] = useState<NicheGapInsight[]>([]);

  // Modals & Navigation helpers
  const [isCustomReportModalOpen, setIsCustomReportModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedVideoForAnalysis, setSelectedVideoForAnalysis] = useState<YouTubeEnrichedVideo | null>(null);

  useEffect(() => {
    // Fetch system health
    fetch('/api/status')
      .then((r) => r.json())
      .then((data) => setApiStatus(data))
      .catch((err) => console.error('Error fetching API status:', err));

    // Fetch initial datasets
    fetch('/api/channels/experts')
      .then((r) => r.json())
      .then((data) => setExperts(data))
      .catch((err) => console.error('Error fetching experts:', err));

    fetch('/api/videos/recommendations')
      .then((r) => r.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error('Error fetching videos:', err));

    fetch('/api/market-intelligence/fashion')
      .then((r) => r.json())
      .then((data) => setFashionIntel(data))
      .catch((err) => console.error('Error fetching fashion intel:', err));

    fetch('/api/market-intelligence/movies')
      .then((r) => r.json())
      .then((data) => setMovieIntel(data))
      .catch((err) => console.error('Error fetching movie intel:', err));

    fetch('/api/talent-scout')
      .then((r) => r.json())
      .then((data) => setTalentScout(data))
      .catch((err) => console.error('Error fetching talent scout:', err));

    fetch('/api/niche-gaps')
      .then((r) => r.json())
      .then((data) => setNicheGaps(data))
      .catch((err) => console.error('Error fetching niche gaps:', err));
  }, []);

  // Jump from another view straight into the Comment Sentiment Tab
  const handleJumpToCommentAnalysis = (video: YouTubeEnrichedVideo) => {
    setSelectedVideoForAnalysis(video);
    setCurrentTab('comments');
  };

  const handleJumpToCommentAnalysisById = (videoId: string, title: string) => {
    const matched = videos.find((v) => v.id === videoId);
    if (matched) {
      setSelectedVideoForAnalysis(matched);
    } else {
      setSelectedVideoForAnalysis({
        id: videoId,
        title,
        channelId: '',
        channelTitle: '',
        publishedAt: '',
        thumbnailUrl: '',
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        duration: '',
        niche: selectedNiche,
        qualityIndex: 90,
        popularityRank: 1,
        qualityRank: 1,
        tags: [],
        audienceIntent: 'Teaser/Trailer',
        productionTier: 'Cinema Grade',
        clickbaitPenaltyScore: 0,
        sentimentScore: 90,
        summary: '',
        isBestOfGuide: false,
      });
    }
    setCurrentTab('comments');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        selectedNiche={selectedNiche}
        onSelectNiche={setSelectedNiche}
        onOpenCustomReportModal={() => setIsCustomReportModalOpen(true)}
        onOpenSupportModal={() => setIsSupportModalOpen(true)}
        apiStatus={apiStatus}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {currentTab === 'overview' && (
          <OverviewDashboard
            nicheGaps={nicheGaps}
            selectedNiche={selectedNiche}
            onNavigateTab={setCurrentTab}
            onOpenCustomReportModal={() => setIsCustomReportModalOpen(true)}
          />
        )}

        {currentTab === 'experts' && (
          <ExpertRanking
            channels={experts}
            selectedNiche={selectedNiche}
            onSelectNiche={setSelectedNiche}
            onOpenCustomReportModal={() => setIsCustomReportModalOpen(true)}
          />
        )}

        {currentTab === 'videos' && (
          <QualityVideoDiscovery
            videos={videos}
            selectedNiche={selectedNiche}
            onAnalyzeVideo={handleJumpToCommentAnalysis}
            onOpenCustomReportModal={() => setIsCustomReportModalOpen(true)}
          />
        )}

        {currentTab === 'comments' && (
          <CommentSentimentAnalyzer
            initialVideo={selectedVideoForAnalysis}
            onOpenCustomReportModal={() => setIsCustomReportModalOpen(true)}
          />
        )}

        {currentTab === 'fashion' && (
          <FashionMarketIntelView
            campaigns={fashionIntel}
            onOpenCustomReportModal={() => setIsCustomReportModalOpen(true)}
            onAnalyzeComments={handleJumpToCommentAnalysisById}
          />
        )}

        {currentTab === 'movies' && (
          <MovieMarketIntelView
            movies={movieIntel}
            onOpenCustomReportModal={() => setIsCustomReportModalOpen(true)}
            onAnalyzeComments={handleJumpToCommentAnalysisById}
          />
        )}

        {currentTab === 'scout' && (
          <TalentScoutView
            candidates={talentScout}
            onOpenCustomReportModal={() => setIsCustomReportModalOpen(true)}
            onAnalyzeCandidateVideo={handleJumpToCommentAnalysisById}
          />
        )}

        {currentTab === 'fraud' && (
          <FraudDetectionView
            onOpenCustomReportModal={() => setIsCustomReportModalOpen(true)}
          />
        )}

        {currentTab === 'data-quality' && (
          <DataQualityView apiStatus={apiStatus} />
        )}

        {currentTab === 'support' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-8 space-y-6 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">High Quality End User Support & Custom Services</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                OmniTube provides dedicated Tier-1 institutional account managers, bespoke YouTube Data API pipeline construction, real-time forensic audits, and guaranteed 15-minute SLA ticket resolution.
              </p>
            </div>
            <div className="flex justify-center space-x-3 pt-2">
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-lg shadow-sky-950/50"
              >
                Open Priority Support Ticket
              </button>
              <button
                onClick={() => setIsCustomReportModalOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-950/50"
              >
                Commission Bespoke Custom Analysis
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Enterprise Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-200">OmniTube AI</span>
            <span>— Institutional YouTube Data API v3 Intelligence Platform</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SOC2 Type II Certified</span>
            </span>
            <span className="flex items-center space-x-1">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span>YouTube Data API v3 Compliant</span>
            </span>
            <span className="text-slate-500">15-Minute SLA Guarantee</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CustomAnalysisModal
        isOpen={isCustomReportModalOpen}
        onClose={() => setIsCustomReportModalOpen(false)}
      />

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
}
