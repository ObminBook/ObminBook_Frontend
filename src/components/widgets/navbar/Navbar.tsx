import { miniIcons } from '@/assets/images/miniIcons';
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.content}>
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.active}` : styles.item
              }
            >
              <img src={miniIcons.navbarHome} alt="homeIcon" />
              <div className={styles.itemText}>Головна</div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.active}` : styles.item
              }
            >
              <img src={miniIcons.navbarSearch} alt="searchIcon" />
              <div className={styles.itemText}>Книжки</div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.active}` : styles.item
              }
            >
              <img src={miniIcons.navbarProfile} alt="profileIcon" />
              <div className={styles.itemText}>Профіль</div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                isActive ? `${styles.item} ${styles.active}` : styles.item
              }
            >
              <img src={miniIcons.navbarMessage} alt="messageIcon" />
              <div className={styles.itemText}>Повідомлення</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
