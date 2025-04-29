import styles from './BookModal.module.scss';
import closeIcon from '../../../assets/images/all_imgs/modal/close_icon.svg';
import avatar from '../../../assets/images/all_imgs/common/avatar.svg';
import { useNavigate } from 'react-router-dom';
import coverPlaceholder from '../../../assets/images/all_imgs/cardBook/cardDetails/paliturka.png';
import { useEffect } from 'react';
import { cardIcons } from '../../../assets/images/all_imgs/cardBook/cardDetails';
import { TruncatedText } from '../../2_MiddleComponents/TruncatedText/TruncatedText';
import { Button } from '../../3_SmallComponents/Button/views/Button';
import { buttonIcons } from '../../../assets/images/all_imgs/buttonIcons';
import { Book } from '../../../types/Book';

interface Props {
  onClose: () => void;
  book: Book;
}

export const BookModal: React.FC<Props> = ({ book, onClose }) => {
  const navigate = useNavigate();

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
        <div className={styles['book-modal__cover']}>
          <img src={coverPlaceholder} alt="Обкладинка тимчасово недоступна" />
        </div>

        <div className={styles['book-modal__info']}>
          <div
            className={styles['book-modal__info-scroll-container']}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles['book-modal__close']} onClick={onClose}>
              <img
                src={closeIcon}
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
                {book.categoryName}
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
              <div className={styles['book-modal__description-title']}>
                Опис
              </div>
              <TruncatedText
                text={
                  'У захопливій подорожі крізь час і простір герой намагається розгадати таємниці минулого, борючись із внутрішніми демонами та зовнішніми ворогами. Це глибока історія про вибір, самопізнання та силу надії, що змінює долі цілих поколінь.Ця книжка — захоплива історія про людину, яка вирушає в подорож, щоб знайти відповіді на питання, що мучили її все життя. Розгадуючи таємниці свого походження, герой проходить крізь випробування, зустрічає несподіваних союзників і ворогів. Події розгортаються на тлі мальовничих краєвидів, де кожен крок відкриває новий пласт правди. Це не просто пригодницький роман — це глибоке дослідження людської душі, сили вибору та тіні минулого, яка впливає на майбутнє. Історія зачіпає теми втрат, прощення та сили мрії, яка може змінити все.'
                }
              />
            </div>
            <div className={styles['book-modal__details-title']}>
              Характеристики
            </div>
            <div className={styles['book-modal__details']}>
              <div className={styles['book-modal__detail']}>
                <img
                  className={styles['book-modal__detail-img']}
                  src={cardIcons.imgReleaseDate}
                  alt="realeaseImg"
                />
                Рік видання: {book.realeaseDate || '2025'}
              </div>
              <div className={styles['book-modal__detail']}>
                <img
                  className={styles['book-modal__detail-img']}
                  src={cardIcons.city}
                  alt="realeaseImg"
                />
                {book.city}
              </div>
              <div className={styles['book-modal__detail']}>
                <img
                  className={styles['book-modal__detail-img']}
                  src={cardIcons.imgPages}
                  alt="realeaseImg"
                />
                Сторінок: {book.pages || '228'}
              </div>
              <div className={styles['book-modal__detail']}>
                <img
                  className={styles['book-modal__detail-img']}
                  src={cardIcons.imgLanguage}
                  alt="realeaseImg"
                />
                {book.language || 'Українська'}
              </div>
            </div>
            <div className={styles['book-modal__owner']}>
              <div className={styles['book-modal__owner-title']}>Власник</div>
              <div className={styles['book-modal__owner-container']}>
                <img
                  className={styles['book-modal__owner-img']}
                  src={avatar}
                  alt="Марія Петренко"
                />
                <div>
                  <div className={styles['book-modal__owner-name-location']}>
                    <div className={styles['book-modal__owner-name']}>
                      {book.ownerName || 'Ігор Барбан'}
                    </div>
                    <p className={styles['book-modal__owner-location']}>
                      Київ, Україна
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {false && (
              <div className={styles['book-modal__actions']}>
                <div className={styles['book-modal__save-exchange-box']}>
                  <div className={styles['book-modal__save']}>
                    <Button
                      _buttonColor="blueTransparent"
                      _name="Зберегти"
                      _fontSize="bold"
                      _icon={buttonIcons.buttHeartBlue}
                      _type="button"
                      _iconPosition="left"
                    />
                  </div>
                  <div className={styles['book-modal__exchange']}>
                    <Button
                      _buttonColor="blue"
                      _name="Запропонувати обмін"
                      _fontSize="bold"
                      _icon={buttonIcons.buttObmin}
                      _type="button"
                      _iconPosition="left"
                    />
                  </div>
                </div>

                <div className={styles['book-modal__copy']}>
                  <Button
                    _buttonColor="transparentNoBorder"
                    _name="Скопіювати посилання на книгу"
                    _fontSize="bold"
                    _icon={buttonIcons.buttSaveLink}
                    _type="button"
                    _iconPosition="left"
                  />
                </div>
              </div>
            )}
            {true && (
              <div
                className={`${styles['book-modal__auth-prompt']} ${styles['auth-prompt']}`}
              >
                <p className={styles['auth-prompt__description']}>
                  Увійдіть або зареєструйтеся, щоб зберегти книгу, запропонувати
                  обмін або переглядати профіль
                </p>
                <div
                  onClick={() => navigate('/login')}
                  className={styles['auth-prompt__button']}
                >
                  <Button
                    _buttonColor="blue"
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
