import React, { useState } from 'react';
import styles from './Dropdown.module.scss';
import useClickOutside from '../../../../hooks/useClickOutside';

type Option = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type Props = {
  options: Option[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
};

const Dropdown: React.FC<Props> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = 'Оберіть...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const selectedOption = options.find((o) => o.value === selectedValue);
  const selectedLabel = selectedOption?.label || placeholder;

  return (
    <div ref={dropdownRef} className={styles['sort-dropdown']}>
      <button
        className={styles['sort-dropdown__toggle']}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedLabel}
      </button>

      {isOpen && (
        <ul className={styles['sort-dropdown__list']}>
          {options.map((option) => (
            <li
              key={option.value}
              className={
                option.value === selectedValue
                  ? styles['sort-dropdown__item--selected']
                  : styles['sort-dropdown__item']
              }
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.icon && (
                <span className={styles['sort-dropdown__icon']}>
                  {option.icon}
                </span>
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
