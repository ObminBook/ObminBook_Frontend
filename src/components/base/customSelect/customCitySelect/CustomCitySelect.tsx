import React, { useMemo, useState } from 'react';
import Select, { SingleValue } from 'react-select';

type CityOption = {
  id: number;
  country: string;
  nameUa: string;
};

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    boxShadow: 'none',
    backgroundColor: '#f7fafc',
    padding: '10px 12px',
    borderRadius: '6px',
    '&:hover': {
      border: '1px solid $color-blue',
    },
    borderColor: state.isFocused ? '$color-blue' : '#E1E7EF',
    color: '$color-darkblue',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 1.4,
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '$color-lightGray',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: 1.4,
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    display: 'none',
  }),
  clearIndicator: (base: any) => ({
    ...base,
    display: 'none',
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: 'none',
  }),
  menu: (base: any) => ({
    ...base,
    padding: '1px',
    backgroundColor: '#f7fafc',
  }),
  option: (base: any, state: any) => ({
    ...base,
    cursor: 'pointer',
    padding: '10px',
    paddingLeft: '32px',
    borderRadius: '6px',
    backgroundColor: state.isSelected ? '$color-blue' : '#f7fafc', // Колір фону для вибраної опції
    color: state.isSelected ? '$color-white' : '$color-darkblue', // Колір тексту тільки для вибраної опції
    '&:hover': {
      backgroundColor: state.isSelected ? '$color-blue' : '#D6ECFA',
      color: state.isSelected ? '$color-white' : '$color-darkblue',
    },
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 1.4,
  }),
};

interface CustomCitySelectProps {
  options: readonly CityOption[];
  value: CityOption | null;
  onChange: (selectedOption: CityOption | null) => void;
}

const CustomCitySelect: React.FC<CustomCitySelectProps> = ({
  options,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const filteredOptions = useMemo(() => {
    const normalizedInput = inputValue.toLowerCase();
    return options
      .filter((city) => city.nameUa.toLowerCase().includes(normalizedInput))
      .slice(0, 10)
      .map((city) => ({
        value: city.id,
        label: city.nameUa,
      }));
  }, [inputValue, options]);

  return (
    <Select
      value={value ? { value: value.id, label: value.nameUa } : null}
      onChange={(selected: SingleValue<{ value: number; label: string }>) => {
        const city = options.find((option) => option.id === selected?.value);
        onChange(city || null);
      }}
      onInputChange={(input) => setInputValue(input)}
      options={filteredOptions}
      styles={customStyles}
      isClearable={false}
      isSearchable={true}
      filterOption={() => true} // Потрібно, щоб не фільтрувало ще раз після нашої логіки
      placeholder="Введіть назву міста"
      noOptionsMessage={() => 'Нічого не знайдено'}
    />
  );
};

export default CustomCitySelect;
