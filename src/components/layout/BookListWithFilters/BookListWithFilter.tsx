import { useSelector } from 'react-redux';

import styles from './BookListWithFilter.module.scss';
import { SearchQueryContainer } from '../../widgets/searchQuery/containers/SearchQueryContainer';
import { BookCard } from '@/components/base/bookCards/BookCard/BookCard';
import {
  clearBooks,
  searchBooks,
  select,
  setNextPage,
  setPage,
} from '@/features/bookSearchSlice/bookSearchSlice';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { useInView } from 'react-intersection-observer';
import { SearchBooksRequest } from '@/types/Book';
import { CustomSortSelect } from '@/components/base/customSelect/customSortSelect/customSortSelect';
import BookCardSkeleton from '@/components/skeletons/BookCardSkeleton';

const BookListWithFilters = () => {
  const dispatch = useAppDispatch();
  const books = useSelector(select.books);
  const hasNext = useSelector(select.hasNext);
  const areBooksLoading = useSelector(select.booksLoadingState) === 'pending';
  const isFetchingNextPage = useSelector(select.isFetchingNextPage);

  const page = useSelector(select.page);
  const size = useSelector(select.size);
  const titleAndAuthor = useSelector(select.titleAndAuthor);
  const categories = useSelector(select.categories);
  const exchangeType = useSelector(select.exchangeType);
  const condition = useSelector(select.condition);
  const sort = useSelector(select.sort);
  const totalElements = useSelector(select.totalElements);

  const filterParams: SearchBooksRequest = useMemo(
    () => ({
      page,
      size,
      titleAndAuthor,
      categories,
      exchangeType,
      condition,
      sort,
      totalElements,
    }),
    [page, size, titleAndAuthor, categories, exchangeType, condition, sort]
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNext && !areBooksLoading) {
      dispatch(setNextPage());
    }
  }, [inView, hasNext, dispatch, areBooksLoading]);

  useEffect(() => {
    dispatch(clearBooks());
    dispatch(setPage(0));
  }, [titleAndAuthor, categories, exchangeType, condition, sort]);

  useEffect(() => {
    dispatch(searchBooks(filterParams));
    console.log(filterParams);
  }, [page, titleAndAuthor, categories, exchangeType, condition, sort]);

  return (
    <div className={styles.bookList}>
      <div className={styles.search}>
        <div className={styles.searchContainer}>
          <div className={styles.searchContainer__input}>
            <SearchQueryContainer placeholder="Пошук у результатах" />
          </div>
          <div className={styles.searchContainer__sort}>
            Сортувати за:
            <CustomSortSelect placeholder="Сортувати за" />
          </div>
        </div>
      </div>

      <div className={styles.showAmount}>
        Показано {books.length} з {totalElements}
      </div>

      <div className={styles.container}>
        {areBooksLoading ? (
          // Показуємо повний скелетон під час початкового завантаження / зміни параметрів
          Array.from({ length: size }).map((_, idx) => (
            <BookCardSkeleton key={`full-skeleton-${idx}`} />
          ))
        ) : (
          <>
            {/* Показуємо вже завантажені книжки */}
            {books.map((book, index) => (
              <div key={book.id} className={styles.bookWrapper}>
                <BookCard book={book} ref={index === books.length - 1 ? ref : null} />
              </div>
            ))}

            {/* Підвантаження наступної сторінки - показуємо скелетон лише для нової партії */}
            {isFetchingNextPage &&
              Array.from({ length: size }).map((_, idx) => (
                <BookCardSkeleton key={`nextpage-skeleton-${idx}`} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BookListWithFilters;
