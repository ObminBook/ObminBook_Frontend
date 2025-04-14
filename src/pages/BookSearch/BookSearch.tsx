import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import FilterSection from '../../components/FilterSection/FilterSection';
import { BookCard } from '../../components/BookCard/BookCard';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './BookSearch.module.scss';
import { Book } from '../../types/Book';
import { fetchBooksFromServer } from '../../services/api';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { SearchQuery } from '../../components/SearchQuery/SearchQuery';
import { useSearchParams } from 'react-router-dom';
import { SortDropdown } from '../../components/Dropdown/SortDropdown';

const initialValues = {
  genres: {},
  states: {},
  exchangeType: {},
};

const BookListWithFilters: React.FC = () => {
  const { values } = useFormikContext<typeof initialValues>();
  const debouncedFilters = useDebounce(values, 500);

  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const fetchBooks = async (filters: any, page: number) => {
    setIsLoading(true);

    // Дочікуємось виконання Promise
    const result = await fetchBooksFromServer();

    if (page === 1) {
      setBooks(result); // Тут result вже масив книг
    } else {
      setBooks((prev) => [...prev, ...result]); // Додаємо нові книги до існуючих
    }

    setHasMore(result.length > 0); // Перевірка, чи є ще книги
    setIsLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchBooks(debouncedFilters, 1);
  }, [debouncedFilters]);

  useEffect(() => {
    if (page > 1) {
      fetchBooks(debouncedFilters, page);
    }
  }, [page]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <div className={styles['bookList']}>
      <div className={styles['bookList__search']}>
        <SearchQuery />
        <div className={styles['bookList__sort']}>
          <span className={styles['bookList__sortTitle']}>Сортувати за:</span>
          <SortDropdown
            onChange={(sort) => {
              searchParams.set('sort', sort);
              searchParams.set('page', '1'); // якщо хочеш скидати пагінацію
              setSearchParams(searchParams);
            }}
          />
        </div>
      </div>
      <div className={styles['bookList__showed']}>Показано 9 з 9 книг</div>
      <div className={styles['bookList__container']}>
        {books.map((book, index) => {
          const isLast = index === books.length - 1;
          return (
            <div
              key={book.id}
              ref={isLast ? lastBookRef : null}
              className={styles.bookWrapper}
            >
              <BookCard book={book} />
            </div>
          );
        })}

        {isLoading && <div className={styles.loading}>Завантаження...</div>}
      </div>
    </div>
  );
};

const BookSearchPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles['search-page']}>
        <h2 className={styles['search-page__title']}>Пошук книги</h2>
        <div
          className={`${styles['search-page__main']} ${styles['book-search']}`}
        >
          <Formik initialValues={initialValues} onSubmit={() => {}}>
            <Form className={styles['book-search__form']}>
              <FilterSection />
              <BookListWithFilters />
            </Form>
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookSearchPage;
