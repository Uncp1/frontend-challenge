import CatCard from '../CatCard/CatCard';
import type { CatImage } from '../../types/cats';
import styles from './CatGrid.module.css';

interface Props {
  cats: CatImage[];
  favorites: CatImage[];
  onToggleFavorite: (cat: CatImage) => void;
}

export default function CatGrid({ cats, favorites, onToggleFavorite }: Props) {
  return (
    <div className={styles.grid}>
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          isFavorite={favorites.some((f) => f.id === cat.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
