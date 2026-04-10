import { useEffect, useState } from 'react';

import { fetchCats } from '../api/catApi';
import type { CatImage } from '../types/cats';
import CatCard from '../components/CatCard/CatCard';
import useFavorites from '../hooks/useFavorites';

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
    <div>
      <h2>cats</h2>
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          isFavorite={favorites.some((f) => f.id === cat.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
