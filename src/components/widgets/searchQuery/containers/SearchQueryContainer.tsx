import { useEffect, useState, useMemo } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { SearchQuery } from '../views/SearchQuery';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { setTitleAndAuthor } from '@/features/bookSearchSlice/bookSearchSlice';

interface Props {
  searchParams?: URLSearchParams;
  setSearchParams?: SetURLSearchParams;
  placeholder: string;
}

export const SearchQueryContainer: React.FC<Props> = ({ placeholder }) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  const debouncedDispatch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setTitleAndAuthor(value));
      }, 500),
    [dispatch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedDispatch(value);
  };

  return (
    <SearchQuery value={inputValue} onChange={handleChange} placeholder={placeholder} />
  );
};
