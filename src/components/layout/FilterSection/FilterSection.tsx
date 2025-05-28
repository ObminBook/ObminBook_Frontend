import React from 'react';
import styles from './FilterSection.module.scss';
import { useSearchParams } from 'react-router-dom';
import MultiSelectCheckboxContainer from '../../base/checkbox/containers/MultiSelectCheckboxContainer';
import { bookCategories as genres } from '@/resources/bookCategories/bookCategories';
import { CustomSearchParamMultiSelect } from '@/components/base/customSelect/CustomSearchParamMultiSelect/CustomSearchParamMultiSelect';

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
    params.delete('categories');
    params.delete('condition');
    params.delete('exchangeType');

    setSearchParams(params);
  };

  const getCheckedStatus = (type: string, value: string) => {
    return searchParams.getAll(type).includes(value);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <h3 className={styles.title}>Фільтри</h3>
        <button className={styles.resetButton} onClick={handleReset}>
          Очистити все
        </button>
      </div>

      <div className={styles.section}>
        <div className={styles.block}>Жанр</div>
        <div className={styles.items}>
          {/* {genres.map((genre) => (
            <div
              key={genre.value}
              className={styles.item}
              onClick={() => handleCheckboxChange('genres', genre.value)}
            >
              <MultiSelectCheckboxContainer
                isChecked={getCheckedStatus('genres', genre.value)}
                onChange={() => handleCheckboxChange('genres', genre.value)}
              />
              <div className={styles.itemName}>{genre.label}</div>
            </div>
          ))} */}
          <CustomSearchParamMultiSelect
            paramKey="categories"
            options={genres}
            placeholder="Виберіть категорію"
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.block}>Стан</div>
        <div className={styles.items}>
          {states.map((state) => (
            <div
              key={state}
              className={styles.item}
              onClick={() => handleCheckboxChange('states', state)}
            >
              <MultiSelectCheckboxContainer
                isChecked={getCheckedStatus('states', state)}
                onChange={() => handleCheckboxChange('states', state)}
              />
              <div className={styles.itemName}>{state}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.block}>Тип обміну</div>
        <div className={styles.items}>
          {exchangeTypes.map((type) => (
            <div
              key={type}
              className={styles.item}
              onClick={() => handleCheckboxChange('exchangeType', type)}
            >
              <MultiSelectCheckboxContainer
                isChecked={getCheckedStatus('exchangeType', type)}
                onChange={() => handleCheckboxChange('exchangeType', type)}
              />
              <div className={styles.itemName}>{type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
