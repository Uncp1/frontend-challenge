import styles from './CatState.module.css';

interface Props {
  gif: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function CatState({ gif, message, action }: Props) {
  return (
    <div className={styles.wrapper}>
      <img className={styles.gif} src={gif} alt={message} loading="lazy" />
      <p className={styles.message}>{message}</p>
      {action && (
        <button className={styles.button} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
