import React, { useEffect, useState } from 'react';
import styles from './ResendCodeButton.module.scss';

const RESEND_DELAY = 30;
const STORAGE_KEY = 'last_verification_sent';

const ResendCodeButton: React.FC<{ onResend: () => void }> = ({ onResend }) => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const lastSent = localStorage.getItem(STORAGE_KEY);
    if (lastSent) {
      const diff = Math.floor((Date.now() - Number(lastSent)) / 1000);
      if (diff < RESEND_DELAY) {
        setSecondsLeft(RESEND_DELAY - diff);
      }
    }
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleClick = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setSecondsLeft(RESEND_DELAY);
    onResend();
  };

  return (
    <button
      className={`${styles.resendButton} ${
        secondsLeft > 0 && styles.resendButton__disabled
      }`}
      onClick={handleClick}
      disabled={secondsLeft > 0}
    >
      {secondsLeft > 0
        ? `Надіслали повторно (${secondsLeft}c)`
        : 'Надіслати повторно'}
    </button>
  );
};

export default ResendCodeButton;
