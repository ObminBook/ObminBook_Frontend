import React, { useState } from 'react';
import styles from './UserMenu.module.scss';
import { useNavigate } from 'react-router-dom';
import avatarPlaceholder from '../../../assets/images/all_imgs/common/avatar.svg';
import useClickOutside from '../../../hooks/useClickOutside';
import { userMenuIcons } from '../../../assets/images/all_imgs/userMenu';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const handleLogout = () => {
    console.log('Logging out...');
    // Додай свою логіку логауту тут
  };

  const menuItems = [
    {
      label: 'Профіль',
      icon: <img src={userMenuIcons.iconUserProfile} alt="iconProfile" />,
      onClick: () => navigate('/profile'),
    },
    {
      label: 'Повідомлення',
      icon: <img src={userMenuIcons.iconSendMessage} alt="iconMessage" />,
      onClick: () => navigate('/messages'),
    },
    {
      label: 'Підтримка',
      icon: <img src={userMenuIcons.iconSupport} alt="iconSupport" />,
      onClick: () => navigate('/support'),
    },
    {
      label: 'Налаштування',
      icon: <img src={userMenuIcons.iconConfiguration} alt="iconConfig" />,
      onClick: () => navigate('/settings'),
    },
    {
      label: 'Вийти з акаунту',
      icon: <img src={userMenuIcons.iconLogout} alt="iconLogout" />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <div ref={dropdownRef} className={styles['user-menu']}>
      <div
        className={styles['user-menu__trigger']}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          className={styles['user-menu__avatar']}
          src={avatarPlaceholder}
          alt="Avatar"
        />
        <div className={styles['user-menu__username']}>Олександр Петренко</div>
      </div>

      {isOpen && (
        <div className={styles['user-menu__dropdown']}>
          <ul className={styles['user-menu__list']}>
            {menuItems.map(({ label, icon, onClick, danger }) => (
              <li
                key={label}
                className={`${styles['user-menu__item']} ${
                  danger ? styles['user-menu__item--danger'] : ''
                }`}
                onClick={onClick}
              >
                <div className={styles['user-menu__icon']}>{icon}</div>
                <span className={styles['user-menu__label']}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
