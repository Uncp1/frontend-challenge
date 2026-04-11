import { useEffect, useRef, useState } from 'react';

import CatGrid from '../components/CatGrid/CatGrid';
import CatState from '../components/states/CatState';
import useCats from '../hooks/useCats';
import useFavorites from '../hooks/useFavorites';
import { CATS_PER_PAGE, fetchCats } from '../api/catApi';
import { assetUrl } from '../utils/assetUrl';

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

  if (error)
    return (
      <CatState
        gif={assetUrl('gifs/crying-cat.webp')}
        message="Что-то пошло не так"
        action={{
          label: 'Попробовать снова',
          onClick: () => {
            setError(null);
            loadMore();
          },
        }}
      />
    );

  return (
    <>
      <CatGrid
        cats={cats}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      <div ref={sentinelRef} style={{ height: 40 }} />
      {loading && (
        <CatState
          gif={assetUrl('gifs/loading-cat.webp')}
          message="Загружаем котиков..."
        />
      )}
      {!hasMore && !loading && cats.length > 0 && (
        <CatState
          gif={assetUrl('gifs/crying-cat.webp')}
          message="Котики закончились :("
        />
      )}
    </>
  );
}
