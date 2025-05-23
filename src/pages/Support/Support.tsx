import { Header } from '@/components/layout/Header/Header';
import styles from './Support.module.scss';
import { miniIcons } from '@/assets/images/miniIcons';
import { useState } from 'react';
import freqQuestions from '@/resources/freqQuestions/freqQuestions';
import { useNavigate } from 'react-router-dom';
import { ReportProblemForm } from '@/components/forms/ReportProblemForm';

interface FreqQuestionItemProps {
  item: {
    title: string;
    description: string;
  };
}

const FreqQuestionItem: React.FC<FreqQuestionItemProps> = ({ item }) => {
  const [isItemOpen, setIsItemOpen] = useState(false);

  return (
    <div
      className={styles.freqQuestions__item}
      onClick={() => setIsItemOpen((prev) => !prev)}
    >
      <h5
        className={`${styles.freqQuestions__itemTitle} ${
          isItemOpen && styles.freqQuestions__itemTitle_opened
        }`}
      >
        {item.title}
      </h5>
      {isItemOpen && (
        <p className={styles.freqQuestions__itemDescr}>{item.description}</p>
      )}

      <img
        className={styles.freqQuestions__itemImg}
        src={isItemOpen ? miniIcons.chevronUp : miniIcons.chevronDown}
        alt="chevron"
      />
    </div>
  );
};

export const Support = () => {
  const navigate = useNavigate();

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

          <h1 className={styles.title}>Підтримка</h1>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.support}>
            <div className={`${styles.freqQuestions} ${styles.supportBlock}`}>
              <h2 className={styles.freqQuestions__title}>Часті запитання</h2>
              <div className={styles.freqQuestions__infoBox}>
                {freqQuestions.map((item) => {
                  return <FreqQuestionItem item={item} />;
                })}
              </div>
            </div>

            <div className={`${styles.reportProblem} ${styles.supportBlock}`}>
              <div className={styles.reportProblem__title}>
                <img
                  className={styles.reportProblem__reportIcon}
                  src={miniIcons.reportProblem}
                  alt="reportProblem"
                />
                <h2 className={styles.reportProblem__titleText}>
                  Повідомити про проблему
                </h2>
              </div>
              <div
                className={`${styles.reportProblem__importantBox} ${styles.importantBox}`}
              >
                <div className={styles.importantBox__title}>
                  <img
                    className={styles.importantBox__img}
                    src={miniIcons.reportInfo}
                    alt="reportInfo"
                  />
                  Важлива інформація
                </div>
                <p className={styles.importantBox__description}>
                  Перш ніж повідомити про проблему, спробуйте зв'язатися з
                  користувачем через месенджер платформи. Якщо протягом 3 днів
                  відповіді не надійшло, заповніть цю форму.
                </p>
              </div>
              <ReportProblemForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
