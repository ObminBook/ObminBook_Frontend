import React from 'react';
import styles from './FilterSection.module.scss';
import { useSearchParams } from 'react-router-dom';
import MultiSelectCheckboxContainer from '../../3_SmallComponents/Checkbox/containers/MultiSelectCheckboxContainer';

const genresFromServer = [
  'Фантастика',
  'Художня література',
  'Історія',
  'Мемуари',
  'Детективи',
  'Психологія',
  'Наукова фантастика',
  'Саморозвиток',
];
const states = ['Як нова', 'Дуже добра', 'Добра', 'Прийнятна'];
const exchangeTypes = ['Особисто', 'По пошті', 'Будь-який спосіб'];

const FilterSection: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (type: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentValues = newParams.getAll(type);

    if (currentValues.includes(value)) {
      newParams.delete(type, value);
    } else {
      newParams.append(type, value);
    }

    setSearchParams(newParams);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('genres');
    params.delete('states');
    params.delete('exchangeType');

    setSearchParams(params);
  };

  const getCheckedStatus = (type: string, value: string) => {
    return searchParams.getAll(type).includes(value);
  };

  return (
    <div className={styles.filters}>
      <div className={styles['filters__header']}>
        <h3 className={styles.filters__title}>Фільтри</h3>
        <button className={styles.filters__resetButton} onClick={handleReset}>
          Очистити все
        </button>
      </div>

      <div className={styles.filters__section}>
        <div className={styles['filters__block']}>Жанр</div>
        <div className={styles.filters__items}>
          {genresFromServer.map((genre) => (
            <div
              key={genre}
              className={styles.filters__item}
              onClick={() => handleCheckboxChange('genres', genre)}
            >
              <MultiSelectCheckboxContainer
                isChecked={getCheckedStatus('genres', genre)}
                onChange={() => handleCheckboxChange('genres', genre)}
              />
              <div className={styles['filters__item-name']}>{genre}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filters__section}>
        <div className={styles['filters__block']}>Стан</div>
        <div className={styles.filters__items}>
          {states.map((state) => (
            <div
              key={state}
              className={styles.filters__item}
              onClick={() => handleCheckboxChange('states', state)}
            >
              <MultiSelectCheckboxContainer
                isChecked={getCheckedStatus('states', state)}
                onChange={() => handleCheckboxChange('states', state)}
              />
              <div className={styles['filters__item-name']}>{state}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filters__section}>
        <div className={styles['filters__block']}>Тип обміну</div>
        <div className={styles.filters__items}>
          {exchangeTypes.map((type) => (
            <div
              key={type}
              className={styles.filters__item}
              onClick={() => handleCheckboxChange('exchangeType', type)}
            >
              <MultiSelectCheckboxContainer
                isChecked={getCheckedStatus('exchangeType', type)}
                onChange={() => handleCheckboxChange('exchangeType', type)}
              />
              <div className={styles['filters__item-name']}>{type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
