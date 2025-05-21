import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './BookListWithFilter.module.scss';
import { useInView } from 'react-intersection-observer';
import { BookSearchResponse } from '../../../types/BookSearchResponse';
import { getMockBooksByPage } from '../../../books/books';
import SortDropdown from '../../widgets/dropdown/containers/SortDropdown';
import { SearchQueryContainer } from '../../widgets/searchQuery/containers/SearchQueryContainer';
import { BookCard } from '../../base/bookCards/BookCard/BookCard';

const DEFAULT_PAGE_SIZE = 6;

const BookListWithFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<BookSearchResponse['content']>([]);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });

  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || DEFAULT_PAGE_SIZE);

  const genre = searchParams.get('genre') || '';
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  // Фетч книжок
  const fetchBooks = async (pageToLoad: number) => {
    setIsLoading(true);
    try {
      const data = getMockBooksByPage(pageToLoad, pageSize); // тут можна підключити реальний API
      setBooks((prev) =>
        pageToLoad === 1 ? data.content : [...prev, ...data.content]
      );
      setHasNext(data.hasNext);
    } catch (error) {
      console.error('Помилка завантаження:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Завантажити першу сторінку при зміні фільтрів
  useEffect(() => {
    setBooks([]);
    setHasNext(true);
    setSearchParams((params) => {
      params.set('page', '1');
      params.set('pageSize', pageSize.toString());
      return params;
    });
    fetchBooks(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, sort, query]);

  // Lazy loading наступних сторінок
  useEffect(() => {
    if (inView && hasNext && !isLoading) {
      const nextPage = page + 1;
      setSearchParams((params) => {
        params.set('page', nextPage.toString());
        return params;
      });
      fetchBooks(nextPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className={styles.bookList}>
      <div className={styles.search}>
        <div className={styles.searchContainer}>
          <SearchQueryContainer
            placeholder="Пошук у результатах"
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>

        <div className={styles.sort}>
          <span className={styles.sortTitle}>Сортувати за:</span>
          <SortDropdown
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>

      <div className={styles.showed}>Показано {books.length} книг</div>

      <div className={styles.container}>
        {books.map((book, index) => {
          const isLast = index === books.length - 1;
          return (
            <div
              key={book.id || `${book.title}-${index}`}
              ref={isLast ? ref : null}
              className={styles.bookWrapper}
            >
              <BookCard book={book} />
            </div>
          );
        })}
      </div>

      {isLoading && <div className={styles.loading}>Завантаження...</div>}
      {!hasNext && books.length > 0 && (
        <div className={styles.endText}>Усі книжки завантажено </div>
      )}
    </div>
  );
};

export default BookListWithFilters;
