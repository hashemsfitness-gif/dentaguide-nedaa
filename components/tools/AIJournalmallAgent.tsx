"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, FileJson, CheckCircle2, Copy, RefreshCw, AlertTriangle, Lock } from 'lucide-react';
import { AIJournalOutput } from '@/lib/journal-validator';
import { createClient } from '@/lib/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AIJournalmallAgent() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIJournalOutput | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [tier, setTier] = useState<string>('loading');
  const [limitStatus, setLimitStatus] = useState<string>('');

  const charLimit = 2000;

  useEffect(() => {
    async function checkTier() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setTier('free');
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
      setTier(profile?.tier || 'free');
    }
    checkTier();
  }, []);

  const handleGenerate = async () => {
    if (!inputText || inputText.length < 10) return;
    setIsLoading(true);
    setResult(null);
    setIssues([]);

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
        } else {
          setIssues(data.issues || [data.error || 'Ett fel uppstod.']);
        }
        if (data.partialData) {
          setResult(data.partialData);
        }
      } else {
        setResult(data.data);
      }
    } catch (error) {
      setIssues(['Ett nätverksfel uppstod.']);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    let text = `Diagnos:\n`;
    text += `- Trolig: ${result.diagnos.trolig}\n`;
    if (result.diagnos.icd_kod) text += `- ICD-kod: ${result.diagnos.icd_kod}\n`;
    if (result.diagnos.differentialdiagnoser && result.diagnos.differentialdiagnoser.length > 0) {
      text += `- Diff: ${result.diagnos.differentialdiagnoser.join(', ')}\n`;
    }
    text += `\nAnamnes:\n${result.anamnes}\n`;
    text += `\nStatus:\n${result.status}\n`;
    text += `\nBehandling:\n`;
    text += `- Åtgärd: ${result.behandling.atgard}\n`;
    if (result.behandling.lokalanestesi) text += `- LA: ${result.behandling.lokalanestesi}\n`;
    if (result.behandling.lakemedel) text += `- Läkemedel: ${result.behandling.lakemedel}\n`;
    if (result.behandling.tlv_koder && result.behandling.tlv_koder.length > 0) {
      text += `- TLV: ${result.behandling.tlv_koder.join(', ')}\n`;
    }
    text += `\nUppföljning:\n${result.uppfoljning}\n`;

    if (result.roda_flaggor_observerade && result.roda_flaggor_observerade.length > 0) {
      text += `\nRöda flaggor:\n- ${result.roda_flaggor_observerade.join('\n- ')}\n`;
    }
    if (result.anmarkningar) {
      text += `\nAnmärkningar:\n${result.anmarkningar}\n`;
    }

    navigator.clipboard.writeText(text);
    alert('Kopierad!');
  };

  if (tier === 'loading') {
    return <div className="p-10 text-center">Laddar...</div>;
  }

  if (tier === 'free') {
    return (
      <div className="container max-w-4xl py-10">
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Lock className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Premiumfunktion</h2>
            <p className="text-slate-600 mb-6 max-w-md">
              AI-assisterad journalmall är premium. Uppgradera till Kliniker (99kr/mån) för 5 anrop/dag, eller Klinik (399kr/mån) för 100 anrop/dag.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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
          <Bot className="h-6 w-6 text-purple-600" />
          AI-assisterad Journalmall
        </h1>
        <p className="text-slate-600 mt-1">Skriv fritt — låt AI strukturera anteckningen</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col h-[calc(100vh-200px)]">
          <CardHeader>
            <CardTitle className="text-lg">Klinisk anteckning</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea 
              placeholder="Beskriv besöket fritt — t.ex. 'Patient kom akut med värk i 26...'"
              className="flex-1 resize-none bg-slate-50 border-slate-200"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={charLimit}
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400">
                {inputText.length} / {charLimit}
              </span>
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || inputText.length < 10}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? (
                  <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Bearbetar...</>
                ) : (
                  <><FileJson className="mr-2 h-4 w-4" /> Generera struktur</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-[calc(100vh-200px)] bg-slate-50 overflow-hidden">
          <CardHeader className="bg-white border-b">
            <CardTitle className="text-lg flex justify-between items-center">
              Strukturerad Journal
              {result && (
                <Button size="sm" onClick={copyToClipboard} className="bg-green-600 hover:bg-green-700">
                  <Copy className="h-4 w-4 mr-2" /> Kopiera
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {issues.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Problem identifierades</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-4 mt-2">
                    {issues.map((i, idx) => <li key={idx} className="text-xs">{i}</li>)}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {!result && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Bot className="h-12 w-12 mb-4 opacity-20" />
                <p>Generera för att se resultatet här</p>
              </div>
            )}

            {isLoading && (
              <div className="space-y-4">
                <div className="h-24 bg-slate-200 animate-pulse rounded-md" />
                <div className="h-16 bg-slate-200 animate-pulse rounded-md" />
                <div className="h-32 bg-slate-200 animate-pulse rounded-md" />
              </div>
            )}

            {result && (
              <div className="space-y-4 font-mono text-sm">
                <div className="bg-white p-4 rounded-md border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-2 border-b pb-1">Diagnos</h3>
                  <p><span className="text-slate-500">Trolig:</span> {result.diagnos.trolig}</p>
                  {result.diagnos.icd_kod && <p><span className="text-slate-500">ICD:</span> <span className="bg-blue-100 text-blue-800 px-1 rounded">{result.diagnos.icd_kod}</span></p>}
                  {result.diagnos.differentialdiagnoser && result.diagnos.differentialdiagnoser.length > 0 && (
                    <p><span className="text-slate-500">Diff:</span> {result.diagnos.differentialdiagnoser.join(', ')}</p>
                  )}
                </div>

                <div className="bg-white p-4 rounded-md border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-2 border-b pb-1">Anamnes</h3>
                  <p className="whitespace-pre-wrap">{result.anamnes}</p>
                </div>

                <div className="bg-white p-4 rounded-md border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-2 border-b pb-1">Status</h3>
                  <p className="whitespace-pre-wrap">{result.status}</p>
                </div>

                <div className="bg-white p-4 rounded-md border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-2 border-b pb-1">Behandling</h3>
                  <p><span className="text-slate-500">Åtgärd:</span> {result.behandling.atgard}</p>
                  {result.behandling.lokalanestesi && <p><span className="text-slate-500">LA:</span> {result.behandling.lokalanestesi}</p>}
                  {result.behandling.lakemedel && <p><span className="text-slate-500">Läkemedel:</span> {result.behandling.lakemedel}</p>}
                  {result.behandling.tlv_koder && result.behandling.tlv_koder.length > 0 && (
                    <p><span className="text-slate-500">TLV:</span> {result.behandling.tlv_koder.join(', ')}</p>
                  )}
                </div>

                <div className="bg-white p-4 rounded-md border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-2 border-b pb-1">Uppföljning</h3>
                  <p className="whitespace-pre-wrap">{result.uppfoljning}</p>
                </div>

                {result.roda_flaggor_observerade && result.roda_flaggor_observerade.length > 0 && (
                  <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-800">
                    <h3 className="font-bold mb-2 border-b border-red-200 pb-1">Röda flaggor</h3>
                    <ul className="list-disc pl-4">
                      {result.roda_flaggor_observerade.map((flag, idx) => <li key={idx}>{flag}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <AlertTriangle className="h-4 w-4 inline mr-1 text-amber-500" />
        <strong>⚠️ AI-genererat utkast.</strong> Tandläkaren är ansvarig för att granska och verifiera 
        all information INNAN journalanteckningen sparas eller används kliniskt. 
        PSL 2010:659 — Ersätter inte kliniskt omdöme.
      </div>
    </div>
  );
}
