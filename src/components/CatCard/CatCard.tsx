import { memo } from 'react';

import type { CatImage } from '../../types/cats';
import HeartIcon from '../icons/HeartIcon';
import styles from './CatCard.module.css';

interface Props {
  cat: CatImage;
  isFavorite: boolean;
  onToggleFavorite: (cat: CatImage) => void;
}

export default memo(function CatCard({ cat, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={cat.url}
        alt={`Фото милого котика с id ${cat.id}`}
        loading="lazy"
        decoding="async"
      />
      <button
        type="button"
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
});
