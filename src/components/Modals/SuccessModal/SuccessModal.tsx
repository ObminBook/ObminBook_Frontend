import { miniIcons } from '@/assets/images/miniIcons';
import styles from './SuccessModal.module.scss';

interface Props {
  title?: string;
  description?: string;
}

export const SuccessModal: React.FC<Props> = ({ title = 'Успішно!', description }) => {
  return (
    <div className={styles.successWrapper}>
      <img src={miniIcons.recentIcon} alt="Успішно" className={styles.successIcon} />
      <h2 className={styles.successTitle}>{title}</h2>
      {description && <p className={styles.successDescription}>{description}</p>}
      <div>Перенаправлення..</div>
    </div>
  );
};
