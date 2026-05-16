"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Copy,
  FileJson,
  Lock,
  Pencil,
  RefreshCw,
  ShieldCheck,
  Trash2,
  XCircle,
} from 'lucide-react';
import { AIJournalOutput } from '@/lib/journal-validator';
import { createClientSupabase } from '@/lib/supabase';

type Step = 'input' | 'loading' | 'review' | 'finalized';

const RESPONSIBILITY_TEXT =
  'Jag har granskat AI-utkastet och tar fullt kliniskt ansvar för innehållet enligt PSL 2010:659.';

function emptyOutput(): AIJournalOutput {
  return {
    anamnes: '',
    status: '',
    diagnos: { trolig: '', icd_kod: '', differentialdiagnoser: [] },
    behandling: { atgard: '', lokalanestesi: '', lakemedel: '', tlv_koder: [] },
    uppfoljning: '',
    roda_flaggor_observerade: [],
    anmarkningar: '',
  };
}

export default function AIJournalmallAgent() {
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState<Step>('input');
  const [originalOutput, setOriginalOutput] = useState<AIJournalOutput | null>(null);
  const [draft, setDraft] = useState<AIJournalOutput>(emptyOutput());
  const [logId, setLogId] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [responsibilityChecked, setResponsibilityChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tier, setTier] = useState<string>('loading');
  const [finalDecision, setFinalDecision] = useState<'approve' | 'reject' | null>(null);

  const charLimit = 2000;

  useEffect(() => {
    let cancelled = false;
    async function checkTier() {
      const supabase = createClientSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user) {
        setTier('free');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('id', user.id)
        .single();
      if (cancelled) return;
      // setTier(profile?.tier || 'free');
      setTier('klinik'); // Tvinga premium under testfas
    }
    checkTier();
    return () => { cancelled = true; };
  }, []);

  const editsMade = useMemo(() => {
    if (!originalOutput) return false;
    return JSON.stringify(originalOutput) !== JSON.stringify(draft);
  }, [originalOutput, draft]);

  const resetToInput = () => {
    setStep('input');
    setOriginalOutput(null);
    setDraft(emptyOutput());
    setLogId(null);
    setIssues([]);
    setWarnings([]);
    setResponsibilityChecked(false);
    setFinalDecision(null);
  };

  const handleGenerate = async () => {
    if (!inputText || inputText.length < 10) return;
    setStep('loading');
    setIssues([]);
    setWarnings([]);

    try {
      const response = await fetch('/api/journalmall/generera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setIssues(['Du har nått din gräns för AI-anrop idag.']);
        } else if (response.status === 403) {
          setIssues(['Premium krävs för denna funktion.']);
        } else if (response.status === 400 && data.error === 'PII detected') {
          setIssues([data.message ?? 'Personuppgifter hittades i inmatningen.']);
        } else {
          setIssues(data.issues || [data.error || 'Ett fel uppstod.']);
        }
        if (data.partialData) {
          setOriginalOutput(data.partialData);
          setDraft(data.partialData);
          setLogId(data.logId ?? null);
          setStep('review');
          return;
        }
        setStep('input');
        return;
      }

      setOriginalOutput(data.data);
      setDraft(data.data);
      setLogId(data.logId ?? null);
      setWarnings(data.warnings ?? []);
      setStep('review');
    } catch {
      setIssues(['Ett nätverksfel uppstod.']);
      setStep('input');
    }
  };

  const submitDecision = async (decision: 'approve' | 'reject') => {
    if (!logId) {
      setIssues(['Loggreferens saknas — försök generera igen.']);
      return;
    }
    if (decision === 'approve' && !responsibilityChecked) {
      setIssues(['Du måste bekräfta granskningsansvar innan du kan godkänna.']);
      return;
    }
    setIsSubmitting(true);
    setIssues([]);
    try {
      const response = await fetch('/api/journalmall/godkann', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logId,
          decision,
          finalData: decision === 'approve' ? draft : undefined,
          editsMade,
          acknowledgedResponsibility: responsibilityChecked,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setIssues(data.issues || [data.message || data.error || 'Beslutet kunde inte sparas.']);
        return;
      }
      setFinalDecision(decision);
      setStep('finalized');
    } catch {
      setIssues(['Ett nätverksfel uppstod.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (!draft) return;
    let text = `Diagnos:\n- Trolig: ${draft.diagnos.trolig}\n`;
    if (draft.diagnos.icd_kod) text += `- ICD-kod: ${draft.diagnos.icd_kod}\n`;
    if (draft.diagnos.differentialdiagnoser.length > 0) {
      text += `- Diff: ${draft.diagnos.differentialdiagnoser.join(', ')}\n`;
    }
    text += `\nAnamnes:\n${draft.anamnes}\n`;
    text += `\nStatus:\n${draft.status}\n`;
    text += `\nBehandling:\n- Åtgärd: ${draft.behandling.atgard}\n`;
    if (draft.behandling.lokalanestesi) text += `- LA: ${draft.behandling.lokalanestesi}\n`;
    if (draft.behandling.lakemedel) text += `- Läkemedel: ${draft.behandling.lakemedel}\n`;
    if (draft.behandling.tlv_koder.length > 0) {
      text += `- TLV: ${draft.behandling.tlv_koder.join(', ')}\n`;
    }
    text += `\nUppföljning:\n${draft.uppfoljning}\n`;
    if (draft.roda_flaggor_observerade.length > 0) {
      text += `\nRöda flaggor:\n- ${draft.roda_flaggor_observerade.join('\n- ')}\n`;
    }
    if (draft.anmarkningar) {
      text += `\nAnmärkningar:\n${draft.anmarkningar}\n`;
    }
    navigator.clipboard.writeText(text);
  };

  if (tier === 'loading') {
    return (
      <div className="p-10 text-center" role="status" aria-live="polite">
        Laddar…
      </div>
    );
  }

  if (tier === 'free') {
    return (
      <div className="container max-w-4xl py-10">
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Lock className="h-12 w-12 text-purple-600 mb-4" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Premiumfunktion</h2>
            <p className="text-slate-600 mb-6 max-w-md">
              AI-assisterad journalmall är premium. Uppgradera till Kliniker (5 anrop/dag) eller
              Klinik (100 anrop/dag).
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" aria-label="Uppgradera till premium">
              Uppgradera nu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Bot className="h-6 w-6 text-purple-600" aria-hidden="true" />
          AI-assisterad Journalmall
        </h1>
        <p className="text-slate-600 mt-1">Skriv fritt — låt AI strukturera anteckningen. Du behåller kliniskt ansvar.</p>
      </div>

      <Alert className="mb-4 border-amber-300 bg-amber-50" role="note">
        <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />
        <AlertTitle className="text-amber-900">⚠️ AI-genererat utkast</AlertTitle>
        <AlertDescription className="text-amber-800 text-sm">
          Tandläkaren är ansvarig för att granska och verifiera all information INNAN
          journalanteckningen sparas eller används kliniskt. PSL 2010:659 — Ersätter inte kliniskt omdöme.
        </AlertDescription>
      </Alert>

      <ol className="flex flex-wrap gap-2 mb-6 text-xs font-medium" aria-label="Stegindikator">
        {[
          { id: 'input', label: '1. Inmatning' },
          { id: 'loading', label: '2. Bearbetning' },
          { id: 'review', label: '3. Granskning' },
          { id: 'finalized', label: '4. Beslut' },
        ].map((s) => (
          <li
            key={s.id}
            className={
              step === s.id
                ? 'px-3 py-1 rounded-full bg-purple-600 text-white'
                : 'px-3 py-1 rounded-full bg-slate-100 text-slate-600'
            }
            aria-current={step === s.id ? 'step' : undefined}
          >
            {s.label}
          </li>
        ))}
      </ol>

      {issues.length > 0 && (
        <Alert variant="destructive" className="mb-4" id="ai-issues" role="alert">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>Problem identifierades</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4 mt-2">
              {issues.map((i, idx) => (
                <li key={idx} className="text-xs">{i}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {warnings.length > 0 && step === 'review' && (
        <Alert className="mb-4 border-amber-300 bg-amber-50" id="ai-warnings" role="status">
          <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />
          <AlertTitle className="text-amber-900">Varningar att kontrollera</AlertTitle>
          <AlertDescription className="text-amber-800">
            <ul className="list-disc pl-4 mt-2 text-xs">
              {warnings.map((w, idx) => <li key={idx}>{w}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {step === 'input' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Klinisk anteckning (max {charLimit} tecken)</CardTitle>
          </CardHeader>
          <CardContent>
            <label htmlFor="ai-input-text" className="sr-only">Klinisk anteckning</label>
            <Textarea
              id="ai-input-text"
              placeholder="Beskriv besöket fritt — t.ex. 'Patient kom akut med värk i 26…'. Använd [Patient] istället för namn/personnummer."
              className="min-h-[260px] resize-none bg-slate-50 border-slate-200"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={charLimit}
              aria-describedby={issues.length > 0 ? 'ai-issues' : undefined}
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-500" aria-live="polite">
                {inputText.length} / {charLimit}
              </span>
              <Button
                onClick={handleGenerate}
                disabled={inputText.length < 10}
                className="bg-purple-600 hover:bg-purple-700 min-h-[44px]"
                aria-label="Generera strukturerad journal"
              >
                <FileJson className="mr-2 h-4 w-4" aria-hidden="true" /> Generera struktur
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'loading' && (
        <Card>
          <CardContent className="p-8" role="status" aria-live="polite">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="h-5 w-5 animate-spin text-purple-600" aria-hidden="true" />
              <span className="text-sm font-medium text-slate-700">Bearbetar och validerar…</span>
            </div>
            <div className="space-y-3">
              <div className="h-20 bg-slate-200 animate-pulse rounded-md" />
              <div className="h-16 bg-slate-200 animate-pulse rounded-md" />
              <div className="h-28 bg-slate-200 animate-pulse rounded-md" />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'review' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Originaltext (skrivskyddad)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm whitespace-pre-wrap bg-slate-50 border border-slate-200 rounded-md p-3 max-h-[60vh] overflow-auto">
                {inputText}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Pencil className="h-4 w-4 text-purple-600" aria-hidden="true" />
                Strukturerad journal — redigerbar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <fieldset className="space-y-2">
                <legend className="text-xs font-bold text-slate-500 uppercase">Diagnos</legend>
                <label className="block text-xs font-medium text-slate-700">
                  Trolig diagnos
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                    value={draft.diagnos.trolig}
                    onChange={(e) => setDraft({ ...draft, diagnos: { ...draft.diagnos, trolig: e.target.value } })}
                    aria-label="Trolig diagnos"
                  />
                </label>
                <label className="block text-xs font-medium text-slate-700">
                  ICD-kod (visas EJ i journaltext)
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                    value={draft.diagnos.icd_kod ?? ''}
                    onChange={(e) => setDraft({ ...draft, diagnos: { ...draft.diagnos, icd_kod: e.target.value } })}
                    aria-label="ICD-kod"
                  />
                </label>
              </fieldset>

              <label className="block text-xs font-medium text-slate-700">
                Anamnes
                <Textarea
                  className="mt-1 min-h-[80px]"
                  value={draft.anamnes}
                  onChange={(e) => setDraft({ ...draft, anamnes: e.target.value })}
                  aria-label="Anamnes"
                />
              </label>

              <label className="block text-xs font-medium text-slate-700">
                Status
                <Textarea
                  className="mt-1 min-h-[80px]"
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                  aria-label="Status"
                />
              </label>

              <fieldset className="space-y-2">
                <legend className="text-xs font-bold text-slate-500 uppercase">Behandling</legend>
                <label className="block text-xs font-medium text-slate-700">
                  Åtgärd
                  <Textarea
                    className="mt-1 min-h-[60px]"
                    value={draft.behandling.atgard}
                    onChange={(e) => setDraft({ ...draft, behandling: { ...draft.behandling, atgard: e.target.value } })}
                    aria-label="Behandling — åtgärd"
                  />
                </label>
                <label className="block text-xs font-medium text-slate-700">
                  Lokalanestesi
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                    value={draft.behandling.lokalanestesi ?? ''}
                    onChange={(e) => setDraft({ ...draft, behandling: { ...draft.behandling, lokalanestesi: e.target.value } })}
                    aria-label="Lokalanestesi"
                  />
                </label>
                <label className="block text-xs font-medium text-slate-700">
                  Läkemedel
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                    value={draft.behandling.lakemedel ?? ''}
                    onChange={(e) => setDraft({ ...draft, behandling: { ...draft.behandling, lakemedel: e.target.value } })}
                    aria-label="Läkemedel"
                  />
                </label>
              </fieldset>

              <label className="block text-xs font-medium text-slate-700">
                Uppföljning
                <Textarea
                  className="mt-1 min-h-[60px]"
                  value={draft.uppfoljning}
                  onChange={(e) => setDraft({ ...draft, uppfoljning: e.target.value })}
                  aria-label="Uppföljning"
                />
              </label>

              <label className="block text-xs font-medium text-slate-700">
                Anmärkningar
                <Textarea
                  className="mt-1 min-h-[60px]"
                  value={draft.anmarkningar}
                  onChange={(e) => setDraft({ ...draft, anmarkningar: e.target.value })}
                  aria-label="Anmärkningar"
                />
              </label>

              {draft.roda_flaggor_observerade.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-xs font-bold text-red-800 mb-1">Röda flaggor (AI-detekterade)</p>
                  <ul className="list-disc pl-4 text-xs text-red-700">
                    {draft.roda_flaggor_observerade.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <Card className="border-2 border-purple-200">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start gap-2">
                  <input
                    id="responsibility-check"
                    type="checkbox"
                    className="mt-1 h-5 w-5"
                    checked={responsibilityChecked}
                    onChange={(e) => setResponsibilityChecked(e.target.checked)}
                    aria-describedby="responsibility-help"
                  />
                  <label htmlFor="responsibility-check" className="text-sm text-slate-800 leading-snug">
                    <ShieldCheck className="inline h-4 w-4 text-emerald-600 mr-1" aria-hidden="true" />
                    {RESPONSIBILITY_TEXT}
                  </label>
                </div>
                <p id="responsibility-help" className="text-xs text-slate-500">
                  {editsMade ? 'Du har redigerat utkastet — ändringarna sparas i audit-loggen.' : 'Inga ändringar gjorda jämfört med AI-utkastet.'}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => submitDecision('approve')}
                    disabled={!responsibilityChecked || isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white min-h-[44px]"
                    aria-label="Godkänn och spara journalanteckning"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" aria-hidden="true" />
                    Godkänn & spara
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="min-h-[44px]"
                    aria-label="Kopiera utkast till urklipp"
                  >
                    <Copy className="h-4 w-4 mr-2" aria-hidden="true" /> Kopiera utkast
                  </Button>
                  <Button
                    onClick={() => submitDecision('reject')}
                    disabled={isSubmitting}
                    variant="destructive"
                    className="min-h-[44px]"
                    aria-label="Förkasta utkast"
                  >
                    <XCircle className="h-4 w-4 mr-2" aria-hidden="true" /> Förkasta
                  </Button>
                  <Button
                    onClick={resetToInput}
                    variant="ghost"
                    className="min-h-[44px]"
                    aria-label="Börja om"
                  >
                    <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" /> Börja om
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === 'finalized' && (
        <Card className={finalDecision === 'approve' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-300 bg-slate-50'}>
          <CardContent className="p-8 text-center">
            {finalDecision === 'approve' ? (
              <>
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-3" aria-hidden="true" />
                <h2 className="text-xl font-bold text-emerald-900">Godkänt och loggat</h2>
                <p className="text-emerald-800 text-sm mt-2">
                  Beslutet är immutable i audit-loggen. Använd "Kopiera utkast" eller börja en ny anteckning.
                </p>
              </>
            ) : (
              <>
                <XCircle className="h-12 w-12 text-slate-500 mx-auto mb-3" aria-hidden="true" />
                <h2 className="text-xl font-bold text-slate-900">Utkastet är förkastat</h2>
                <p className="text-slate-700 text-sm mt-2">Loggen sparades som "ej godkänt" för spårbarhet.</p>
              </>
            )}
            <Button onClick={resetToInput} className="mt-4 min-h-[44px]" aria-label="Skriv ny anteckning">
              Skriv ny anteckning
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
