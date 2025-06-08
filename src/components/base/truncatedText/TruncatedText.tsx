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

  const isShortText = text.length <= 150;
  const isTruncated = text.length > maxChars;

  if (isShortText) {
    return <p className={styles.text}>{text}</p>;
  }

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
        <>
          {text}
          <span onClick={() => setExpanded(false)} className={styles.more}>
            &nbsp;Згорнути
          </span>
        </>
      )}
    </p>
  );
};
