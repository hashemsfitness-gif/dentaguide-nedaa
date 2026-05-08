import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth';
import * as Sentry from '@sentry/nextjs';

export async function GET(req: Request) {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId');
    const query = searchParams.get('q') || '';

    if (query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const supabase = await createServerSupabase();

    // 1. Get exact matches in category
    let dbQuery = supabase
      .from('scenarios')
      .select('trolig_diagnos, differentialdiagnoser')
      .ilike('trolig_diagnos', `%${query}%`)
      .limit(20);

    if (categoryId) {
      dbQuery = dbQuery.eq('category_id', categoryId);
    }

    const { data: primary, error: primaryError } = await dbQuery;
    if (primaryError) throw primaryError;

    // 2. Extract and deduplicate
    const suggestions = new Set<string>();
    primary?.forEach(row => {
      if (row.trolig_diagnos) suggestions.add(row.trolig_diagnos);
      row.differentialdiagnoser?.forEach(d => {
        if (d.toLowerCase().includes(query.toLowerCase())) suggestions.add(d);
      });
    });

    // 3. If still space, add from other categories
    if (suggestions.size < 8) {
      const { data: secondary } = await supabase
        .from('scenarios')
        .select('trolig_diagnos')
        .ilike('trolig_diagnos', `%${query}%`)
        .limit(10);
      
      secondary?.forEach(row => {
        if (row.trolig_diagnos) suggestions.add(row.trolig_diagnos);
      });
    }

    return NextResponse.json({
      suggestions: Array.from(suggestions).slice(0, 8)
    });

  } catch (error: any) {
    Sentry.captureException(error, { tags: { route: 'api/simulator/diagnoses' } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
