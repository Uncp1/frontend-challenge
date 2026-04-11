import { useState } from 'react';

import type { CatImage } from '../types/cats';
import { FavoritesContext } from './FavoritesContext';

const STORAGE_KEY = 'favorite_cats';

function getFavorites(): CatImage[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export default function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<CatImage[]>(getFavorites);

  function toggleFavorite(cat: CatImage) {
    setFavorites((prev) => {
      const next = prev.some((c) => c.id === cat.id)
        ? prev.filter((c) => c.id !== cat.id)
        : [...prev, cat];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      return next;
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
