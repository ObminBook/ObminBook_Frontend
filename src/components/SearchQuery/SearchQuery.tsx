import loopa from '../../assets/images/card_imgs/input/Loopa.svg';
import styles from './SearchQuery.module.scss';
import { SetURLSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const SearchQuery: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (debouncedValue) {
      newParams.set('title', debouncedValue);
    } else {
      newParams.delete('title');
    }

    newParams.set('page', '1');
    setSearchParams(newParams);
  }, [debouncedValue]);

  useEffect(() => {
    const queryParam = searchParams.get('title') || '';
    setInputValue(queryParam);
  }, [searchParams]);

  return (
    <div className={styles['searchQuery']}>
      <img src={loopa} className={styles['searchQuery__img']} alt="search" />
      <input
        type="text"
        placeholder="Пошук у результатах"
        className={styles['searchQuery__input']}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};
