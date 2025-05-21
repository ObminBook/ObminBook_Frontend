import { useNavigate } from 'react-router-dom';
import { miniIcons } from '../../assets/images/miniIcons';
import { Footer } from '../../components/layout/Footer/Footer';
import { Header } from '../../components/layout/Header/Header';
import styles from './PersonalInfo.module.scss';
import { User } from '../../types/User';
import avatar from '../../assets/images/common/avatar.svg';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const user: User = {
    id: 1,
    email: 'barbanihor@gmail.com',
    city: 'Kyiv',
    firstName: 'Ihor',
    lastName: 'Barban',
    books: [],
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.main}>
        <div className={styles.mainHeader}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <img
              src={miniIcons.backButton}
              alt="Назад"
              style={{ width: '16px', height: '16px' }}
            />
            Назад
          </button>

          <h1 className={styles.title}>Налаштування</h1>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.settings}>
            <div className={styles.user}>
              <img
                className={styles.userImg}
                src={avatar}
                alt="Марія Петренко"
              />
              <div>
                <div className={styles.userNameLocation}>
                  <div className={styles.userName}>
                    {user
                      ? `${user?.firstName} ${user?.lastName}`
                      : 'Ігор Барбан'}
                  </div>
                  <p className={styles.userLocation}>Київ, Україна</p>
                </div>
              </div>
            </div>

            <div className={`${styles.personalInfo} ${styles.settingBlock}`}>
              <h2 className={styles.personalInfo__title}>Особисті дані</h2>
              <div className={styles.personalInfo__infoBox}>
                <div className={styles.personalInfo__item}>
                  <button className={styles.personalInfo__itemButton}>
                    Змінити
                  </button>
                  <p className={styles.personalInfo__itemTitle}>
                    Ім’я та прізвище
                  </p>
                  <p className={styles.personalInfo__itemInfo}>
                    {user.firstName + ' ' + user.lastName}
                  </p>
                </div>
                <div className={styles.personalInfo__item}>
                  <button className={styles.personalInfo__itemButton}>
                    Змінити
                  </button>
                  <p className={styles.personalInfo__itemTitle}>
                    Місце проживання
                  </p>
                  <p className={styles.personalInfo__itemInfo}>{user.city}</p>
                </div>
                <div className={styles.personalInfo__item}>
                  <button className={styles.personalInfo__itemButton}>
                    Змінити
                  </button>
                  <p className={styles.personalInfo__itemTitle}>
                    Електронна пошта
                  </p>
                  <p className={styles.personalInfo__itemInfo}>{user.email}</p>
                </div>
                <div
                  className={`${styles.personalInfo__item} ${styles.personalInfo__item_lastItem}`}
                >
                  <button className={styles.personalInfo__itemButton}>
                    Змінити
                  </button>
                  <p className={styles.personalInfo__itemTitle}>Пароль</p>
                  <p className={styles.personalInfo__itemInfo}>••••••••</p>
                </div>
              </div>
            </div>
            <div className={`${styles.manageAcc} ${styles.settingBlock}`}>
              <div className={styles.manageAcc__title}>
                Керування обліковим записом
              </div>
              <div className={styles.manageAcc__infoBox}>
                <div className={styles.manageAcc__item}>
                  <button className={styles.manageAcc__itemButton}>
                    Видалити
                  </button>
                  <p className={styles.manageAcc__itemTitle}>
                    Видалити обліковий запис
                  </p>
                  <p className={styles.manageAcc__itemInfo}>
                    Назавжди видалити ваш обліковий запис ObminBook
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalInfo;
