import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, name, slug, is_pediatric')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
