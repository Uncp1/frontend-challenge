import { useCallback, useEffect, useRef, useState } from 'react';

import useCats from './useCats';
import { CATS_PER_PAGE, fetchCats } from '../api/catApi';

export default function useLoadCats() {
  const { cats, page, hasMore, appendCats } = useCats();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    loadingRef.current = true;
    setLoading(true);

    try {
      const data = await fetchCats(page + 1, CATS_PER_PAGE, controller.signal);
      appendCats(data, page + 1);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore, page, appendCats]);

  useEffect(() => {
    if (cats.length > 0) return;
    loadMore();
  }, [cats.length, loadMore]);

  useEffect(() => {
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
  }, [loadMore]);

  const clearError = useCallback(() => setError(null), []);

  return { cats, hasMore, loading, error, sentinelRef, loadMore, clearError };
}
