import { useEffect, useState } from 'react';

import { fetchCats } from '../api/catApi';
import useFavorites from '../hooks/useFavorites';
import CatGrid from '../components/CatGrid/CatGrid';
import useCats from '../hooks/useCats';

export default function AllCatsPages() {
  const { cats, setCats } = useCats();
  const [loading, setLoading] = useState(cats.length === 0);
  const [error, setError] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (cats.length > 0) return;

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
