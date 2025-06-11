import styles from './BookModal.module.scss';
import avatar from '../../../assets/images/common/avatar.svg';
import { useNavigate } from 'react-router-dom';
import coverPlaceholder from '../../../assets/images/cardBook/cardDetails/paliturka.png';
import { useEffect } from 'react';
import { cardIcons } from '../../../assets/images/cardBook/cardDetails';
import { TruncatedText } from '../../base/truncatedText/TruncatedText';
import { Button } from '../../base/button/Button';
import { miniIcons } from '../../../assets/images/miniIcons';
import { Book } from '../../../types/Book';
import { useSelector } from 'react-redux';
import { select } from '@/features/authSlice/authSlice';
import { findCategoryLabel } from '@/resources/bookCategories/bookCategories';
import { findLabelLanguage } from '@/resources/languages/languages';

interface Props {
  onClose: () => void;
  onUserClick: () => void;
  book: Book;
}

export const BookModal: React.FC<Props> = ({ book, onClose, onUserClick }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(select.loginStatus) === 'authenticated';
  const user = useSelector(select.user);
  const isUsersBook = user?.id === book.owner.id;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles['book-modal']}>
      <div className={styles['book-modal__content']}>
        <div className={styles['book-modal__imgContainer']}>
          <img
            className={
              book.coverImage === 'NOT FOUND'
                ? styles['book-modal__mockedImg']
                : styles['book-modal__img']
            }
            src={book.coverImage === 'NOT FOUND' ? coverPlaceholder : book.coverImage}
            alt="Обкладинка тимчасово недоступна"
          />
          {isUsersBook && (
            <div className={styles.yourBook}>
              <div className={styles.yourBook__imgContainer}>
                <img
                  className={styles.yourBook__img}
                  src={miniIcons.yourbook}
                  alt="yourbook"
                />
              </div>
              <div className={styles.yourBook__text}>{`Ваша книжка`}</div>
            </div>
          )}
        </div>

        <div className={styles['book-modal__info']}>
          <div
            className={styles['book-modal__info-scroll-container']}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles['book-modal__close']} onClick={onClose}>
              <img
                src={miniIcons.closeIcon}
                alt="close-modal"
                className={styles['book-modal__close-img']}
              />
            </button>
            <h2 className={styles['book-modal__title']}>{book.title}</h2>
            <p className={styles['book-modal__author']}>{book.author}</p>
            <div className={styles['book-modal__tags']}>
              <div className={styles['book-modal__tag']}>
                <img
                  className={styles['book-modal__tag-icon']}
                  src={cardIcons.category}
                  alt="categoryIcon"
                />
                {findCategoryLabel(book.categoryName)}
              </div>
              <div className={styles['book-modal__tag']}>
                <img
                  className={styles['book-modal__tag-icon']}
                  src={cardIcons.condition}
                  alt="conditionIcon"
                />
                {book.condition}
              </div>
              <div className={styles['book-modal__tag']}>
                <img
                  className={styles['book-modal__tag-icon']}
                  src={cardIcons.exchange}
                  alt="exchangeIcon"
                />
                {book.exchangeType}
              </div>
            </div>
            <div className={styles['book-modal__description']}>
              <div className={styles['book-modal__description-title']}>Опис</div>
              {book.description ? (
                book.description.length < 150 ? (
                  <p>{book.description}</p>
                ) : (
                  <TruncatedText text={book.description} />
                )
              ) : (
                <p>Власник ще не додав опис до цієї книги</p>
              )}
            </div>

            <div className={styles['book-modal__details-title']}>Характеристики</div>
            <div className={styles['book-modal__details']}>
              <div className={styles['book-modal__detail']}>
                <img
                  className={styles['book-modal__detail-img']}
                  src={cardIcons.imgReleaseDate}
                  alt="realeaseImg"
                />
                Рік видання: {book.publishedYear || '-'}
              </div>
              <div className={styles['book-modal__detail']}>
                <img
                  className={styles['book-modal__detail-img']}
                  src={cardIcons.city}
                  alt="realeaseImg"
                />
                {book.owner?.city || 'Місто не вказано'}
              </div>
              <div className={styles['book-modal__detail']}>
                <img
                  className={styles['book-modal__detail-img']}
                  src={cardIcons.imgPages}
                  alt="realeaseImg"
                />
                Сторінок: {book.numberOfPages || '-'}
              </div>
              <div className={styles['book-modal__detail']}>
                <img
                  className={styles['book-modal__detail-img']}
                  src={cardIcons.imgLanguage}
                  alt="realeaseImg"
                />
                {findLabelLanguage(book.language) || 'Українська'}
              </div>
            </div>
            <div className={styles['book-modal__owner']} onClick={onUserClick}>
              <div className={styles['book-modal__owner-title']}>Власник</div>
              <div className={styles['book-modal__owner-container']}>
                <img
                  className={styles['book-modal__owner-img']}
                  src={book.owner.profilePicture || avatar}
                  alt="Author"
                />
                <div>
                  <div className={styles['book-modal__owner-name-location']}>
                    <div className={styles['book-modal__owner-name']}>
                      {book.owner.firstName + ' ' + book.owner.lastName || 'Ігор Барбан'}
                    </div>
                    <p className={styles['book-modal__owner-location']}>
                      {book.owner.city || 'Київ'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {isAuthenticated ? (
              <div className={styles['book-modal__actions']}>
                <div className={styles['book-modal__save-exchange-box']}>
                  <div className={styles['book-modal__save']}>
                    <Button
                      _buttonVariant="blueTransparent"
                      _name="Зберегти"
                      _fontSize="bold"
                      _icon={miniIcons.buttHeartBlue}
                      _type="button"
                      _iconPosition="left"
                      _disabled={isUsersBook}
                    />
                  </div>
                  <div className={styles['book-modal__exchange']}>
                    <Button
                      _buttonVariant="blue"
                      _name="Запропонувати обмін"
                      _fontSize="bold"
                      _icon={miniIcons.buttObmin}
                      _type="button"
                      _iconPosition="left"
                      _disabled={isUsersBook}
                    />
                  </div>
                </div>

                <div className={styles['book-modal__copy']}>
                  <Button
                    _buttonVariant="transparentNoBorder"
                    _name="Скопіювати посилання на книгу"
                    _fontSize="bold"
                    _icon={miniIcons.buttSaveLink}
                    _type="button"
                    _iconPosition="left"
                  />
                </div>
              </div>
            ) : (
              <div
                className={`${styles['book-modal__auth-prompt']} ${styles['auth-prompt']}`}
              >
                <p className={styles['auth-prompt__description']}>
                  Увійдіть або зареєструйтеся, щоб зберегти книгу, запропонувати обмін або
                  переглядати профіль
                </p>
                <div
                  onClick={() => navigate('/login')}
                  className={styles['auth-prompt__button']}
                >
                  <Button
                    _buttonVariant="blue"
                    _name="Увійти / Зареєструватися"
                    _fontSize="bold"
                    _type="button"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
