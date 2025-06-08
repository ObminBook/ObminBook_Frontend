import React from 'react';
import styles from './Loader.module.scss';
import { miniIcons } from '../../../assets/images/miniIcons';

type LoaderProps = {
  render?: (spinner: React.ReactNode) => React.ReactNode;
  size?: number;
};

export const Loader: React.FC<LoaderProps> = ({ render, size = 24 }) => {
  const spinner = (
    <img
      src={miniIcons.spinner}
      alt="Loading..."
      className={styles.spinner}
      style={{ width: size, height: size }}
    />
  );

  return <>{render ? render(spinner) : spinner}</>;
};
