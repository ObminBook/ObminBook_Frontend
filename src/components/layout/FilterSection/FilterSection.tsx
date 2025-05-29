import React from 'react';
import styles from './FilterSection.module.scss';
import { miniIcons } from '@/assets/images/miniIcons';
import { useSelector } from 'react-redux';
import {
  select,
  setCondition,
  setType,
} from '@/features/bookSearchSlice/bookSearchSlice';
import { dispatch } from '@/reduxStore/store';
import { CustomCategorySelect } from '@/components/base/customSelect/CustomSearchParamMultiSelect/CustomCategorySelect';
import { Button } from '@/components/base/button/Button';

const conditions = ['Як нова', 'Дуже добра', 'Добра', 'Прийнятна'];
const exchangeTypes = ['Особисто', 'По пошті', 'Будь-який спосіб'];

const FilterSection: React.FC = () => {
  const selectedCondition = useSelector(select.condition);
  const selectedType = useSelector(select.exchangeType);

  return (
    <div className={styles.container}>
      <div className={styles.clearButton}>
        <Button _name="Очистити" _buttonVariant="blueTransparent" _fontSize="bold" />
      </div>
      <div className={styles.filters}>
        <h3 className={styles.block}>Категорії</h3>
        <div className={styles.category}>
          <CustomCategorySelect placeholder="Виберіть категорії" />
        </div>
      </div>
      <div className={styles.filters}>
        <div className={styles.section}>
          <div className={`${styles.block} ${styles.block_condition}`}>Стан</div>
          <div className={styles.items}>
            {conditions.map((condition) => (
              <div
                key={condition}
                className={`${styles.item} ${
                  selectedCondition.includes(condition) && styles.item_active
                }`}
                onClick={() => dispatch(setCondition(condition))}
              >
                <div className={styles.item__name}>{condition}</div>
                <img
                  src={
                    selectedCondition.includes(condition)
                      ? miniIcons.checkboxChecked
                      : miniIcons.checkboxUnchecked
                  }
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={`${styles.block} ${styles.block_excType}`}>Тип обміну</div>
          <div className={styles.items}>
            {exchangeTypes.map((type) => (
              <div
                key={type}
                className={`${styles.item} ${
                  selectedType.includes(type) && styles.item_active
                }`}
                onClick={() => dispatch(setType(type))}
              >
                <div className={styles.item__name}>{type}</div>
                <img
                  src={
                    selectedType.includes(type)
                      ? miniIcons.checkboxChecked
                      : miniIcons.checkboxUnchecked
                  }
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
