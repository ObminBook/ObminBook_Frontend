import React, { useState } from 'react';
import styles from './FilterSection.module.scss';
import MultiSelectCheckboxContainer from '../Checkbox/containers/MultiSelectCheckboxContainer';

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
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedExchangeTypes, setSelectedExchangeTypes] = useState<string[]>(
    []
  );

  const handleCheckboxChange = (type: string, value: string) => {
    let updatedList = [];

    if (type === 'genres') {
      updatedList = selectedGenres.includes(value)
        ? selectedGenres.filter((v) => v !== value)
        : [...selectedGenres, value];
      setSelectedGenres(updatedList);
    } else if (type === 'states') {
      updatedList = selectedStates.includes(value)
        ? selectedStates.filter((v) => v !== value)
        : [...selectedStates, value];
      setSelectedStates(updatedList);
    } else if (type === 'exchangeTypes') {
      updatedList = selectedExchangeTypes.includes(value)
        ? selectedExchangeTypes.filter((v) => v !== value)
        : [...selectedExchangeTypes, value];
      setSelectedExchangeTypes(updatedList);
    }
  };

  return (
    <div className={styles.filters}>
      <h3 className={styles.filters__title}>Фільтри</h3>

      <div className={styles.filters__section}>
        <strong>Жанр</strong>
        <div className={styles.filters__items}>
          {genresFromServer.map((genre) => (
            <div key={genre} className={styles.filters__item}>
              <MultiSelectCheckboxContainer
                isChecked={selectedGenres.includes(genre)}
                onChange={() => handleCheckboxChange('genres', genre)}
              />
              <span>{genre}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filters__section}>
        <strong>Стан</strong>
        <div className={styles.filters__items}>
          {states.map((state) => (
            <div key={state} className={styles.filters__item}>
              <MultiSelectCheckboxContainer
                isChecked={selectedStates.includes(state)}
                onChange={() => handleCheckboxChange('states', state)}
              />
              <span>{state}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filters__section}>
        <strong>Тип обміну</strong>
        <div className={styles.filters__items}>
          {exchangeTypes.map((type) => (
            <div key={type} className={styles.filters__item}>
              <MultiSelectCheckboxContainer
                isChecked={selectedExchangeTypes.includes(type)}
                onChange={() => handleCheckboxChange('exchangeTypes', type)}
              />
              <span>{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
