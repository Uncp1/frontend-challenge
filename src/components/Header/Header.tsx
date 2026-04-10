import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Все котики
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
        >
          Любимые котики
        </NavLink>
      </nav>
    </header>
  );
}
