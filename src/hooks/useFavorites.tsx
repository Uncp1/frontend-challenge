import { useState } from 'react';
import type { CatImage } from '../types/cats';

const STORAGE_KEY = 'favorite_cats';

function getFavorites(): CatImage[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}
export default function useFavorites() {
  const [favorites, setFavorites] = useState<CatImage[]>(getFavorites);

  function toggleFavorite(cat: CatImage) {
    setFavorites((prev) => {
      const checkCat = prev.some((c) => c.id === cat.id);
      const newFavorites = checkCat
        ? prev.filter((c) => c.id !== cat.id)
        : [...prev, cat];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));

      return newFavorites;
    });
  }

  return { favorites, toggleFavorite };
}
