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

  const filterParams = useMemo(
    () => ({
      page,
      size,
      titleAndAuthor,
      categories,
      exchangeType,
      condition,
      sort,
    }),
    [page, size, titleAndAuthor, categories, exchangeType, condition, sort]
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Підвантаження нової сторінки
  useEffect(() => {
    if (inView && hasNext && !areBooksLoading) {
      dispatch(setNextPage());
    }
  }, [inView, hasNext, areBooksLoading, dispatch]);

  // Коли змінюються фільтри — очищаємо і встановлюємо сторінку на 0
  useEffect(() => {
    dispatch(clearBooks());
    dispatch(setPage(0));
  }, [titleAndAuthor, categories, exchangeType, condition, sort, dispatch]);

  // Завантаження книжок при зміні параметрів або сторінки
  useEffect(() => {
    dispatch(searchBooks(filterParams));
  }, [filterParams, dispatch]);

  return (
    <div className={styles.bookList}>
      <div className={styles.search}>
        <div className={styles.searchContainer}>
          <div className={styles.searchContainer__input}>
            <SearchQueryContainer placeholder="Пошук у результатах" />
          </div>
          <div className={styles.searchContainer__sort}>
            Сортувати за:
            <CustomSortSelect />
          </div>
        </div>
      </div>

      <div className={styles.showAmount}>
        Показано {books.length} з {totalElements}
      </div>

      <div className={styles.container}>
        {areBooksLoading ? (
          Array.from({ length: size }).map((_, idx) => (
            <BookCardSkeleton key={`full-skeleton-${idx}`} />
          ))
        ) : (
          <>
            {books.map((book, index) => (
              <div
                key={book.id}
                className={styles.bookWrapper}
                ref={index === books.length - 1 ? ref : undefined}
              >
                <BookCard book={book} />
              </div>
            ))}

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
