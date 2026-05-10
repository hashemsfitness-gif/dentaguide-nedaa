import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = await createServerSupabase();
    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, name, slug, is_pediatric')
      .order('display_order', { ascending: true });

    if (error || !categories || categories.length === 0) {
      // Return MOCK categories for preview
      return NextResponse.json([
        { id: 'cat-1', name: 'Endodonti', slug: 'endodonti', is_pediatric: false },
        { id: 'cat-2', name: 'Käkkirurgi', slug: 'kakkirurgi', is_pediatric: false },
        { id: 'cat-3', name: 'Parodontologi', slug: 'parodontologi', is_pediatric: false },
        { id: 'cat-4', name: 'Oralmedicin', slug: 'oralmedicin', is_pediatric: false },
        { id: 'cat-5', name: 'Allmänt', slug: 'allmant', is_pediatric: false },
      ]);
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
