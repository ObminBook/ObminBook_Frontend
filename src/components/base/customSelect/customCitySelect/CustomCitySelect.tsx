import React, { useMemo, useState } from 'react';
import Select, { SingleValue, StylesConfig, GroupBase } from 'react-select';

type CityOption = {
  id: number;
  country: string;
  nameUa: string;
};

type SelectOption = {
  value: number;
  label: string;
};

const customStyles: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
  control: (base, state) => ({
    ...base,
    boxShadow: 'none',
    backgroundColor: '#f7fafc',
    padding: '10px 12px',
    borderRadius: '6px',
    '&:hover': {
      border: '1px solid #007BFF', // заміни на значення $color-blue, якщо хочеш
    },
    borderColor: state.isFocused ? '#007BFF' : '$color-border',
    color: '#003366', // $color-darkblue
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 1.4,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#A0AEC0', // $color-lightGray
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.4,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    display: 'none',
  }),
  clearIndicator: (base) => ({
    ...base,
    display: 'none',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  menu: (base) => ({
    ...base,
    padding: '1px',
    backgroundColor: '#f7fafc',
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
    padding: '10px',
    paddingLeft: '32px',
    borderRadius: '6px',
    backgroundColor: state.isSelected ? '#007BFF' : '#f7fafc',
    color: state.isSelected ? '#ffffff' : '#003366',
    '&:hover': {
      backgroundColor: state.isSelected ? '#007BFF' : '#D6ECFA',
      color: state.isSelected ? '#ffffff' : '#003366',
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

  const filteredOptions: SelectOption[] = useMemo(() => {
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
      onChange={(selected: SingleValue<SelectOption>) => {
        const city = options.find((option) => option.id === selected?.value);
        onChange(city || null);
      }}
      onInputChange={(input) => setInputValue(input)}
      options={filteredOptions}
      styles={customStyles}
      isClearable={false}
      isSearchable={true}
      filterOption={() => true}
      placeholder="Введіть назву міста"
      noOptionsMessage={() => 'Нічого не знайдено'}
    />
  );
};

export default CustomCitySelect;
