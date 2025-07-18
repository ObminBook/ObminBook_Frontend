import React from 'react';
import styles from './HomePage.module.scss';

import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout/Header/Header';
import { Footer } from '../../components/layout/Footer/Footer';
import { homePageIcons } from '../../assets/images/homePage';
import { Helmet } from 'react-helmet-async';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>ObminBook — Обмінюй книги в Україні</title>
        <meta
          name="description"
          content="Шукайте, додавайте та обмінюйте книги з іншими читачами"
        />
        <link rel="canonical" href="https://obminbook.ua/" />
      </Helmet>
      <div className={styles.wrapper}>
        <Header showLoginButton={true} />
        <div className={styles.main}>
          <section className={styles.intro}>
            <h1 className={styles.title}>Обмінюйтесь книгами безкоштовно</h1>
            <p className={styles.description}>
              В нас можна обміняти свої прочитані книжки на інші або знайти те, що вас
              цікавить. <br /> Просто знайдіть потрібний екземпляр і зв'яжіться з його
              власником. <br /> Це безкоштовно. Міняйтесь з ким завгодно, де б ви не були.
            </p>
          </section>
          <section className={styles.actions}>
            <button className={styles.button} onClick={() => navigate('/search')}>
              Знайти книгу
            </button>
            <button className={styles.button} onClick={() => navigate('/profile')}>
              Додати книгу
            </button>
          </section>
          <section className={styles.features}>
            <div className={styles.card}>
              <img className={styles.cardImg} src={homePageIcons.findBooks} />
              <div className={styles.cardInfo}>
                <h4 className={styles.cardTitle}>Знаходьте книги</h4>
                <p className={styles.cardDescription}>
                  Шукайте книги за жанром, автором або станом, щоб знайти саме те, що вам
                  потрібно.
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <img className={styles.cardImg} src={homePageIcons.contactOwner} />
              <div className={styles.cardInfo}>
                <h4 className={styles.cardTitle}>Зв’яжіться з власником</h4>
                <p className={styles.cardDescription}>
                  Домовтеся про обмін особисто або поштою, як вам зручніше.
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <img className={styles.cardImg} src={homePageIcons.saveMoney} />
              <div className={styles.cardInfo}>
                <h4 className={styles.cardTitle}>Економте кошти</h4>
                <p className={styles.cardDescription}>
                  Обмінюйтесь книгами замість того, щоб купувати нові. Економте гроші та
                  розширюйте свою бібліотеку.
                </p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
