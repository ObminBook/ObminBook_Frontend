import React from 'react';
import styles from './BookSearch.module.scss';
import { Footer } from '../../components/1_BigComponents/Footer/Footer';
import { Header } from '../../components/1_BigComponents/Header/Header';
import FilterSection from '../../components/1_BigComponents/FilterSection/FilterSection';
import BookListWithFilters from '../../components/1_BigComponents/BookListWithFilters/BookListWithFilter';

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
