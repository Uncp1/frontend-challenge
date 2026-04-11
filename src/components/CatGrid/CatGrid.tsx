import CatCard from '../CatCard/CatCard';
import type { CatImage } from '../../types/cats';
import styles from './CatGrid.module.css';

interface Props {
  cats: CatImage[];
  favoriteIds: Set<string>;
  onToggleFavorite: (cat: CatImage) => void;
}

export default function CatGrid({ cats, favoriteIds, onToggleFavorite }: Props) {
  return (
    <div className={styles.grid}>
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          isFavorite={favoriteIds.has(cat.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
