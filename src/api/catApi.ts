import type { CatImage } from '../types/cats';

const BASE_URL = 'https://api.thecatapi.com/v1';
// не очень актуально для фронтового клиентского приложения, но пусть будет так
const API_KEY = import.meta.env.VITE_CAT_API_KEY;

export async function fetchCats(
  page: number,
  limit = 15,
  signal?: AbortSignal,
): Promise<CatImage[]> {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
    order: 'ASC',
  });

  const res = await fetch(`${BASE_URL}/images/search?${params}`, {
    headers: { 'x-api-key': API_KEY },
    signal,
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  return res.json();
}
