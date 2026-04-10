import type { CatImage } from '../../types/cats';
import HeartIcon from '../icons/HeartIcon';
import styles from './CatCard.module.css';

interface Props {
  cat: CatImage;
  isFavorite: boolean;
  onToggleFavorite: (cat: CatImage) => void;
}

export default function CatCard({ cat, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={cat.url} alt={cat.id} />
      <button
        className={`${styles.button} ${isFavorite ? styles.active : ''}`}
        onClick={() => onToggleFavorite(cat)}
        aria-label={
          isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
        }
      >
        <HeartIcon filled={isFavorite} />
      </button>
    </div>
  );
}
