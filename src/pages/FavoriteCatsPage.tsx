import CatGrid from '../components/CatGrid/CatGrid';
import useFavorites from '../hooks/useFavorites';

export default function FavoriteCatsPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <p>Нет любимых котиков</p>;
  }
  return (
    <CatGrid
      cats={favorites}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}
