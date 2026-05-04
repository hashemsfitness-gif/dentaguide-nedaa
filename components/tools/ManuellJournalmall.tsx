"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { journalScenarios, Scenario, Mall, ExtraAtgard } from '@/lib/journalData';
import { FileText, Search, CheckCircle2, ChevronRight, Copy, RefreshCw } from 'lucide-react';

type SearchMode = 'all' | 'diagnos' | 'behandling' | 'symptom';

export default function ManuellJournalmall() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('all');
  const [filteredScenarios, setFilteredScenarios] = useState<Scenario[]>([]);
  
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedMall, setSelectedMall] = useState<Mall | null>(null);
  const [activeAtgarder, setActiveAtgarder] = useState<Set<string>>(new Set());
  const [uppfoljning, setUppfoljning] = useState<string>('Kontroll om 2 veckor.');
  const [showRemiss, setShowRemiss] = useState(false);
  const [remissMottagare, setRemissMottagare] = useState('');
  
  const [placeholders, setPlaceholders] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!searchTerm) {
      setFilteredScenarios([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = journalScenarios.filter(scen => {
      const inDiagnos = scen.name.toLowerCase().includes(term) || scen.icd.toLowerCase().includes(term);
      const inBehandling = scen.behandling.some(b => b.toLowerCase().includes(term));
      const inSymptom = scen.symptom.some(s => s.toLowerCase().includes(term));

      if (searchMode === 'diagnos') return inDiagnos;
      if (searchMode === 'behandling') return inBehandling;
      if (searchMode === 'symptom') return inSymptom;
      return inDiagnos || inBehandling || inSymptom;
    });
    setFilteredScenarios(filtered);
  }, [searchTerm, searchMode]);

  const handleSelectScenario = (scen: Scenario) => {
    setSelectedScenario(scen);
    setSelectedMall(null);
    setActiveAtgarder(new Set());
    setPlaceholders({});
    setSearchTerm('');
  };

  const handleSelectMall = (mall: Mall) => {
    setSelectedMall(mall);
    setPlaceholders({});
  };

  const toggleAtgard = (id: string) => {
    const newSet = new Set(activeAtgarder);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setActiveAtgarder(newSet);
  };

  const updatePlaceholder = (id: string, value: string) => {
    setPlaceholders(prev => ({ ...prev, [id]: value }));
  };

  const renderJournalText = () => {
    if (!selectedMall) return null;
    
    let text = selectedMall.text;
    
    // Simple placeholder replacement implementation
    // A robust version would parse [xxx] and render interactive React components inline.
    // For this prototype, we'll replace them with the values from state or keep them as bracketed if not set.
    const regex = /\[(.*?)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    let placeholderIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      parts.push(text.substring(lastIndex, match.index));
      
      const pKey = `${placeholderIndex}_${match[1]}`;
      const val = placeholders[pKey] || '';
      
      parts.push(
        <span 
          key={pKey}
          className={`cursor-pointer inline-block px-1 rounded border ${val ? 'bg-green-100 border-green-300 text-green-800' : 'bg-orange-100 border-orange-300 border-dashed text-orange-800'}`}
          onClick={() => {
            const newVal = prompt(`Fyll i värde för [${match[1]}]:`, val);
            if (newVal !== null) {
              updatePlaceholder(pKey, newVal);
            }
          }}
        >
          {val || match[1]}
        </span>
      );
      
      lastIndex = match.index + match[0].length;
      placeholderIndex++;
    }
    
    parts.push(text.substring(lastIndex));

    return <div className="whitespace-pre-wrap">{parts}</div>;
  };

  const getPlainText = () => {
    if (!selectedMall) return '';
    let text = selectedMall.text;
    const regex = /\[(.*?)\]/g;
    let placeholderIndex = 0;
    text = text.replace(regex, (match, p1) => {
      const pKey = `${placeholderIndex}_${p1}`;
      placeholderIndex++;
      return placeholders[pKey] || match;
    });

    if (activeAtgarder.size > 0 && selectedScenario) {
      text += '\n\nTillagda åtgärder:\n';
      selectedScenario.extraAtgard.forEach(a => {
        if (activeAtgarder.has(a.id)) {
          text += `- ${a.text}\n`;
        }
      });
    }

    if (uppfoljning) {
      // Assuming uppföljning replaces the existing one or appends
      text = text.replace(/Uppföljning:.*$/m, `Uppföljning: ${uppfoljning}`);
    }

    return text;
  };

  const copyJournal = () => {
    const text = getPlainText();
    if (text) {
      navigator.clipboard.writeText(text);
      alert('Journalanteckning kopierad!');
    }
  };

  const generateRemiss = () => {
    if (!selectedScenario) return '';
    let text = `REMISS - ${remissMottagare}\n\n`;
    text += `Diagnos: ${selectedScenario.name} (${selectedScenario.icd})\n\n`;
    const plainText = getPlainText();
    text += `Klinisk bedömning och initial åtgärd:\n`;
    text += plainText.substring(0, 300) + (plainText.length > 300 ? '...' : '') + '\n\n';
    if (selectedScenario.lakemedel) {
      text += `Läkemedel: ${selectedScenario.lakemedel}\n`;
    }
    navigator.clipboard.writeText(text);
    alert('Remiss kopierad!');
  };

  return (
    <div className="container max-w-6xl py-6 flex flex-col lg:flex-row gap-6">
      
      {/* Vänster panel: Sök & Bygg */}
      <div className="flex-1 space-y-6">
        <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Sök diagnos, symptom eller behandling..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 mt-4 text-xs font-mono">
            {(['all', 'diagnos', 'behandling', 'symptom'] as SearchMode[]).map(mode => (
              <button 
                key={mode}
                className={`px-3 py-1 rounded-full border ${searchMode === mode ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
                onClick={() => setSearchMode(mode)}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>

          {filteredScenarios.length > 0 && (
            <div className="mt-4 bg-white text-slate-900 rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto">
              {filteredScenarios.map(scen => (
                <div 
                  key={scen.id} 
                  className="p-3 border-b hover:bg-orange-50 cursor-pointer flex items-start gap-3"
                  onClick={() => handleSelectScenario(scen)}
                >
                  <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs font-mono font-bold">{scen.icd}</span>
                  <div>
                    <div className="font-bold text-sm">{scen.name}</div>
                    <div className="text-xs text-slate-500">{scen.cat}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="text-xs font-mono font-bold text-orange-600 tracking-wider mb-4 border-b pb-2">01 — VALT SCENARIO</div>
            {selectedScenario ? (
              <div className="bg-slate-100 p-4 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-slate-800 text-white px-2 py-1 rounded text-xs font-mono">{selectedScenario.icd}</span>
                  <span className="font-bold text-slate-800">{selectedScenario.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedScenario(null)}>✕</Button>
              </div>
            ) : (
              <div className="text-sm text-slate-400 italic">Inget scenario valt...</div>
            )}
            
            {selectedScenario?.varning && (
              <div className="mt-3 bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">
                {selectedScenario.varning}
              </div>
            )}

            <div className="text-xs font-mono font-bold text-orange-600 tracking-wider mb-4 border-b pb-2 mt-8">02 — VÄLJ JOURNALMALL</div>
            {selectedScenario ? (
              <div className="space-y-2">
                {selectedScenario.mallar.map(mall => (
                  <div 
                    key={mall.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedMall?.id === mall.id ? 'bg-orange-600 text-white border-orange-600' : 'hover:border-orange-500 bg-white text-slate-700'}`}
                    onClick={() => handleSelectMall(mall)}
                  >
                    <div className="font-bold text-sm">{mall.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-400 italic">Välj scenario först...</div>
            )}

            <div className="text-xs font-mono font-bold text-orange-600 tracking-wider mb-4 border-b pb-2 mt-8">03 — EXTRA ÅTGÄRDER</div>
            {selectedScenario && selectedMall ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedScenario.extraAtgard.map(atg => (
                  <label 
                    key={atg.id}
                    className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer ${activeAtgarder.has(atg.id) ? 'bg-orange-50 border-orange-300' : 'bg-white hover:bg-slate-50'}`}
                  >
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      checked={activeAtgarder.has(atg.id)}
                      onChange={() => toggleAtgard(atg.id)}
                    />
                    <span className={cn("text-sm", activeAtgarder.has(atg.id) ? "text-orange-800 font-medium" : "text-slate-600")}>{atg.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-400 italic">Välj mall för att se åtgärder...</div>
            )}

            <div className="text-xs font-mono font-bold text-orange-600 tracking-wider mb-4 border-b pb-2 mt-8">04 — UPPFÖLJNING</div>
            <div className="flex flex-wrap gap-2">
              {['Ingen', '24-48h', '1 vecka', '2 veckor', '1 mån', '3 mån', '6 mån'].map(u => {
                const map: Record<string, string> = {
                  'Ingen': 'Ingen uppföljning planerad.',
                  '24-48h': 'Återbesök inom 24–48 timmar.',
                  '1 vecka': 'Kontroll om 1 vecka.',
                  '2 veckor': 'Kontroll om 2 veckor.',
                  '1 mån': 'Kontroll om 1 månad.',
                  '3 mån': 'Rtg-kontroll om 3 månader.',
                  '6 mån': 'Kontroll om 6 månader.'
                };
                const uText = map[u];
                return (
                  <button 
                    key={u}
                    className={`px-3 py-1 rounded-full text-xs font-mono border ${uppfoljning === uText ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 hover:border-slate-400'}`}
                    onClick={() => setUppfoljning(uText)}
                  >
                    {u}
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-mono font-bold text-orange-600 tracking-wider mb-4 border-b pb-2 mt-8">05 — REMISS</div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showRemiss}
                  onChange={(e) => setShowRemiss(e.target.checked)}
                  className="rounded border-slate-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
                />
                <span className="text-sm font-medium">Utfärdas till:</span>
              </label>
              {showRemiss && (
                <select 
                  className="border border-slate-300 rounded-full px-4 py-1 text-sm bg-white"
                  value={remissMottagare}
                  onChange={(e) => setRemissMottagare(e.target.value)}
                >
                  <option value="">Välj specialitet...</option>
                  <option>Käkkirurg</option>
                  <option>Endodontist</option>
                  <option>Parodontist</option>
                  <option>Läkare/VC</option>
                </select>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Höger panel: Förhandsgranskning */}
      <div className="flex-[0.8] lg:max-w-md">
        <Card className="h-full flex flex-col bg-slate-50 border-slate-200">
          <CardHeader className="bg-white border-b sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-mono text-slate-500 tracking-widest">FÖRHANDSGRANSKNING</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-6 overflow-y-auto min-h-[400px]">
            {selectedMall ? (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 font-mono text-sm leading-loose text-slate-800">
                {renderJournalText()}
                {activeAtgarder.size > 0 && selectedScenario && (
                  <div className="mt-4 pt-4 border-t border-slate-100 text-blue-800">
                    <span className="font-bold block mb-1">Tillagda åtgärder:</span>
                    {selectedScenario.extraAtgard.map(a => {
                      if (activeAtgarder.has(a.id)) {
                        return <div key={a.id}>- {a.text}</div>;
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                <FileText className="h-16 w-16 mb-4" />
                <p className="text-sm">Välj en mall för att se förhandsgranskning</p>
              </div>
            )}
          </CardContent>
          <div className="p-4 bg-white border-t space-y-2">
            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold" 
              disabled={!selectedMall}
              onClick={copyJournal}
            >
              <Copy className="h-4 w-4 mr-2" /> Kopiera journaltext
            </Button>
            {showRemiss && remissMottagare && (
              <Button 
                variant="outline" 
                className="w-full text-slate-700 border-slate-300"
                onClick={generateRemiss}
              >
                Generera remissutkast
              </Button>
            )}
          </div>
        </Card>
      </div>

    </div>
  );
}
