import { useEffect } from 'react';
import { miniIcons } from '../../../assets/images/miniIcons';
import styles from './Terms.module.scss';

interface Props {
  onClose: () => void;
}

export const TermsModal: React.FC<Props> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []); // Цей юзефект обмежує скрол основного вікна, коли відкрита модалка

  return (
    <div className={styles['terms']}>
      <div className={styles['terms__content']}>
        <button className={styles['terms__close']} onClick={onClose}>
          <img
            src={miniIcons.closeIcon}
            alt="close-modal"
            className={styles['terms__close-img']}
          />
        </button>

        <div className={styles['terms__title']}>Умови користування</div>
        <div className={styles['terms__info']}>
          Ласкаво просимо до ObminBook. Використовуючи наш сервіс, ви
          погоджуєтесь з наступними умовами.
        </div>

        <section className={styles['terms__list']}>
          <div className={styles['terms__listItem']}>
            <div className={styles['terms__listItem-title']}>
              1. Прийняття умов
            </div>
            <div className={styles['terms__listItem-text']}>
              Використовуючи ObminBook, ви погоджуєтесь дотримуватись цих Умов
              користування. Якщо ви не згодні з будь-якою частиною цих умов, ви
              не можете використовувати наш сервіс.
            </div>
          </div>
          <div className={styles['terms__listItem']}>
            <div className={styles['terms__listItem-title']}>
              2. Реєстрація та обліковий запис
            </div>
            <div className={styles['terms__listItem-text']}>
              Для використання деяких функцій нашого сервісу вам необхідно
              зареєструватися та створити обліковий запис. Ви несете
              відповідальність за збереження конфіденційності вашого облікового
              запису та паролю.
            </div>
          </div>
          <div className={styles['terms__listItem']}>
            <div className={styles['terms__listItem-title']}>
              3. Обмін книгами
            </div>
            <div className={styles['terms__listItem-text']}>
              ObminBook — це платформа для обміну книгами між користувачами. Ми
              не несемо відповідальності за якість книг, точність опису або
              будь-які проблеми, що виникають під час обміну між користувачами.
            </div>
          </div>
          <div className={styles['terms__listItem']}>
            <div className={styles['terms__listItem-title']}>
              4. Правила поведінки
            </div>
            <div className={styles['terms__listItem-text']}>
              Користувачі повинні дотримуватись загальноприйнятих правил
              поведінки та етикету. Забороняється розміщення образливого,
              незаконного або шкідливого контенту.
            </div>
          </div>
          <div className={styles['terms__listItem']}>
            <div className={styles['terms__listItem-title']}>
              5. Зміни в умовах
            </div>
            <div className={styles['terms__listItem-text']}>
              Ми залишаємо за собою право змінювати ці умови в будь-який час.
              Продовжуючи використовувати сервіс після внесення змін, ви
              погоджуєтесь з оновленими умовами.
            </div>
          </div>
          <div className={styles['terms__listItem']}>
            <div className={styles['terms__listItem-title']}>
              6. Припинення дії
            </div>
            <div className={styles['terms__listItem-text']}>
              Ми залишаємо за собою право припинити або призупинити ваш доступ
              до сервісу негайно, без попереднього повідомлення, за порушення
              цих Умов користування.
            </div>
          </div>
        </section>

        <div className={styles['terms__lastUpdate']}>
          Останнє оновлення: 2.05.2025
        </div>
      </div>
    </div>
  );
};
