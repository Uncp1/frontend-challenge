import { createContext } from 'react';

import type { CatImage } from '../types/cats';

interface CatsContextValue {
  cats: CatImage[];
  page: number;
  hasMore: boolean;
  appendCats: (newCats: CatImage[], nextPage: number) => void;
}

export const CatsContext = createContext<CatsContextValue | null>(null);
