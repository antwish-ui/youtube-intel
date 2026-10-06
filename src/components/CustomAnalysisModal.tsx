/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Loader2,
  FileText,
  CheckCircle2,
  Download,
  Copy,
  TrendingUp,
  AlertTriangle,
  X,
} from 'lucide-react';

interface CustomAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomAnalysisModal: React.FC<CustomAnalysisModalProps> = ({ isOpen, onClose }) => {
  const [clientName, setClientName] = useState('Prada Group / Luxury Strategy');
  const [industry, setIndustry] = useState('Luxury Haute Couture');
  const [objective, setObjective] = useState(
    'Measure public sentiment for FW 2026/27 campaign teaser, assess purchase intent on velvet outerwear, and benchmark against Chanel & Dior.'
  );
  const [targetAudience, setTargetAudience] = useState('High Net Worth Individuals (HNWI) & Cinephile fashion enthusiasts (22-45)');
  const [competitors, setCompetitors] = useState('Chanel Couture, Louis Vuitton Men’s, Saint Laurent');
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/custom-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          industry,
          objective,
          targetAudience,
          competitors,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedReport(data);
      }
    } catch (err) {
      console.error('Failed to generate report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedReport) return;
    navigator.clipboard.writeText(JSON.stringify(generatedReport.report, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 text-slate-200 my-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Bespoke Custom Analysis Service (VIP Enterprise)
              </h3>
              <p className="text-xs text-slate-400">
                Turn YouTube Data API v3 parameters into executive briefings, forecast models, and competitive benchmarks.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!generatedReport ? (
          <form onSubmit={handleGenerateReport} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Client / Brand Organization</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Industry Sector</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Luxury Haute Couture">Luxury Haute Couture & Fashion</option>
                  <option value="Hollywood Studios & Film Distribution">Hollywood Studios & Film Distribution</option>
                  <option value="Frontier AI & Enterprise Tech">Frontier AI & Enterprise Tech</option>
                  <option value="Major Record Label & A&R Scouting">Major Record Label & A&R Scouting</option>
                  <option value="FinTech & Quantitative Capital">FinTech & Quantitative Capital</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Core Intelligence Objective</label>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Target Audience Profile</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Competitors to Benchmark</label>
                <input
                  type="text"
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center space-x-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Models & Insights...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Custom Intelligence Briefing</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-5 text-xs max-h-[70vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60">
              <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Report #{generatedReport.reportId} Generated Successfully</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                </button>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Executive Takeaway
              </span>
              <p className="text-slate-200 leading-relaxed font-medium">
                {generatedReport.report.executiveSummary}
              </p>
            </div>

            {/* Benchmark Matrix */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Competitor Intelligence Benchmark Matrix
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {generatedReport.report.benchmarkMatrix?.map((comp: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-white">{comp.brand}</div>
                    <div className="text-slate-400 text-[11px]">Views/Launch: {comp.avgViewsPerLaunch}</div>
                    <div className="text-emerald-400 text-[11px]">Sentiment: {comp.sentimentIndex}%</div>
                    <div className="text-sky-400 text-[11px]">Retention: {comp.retentionProxy}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forecast Model */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                Predictive Model Forecast (30-Day Window)
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">Projected Views</div>
                  <div className="font-bold text-slate-200 mt-0.5">{generatedReport.report.modelForecast?.projectedViews30d}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">Target Engagement</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{generatedReport.report.modelForecast?.targetEngagementRate}</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">Virality Probability</div>
                  <div className="font-bold text-amber-400 mt-0.5">{generatedReport.report.modelForecast?.viralityProbability}</div>
                </div>
              </div>
            </div>

            {/* Tactical Guidelines */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Tactical Guidelines for Launch
              </span>
              <ul className="space-y-1.5">
                {generatedReport.report.recommendedStrategy?.map((strat: string, idx: number) => (
                  <li key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 flex items-start space-x-2">
                    <span className="text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                    <span className="text-slate-300">{strat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hazards */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Critical Hazards & Risk Factors
              </span>
              <ul className="space-y-1.5">
                {generatedReport.report.criticalRisks?.map((risk: string, idx: number) => (
                  <li key={idx} className="p-2 rounded bg-slate-950 border border-rose-950/40 flex items-start space-x-2 text-rose-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setGeneratedReport(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
              >
                Create Another Audit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
