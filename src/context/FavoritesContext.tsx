import { createContext, useState } from 'react';
import type { CatImage } from '../types/cats';

interface FavoritesContextValue {
  favorites: CatImage[];
  toggleFavorite: (cat: CatImage) => void;
}

const STORAGE_KEY = 'favorite_cats';

function getFavorites(): CatImage[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
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
