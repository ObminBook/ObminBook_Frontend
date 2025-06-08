import React from 'react';
import styles from './BookSearchPage.module.scss';
import { Footer } from '../../components/layout/Footer/Footer';
import { Header } from '../../components/layout/Header/Header';
import FilterSection from '../../components/layout/FilterSection/FilterSection';
import BookListWithFilters from '../../components/layout/BookListWithFilters/BookListWithFilter';

const BookSearchPage: React.FC = () => {
  return (
    <div className={styles['search-page']}>
      <Header showLoginButton />
      <h2 className={styles['search-page__title']}>Пошук книги</h2>
      <div className={`${styles['search-page__main']} ${styles['book-search']}`}>
        <FilterSection />
        <BookListWithFilters />
      </div>

      <Footer />
    </div>
  );
};

export default BookSearchPage;
