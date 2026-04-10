import type { CatImage } from '../../types/cats';

interface Props {
  cat: CatImage;
  isFavorite: boolean;
  onToggleFavorite: (cat: CatImage) => void;
}

export default function CatCard({ cat, isFavorite, onToggleFavorite }: Props) {
  return (
    <div>
      <img src={cat.url} alt={cat.id} />
      <button onClick={() => onToggleFavorite(cat)}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
