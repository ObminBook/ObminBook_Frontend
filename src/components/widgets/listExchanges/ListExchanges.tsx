import styles from './ListExchanges.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RecievedListExchanges } from './RecievedListExchanges';
import { SentListExchanges } from './SentListExchanges';

export const ListExchanges = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('exchangeTab')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('exchangeTab', 'recieved');
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams]);

  const exchangeTabs = [
    { key: 'recieved', label: 'Отримані' },
    { key: 'sent', label: 'Надіслані' },
  ];

  const currentExchangeTab = searchParams.get('exchangeTab') || 'recieved';

  const handleTabChange = (tabKey: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('exchangeTab', tabKey);
    setSearchParams(newParams);
  };

  return (
    <div className={styles.container}>
      <div className={styles.optionButtons}>
        {exchangeTabs.map((tab) => {
          return (
            <div
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`${styles.optionButton} ${
                currentExchangeTab === tab.key ? styles.optionButton_selected : null
              }`}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
      {currentExchangeTab === 'recieved' ? (
        <RecievedListExchanges />
      ) : (
        <SentListExchanges />
      )}
    </div>
  );
};
