import { useEffect, useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../../hooks/useDebounce';
import { SearchQuery } from '../views/SearchQuery';

interface Props {
  searchParams?: URLSearchParams;
  setSearchParams?: SetURLSearchParams;
  placeholder: string;
}

export const SearchQueryContainer: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (!searchParams || !setSearchParams) return;

    const newParams = new URLSearchParams(searchParams);

    if (debouncedValue) {
      newParams.set('title', debouncedValue);
    } else {
      newParams.delete('title');
    }

    newParams.set('page', '1');
    setSearchParams(newParams);
  }, [debouncedValue, searchParams, setSearchParams]);

  useEffect(() => {
    if (!searchParams) return;
    const queryParam = searchParams.get('title') || '';
    setInputValue(queryParam);
  }, [searchParams]);

  return (
    <SearchQuery
      value={inputValue}
      onChange={setInputValue}
      placeholder={placeholder}
    />
  );
};
