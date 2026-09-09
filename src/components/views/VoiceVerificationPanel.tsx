import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Loader2,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { Opportunity } from '../../types';

type Props = {
  opportunity: Opportunity;
};

type CallResult = {
  id?: string;
  call_id?: string;
  status?: string;
  task_completed?: boolean;
  completion_confidence?: { score?: number; label?: string } | number;
  evidence?: string[];
  structured_result?: Record<string, unknown>;
  recipients?: Array<{
    structured_result?: Record<string, unknown>;
    attempts?: Array<{ transcript_turns?: Array<{ speaker?: string; text?: string }> }>;
  }>;
};

const TERMINAL_STATUSES = new Set(['completed', 'failed', 'cancelled', 'canceled']);

const supportedRegions = [
  ['CA', 'Canada'],
  ['US', 'United States'],
  ['AE', 'United Arab Emirates'],
  ['GB', 'United Kingdom'],
  ['SG', 'Singapore'],
  ['AU', 'Australia'],
  ['FR', 'France'],
  ['DE', 'Germany'],
  ['IN', 'India'],
  ['JP', 'Japan'],
  ['MX', 'Mexico'],
  ['BR', 'Brazil'],
] as const;

export const VoiceVerificationPanel: React.FC<Props> = ({ opportunity }) => {
  const analysis = opportunity.analysis;
  const defaultQuestions = useMemo(() => {
    const risk = analysis?.disqualificationRisks?.[0];
    return [
      risk ? `Clarify this bid risk: ${risk}` : 'Confirm whether the required product or service is available.',
      'Confirm estimated lead time.',
      'Confirm geographic service coverage.',
      'Confirm relevant certifications or qualifications.',
      'Provide indicative pricing only if they are comfortable doing so.',
    ].join('\n');
  }, [analysis]);

  const [supplierName, setSupplierName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('CA');
  const [questions, setQuestions] = useState(defaultQuestions);
  const [authorized, setAuthorized] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [callId, setCallId] = useState('');
  const [callResult, setCallResult] = useState<CallResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuestions(defaultQuestions);
  }, [defaultQuestions]);

  useEffect(() => {
    if (!callId) return;

    let cancelled = false;
    let timer: number | undefined;

    const poll = async () => {
      try {
        const response = await fetch(`/api/calle/verification/${encodeURIComponent(callId)}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to read CALL-E result');
        if (cancelled) return;

        const result = data.call as CallResult;
        setCallResult(result);

        const status = String(result?.status || '').toLowerCase();
        if (!TERMINAL_STATUSES.has(status)) {
          timer = window.setTimeout(poll, 3000);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to monitor CALL-E call');
        }
      }
    };

    poll();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [callId]);

  const startVerification = async () => {
    setError('');
    setCallResult(null);

    if (!authorized) {
      setError('Confirm that you are authorized to place this business call.');
      return;
    }
    if (!supplierName.trim() || !/^\+[1-9]\d{7,14}$/.test(phone.trim())) {
      setError('Enter a supplier name and an E.164 phone number, for example +15145551234.');
      return;
    }
    if (!questions.trim()) {
      setError('Add at least one fact to verify.');
      return;
    }

    setIsStarting(true);
    try {
      const response = await fetch('/api/calle/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunityId: opportunity.id,
          solicitationNumber: analysis?.solicitationNumber || opportunity.solicitationNumber,
          supplierName: supplierName.trim(),
          phone: phone.trim(),
          region,
          questions,
          authorized,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'CALL-E verification could not be started');

      const id = data.callId || data.call?.id || data.call?.call_id;
      if (!id) throw new Error('CALL-E did not return a call ID');
      setCallId(id);
      setCallResult(data.call || { id, status: 'queued' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'CALL-E verification could not be started');
    } finally {
      setIsStarting(false);
    }
  };

  const structured = callResult?.structured_result || callResult?.recipients?.[0]?.structured_result;
  const status = String(callResult?.status || (callId ? 'queued' : 'not started'));
  const confidence = typeof callResult?.completion_confidence === 'number'
    ? callResult.completion_confidence
    : callResult?.completion_confidence?.score;

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white rounded-3xl border border-teal-900/60 shadow-xl overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black text-teal-300 mb-3">
            <PhoneCall className="w-4 h-4" />
            BidPilot Voice · Powered by CALL-E
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Turn an unresolved bid fact into verified phone evidence.</h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Preview the exact verification goal, authorize the call, and let CALL-E contact a supplier or service provider. BidPilot receives structured evidence instead of relying on assumptions.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl bg-white/5 border border-white/10 p-4 min-w-48">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">CALL-E status</div>
          <div className="mt-1 font-black text-lg capitalize flex items-center gap-2">
            {callId && !TERMINAL_STATUSES.has(status.toLowerCase()) ? <Loader2 className="w-4 h-4 animate-spin text-teal-300" /> : <Sparkles className="w-4 h-4 text-teal-300" />}
            {status.replaceAll('_', ' ')}
          </div>
          {callId && <div className="text-[10px] text-slate-500 mt-1 break-all">{callId}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
        <div className="p-6 sm:p-8 space-y-4 border-b xl:border-b-0 xl:border-r border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="text-xs font-bold text-slate-300">Supplier / provider</span>
              <input
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="Example Supplier Inc."
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </label>
            <label className="space-y-1">
              <span className="text-xs font-bold text-slate-300">Phone (E.164)</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+15145551234"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </label>
          </div>

          <label className="space-y-1 block">
            <span className="text-xs font-bold text-slate-300">Recipient region</span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
            >
              {supportedRegions.map(([code, label]) => <option value={code} key={code}>{label} ({code})</option>)}
            </select>
          </label>

          <label className="space-y-1 block">
            <span className="text-xs font-bold text-slate-300">Facts CALL-E may verify</span>
            <textarea
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              rows={7}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-teal-500"
            />
          </label>

          <label className="flex items-start gap-3 rounded-xl border border-slate-700 bg-white/5 p-3 cursor-pointer">
            <input
              type="checkbox"
              checked={authorized}
              onChange={(e) => setAuthorized(e.target.checked)}
              className="mt-1"
            />
            <span className="text-xs text-slate-300 leading-relaxed">
              I am authorized to place this business call. The agent may ask only the questions above, may not make purchases or commitments, and must identify itself as an AI calling for procurement verification.
            </span>
          </label>

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-rose-500/10 border border-rose-400/30 p-3 text-xs text-rose-200">
              <TriangleAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            onClick={startVerification}
            disabled={isStarting || (callId !== '' && !TERMINAL_STATUSES.has(status.toLowerCase()))}
            className="w-full rounded-xl bg-teal-400 hover:bg-teal-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black py-3 flex items-center justify-center gap-2 transition"
          >
            {isStarting ? <Loader2 className="w-4 h-4 animate-spin" /> : <PhoneCall className="w-4 h-4" />}
            {isStarting ? 'Starting CALL-E…' : 'Authorize & Start Verification Call'}
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-300" />
            <h3 className="font-bold">Structured evidence returned to BidPilot</h3>
          </div>

          {!structured && (
            <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">
              The verified supplier facts will appear here after the call completes. No CALL-E key or phone number is exposed to the browser.
            </div>
          )}

          {structured && (
            <div className="space-y-3">
              {Object.entries(structured).map(([key, value]) => (
                <div key={key} className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-teal-300">{key.replaceAll('_', ' ')}</div>
                  <div className="text-sm text-slate-100 mt-1 break-words">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</div>
                </div>
              ))}
            </div>
          )}

          {callResult?.task_completed && (
            <div className="rounded-xl bg-emerald-400/10 border border-emerald-400/30 p-3 flex items-center gap-2 text-sm text-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              Verification completed{confidence !== undefined ? ` · confidence ${Math.round(Number(confidence) * 100)}%` : ''}
            </div>
          )}

          {Array.isArray(callResult?.evidence) && callResult.evidence.length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">Supporting evidence</div>
              <ul className="space-y-2 text-xs text-slate-300">
                {callResult.evidence.slice(0, 5).map((item, index) => (
                  <li key={index} className="rounded-lg bg-slate-950/50 p-2 border border-slate-800">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
