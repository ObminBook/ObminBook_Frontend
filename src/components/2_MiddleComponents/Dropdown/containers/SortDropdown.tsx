import React from 'react';
import Dropdown from '../view/Dropdown';
import { SetURLSearchParams } from 'react-router-dom';
import { dropdownIcons } from '../../../../assets/images/all_imgs/sortDropdown';

type SortOption = 'newest' | 'title' | 'random';

type Props = {
  setSearchParams?: SetURLSearchParams;
  searchParams?: URLSearchParams;
};

export const SortDropdown: React.FC<Props> = ({
  setSearchParams,
  searchParams,
}) => {
  const selected = (searchParams?.get('sort') || null) as SortOption | null;

  const sortOptions = [
    {
      label: 'Нові оголошення',
      value: 'newest',
      icon: (
        <img
          src={
            selected === 'newest'
              ? dropdownIcons.iconChecked
              : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
          }
          alt="newest"
        />
      ),
    },
    {
      label: 'За назвою (А-Я)',
      value: 'title',
      icon: (
        <img
          src={
            selected === 'title'
              ? dropdownIcons.iconChecked
              : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
          }
          alt="title"
        />
      ),
    },
    {
      label: 'Випадково',
      value: 'random',
      icon: (
        <img
          src={
            selected === 'random'
              ? dropdownIcons.iconChecked
              : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
          }
          alt="random"
        />
      ),
    },
  ];

  const handleSortChange = (sort: string) => {
    if (setSearchParams) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('sort', sort);
        return newParams;
      });
    }

    return;
  };

  return (
    <Dropdown
      options={sortOptions}
      selectedValue={selected}
      onSelect={handleSortChange}
      placeholder="Сортувати за..."
    />
  );
};

export default SortDropdown;
