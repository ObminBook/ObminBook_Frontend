import { miniIcons } from '../../../assets/images/miniIcons';
import { User } from '../../../types/User';
import styles from './TargetUserModal.module.scss';
import avatar from '../../../assets/images/common/avatar.svg';
import { BookCard } from '../../base/bookCards/BookCard/BookCard';

interface Props {
  onClose: () => void;
  targetUser: User;
}

export const TargetUserModal: React.FC<Props> = ({ onClose, targetUser }) => {
  return (
    <div className={styles['targetUser']}>
      <div className={styles['targetUser__content']}>
        <button className={styles['targetUser__close']} onClick={onClose}>
          <img
            src={miniIcons.closeIcon}
            alt="close-modal"
            className={styles['targetUser__close-img']}
          />
        </button>
        <div className={`${styles['owner']} ${styles['targetUser__owner']}`}>
          <div className={styles['owner__container']}>
            <img
              className={styles['owner__img']}
              src={targetUser.avatar || avatar}
              alt="Марія Петренко"
            />
            <div>
              <div className={styles['owner__name-location']}>
                <div className={styles['owner__name']}>
                  {targetUser
                    ? `${targetUser?.firstName} ${targetUser?.lastName}`
                    : 'Піся Камушкін'}
                </div>
                <p className={styles['owner__location']}>
                  {targetUser.city || 'Київ, Україна'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['owner__statisticBlock']}>
          <div className={styles['owner__statisticField']}>
            <h2 className={styles['owner__statisticField-title']}>
              {targetUser.succesfullExchanges || 0}
            </h2>
            <div className={styles['owner__statisticField-info']}>Обмінів</div>
          </div>
          <div className={styles['owner__statisticField']}>
            <h2 className={styles['owner__statisticField-title']}>
              {targetUser.books.length || 0}
            </h2>
            <div className={styles['owner__statisticField-info']}>Книг</div>
          </div>
        </div>
        {/* {targetUser.about && (
          <div className={styles['targetUser__about']}>
            <h5 className={styles['targetUser__aboutTitle']}></h5>
          </div> // Якщо тут зʼявиться about про юзера
        )} */}

        <div className={styles['targetUser__books']}>
          <h5 className={styles['targetUser__booksTitle']}>
            Книги користувача
          </h5>
          <div className={styles['targetUser__booksList']}>
            {targetUser.books.map((book) => {
              return <BookCard book={book} key={book.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
