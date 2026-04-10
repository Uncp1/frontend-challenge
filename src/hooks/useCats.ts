import { useContext } from 'react';

import { CatsContext } from '../context/CatsContext';

export default function useCats() {
  const ctx = useContext(CatsContext);

  if (!ctx) throw new Error('useCats must be used within CatsProvider');

  return ctx;
}
