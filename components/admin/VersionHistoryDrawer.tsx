'use client';

import { Drawer } from 'vaul';
import { useState, useEffect } from 'react';
import { createClientSupabase } from '@/lib/supabase';
import { History as HistoryIcon, ArrowLeftRight, Clock, User, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Version {
  id: string;
  version_number: number;
  created_at: string;
  change_description: string | null;
  profiles: {
    full_name: string | null;
    email: string;
  };
}

export default function VersionHistoryDrawer({ scenarioId }: { scenarioId: string }) {
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState<Version[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientSupabase();

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-version-history', handleOpen);
    return () => window.removeEventListener('open-version-history', handleOpen);
  }, []);

  useEffect(() => {
    if (open && scenarioId) {
      fetchVersions();
    }
  }, [open, scenarioId]);

  const fetchVersions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('scenario_versions')
      .select('*, profiles(full_name, email)')
      .eq('scenario_id', scenarioId)
      .order('version_number', { ascending: false });

    if (data) setVersions(data);
    setIsLoading(false);
  };

  const handleRollback = async (versionId: string) => {
    if (!confirm('Vill du verkligen återställa till denna version? Nuvarande ändringar kommer att sparas som ett nytt utkast.')) return;

    try {
      const res = await fetch(`/api/admin/scenarios/${scenarioId}/rollback`, {
        method: 'POST',
        body: JSON.stringify({ version_id: versionId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        alert('Återställning lyckades!');
        window.location.reload();
      } else {
        alert('Rollback misslyckades.');
      }
    } catch (err) {
      console.error('Rollback error:', err);
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[3rem] h-[85vh] fixed bottom-0 left-0 right-0 z-50 outline-none">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[var(--border-light)] my-4" />
          
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col overflow-hidden px-8 pb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Drawer.Title className="text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                  <HistoryIcon className="w-8 h-8 text-[var(--sidebar-text-active)]" />
                  Versionshistorik
                </Drawer.Title>
                <Drawer.Description className="text-[var(--text-muted)] text-sm mt-2">
                  Bläddra bland tidigare publicerade versioner och gör rollback vid behov.
                </Drawer.Description>
              </div>
              <button 
                onClick={() => setOpen(false)}
                className="p-3 hover:bg-[var(--neutral)] rounded-2xl transition-colors text-[var(--text-muted)]"
              >
                Stäng
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="w-8 h-8 border-4 border-[var(--sidebar-text-active)] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : versions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-[var(--text-muted)] opacity-50">
                  <Clock className="w-12 h-12 mb-4" />
                  <p className="font-bold">Inga tidigare versioner hittades</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {versions.map((v, i) => (
                    <div key={v.id} className={cn(
                      "group p-6 rounded-3xl border-2 transition-all flex items-center justify-between",
                      i === 0 ? "border-[var(--sidebar-text-active)] bg-[var(--sidebar-text-active)]/5" : "border-[var(--border-light)] hover:border-[var(--border-medium)] bg-white"
                    )}>
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg",
                          i === 0 ? "bg-[var(--sidebar-text-active)] text-white" : "bg-[var(--neutral)] text-[var(--text-muted)]"
                        )}>
                          {v.version_number}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-[var(--text-primary)]">
                              {i === 0 ? 'Nuvarande live-version' : `Version ${v.version_number}`}
                            </span>
                            {i === 0 && <CheckCircle2 className="w-4 h-4 text-[var(--status-online)]" />}
                          </div>
                          <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-muted)]">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {format(new Date(v.created_at), 'd MMM yyyy, HH:mm', { locale: sv })}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {v.profiles?.full_name || v.profiles?.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      {i > 0 && (
                        <button 
                          onClick={() => handleRollback(v.id)}
                          className="px-6 py-3 bg-[var(--text-primary)] text-white rounded-2xl text-xs font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-[var(--text-primary)]/20"
                        >
                          <ArrowLeftRight className="w-4 h-4" />
                          Rollback till denna
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
