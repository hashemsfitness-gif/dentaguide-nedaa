import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!profile.clinic_name) {
      return NextResponse.json({ error: 'Clinic name not set' }, { status: 404 });
    }

    const supabase = await createServerSupabase();

    // Fetch top 10 users in same clinic with opt-in
    // We aggregate their average total_score over last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: leaderboard, error } = await supabase
      .from('simulator_sessions')
      .select('user_id, total_score, profiles!inner(full_name, avatar_url, clinic_name, leaderboard_opt_in)')
      .eq('status', 'completed')
      .eq('profiles.clinic_name', profile.clinic_name)
      .eq('profiles.leaderboard_opt_in', true)
      .gte('completed_at', thirtyDaysAgo.toISOString())
      .order('total_score', { ascending: false })
      .limit(50); // Get more to average them correctly if needed

    if (error) throw error;

    // Manual aggregation because complex GROUP BY is tricky with PostgREST
    const userStats = new Map<string, { name: string, avatar: string, total: number, count: number }>();
    
    leaderboard?.forEach((row: any) => {
      const uid = row.user_id;
      const stats = userStats.get(uid) || { 
        name: row.profiles.full_name, 
        avatar: row.profiles.avatar_url, 
        total: 0, 
        count: 0 
      };
      stats.total += row.total_score;
      stats.count += 1;
      userStats.set(uid, stats);
    });

    const results = Array.from(userStats.entries())
      .map(([id, stats]) => ({
        id,
        name: stats.name,
        avatar: stats.avatar,
        avgScore: Math.round(stats.total / stats.count),
        sessionCount: stats.count
      }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10);

    return NextResponse.json({
      leaderboard: results,
      userClinic: profile.clinic_name,
      userOptIn: (profile as any).leaderboard_opt_in ?? false
    });

  } catch (error: any) {
    Sentry.captureException(error, { tags: { route: 'api/simulator/leaderboard' } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
