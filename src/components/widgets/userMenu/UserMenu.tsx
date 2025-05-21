import React, { useState } from 'react';
import styles from './UserMenu.module.scss';
import { useNavigate } from 'react-router-dom';
import avatarPlaceholder from '../../../assets/images/common/avatar.svg';
import useClickOutside from '../../../hooks/useClickOutside';
import { userMenuIcons } from '../../../assets/images/userMenu';
import { useSelector } from 'react-redux';
import { logout, select } from '@/features/authSlice/authSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  const user = useSelector(select.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      label: 'Профіль',
      icon: <img src={userMenuIcons.iconUserProfile} alt="iconProfile" />,
      onClick: () => navigate('/profile/my'),
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
      onClick: () => navigate('/personal'),
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
