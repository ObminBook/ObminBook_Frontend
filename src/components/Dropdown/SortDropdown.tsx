import React, { useEffect, useState } from 'react';
import styles from './SortDropdown.module.scss';
import arrowUp from '../../assets/images/card_imgs/SortDropdown/up.svg';
import arrowDown from '../../assets/images/card_imgs/SortDropdown/down.svg';
import selectedImg from '../../assets/images/card_imgs/SortDropdown/checked.svg';
import useClickOutside from '../../hooks/useClickOutside';
import { SetURLSearchParams } from 'react-router-dom';

// Оптимізована типізація
type SortOption = 'newest' | 'title' | 'random';

const sortOptions = [
  { label: 'Нові оголошення', value: 'newest' },
  { label: 'За назвою', value: 'title' },
  { label: 'Випадково', value: 'random' },
];

type Props = {
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
};

export const SortDropdown: React.FC<Props> = ({
  setSearchParams,
  searchParams,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useClickOutside(() => setIsOpen(false));

  // Визначаємо вибрану опцію лише один раз
  const selected = searchParams.get('sort') as SortOption | null;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Функція для зміни параметрів сортування
  const handleSortChange = (sort: SortOption) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('sort', sort);
      return newParams;
    });
  };

  // Ініціалізація значення по замовчуванню, якщо воно не встановлено
  useEffect(() => {
    if (!selected) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('sort', 'newest');
        return params;
      });
    }
  }, [selected, setSearchParams]);

  // Функція для рендеру вибраної опції
  const getSelectedLabel = () => {
    const option = sortOptions.find((el) => el.value === selected);
    return option ? option.label : 'Не вибрано';
  };

  return (
    <div className={styles['sort-dropdown']}>
      <button
        className={styles['sort-dropdown__toggle']}
        onClick={toggleDropdown}
      >
        {getSelectedLabel()}
        <div className={styles['sort-dropdown__icon']}>
          <img
            src={isOpen ? arrowUp : arrowDown}
            className={styles['sort-dropdown__img']}
            alt={isOpen ? 'up' : 'down'}
          />
        </div>
      </button>

      {isOpen && (
        <ul ref={dropDownRef} className={styles['sort-dropdown__list']}>
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className={
                option.value === selected
                  ? styles['sort-dropdown__item--selected']
                  : styles['sort-dropdown__item']
              }
              onClick={() => handleSortChange(option.value as SortOption)}
            >
              <div className={styles['sort-dropdown__imgContainer']}>
                {option.value === selected && (
                  <img
                    className={styles['sort-dropdown__img']}
                    src={selectedImg}
                    alt="selectedImg"
                  />
                )}
              </div>
              {option.value === 'title'
                ? `${option.label} (А-Я)`
                : option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
