import { useEffect, useRef, useState } from 'react';

import { CATS_PER_PAGE, fetchCats } from '../api/catApi';
import useFavorites from '../hooks/useFavorites';
import CatGrid from '../components/CatGrid/CatGrid';
import useCats from '../hooks/useCats';

export default function AllCatsPages() {
  const { cats, page, hasMore, appendCats } = useCats();
  const { favorites, toggleFavorite } = useFavorites();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function loadMore() {
    if (loading || !hasMore) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    try {
      const data = await fetchCats(page + 1, CATS_PER_PAGE, controller.signal);
      appendCats(data, page + 1);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (cats.length > 0) return;

    loadMore();

    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loading, hasMore, page]);

  if (error) return <p>Ошибка: {error}</p>;

  return (
    <>
      <CatGrid
        cats={cats}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      <div ref={sentinelRef} style={{ height: 40 }} />
      {loading && <p>Загрузка...</p>}
      {!hasMore && <p>Котики закончились</p>}
    </>
  );
}
