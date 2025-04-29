import styles from './ExchangeProposalPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/1_BigComponents/Header/Header';
import { Footer } from '../../components/1_BigComponents/Footer/Footer';
import { BookListBlock } from '../../components/1_BigComponents/BookListBlock/BookListBlock';
import { ExchangeBlock } from '../../components/1_BigComponents/ExchangeBlock/ExchangeBlock';
import { getMockBooksByPage } from '../../books/books';
import { buttonIcons } from '../../assets/images/all_imgs/buttonIcons';
import { useState } from 'react';
import { Book } from '../../types/Book';

export const ExchangeProposalPage = () => {
  const [selectedMyBook, setSelectedMyBook] = useState<Book | null>(null);
  const [selectedAnotherUserBook, setSelectedAnotherUserBook] =
    useState<Book | null>(null);
  const navigate = useNavigate();

  function handleSelectBook(book: Book, isMy?: boolean) {
    if (isMy) {
      setSelectedMyBook(book);
      return;
    }

    setSelectedAnotherUserBook(book);
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const myBooks = getMockBooksByPage(1, 4).content;
  const anotherUserBooks = getMockBooksByPage(2, 4).content;

  return (
    <div className={styles.exchangePage}>
      <Header />
      <main className={styles.exchangePage__content}>
        <button
          className={styles.exchangePage__backButton}
          onClick={handleBackClick}
        >
          <img
            src={buttonIcons.backButton}
            alt="backButton"
            style={{ width: '16px', height: '16px' }}
          />
          Назад
        </button>
        <h1 className={styles.exchangePage__title}>Пропозиція обміну</h1>
        <div className={styles.exchangePage__blocks}>
          <BookListBlock
            title="Мої книги"
            books={myBooks}
            myList={true}
            onBookSelect={handleSelectBook}
          />
          <ExchangeBlock
            selectedMyBook={selectedMyBook}
            selectedAnotherUserBook={selectedAnotherUserBook}
          />
          <BookListBlock
            title="Книги користувача Марія Петренко"
            books={anotherUserBooks}
            onBookSelect={handleSelectBook}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};
