/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Headphones,
  CheckCircle2,
  Clock,
  Send,
  Loader2,
  ShieldCheck,
  FileQuestion,
  X,
  MessageCircle,
} from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [customer, setCustomer] = useState('Senior Media Planner / Enterprise Partner');
  const [email, setEmail] = useState('enterprise-desk@omnitube.ai');
  const [category, setCategory] = useState('Custom YouTube Data API Extraction');
  const [urgency, setUrgency] = useState<'Standard' | 'Urgent' | 'Critical'>('Urgent');
  const [message, setMessage] = useState(
    'We are preparing a multi-million-dollar global brand launch tomorrow and require verified comment sentiment collation across 12 competitor teaser videos within 4 hours.'
  );
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [submittedTicket, setSubmittedTicket] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/support/tickets')
        .then((res) => res.json())
        .then((data) => setTickets(data))
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/support/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          email,
          category,
          urgency,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedTicket(data.ticket);
        setTickets((prev) => [data.ticket, ...prev]);
      }
    } catch (err) {
      console.error('Failed to submit ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 text-slate-200 my-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Enterprise VIP Support & Dedicated Analyst Desk
              </h3>
              <p className="text-xs text-slate-400">
                15-Minute Guaranteed SLA • Direct Data Engineering Channel • Live Ticket Resolution
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SLA Guarantee Banner */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-500">First Response SLA</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">&lt; 15 Minutes</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-500">Dedicated Support</div>
            <div className="text-sm font-bold text-sky-400 mt-0.5">Senior Data Lead</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-[10px] text-slate-500">API Health Guarantee</div>
            <div className="text-sm font-bold text-amber-400 mt-0.5">99.9% Uptime</div>
          </div>
        </div>

        {/* Form or Submitted State */}
        {!submittedTicket ? (
          <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Client Name / Enterprise Entity</label>
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Direct Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500"
                >
                  <option value="Custom YouTube Data API Extraction">Custom YouTube Data API Extraction</option>
                  <option value="Anti-Fraud & Bot Channel Audit">Anti-Fraud & Bot Channel Audit</option>
                  <option value="Trailer / Teaser Sentiment Run">Trailer / Teaser Sentiment Run</option>
                  <option value="A&R Talent Radar Custom Scan">A&R Talent Radar Custom Scan</option>
                  <option value="Quota Expansion & Enterprise Rate Limits">Quota Expansion & Enterprise Rate Limits</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Priority Level</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500"
                >
                  <option value="Standard">Standard (Within 2 Hours)</option>
                  <option value="Urgent">Urgent (Within 30 Mins)</option>
                  <option value="Critical">Critical Enterprise (Under 15 Mins Guaranteed)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Describe Support / Custom Requirement</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500 leading-relaxed"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center space-x-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Routing to Senior Triage...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Priority Support Ticket</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ticket #{submittedTicket.id} Created & Assigned</span>
            </div>
            <div className="text-slate-300">
              <strong>Assigned Engineer:</strong> {submittedTicket.assignedAnalyst || 'Marcus Vance, Lead API Systems Specialist'}
            </div>
            <div className="text-slate-300">
              <strong>SLA Commitment:</strong> {submittedTicket.slaTimeRemaining}
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
              <span className="text-[10px] text-sky-400 font-bold uppercase block mb-1">
                Automated Immediate Resolution / Triage Note:
              </span>
              <p className="leading-relaxed">{submittedTicket.aiResolution}</p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSubmittedTicket(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        )}

        {/* Existing Open & Historical Tickets */}
        {tickets.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Recent Support Tickets</span>
              <span>{tickets.length} total</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
              {tickets.map((t, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">#{t.id} - {t.category}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        t.status === 'Resolved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="text-slate-400 line-clamp-1">{t.message}</p>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
                    <span>{t.customer}</span>
                    <span>SLA: {t.slaTimeRemaining}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
