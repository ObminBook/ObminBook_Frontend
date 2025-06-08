import React from 'react';
import styles from './FilterSection.module.scss';
import { miniIcons } from '@/assets/images/miniIcons';
import { useSelector } from 'react-redux';
import {
  clearSearchOption,
  select,
  setCondition,
  setType,
} from '@/features/bookSearchSlice/bookSearchSlice';
import { CustomCategorySelect } from '@/components/base/customSelect/customCategorySelect/CustomCategorySelect';
import { Button } from '@/components/base/button/Button';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';

const conditions = ['Як нова', 'Дуже добра', 'Добра', 'Прийнятна'];
const exchangeTypes = ['Особисто', 'Поштою', 'Будь-який'];

const FilterSection: React.FC = () => {
  const selectedCondition = useSelector(select.condition);
  const selectedType = useSelector(select.exchangeType);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div
        className={styles.clearButton}
        onClick={() => {
          dispatch(clearSearchOption());
        }}
      >
        <Button _name="Очистити" _buttonVariant="blueTransparent" _fontSize="bold" />
      </div>
      <div className={`${styles.filters} ${styles.filters_categories}`}>
        <h3 className={styles.block}>Категорії</h3>
        <div className={styles.category}>
          <CustomCategorySelect placeholder="Виберіть категорії" />
        </div>
      </div>
      <div className={`${styles.filters} ${styles.filters_checkboxes}`}>
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
                onClick={() => {
                  dispatch(setType(type));
                }}
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
