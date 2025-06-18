import React from 'react';
import styles from './Loader.module.scss';

type LoaderProps = {
  render?: (spinner: React.ReactNode) => React.ReactNode;
  size?: number;
};

export const Loader: React.FC<LoaderProps> = ({ render, size = 24 }) => {
  const spinner = (
    <svg
      className={styles.spinner}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2C11.3133 2 14 4.68667 14 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2C11.3133 2 14 4.68667 14 8C14 11.3133 11.3133 14 8 14C4.68667 14 2 11.3133 2 8C2 4.68667 4.68667 2 8 2Z"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return <>{render ? render(spinner) : spinner}</>;
};
