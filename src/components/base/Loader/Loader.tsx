import React from 'react';
import styles from './Loader.module.scss';
import { miniIcons } from '../../../assets/images/miniIcons';

type LoaderProps = {
  render?: (spinner: React.ReactNode) => React.ReactNode;
};

export const Loader: React.FC<LoaderProps> = ({ render }) => {
  const spinner = (
    <img src={miniIcons.spinner} alt="Loading..." className={styles.spinner} />
  );

  return <>{render ? render(spinner) : spinner}</>;
};
