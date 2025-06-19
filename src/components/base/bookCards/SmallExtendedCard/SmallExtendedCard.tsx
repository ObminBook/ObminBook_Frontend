import styles from './SmallExtendedCard.module.scss';
import coverPlaceholder from '../../../../assets/images/cardBook/cardDetails/paliturka.webp';
import { cardIcons } from '../../../../assets/images/cardBook/cardDetails';
import { Book } from '../../../../types/Book';
import { findCategoryLabel } from '@/resources/bookCategories/bookCategories';
import { findLabelLanguage } from '@/resources/languages/languages';

interface Props {
  book: Book | null;
}

export const SmallExtendedCard: React.FC<Props> = ({ book }) => {
  if (!book) return;

  return (
    <div className={styles['smallExtendedCard']}>
      <div className={styles['smallExtendedCard__content']}>
        <div className={styles['smallExtendedCard__imgContainer']}>
          <img
            className={
              book.coverImage === 'NOT FOUND'
                ? styles['smallExtendedCard__mockedImg']
                : styles['smallExtendedCard__img']
            }
            src={book?.coverImage === 'NOT FOUND' ? coverPlaceholder : book.coverImage}
            alt="Обкладинка тимчасово недоступна"
          />
        </div>

        <div className={styles['smallExtendedCard__info']}>
          <div
            className={styles['smallExtendedCard__info-scroll-container']}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles['smallExtendedCard__title']}>{book.title}</h2>
            <p className={styles['smallExtendedCard__author']}>{book.author}</p>
            <div className={styles['smallExtendedCard__tags']}>
              <div className={styles['smallExtendedCard__tag']}>
                <img
                  className={styles['smallExtendedCard__tag-icon']}
                  src={cardIcons.category}
                  alt="categoryIcon"
                />
                {findCategoryLabel(book.categoryName)}
              </div>
              <div className={styles['smallExtendedCard__tag']}>
                <img
                  className={styles['smallExtendedCard__tag-icon']}
                  src={cardIcons.condition}
                  alt="conditionIcon"
                />
                {book.condition}
              </div>
              <div className={styles['smallExtendedCard__tag']}>
                <img
                  className={styles['smallExtendedCard__tag-icon']}
                  src={cardIcons.exchange}
                  alt="exchangeIcon"
                />
                {book.exchangeType}
              </div>
            </div>

            <div className={styles['smallExtendedCard__details-title']}>
              Характеристики
            </div>
            <div className={styles['smallExtendedCard__details']}>
              <div className={styles['smallExtendedCard__detail']}>
                <img
                  className={styles['smallExtendedCard__detail-img']}
                  src={cardIcons.imgReleaseDate}
                  alt="realeaseImg"
                />
                Рік видання: {book.publishedYear || '-'}
              </div>
              <div className={styles['smallExtendedCard__detail']}>
                <img
                  className={styles['smallExtendedCard__detail-img']}
                  src={cardIcons.city}
                  alt="realeaseImg"
                />
                {book.owner?.city || 'Місто не вказано'}
              </div>
              <div className={styles['smallExtendedCard__detail']}>
                <img
                  className={styles['smallExtendedCard__detail-img']}
                  src={cardIcons.imgPages}
                  alt="realeaseImg"
                />
                Сторінок: {book.numberOfPages || '-'}
              </div>
              <div className={styles['smallExtendedCard__detail']}>
                <img
                  className={styles['smallExtendedCard__detail-img']}
                  src={cardIcons.imgLanguage}
                  alt="realeaseImg"
                />
                {findLabelLanguage(book.language) || 'Українська'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
