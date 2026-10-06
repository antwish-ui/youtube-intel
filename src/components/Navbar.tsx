/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Compass,
  Award,
  Video,
  MessageSquare,
  Shirt,
  Film,
  UserCheck,
  ShieldAlert,
  Database,
  HeadphonesIcon,
  Sparkles,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export type NavTab =
  | 'overview'
  | 'experts'
  | 'videos'
  | 'comments'
  | 'fashion'
  | 'movies'
  | 'scout'
  | 'fraud'
  | 'data-quality'
  | 'support';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  selectedNiche: string;
  onSelectNiche: (niche: string) => void;
  onOpenCustomReportModal: () => void;
  onOpenSupportModal: () => void;
  apiStatus: any;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  selectedNiche,
  onSelectNiche,
  onOpenCustomReportModal,
  onOpenSupportModal,
  apiStatus,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Intelligence Hub', icon: <Compass className="w-4 h-4" /> },
    { id: 'experts', label: 'Expert Channels', icon: <Award className="w-4 h-4" /> },
    { id: 'videos', label: 'Quality vs Popularity', icon: <Video className="w-4 h-4" />, badge: 'Best-Of' },
    { id: 'comments', label: 'Comment Sentiment', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'fashion', label: 'Fashion Teasers', icon: <Shirt className="w-4 h-4" />, badge: 'Prada/Chanel' },
    { id: 'movies', label: 'Movie Trailers', icon: <Film className="w-4 h-4" />, badge: 'Box Office' },
    { id: 'scout', label: 'Talent Scout Radar', icon: <UserCheck className="w-4 h-4" />, badge: 'A&R' },
    { id: 'fraud', label: 'Anti-Fraud Forensics', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'data-quality', label: 'Data Quality & API v3', icon: <Database className="w-4 h-4" /> },
    { id: 'support', label: 'VIP Concierge & Custom', icon: <HeadphonesIcon className="w-4 h-4" /> },
  ];

  const niches = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'AI & Robotics', label: 'AI & Robotics' },
    { id: 'Luxury Fashion', label: 'Luxury Fashion' },
    { id: 'Cinema & Hollywood', label: 'Cinema & Hollywood' },
    { id: 'Music & Production', label: 'Music & Production' },
    { id: 'FinTech & Markets', label: 'FinTech & Markets' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner: Status & Enterprise Tools */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-b border-slate-800/60 flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-800/80 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>YouTube Data API v3 Connected</span>
          </div>
          <span className="hidden md:inline text-slate-500">•</span>
          <div className="hidden md:flex items-center space-x-1.5 text-slate-400">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span>Quota: {apiStatus?.apiQuotaUsed || '1,840 / 10,000 units'}</span>
          </div>
          <span className="hidden md:inline text-slate-500">•</span>
          <div className="hidden sm:flex items-center space-x-1 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Completeness: {apiStatus?.metadataCompletenessScore || 99.4}%</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenCustomReportModal}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Custom Analysis Service</span>
          </button>

          <button
            onClick={onOpenSupportModal}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
          >
            <HeadphonesIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>VIP Support (15m SLA)</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('overview')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-950/50">
            <span className="font-black text-xl tracking-tighter text-white">Ω</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-100">OmniTube AI</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Data API v3
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Market Intelligence, Expert Rankings & Sentiment Synthesis
            </p>
          </div>
        </div>

        {/* Niche Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <span className="text-xs font-semibold px-2 text-slate-400">Niche:</span>
          <select
            value={selectedNiche}
            onChange={(e) => onSelectNiche(e.target.value)}
            aria-label="Filter by niche"
            className="bg-slate-950 text-xs font-medium text-slate-200 border border-slate-700/80 rounded px-2.5 py-1 focus:outline-none focus:border-rose-500"
          >
            {niches.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scrollable Navigation Strip */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none border-t border-slate-900">
        <nav className="flex space-x-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-900/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      active
                        ? 'bg-rose-800/80 text-rose-100'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
