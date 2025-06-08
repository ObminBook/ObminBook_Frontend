// BookCard component
import styles from './AddBookCard.module.scss';
import { useHover } from '../../../../hooks/useHover';
import { cardIcons } from '../../../../assets/images/cardBook/cardDetails';
import { useState } from 'react';
import { select } from '@/features/authSlice/authSlice';
import { useSelector } from 'react-redux';
import { AddBookForm_Portal } from '@/components/modals/AddBookForm/AddBookForm_Portal';
import { AddCityPortal } from '@/components/modals/AddCity/AddCity_Portal';

interface Props {
  isCard?: boolean;
}

const AddBookCard: React.FC<Props> = ({ isCard = false }) => {
  const { hoverRef, isHovered } = useHover();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCityForm, setShowCityForm] = useState(false);

  const user = useSelector(select.user);

  const handleCardClick = () => {
    if (!user?.city) {
      setShowCityForm(true);
      return;
    } else {
      setShowAddForm(true);
    }
  };

  return (
    <div className={styles.bookCard} ref={hoverRef} onClick={handleCardClick}>
      {showAddForm && !showCityForm && (
        <AddBookForm_Portal
          onClose={() => {
            setShowAddForm(false);
          }}
        />
      )}

      {showCityForm && <AddCityPortal onClose={() => setShowCityForm(false)} />}
      {isCard ? (
        <>
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
        </>
      ) : (
        <div className={styles.exchange__face}>
          <img
            className={styles.exchange__plusImg}
            src={isHovered ? cardIcons.plusButton : cardIcons.plusButtonBlue}
          />
          <p className={styles.exchange__desc}>Завантажити книгу</p>
        </div>
      )}
    </div>
  );
};

export default AddBookCard;
