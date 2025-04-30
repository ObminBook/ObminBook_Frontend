import styles from './ExchangeProposalPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Header } from '../../components/1_BigComponents/Header/Header';
import { Footer } from '../../components/1_BigComponents/Footer/Footer';
import { BookListBlock } from '../../components/1_BigComponents/BookListBlock/BookListBlock';
import { ExchangeBlock } from '../../components/1_BigComponents/ExchangeBlock/ExchangeBlock';
import { getMockBooksByPage } from '../../books/books';
import { buttonIcons } from '../../assets/images/all_imgs/buttonIcons';
import { Book } from '../../types/Book';
import { AnyBook } from '../../types/AnyBook';
import { Button } from '../../components/3_SmallComponents/Button/views/Button';

export const ExchangeProposalPage = () => {
  const navigate = useNavigate();

  const [selectedMyBook, setSelectedMyBook] = useState<Book | null>(null);
  const [selectedAnotherUserBook, setSelectedAnotherUserBook] =
    useState<Book | null>(null);
  const [selectedAnyCard, setSelectedAnyCard] = useState<AnyBook | null>(null);

  const myBooks = getMockBooksByPage(1, 4).content;
  const anotherUserBooks = getMockBooksByPage(2, 4).content;

  const handleSelectBook = (book: Book, isMyBook: boolean) => {
    if (isMyBook) {
      setSelectedMyBook(book);
      setSelectedAnyCard(null); // очищаємо anyCard якщо юзер вибирає конкретну книгу
    } else {
      setSelectedAnotherUserBook(book);
    }
  };

  const handleSelectAnyCard = () => {
    if (selectedMyBook !== null) {
      setSelectedMyBook(null);
    }

    const cardAnyBook: AnyBook = {
      text: 'Обмін на будь-яку мою книгу',
    };

    setSelectedAnyCard(cardAnyBook);
  };

  const handleRemoveCard = (isMyCard: boolean) => {
    if (isMyCard) {
      setSelectedMyBook(null);
      setSelectedAnyCard(null);
    } else {
      setSelectedAnotherUserBook(null);
    }
  };

  return (
    <div className={styles.exchangePage}>
      <Header />
      <main className={styles.exchangePage__content}>
        <button
          className={styles.exchangePage__backButton}
          onClick={() => navigate(-1)}
        >
          <img
            src={buttonIcons.backButton}
            alt="Назад"
            style={{ width: '16px', height: '16px' }}
          />
          Назад
        </button>

        <h1 className={styles.exchangePage__title}>Пропозиція обміну</h1>

        <div className={styles.exchangePage__blocks}>
          <div
            className={styles.exchangePage__anyButton}
            onClick={handleSelectAnyCard}
          >
            <Button
              _buttonColor="blueTransparent"
              _name="Обмін на будь-яку мою книгу"
            />
          </div>

          <BookListBlock
            title="Мої книги"
            books={myBooks}
            myList
            onBookSelect={(book) => handleSelectBook(book, true)}
          />

          <ExchangeBlock
            selectedMyBook={selectedMyBook}
            selectedAnotherUserBook={selectedAnotherUserBook}
            selectedAnyCard={selectedAnyCard}
            onRemoveCard={handleRemoveCard}
          />

          <BookListBlock
            title="Книги користувача Марія Петренко"
            books={anotherUserBooks}
            myList={false}
            onBookSelect={(book) => handleSelectBook(book, false)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};
