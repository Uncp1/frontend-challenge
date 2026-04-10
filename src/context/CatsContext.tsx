import { createContext, useState } from 'react';

import type { CatImage } from '../types/cats';
import { CATS_PER_PAGE } from '../api/catApi';

interface CatsContextValue {
  cats: CatImage[];
  page: number;
  hasMore: boolean;
  appendCats: (newCats: CatImage[], nextPage: number) => void;
}

export const CatsContext = createContext<CatsContextValue | null>(null);

export function CatsProvider({ children }: { children: React.ReactNode }) {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  function appendCats(newCats: CatImage[], nextPage: number) {
    setCats((prev) => [...prev, ...newCats]);
    setPage(nextPage);
    setHasMore(newCats.length === CATS_PER_PAGE);
  }
  return (
    <CatsContext.Provider value={{ cats, page, hasMore, appendCats }}>
      {children}
    </CatsContext.Provider>
  );
}
