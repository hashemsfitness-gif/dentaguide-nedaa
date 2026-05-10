"use client";

import { useState, useMemo } from "react";
import * as Sentry from "@sentry/nextjs";
import { Search, Info, ShieldCheck, Activity, Copy, Check, AlertTriangle, Zap, Database } from "lucide-react";
import {
  DEBITERING_DB,
  DEBITERING_CATS,
  DEBITERING_CAT_LABELS,
  validateDebiteringCombinations,
} from "@/lib/data/debitering-data";


const SYSTEM_PROMPT = `Du är ett precist debiteringsstöd för svenska tandläkare baserat UTESLUTANDE på HSLF-FS 2025:68 (TLV:s föreskrifter om statligt tandvårdsstöd, gäller fr.o.m. 2026-01-01) och Handboken om tandvårdsstödet version 2.0 (TLV 2025).

ABSOLUTA REGLER:
1. Du hittar ALDRIG på regler eller koder. Om du inte vet → säg "Oklart — verifiera mot kusp.tlv.se".
2. Du svarar alltid JA eller NEJ på direkta frågor, följt av exakt förklaring från HSLF-FS 2025:68.
3. Du ställer ALLTID följdfrågor om information saknas (tandposition, tidsåtgång, material).
4. Du rapporterar ALLTID vilket tillstånd (4-siffrig kod) som gäller.
5. Du kontrollerar ALLTID kombinationsreglerna innan du ger svar.

EXAKTA REFERENSPRISER fr.o.m. 2026-01-01 (HSLF-FS 2025:68 Bilaga 2):
=== UNDERSÖKNING ===
101=1100kr | 103=445kr | 107=1275kr | 108=1895kr | 111=985kr | 112=1285kr | 113=535kr | 114=785kr
121=80kr | 123=1020kr | 124=635kr | 127=235kr | 128=405kr
131=1210kr | 132=1535kr | 133=1920kr | 134=2255kr
141=885kr | 142=535kr | 161=900kr | 162=520kr | 163=1260kr | 164=895kr

=== HÄLSOFRÄMJANDE/SJUKDOMSFÖREBYGGANDE ===
201=600kr | 205=245kr | 206=485kr | 207=375kr | 208=735kr | 209=1145kr | 213=1505kr | 214=695kr
311=595kr | 312=240kr | 321=600kr | 322=1350kr

=== SJUKDOMSBEHANDLANDE ===
301=450kr | 302=840kr | 303=1245kr | 304=2025kr
340=525kr | 341=920kr | 342=1430kr | 343=2165kr | 362=1025kr
601=4370kr | 602=4370kr

=== KIRURGI ===
401=1280kr | 402=1820kr | 403=510kr | 404=3755kr | 405=4330kr | 407=2470kr | 409=1550kr | 410=945kr
420=3585kr | 421=3755kr | 422=1805kr | 423=5455kr | 424=2025kr | 425=7520kr | 426=2705kr
427=4720kr | 428=5680kr | 429=4655kr | 436=805kr
446=2035kr | 447=1375kr | 448=755kr
451=3910kr | 452=5410kr | 453=4115kr | 454=5820kr | 480=400kr | 541=4410kr

=== ROTBEHANDLING ===
501=4105kr | 502=4955kr | 503=6225kr | 504=6790kr
520=1005kr | 521=885kr | 522=890kr | 523=1300kr

=== REPARATIVA FYLLNINGAR ===
701=730kr | 702=1160kr | 703=1420kr | 704=940kr | 705=1370kr | 706=1830kr | 707=2075kr | 708=550kr | 711=505kr

=== PROTETIK ===
800=6825kr | 801=5275kr | 802=3880kr | 803=1810kr | 804=2815kr | 805=2165kr | 806=4105kr | 807=3160kr | 808=4020kr | 809=1350kr
811=635kr | 812=1625kr | 813=5470kr | 814=9575kr | 815=6135kr
820=1550kr | 822=5000kr | 823=6785kr | 824=13620kr | 825=15250kr | 826=185kr | 827=12510kr | 828=12510kr | 829=9270kr
831=415kr | 832=1990kr | 833=3455kr | 834=2630kr
845=2255kr | 846=4685kr | 847=5650kr
850=10355kr | 852=8230kr | 853=2845kr | 858=1580kr | 859=1005kr
861=36530kr | 862=37845kr | 863=39160kr | 865=35225kr
871=21120kr | 872=23175kr | 873=25235kr | 877=17105kr | 878=330kr
881=1220kr | 883=2515kr | 884=9815kr | 888=205kr | 889=435kr | 892=385kr
893=1180kr | 894=1235kr | 895=1555kr | 896=1680kr | 897=2835kr

=== TANDREGLERING ===
900=11195kr | 901=16800kr | 902=20940kr | 903=24700kr | 904=30645kr | 905=23620kr | 906=27760kr | 907=31900kr | 908=38475kr

=== UTBYTESÅTGÄRDER ===
921=1420kr | 922=1830kr | 923=1420kr | 924=1830kr | 940=13365kr | 941=8090kr

KRITISKA KOMBINATIONSREGLER (direkt från HSLF-FS 2025:68 Bilaga 2):

BASUNDERSÖKNING (101):
- EJ + 111/112/201/206/312 eller ytterligare 101 samma dag, samma mottagning
- Fluorlack ENSTAKA tänder ingår i 101 (upp till 5 min). Fluorlack HELA BETTET = 205 separat (ca 10 min, 245kr). ALDRIG 206 samma dag som 101.
- Röntgen (bitewings) ingår i 101. 121 = ytterligare röntgen utöver det som ingår i 101.
- Max 2 ggr/ersättningsperiod (101/111/112 sammantaget)

FLUORID:
- 205 (ca 10 min) KAN kombineras med 101. Pris 245kr.
- 206 (ca 20 min) EJ + 101/111/112. EJ + 103/107/108 samma dag, samma behandlare. Pris 485kr.
- 207 EJ + 205/206/208/340-343 eller ytterligare 207 samma dag

PARODONTALBEHANDLING (tidsgräns avgör kod):
- 340 = ≥10 min (525kr) | 341 = ≥30 min (920kr) | 342 = ≥50 min (1430kr) | 343 = ≥90 min (2165kr)
- Välj koden baserat på FAKTISK tidsåtgång.
- 340-343 sammantaget max 8 ggr/ersättningsperiod och mottagning.
- 209 (tandstensborttagning ≥40 min) KAN BARA kombineras med: 113, 201, 311, 312 eller 362.

ROTBEHANDLING:
- 501/502/503/504 rapporteras FÖRST när rotfyllningen är FÄRDIG (4 § HSLF-FS 2025:68).
- Kod väljs efter antal ROTFYLLDA kanaler (inte antal rötter).
- EJ för tand i position 8.
- 520 = ANNAN behandlare än den som ska rotfylla.
- 521 = SAMMA behandlare, trepanation utan rensning.
- EJ + 520 och 501-504 för samma tand, samma behandlare.

FYLLNINGAR (700-serien):
- 701-703 = FRONTTAND/HÖRNTAND pos 1-3.
- 704-706 = MOLAR/PREMOLAR pos 4-7.
- Glasjonomer som PERMANENT lagning = ersättningsberättigande (701-706).
- Glasjonomer som TEMPORÄR lagning = EJ ersättningsberättigande (ingår ev. i 301/302 eller 322).
- Polering ingår ALLTID i 700-serien — debiteras EJ separat.
- Anestesi/bedövning ingår i kirurgiska åtgärder och fyllningsterapi — debiteras EJ separat.
- 101/111/112: hygienistruktion upp till 5 min ingår. Längre instruktion: 311 (≥15 min) eller 312 (kortare).

KRONREGEL (D.3) för koder 800-803:
- Kavitet/fraktur/förlust: minst 4 av 5 ytor på premolar/molar, eller minst 3 av 4 ytor på fronttand/hörntand inkl. incisalskäret, eller 2/3 av kronvolymen förlorad.
- Om D.3 EJ uppfyllt → utbytesåtgärd 921 (front, 1420kr) eller 922 (molar/premolar, 1830kr).

TILLSTÅNDSKODER (urval):
1001=Basundersökning | 1301=Behov av mindre undersökning | 1302=Behov av omfattande undersökning
2021=Förhöjd risk karies | 2031=Tandsten | 2041=Förhöjd risk parodontit | 2071=Förhöjd risk erosion
3021=Initialkaries | 3041=Gingivit | 3043=Parodontit | 3044=Periimplantit | 3045=Perikoronit
3051=Pulpa/periradikulärt sjd. | 3064=Rotfraktur längs | 3121=Retinerad tand | 3161=Käkfunktionsstörning
4002=Kavitet primärkaries | 4012=Kavitet sekundärkaries | 4022=Djup dentinkaries | 4041=Ofullst. rotfyllning inför rep.åtg.
4072=Tandslitage abrasion/attrition | 4073=Tandslitage erosion | 4081=Fraktur/förlust tandsubstans
4471=Bristande kontaktpunkt | 4772=Förlust fyllningsmaterial utan karies | 4882=Protetisk konstruktion lossnad/skadad
5031=Entandslucka tandstödd bro | 5032=Entandslucka implantat

SVARSFORMAT — ALLTID detta format på svenska:
**Åtgärder att rapportera:**
- [KOD] (Tillstånd [TILLSTÅNDSKOD]) — [KODENS NAMN] — [EXAKT PRIS] kr

**Kombinationsregler:** [JA/NEJ — inga regelbrott] eller [specifik regelöverträdelse]

**Kliniska klargöranden/motfrågor:**
[Ställ motfråga om tandposition (front/molar), tidsåtgång (341/342/343), material (permanent/temporärt) saknas]

**Totalt referenspris: [SUMMA] kr**

Notera: Referenspriset är inte detsamma som vad patienten betalar — tandvårdsstöd och patientavgift beräknas separat av Försäkringskassan.`;

