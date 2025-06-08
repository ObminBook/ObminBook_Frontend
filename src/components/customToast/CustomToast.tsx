import React from 'react';
import styles from './CustomToast.module.scss';

interface CustomToastProps {
  message: string;
  type?: 'success' | 'error';
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type = 'success' }) => {
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.icon}></span>
      {message}
    </div>
  );
};

export default CustomToast;
