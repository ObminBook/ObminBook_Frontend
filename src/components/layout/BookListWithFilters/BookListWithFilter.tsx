import { useSelector } from 'react-redux';

import styles from './BookListWithFilter.module.scss';
import { SearchQueryContainer } from '../../widgets/searchQuery/containers/SearchQueryContainer';
import { BookCard } from '@/components/base/bookCards/BookCard/BookCard';
import {
  clearBooks,
  searchBooks,
  select,
  setNextPage,
} from '@/features/bookSearchSlice/bookSearchSlice';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { useInView } from 'react-intersection-observer';
import { SearchBooksRequest } from '@/types/Book';
import { bookCategories as genres } from '../../../resources/bookCategories/bookCategories';

const BookListWithFilters = () => {
  const dispatch = useAppDispatch();
  const books = useSelector(select.books);
  const hasNext = useSelector(select.hasNext);
  const areBooksLoading = useSelector(select.booksLoadingState) === 'pending';

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
    console.log('searching new books');

    dispatch(searchBooks(filterParams));
  }, [page]);

  useEffect(() => {
    dispatch(clearBooks());

    dispatch(searchBooks(filterParams));
  }, [titleAndAuthor, categories, exchangeType, condition, sort]);

  return (
    <div className={styles.bookList}>
      <div className={styles.search}>
        <div className={styles.searchContainer}>
          <div className={styles.searchContainer__input}>
            <SearchQueryContainer placeholder="Пошук у результатах" />
          </div>
        </div>
        {/* <div className={styles.sort}>
          <span className={styles.sortTitle}>Сортувати за:</span>
          <SortDropdown />
        </div> */}
      </div>

      <div className={styles.container}>
        {books.map((book, index) => {
          return (
            <div key={book.id} className={styles.bookWrapper}>
              <BookCard book={book} ref={index === books.length - 1 ? ref : null} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookListWithFilters;
