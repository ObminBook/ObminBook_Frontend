import React from 'react';
import styles from './BookSearch.module.scss';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import BookListWithFilters from '../../components/BookListWithFilters/BookListWithFilter';
import FilterSection from '../../components/FilterSection/FilterSection';

const BookSearchPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles['search-page']}>
        <h2 className={styles['search-page__title']}>Пошук книги</h2>
        <div
          className={`${styles['search-page__main']} ${styles['book-search']}`}
        >
          <FilterSection />
          <BookListWithFilters />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookSearchPage;
