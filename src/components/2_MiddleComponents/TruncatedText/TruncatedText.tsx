import { useState } from 'react';
import styles from './TruncatedText.module.scss';

export const TruncatedText = ({
  text,
  maxChars = 100,
}: {
  text: string;
  maxChars?: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  const isTruncated = text.length > maxChars;

  return (
    <p className={`${styles.text} ${expanded ? styles.expanded : ''}`}>
      {isTruncated && !expanded ? (
        <>
          {text.slice(0, maxChars)}...
          <span className={styles.more} onClick={() => setExpanded(true)}>
            &nbsp;Показати більше
          </span>
        </>
      ) : (
        <p>
          {text}
          <span onClick={() => setExpanded(false)} className={styles.more}>
            &nbsp;Згорнути
          </span>
        </p>
      )}
    </p>
  );
};
