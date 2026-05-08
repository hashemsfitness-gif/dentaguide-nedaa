/**
 * lib/simulator/case-selector.ts
 * 
 * Logic for selecting 5 cases based on difficulty and category.
 */

import { SupabaseClient } from '@supabase/supabase-js';

export interface SelectCasesOptions {
  difficulty: 'basic' | 'standard' | 'advanced';
  categoryIds: string[];
  isPremiumUser: boolean;
  count: number;
}

export async function selectCases(
  supabase: SupabaseClient,
  opts: SelectCasesOptions
) {
  const { difficulty, categoryIds, isPremiumUser, count } = opts;

  let query = supabase
    .from('scenarios')
    .select('id, category_id, scenario_code, title, slug, difficulty, is_premium')
    .eq('is_published', true);

  // 1. Premium gating
  if (!isPremiumUser) {
    query = query.eq('is_premium', false);
  }

  // 2. Category filtering
  if (categoryIds && categoryIds.length > 0) {
    query = query.in('category_id', categoryIds);
  }

  // 3. Difficulty filtering (Initial attempt)
  const { data: primaryData, error: primaryError } = await query
    .eq('difficulty', difficulty);

  if (primaryError) throw primaryError;

  let scenarios = primaryData || [];
  let fallbackUsed = false;
  let warningMessage = '';

  // 4. Fallback if not enough cases
  if (scenarios.length < count) {
    fallbackUsed = true;
    warningMessage = `Kunde inte hitta tillräckligt många ${difficulty} fall. Kompletterar med andra svårighetsgrader.`;
    
    // Fetch from other difficulties but same categories/premium rules
    const { data: fallbackData, error: fallbackError } = await query
      .neq('difficulty', difficulty);
    
    if (fallbackError) throw fallbackError;
    
    scenarios = [...scenarios, ...(fallbackData || [])];
  }

  // 5. Random selection
  if (scenarios.length === 0) {
    throw new Error('Inga scenarier hittades för vald konfiguration.');
  }

  // Shuffle and limit
  const selected = scenarios
    .sort(() => 0.5 - Math.random())
    .slice(0, count);

  return {
    scenarios: selected,
    fallbackUsed,
    warningMessage: fallbackUsed ? warningMessage : undefined
  };
}
