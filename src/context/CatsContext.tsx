import { createContext, useState } from 'react';
import type { CatImage } from '../types/cats';

interface CatsContextValue {
  cats: CatImage[];
  setCats: (cats: CatImage[]) => void;
}

export const CatsContext = createContext<CatsContextValue | null>(null);

export function CatsProvider({ children }: { children: React.ReactNode }) {
  const [cats, setCats] = useState<CatImage[]>([]);

  return (
    <CatsContext.Provider value={{ cats, setCats }}>
      {children}
    </CatsContext.Provider>
  );
}
