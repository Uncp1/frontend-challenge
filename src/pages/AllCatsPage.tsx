import CatGrid from '../components/CatGrid/CatGrid';
import CatState from '../components/states/CatState';
import useFavorites from '../hooks/useFavorites';
import useLoadCats from '../hooks/useLoadCats';
import { assetUrl } from '../utils/assetUrl';

export default function AllCatsPages() {
  const { cats, hasMore, loading, error, sentinelRef, loadMore, clearError } =
    useLoadCats();
  const { favoriteIds, toggleFavorite } = useFavorites();

  if (error)
    return (
      <CatState
        gif={assetUrl('gifs/crying-cat.webp')}
        message="Что-то пошло не так"
        action={{
          label: 'Попробовать снова',
          onClick: () => {
            clearError();
            loadMore();
          },
        }}
      />
    );

  return (
    <>
      <CatGrid
        cats={cats}
        favoriteIds={favoriteIds}
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
