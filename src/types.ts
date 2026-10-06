/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface YouTubeChannelExpert {
  id: string;
  title: string;
  handle: string;
  avatarUrl: string;
  niche: string;
  subscribers: number;
  videoCount: number;
  totalViews: number;
  authorityScore: number; // 0 - 100
  credibilityIndex: string; // e.g. "Triple-A Domain Authority"
  primarySpecialty: string;
  consistencyScore: number; // 0 - 100
  averageEngagementRate: number; // e.g. 7.4%
  notableWork: string;
  verifiedExpert: boolean;
  yearsActive: number;
  citationRank: number;
}

export interface YouTubeEnrichedVideo {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailUrl: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string;
  niche: string;
  qualityIndex: number; // 0 - 100 calculated from depth, like ratio, comment ratio
  popularityRank: number;
  qualityRank: number;
  tags: string[];
  audienceIntent: 'Tutorial' | 'Deep Dive' | 'Teaser/Trailer' | 'Review & Critique' | 'Case Study' | 'Talent Showcase';
  productionTier: 'Cinema Grade' | 'Studio Broadcast' | 'High-End Indie' | 'Raw Authentic';
  clickbaitPenaltyScore: number; // 0 (none) - 100 (high)
  sentimentScore: number; // 0 - 100
  summary: string;
  isBestOfGuide: boolean;
}

export interface FashionMarketIntel {
  id: string;
  brand: string;
  campaignTitle: string;
  season: string;
  videoId: string;
  videoTitle: string;
  publishedDate: string;
  views: number;
  likes: number;
  commentsAnalyzed: number;
  overallSentiment: 'Overwhelmingly Positive' | 'Polarized & Avant-Garde' | 'Viral Acclaim' | 'Cautious Skepticism';
  sentimentScore: number; // 0 - 100
  aestheticApproval: number; // 0 - 100
  soundtrackBuzz: number;
  purchaseIntentMentionRate: number; // % of comments expressing buy intent
  keyPraisePoints: string[];
  keyCriticismPoints: string[];
  demographicInsight: string;
  strategicTakeaway: string;
}

export interface MovieMarketIntel {
  id: string;
  studio: string;
  movieTitle: string;
  releaseWindow: string;
  videoId: string;
  videoTitle: string;
  trailerType: 'Official Teaser' | 'Teaser Trailer 2' | 'Main Trailer' | 'Final IMAX Trailer';
  views: number;
  likes: number;
  commentsAnalyzed: number;
  boxOfficeHypeIndex: number; // 0 - 100
  sentimentScore: number;
  castingReception: {
    leadActorApproval: number;
    villainApproval: number;
    directorStyleScore: number;
  };
  cgiToneReception: string;
  trailerVsTeaserDelta: string;
  topViewerTheories: string[];
  riskFactors: string[];
}

export interface TalentScoutCandidate {
  id: string;
  creatorName: string;
  channelHandle: string;
  avatarUrl: string;
  category: 'Indie Musician / Vocalist' | 'Filmmaker / Cinematographer' | 'AI Researcher' | 'Fashion Designer' | 'Visual Artist';
  subscribers: number;
  growthVelocity30d: number; // % growth
  viewsLast30d: number;
  commentLoyaltyRatio: number; // comments per 1k views
  organicEngagementRate: number;
  viralHitVideoId: string;
  viralHitTitle: string;
  signatureStyle: string;
  labelReadinessScore: number; // 0 - 100
  recommendationReason: string;
}

export interface NicheGapInsight {
  niche: string;
  whiteSpaceTopic: string;
  viewerDemandIndex: number; // 0 - 100
  currentSupplySaturation: 'Extremely Low' | 'Moderate' | 'Oversaturated';
  projectedOpportunityScore: number; // 0 - 100
  recommendedTitleArchetype: string;
  targetThumbnailAngle: string;
  optimalUploadWindow: string;
}
