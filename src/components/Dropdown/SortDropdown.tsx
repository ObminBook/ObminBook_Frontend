import React, { use, useState } from 'react';
import styles from './SortDropdown.module.scss';
import arrowUp from '../../assets/images/card_imgs/SortDropdown/up.svg';
import arrowDown from '../../assets/images/card_imgs/SortDropdown/down.svg';
import selectedImg from '../../assets/images/card_imgs/SortDropdown/checked.svg';
import useClickOutside from '../../hooks/useClickOutside';

const options = ['Релевантність', 'Відстань', 'Стан'];

type Props = {
  onChange: (value: string) => void;
};

export const SortDropdown: React.FC<Props> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const dropDownRef = useClickOutside(() => setIsOpen(false));

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option); // 🔥 відправляємо значення вгору
  };

  return (
    <div className={styles['sort-dropdown']}>
      <button
        className={styles['sort-dropdown__toggle']}
        onClick={toggleDropdown}
      >
        {selected}
        <div className={styles['sort-dropdown__icon']}>
          {isOpen ? (
            <img
              src={arrowUp}
              className={styles['sort-dropdown__img']}
              alt="up"
            />
          ) : (
            <img
              src={arrowDown}
              className={styles['sort-dropdown__img']}
              alt="down"
            />
          )}
        </div>
      </button>

      {isOpen && (
        <ul ref={dropDownRef} className={styles['sort-dropdown__list']}>
          {options.map((option) => (
            <li
              key={option}
              className={
                option === selected
                  ? styles['sort-dropdown__item--selected']
                  : styles['sort-dropdown__item']
              }
              onClick={() => handleSelect(option)}
            >
              <div className={styles['sort-dropdown__imgContainer']}>
                {option === selected && (
                  <img
                    className={styles['sort-dropdown__img']}
                    src={selectedImg}
                    alt="selectedImg"
                  />
                )}
              </div>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
