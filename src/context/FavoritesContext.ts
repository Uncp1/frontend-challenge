import { createContext } from 'react';

import type { CatImage } from '../types/cats';

interface FavoritesContextValue {
  favorites: CatImage[];
  favoriteIds: Set<string>;
  toggleFavorite: (cat: CatImage) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);
