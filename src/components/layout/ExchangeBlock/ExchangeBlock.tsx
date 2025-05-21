import styles from './ExchangeBlock.module.scss';
import { miniIcons } from '../../../assets/images/miniIcons';
import { Button } from '../../base/button/Button';
import { useSelector } from 'react-redux';
import { select } from '../../../features/exchangeSlice/exchangeSlice';
import { BookMiniCard } from '../../base/bookCards/BookMiniCard/views/BookMiniCard';
import { AnyBookCard } from '../../base/bookCards/AnyBookCard/AnyBookCard';

export const ExchangeBlock: React.FC = () => {
  const myBookSelected = useSelector(select.myBook);
  const anotherUserBookSelected = useSelector(select.anotherUserBook);
  const anyCardSelected = useSelector(select.anyCard);
  return (
    <div className={styles.exchangeBlock}>
      <h2 className={styles.title}>Обмін</h2>

      <div className={styles.section}>
        <p className={styles.label}>Я віддаю</p>

        <div className={styles.cardContainer}>
          {myBookSelected ? (
            <BookMiniCard
              book={myBookSelected}
              withDeleteButton={true}
              cardType="myCards"
            />
          ) : anyCardSelected ? (
            <AnyBookCard book={anyCardSelected} />
          ) : (
            <button className={styles.selectButton}>
              Виберіть книгу зі свого списку
            </button>
          )}
        </div>
      </div>

      <div className={styles.iconWrapper}>
        <div className={styles.icon}>
          <img src={miniIcons.arrows} alt="Обмін" />
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Я отримую</p>
        <div className={styles.cardContainer}>
          {anotherUserBookSelected ? (
            <BookMiniCard
              book={anotherUserBookSelected}
              withDeleteButton
              cardType="anotherUserCards"
            />
          ) : (
            <button className={styles.selectButton}>
              Виберіть книгу зі списку користувача
            </button>
          )}
        </div>
      </div>

      <div className={styles.submitButton}>
        <Button
          _buttonVariant="blue"
          _name="Запропонувати обмін"
          _type="button"
          _disabled={
            !anotherUserBookSelected || (!myBookSelected && !anyCardSelected)
          }
        />
      </div>
    </div>
  );
};