const EXAMPLES = [
  "Basundersökning + fluorlack hela bettet + hygieninstruktion",
  "Fyllning 2 ytor molar 46 glasjonomer permanent",
  "Rotbehandling 3 kanaler + temporär fyllning",
  "Parodontalbehandling 45 min tandhygienist + munhygieninstruktion",
  "Extraktion tand 36 + patient med Waran",
  "Akut undersökning + apikal röntgen + trepanation 36",
];

export default function DebiteringsStod() {
  const [tab, setTab] = useState<"kodbank" | "ai">("kodbank");
  const [cat, setCat] = useState("alla");
  const [search, setSearch] = useState("");
  const [selectedKods, setSelectedKods] = useState<string[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return DEBITERING_DB.filter((d) => {
      if (cat !== "alla" && d.cat !== cat) return false;
      if (!q) return true;
      return (
        d.kod.includes(q) ||
        d.namn.toLowerCase().includes(q) ||
        d.kort.toLowerCase().includes(q) ||
        d.cat.includes(q) ||
        d.tillstand.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [cat, search]);

  const validation = useMemo(
    () => validateDebiteringCombinations(selectedKods),
    [selectedKods]
  );

  const toggleSelection = (kod: string) => {
    setSelectedKods((prev) =>
      prev.includes(kod) ? prev.filter((k) => k !== kod) : [...prev, kod]
    );
  };

  async function askAI() {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    try {
      const res = await fetch("/api/debitering/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-3-opus-20240229",
          max_tokens: 1500,
          temperature: 0,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: aiInput }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message || "Ett fel uppstod.");
      setAiResponse(data.content || "Inget svar mottaget.");
    } catch (e: any) {
      Sentry.captureException(e, { tags: { component: "DebiteringsStod" } });
      setAiResponse("⚠ Fel: AI-tjänsten är otillgänglig. " + e.message);
    } finally {
      setAiLoading(false);
    }
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="editorial-header text-3xl text-primary-container mb-2">
          Debiteringsstöd (HSLF-FS 2025:68)
        </h1>
        <p className="text-sm text-slate-500">
          Referenspriser och regler gällande fr.o.m. 2026-01-01. Verifieras mot kusp.tlv.se.
        </p>
      </div>

      <div className="flex space-x-2 border-b border-slate-200 mb-6">
        <button
          onClick={() => setTab("kodbank")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            tab === "kodbank"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          <Database className="inline-block w-4 h-4 mr-2" />
          Manuell (Offline)
        </button>
        <button
          onClick={() => setTab("ai")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            tab === "ai"
              ? "border-secondary text-secondary"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          <Zap className="inline-block w-4 h-4 mr-2" />
          AI-assisterad
        </button>
      </div>

      {tab === "kodbank" && (
        <div className="space-y-4">
          <div className="glass-bento p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Sök åtgärdskod, fritext eller kategori..."
                  className="w-full pl-10 pr-4 py-2 bg-white/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="bg-white/50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                >
                  {DEBITERING_CATS.map((c) => (
                    <option key={c} value={c}>
                      {DEBITERING_CAT_LABELS[c]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedKods.length > 0 && (
              <div className="mb-6 p-4 bg-white/60 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-primary-container">
                    Valda åtgärder ({selectedKods.length})
                  </h3>
                  {validation && (
                    <div
                      className={`flex items-center text-xs font-semibold px-3 py-1 rounded-full ${
                        validation.valid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {validation.valid ? (
                        <Check className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {validation.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedKods.map((k) => (
                    <span
                      key={k}
                      className="inline-flex items-center px-3 py-1 bg-secondary/10 text-secondary text-sm font-semibold rounded-lg"
                    >
                      {k}
                      <button
                        onClick={() => toggleSelection(k)}
                        className="ml-2 hover:text-secondary-container"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200/60 text-slate-500">
                    <th className="pb-3 font-semibold">Kod</th>
                    <th className="pb-3 font-semibold">Beskrivning</th>
                    <th className="pb-3 font-semibold">Kategori</th>
                    <th className="pb-3 font-semibold">Pris</th>
                    <th className="pb-3 font-semibold">Patientandel</th>
                    <th className="pb-3 font-semibold">Val</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        Inga koder matchar sökningen.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((d) => (
                      <tr key={d.kod} className="hover:bg-white/40 transition-colors">
                        <td className="py-3 font-mono font-bold text-primary">{d.kod}</td>
                        <td className="py-3 pr-4">
                          <div className="font-semibold text-slate-800">{d.namn}</div>
                          <div className="text-xs text-slate-500 mt-1 line-clamp-1" title={d.kort}>
                            {d.kort}
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="badge">{d.cat}</span>
                        </td>
                        <td className="py-3 font-mono font-semibold text-tertiary">
                          {d.pris.toLocaleString("sv-SE")} kr
                        </td>
                        <td className="py-3 text-xs text-slate-500">
                          Beräknas enl. HKS
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => toggleSelection(d.kod)}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors border ${
                              selectedKods.includes(d.kod)
                                ? "bg-secondary text-white border-secondary"
                                : "bg-white text-slate-600 border-slate-200 hover:border-secondary"
                            }`}
                          >
                            {selectedKods.includes(d.kod) ? "Vald" : "Välj"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "ai" && (
        <div className="max-w-4xl space-y-6">
          <div className="glass-bento p-8 bg-gradient-to-br from-primary/10 to-transparent">
            <h2 className="editorial-header text-2xl text-primary mb-3">
              AI-Debiteringsrådgivare
            </h2>
            <p className="text-sm text-slate-600 mb-6 max-w-2xl">
              Beskriv vad du gjort vid besöket. Agenten svarar med exakta åtgärdskoder, tillstånd och kombinationsregler baserat uteslutande på HSLF-FS 2025:68. Temperature=0.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setAiInput(ex)}
                  className="px-3 py-1.5 text-xs font-medium bg-white/60 hover:bg-white border border-slate-200 rounded-full text-slate-600 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) askAI();
                }}
                placeholder="Ex: Basundersökning med 4 bitewings, fluorlack hela bettet, fyllning 46 MO med glasjonomer (permanent), munhygieninstruktion ca 10 min. Vad debiterar jag?"
                className="w-full min-h-[120px] p-4 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-y shadow-sm"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                  Cmd/Ctrl + Enter
                </span>
                <button
                  onClick={askAI}
                  disabled={aiLoading || !aiInput.trim()}
                  className="morphic-button bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {aiLoading ? "Analyserar..." : "Analysera"}
                </button>
              </div>
            </div>
          </div>

          {(aiLoading || aiResponse) && (
            <div className="glass-bento p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-primary-container">Debiteringsanalys</h3>
                <span className="ml-auto text-xs font-mono text-slate-400">
                  HSLF-FS 2025:68 · temp=0
                </span>
              </div>
              
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                  <div className="w-8 h-8 border-4 border-slate-200 border-t-secondary rounded-full animate-spin mb-4"></div>
                  <p className="text-sm">Analyserar mot HSLF-FS 2025:68 med temperature=0...</p>
                </div>
              ) : (
                <div className="journal-box text-slate-700">
                  {aiResponse}
                  <button
                    onClick={() => copyText(aiResponse || "")}
                    className="copy-btn hover:bg-slate-50 transition-colors"
                  >
                    {copied ? (
                      <span className="text-green-600 flex items-center gap-1"><Check className="w-3 h-3"/> Kopierat</span>
                    ) : (
                      <span className="flex items-center gap-1"><Copy className="w-3 h-3"/> Kopiera</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 mt-8 border-t border-slate-200/50">
        <div className="flex items-center gap-3 p-4 bg-white/40 rounded-xl border border-slate-200/50">
          <Activity className="w-5 h-5 text-green-600" />
          <div>
            <div className="text-xs font-bold text-slate-700">Manuell vy (Offline)</div>
            <div className="text-xs text-slate-500">Fullt kapabel utan nätverk</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white/40 rounded-xl border border-slate-200/50">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <div>
            <div className="text-xs font-bold text-slate-700">Verifierad Data</div>
            <div className="text-xs text-slate-500">Koder valideras mot kusp.tlv.se</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white/40 rounded-xl border border-slate-200/50">
          <Info className="w-5 h-5 text-secondary" />
          <div>
            <div className="text-xs font-bold text-slate-700">Gäller fr.o.m 2026</div>
            <div className="text-xs text-slate-500">HSLF-FS 2025:68 uppdatering</div>
          </div>
        </div>
      </div>
    </div>
  );
}
