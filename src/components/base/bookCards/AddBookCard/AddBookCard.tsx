// BookCard component
import styles from './AddBookCard.module.scss';
import { useHover } from '../../../../hooks/useHover';
import { cardIcons } from '../../../../assets/images/cardBook/cardDetails';
import { AddBookForm_Portal } from '../../../modals/AddBookForm/AddBookForm_Portal';
import { useState } from 'react';
import { AddCityPortal } from '../../../modals/AddCity/AddCity_Portal';
import { select } from '@/features/authSlice/authSlice';
import { useSelector } from 'react-redux';

const AddBookCard = () => {
  const { ref, isHovered } = useHover();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCityForm, setShowCityForm] = useState(false);

  const user = useSelector(select.user);
  const mockedBookLength = 1;

  const handleCardClick = () => {
    // if (!user?.city) {
    //   setShowCityForm(true);
    //   return;
    // }

    if (mockedBookLength) {
      setShowAddForm(true);
    }
  };

  return (
    <div className={styles.bookCard} ref={ref} onClick={handleCardClick}>
      {showAddForm && !showCityForm && (
        <AddBookForm_Portal
          onClose={() => {
            setShowAddForm(false);
          }}
        />
      )}

      {showCityForm && <AddCityPortal onClose={() => setShowCityForm(false)} />}
      <div className={styles.face}>
        <img
          className={styles.plusImg}
          src={isHovered ? cardIcons.plusButton : cardIcons.plusButtonBlue}
        />
        <p className={styles.desc}>Завантажити книгу</p>
      </div>

      <div className={styles.info}>
        <p className={styles.info_addNew}>Додати нову книгу</p>
        <p className={styles.info_desc}>Поділіться книгою для обміну</p>
      </div>
    </div>
  );
};

export default AddBookCard;
