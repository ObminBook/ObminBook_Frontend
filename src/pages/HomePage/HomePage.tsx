import React from 'react';
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import cardImg_findBook from '../../assets/images/card_imgs/find-books.svg';
import cardImg_contact from '../../assets/images/card_imgs/contact-with-owner.svg';
import cardImg_saveMoney from '../../assets/images/card_imgs/save-money.svg';
import { Footer } from '../../components/Footer/Footer';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['home-page']}>
      <Header showLoginButton={true} />
      <div className={styles['home-page__main']}>
        <section className={styles['intro']}>
          <h1 className={styles['intro__title']}>
            Безкоштовно обмінюйтесь книгами по всьому світу
          </h1>
          <p className={styles['intro__description']}>
            В нас можна обміняти свої прочитані книжки на інші або знайти те, що
            вас цікавить. <br /> Просто знайдіть потрібний екземпляр і
            зв'яжіться з його власником. <br /> Це безкоштовно. Міняйтесь з ким
            завгодно, де б ви не були.
            {/* Також можете додати свою книгу до списку обміну,
            щоб інші могли її знайти. Це чудовий спосіб розширити свою
            бібліотеку і поділитися тими книгами, що ви більше не читаєте.
            Приєднуйтесь до нас сьогодні і почніть обмін! */}
          </p>
        </section>
        <section className={styles['actions']}>
          <button
            className={styles['actions__button']}
            onClick={() => navigate('/search')}
          >
            Знайти книгу
          </button>
          <button
            className={styles['actions__button']}
            onClick={() => navigate('/profile')}
          >
            Обміняти книгу
          </button>
        </section>
        <section className={styles['features']}>
          <div className={styles['card']}>
            <img className={styles['card__img']} src={cardImg_findBook} />
            <div className={styles['card__info']}>
              <h4 className={styles['card__title']}>Знаходьте книги</h4>
              <p className={styles['card__description']}>
                Шукайте книги за жанром, автором або станом, щоб знайти саме те,
                що вам потрібно.
              </p>
            </div>
          </div>
          <div className={styles['card']}>
            <img className={styles['card__img']} src={cardImg_contact} />
            <div className={styles['card__info']}>
              <h4 className={styles['card__title']}>Зв’яжіться з власником</h4>
              <p className={styles['card__description']}>
                Домовтеся про обмін особисто або поштою, як вам зручніше.
              </p>
            </div>
          </div>
          <div className={styles['card']}>
            <img className={styles['card__img']} src={cardImg_saveMoney} />
            <div className={styles['card__info']}>
              <h4 className={styles['card__title']}>Економте кошти</h4>
              <p className={styles['card__description']}>
                Обмінюйтесь книгами замість того, щоб купувати нові. Економте
                гроші та розширюйте свою бібліотеку.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
