import { miniIcons } from '../../../assets/images/miniIcons';
import styles from './TargetUserModal.module.scss';
import avatar from '../../../assets/images/common/avatar.svg';
import { BookCard } from '../../base/bookCards/BookCard/BookCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  clearTargetUser,
  getTargetUser,
  select,
} from '@/features/manageBookSlice/manageBookSlice';
import { dispatch } from '@/reduxStore/store';

interface Props {
  onClose: () => void;
  targetUserId: number;
}

export const TargetUserModal: React.FC<Props> = ({ onClose, targetUserId }) => {
  const targetUser = useSelector(select.targetUser);

  useEffect(() => {
    dispatch(getTargetUser(String(targetUserId)));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        dispatch(clearTargetUser());
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles['targetUser']}>
      <div className={styles['targetUser__content']}>
        <button
          className={styles['targetUser__close']}
          onClick={() => {
            onClose();
            clearTargetUser();
          }}
        >
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
              src={targetUser?.user.profilePicture || avatar}
              alt="Марія Петренко"
            />
            <div>
              <div className={styles['owner__name-location']}>
                <div className={styles['owner__name']}>
                  {targetUser
                    ? `${targetUser.user.firstName} ${targetUser.user.lastName}`
                    : 'Невідоми користувач'}
                </div>
                <p className={styles['owner__location']}>
                  {targetUser?.user.city || 'Київ, Україна'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['owner__statisticBlock']}>
          <div className={styles['owner__statisticField']}>
            <h2 className={styles['owner__statisticField-title']}>{0}</h2>
            <div className={styles['owner__statisticField-info']}>Обмінів</div>
          </div>
          <div className={styles['owner__statisticField']}>
            <h2 className={styles['owner__statisticField-title']}>
              {0}{' '}
              {
                // ТУТ ТРЕБА ДОДАТИ КІЛЬКІСТЬ УСПІШНИХ ОБМІНІВ ЗАМІСТЬ 0
              }
            </h2>
            <div className={styles['owner__statisticField-info']}>Книг</div>
          </div>
        </div>

        <div className={styles['targetUser__books']}>
          <h5 className={styles['targetUser__booksTitle']}>Книги користувача</h5>
          <div className={styles['targetUser__booksList']}>
            {targetUser?.books?.content?.map((book) => {
              return <BookCard book={book} key={book.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
