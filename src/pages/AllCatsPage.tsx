import { useEffect, useState } from 'react';

import { fetchCats } from '../api/catApi';
import type { CatImage } from '../types/cats';
import useFavorites from '../hooks/useFavorites';
import CatGrid from '../components/CatGrid/CatGrid';

export default function AllCatsPages() {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const data = await fetchCats(1, 15, controller.signal);

        setCats(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <CatGrid
      cats={cats}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}
