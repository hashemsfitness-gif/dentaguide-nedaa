const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../html-sources/journalmall-v8 sist.html');
const outPath = path.join(__dirname, '../lib/journalData.ts');

const html = fs.readFileSync(htmlPath, 'utf8');

const startIndex = html.indexOf('const DB = [');
if (startIndex === -1) {
  console.error("Could not find const DB = [");
  process.exit(1);
}

const match = html.substring(startIndex).match(/const DB = (\[[\s\S]*?\]);\s*(let|const|function)/);
if (!match) {
  console.error("Could not match the DB array");
  process.exit(1);
}

const dbString = match[1];

const tsContent = `export type Mall = {
  id: string;
  label: string;
  behandlingTag: string;
  followup: string;
  text: string;
};

export type ExtraAtgard = {
  id: string;
  label: string;
  text: string;
};

export type Scenario = {
  id: string;
  icd: string;
  name: string;
  cat: string;
  scId: string;
  symptom: string[];
  behandling: string[];
  varning: string | null;
  mallar: Mall[];
  extraAtgard: ExtraAtgard[];
  lakemedel: string | null;
  remissSpec: string | null;
};

export const journalScenarios: Scenario[] = ${dbString};
`;

fs.writeFileSync(outPath, tsContent);
console.log("Successfully extracted journal data to lib/journalData.ts");
