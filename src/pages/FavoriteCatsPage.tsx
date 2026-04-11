import CatGrid from '../components/CatGrid/CatGrid';
import useFavorites from '../hooks/useFavorites';

export default function FavoriteCatsPage() {
  const { favorites, favoriteIds, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <p>Нет любимых котиков</p>;
  }
  return (
    <CatGrid
      cats={favorites}
      favoriteIds={favoriteIds}
      onToggleFavorite={toggleFavorite}
    />
  );
}
