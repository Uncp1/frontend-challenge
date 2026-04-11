import { useCallback, useState } from 'react';

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

  const toggleFavorite = useCallback((cat: CatImage) => {
    setFavorites((prev) => {
      const next = prev.some((c) => c.id === cat.id)
        ? prev.filter((c) => c.id !== cat.id)
        : [...prev, cat];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      return next;
    });
  }, []);

  const favoriteIds = new Set(favorites.map((f) => f.id));

  return (
    <FavoritesContext.Provider value={{ favorites, favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
