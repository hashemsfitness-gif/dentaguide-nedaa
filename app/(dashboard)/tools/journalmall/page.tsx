import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Bot, Zap, WifiOff } from 'lucide-react';

export default function JournalmallOverview() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Journalmall-generator
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Välj hur du vill skapa din journalanteckning
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex flex-col hover:border-blue-500 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              MANUELL
            </CardTitle>
            <CardDescription>Klassisk mall-bygge</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
            <ul className="mb-6 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                Blixtsnabb, interaktiv
              </li>
              <li className="flex items-center gap-2">
                <WifiOff className="h-4 w-4 text-green-500" />
                100% Offline-kapabel
              </li>
              <li>• Välj scenario & mall</li>
              <li>• Klicka & fyll i platshållare</li>
              <li>• Generera remiss</li>
            </ul>
            <Link href="/tools/journalmall/manuell" className="w-full">
              <Button className="w-full" variant="outline">
                Välj Manuell
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col hover:border-purple-500 transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800">
              Kliniker / Klinik
            </span>
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-purple-600" />
              AI-ASSISTERAD
            </CardTitle>
            <CardDescription>Skriv fritt — AI strukturerar</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
            <ul className="mb-6 space-y-2 text-sm text-slate-600">
              <li>• Tala in eller skriv fritt</li>
              <li>• AI strukturerar anamnes & status</li>
              <li>• Föreslår åtgärder & TLV</li>
              <li>• Kräver internetanslutning</li>
              <li className="text-xs text-slate-500 mt-2">
                Obs: Ingen personuppgiftsbehandling
              </li>
            </ul>
            <Link href="/tools/journalmall/ai-assisterad" className="w-full">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Välj AI-assisterad
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
