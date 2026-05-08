'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategoryAccent, getCategoryIcon } from '@/lib/simulator/category-colors';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  is_pediatric: boolean;
}

interface CategoryChipsProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function CategoryChips({ selected, onChange }: CategoryChipsProps) {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories'); // Assume this exists or fallback
      if (!res.ok) return [];
      return res.json();
    }
  });

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(i => i !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  if (!categories) return <div className="animate-pulse h-12 bg-black/5 rounded-xl" />;

  // Filter to main categories to keep it clean (not sub-pedodonti)
  const mainCategories = categories.filter(c => !c.is_pediatric || c.slug === 'pedodonti');

  return (
    <div className="flex flex-wrap gap-3">
      {mainCategories.map((cat) => {
        const accent = getCategoryAccent(cat.slug);
        const isActive = selected.includes(cat.id);
        
        return (
          <button
            key={cat.id}
            onClick={() => toggle(cat.id)}
            className={cn(
              "pill-button flex items-center gap-2 border-l-4 transition-all",
              isActive ? "shadow-md scale-105" : "opacity-60 grayscale-[0.5] hover:grayscale-0 hover:opacity-100"
            )}
            style={{ 
              borderLeftColor: accent,
              backgroundColor: isActive ? accent : undefined,
              color: isActive ? 'white' : undefined
            }}
          >
            <span className="material-symbols-outlined text-[18px]">
              {getCategoryIcon(cat.slug)}
            </span>
            <span className="font-bold text-xs">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
