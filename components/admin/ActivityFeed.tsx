'use client';

import { useEffect, useState } from 'react';
import { createClientSupabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';
import { 
  Zap, 
  RefreshCcw, 
  ArrowRightLeft, 
  Download, 
  Users,
  ShieldCheck,
  History as HistoryIcon
} from 'lucide-react';

interface AdminEvent {
  id: string;
  event_type: string;
  event_data: any;
  created_at: string;
  profiles?: {
    email: string;
    full_name: string | null;
  };
}

const EVENT_ICONS: Record<string, any> = {
  admin_publish: Zap,
  admin_rollback: ArrowRightLeft,
  admin_tier_change: Users,
  admin_export: Download,
  default: RefreshCcw,
};

const EVENT_COLORS: Record<string, string> = {
  admin_publish: 'text-[var(--sidebar-text-active)] bg-[var(--sidebar-text-active)]/10',
  admin_rollback: 'text-[var(--status-warning)] bg-[var(--status-warning)]/10',
  admin_tier_change: 'text-[var(--primary)] bg-[var(--primary)]/10',
  admin_export: 'text-[var(--text-primary)] bg-[var(--neutral)]',
  default: 'text-[var(--text-muted)] bg-[var(--neutral)]',
};

export default function ActivityFeed({ initialEvents = [] }: { initialEvents?: AdminEvent[] }) {
  const [events, setEvents] = useState<AdminEvent[]>(initialEvents);
  const supabase = createClientSupabase();

  useEffect(() => {
    // Initial fetch if no initialEvents
    if (initialEvents.length === 0) {
      const fetchEvents = async () => {
        const { data } = await supabase
          .from('analytics_events')
          .select('*, profiles(email, full_name)')
          .in('event_type', ['admin_publish', 'admin_rollback', 'admin_tier_change', 'admin_export'])
          .order('created_at', { ascending: false })
          .limit(50);
        if (data) setEvents(data);
      };
      fetchEvents();
    }

    // Subscribe to new events
    const channel = supabase
      .channel('admin_activity')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'analytics_events',
        },
        async (payload) => {
          // Fetch full profile info for the new event
          const { data } = await supabase
            .from('analytics_events')
            .select('*, profiles(email, full_name)')
            .eq('id', payload.new.id)
            .single();
            
          if (data) {
            setEvents((prev) => [data, ...prev].slice(0, 50));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initialEvents.length, supabase]);

  return (
    <div className="bg-white rounded-[2rem] border border-[var(--border-light)] overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-[var(--border-light)] flex items-center justify-between bg-[var(--neutral)]/30">
        <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
          <HistoryIcon className="w-4 h-4 text-[var(--sidebar-text-active)]" />
          Live Systemlogg
        </h3>
        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider bg-white px-2 py-1 rounded-md border border-[var(--border-light)]">
          Realtime Active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] opacity-50 py-12">
            <ShieldCheck className="w-8 h-8 mb-2" />
            <p className="text-xs font-medium">Ingen aktivitet loggad</p>
          </div>
        ) : (
          <div className="space-y-1">
            {events.map((event) => {
              const Icon = EVENT_ICONS[event.event_type] || EVENT_ICONS.default;
              const colorClass = EVENT_COLORS[event.event_type] || EVENT_COLORS.default;
              
              return (
                <div key={event.id} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-[var(--neutral)] transition-all cursor-default">
                  <div className={cn("w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", colorClass)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                        {event.event_type.replace('admin_', '').replace('_', ' ')}
                      </p>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">
                        {formatDistanceToNow(new Date(event.created_at), { addSuffix: true, locale: sv })}
                      </span>
                    </div>
                    
                    <p className="text-sm font-medium text-[var(--text-primary)] leading-snug line-clamp-2">
                      {getEventMessage(event)}
                    </p>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[var(--primary-container)] flex items-center justify-center text-[8px] text-white">
                        {event.profiles?.full_name?.[0] || 'A'}
                      </div>
                      <span className="text-[10px] font-bold text-[var(--text-primary)] opacity-60">
                        {event.profiles?.full_name || event.profiles?.email || 'System'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function getEventMessage(event: AdminEvent) {
  const data = event.event_data;
  switch (event.event_type) {
    case 'admin_publish':
      return `Publicerade scenario "${data.title || data.scenario_id}"`;
    case 'admin_rollback':
      return `Återställde scenario "${data.title || data.scenario_id}" till tidigare version`;
    case 'admin_tier_change':
      return `Uppdaterade ${data.target_email} till tier ${data.new_tier}`;
    case 'admin_export':
      return `Exporterade ${data.type} (${data.row_count || data.scenario_count} rader)`;
    default:
      return 'Systemhändelse utförd';
  }
}
