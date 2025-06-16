import Select, { StylesConfig } from 'react-select';
import { useFormContext, useController } from 'react-hook-form';

type OptionType = {
  value: string;
  label: string;
};

const customSelectStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${state.selectProps.menuIsOpen ? '$color-blue' : '$color-border'}`,
    borderRadius: '8px',
    minWidth: '192px',
    width: '100%',
    height: '40px',
    backgroundColor: '#f7fafc',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: 1.4,
    color: '$color-darkblue',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #3e9ee3',
    },
  }),
  menu: (base) => ({
    ...base,
    marginTop: '8px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    padding: '1px',
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    padding: '2px',
  }),
  option: (base, state) => ({
    ...base,
    minHeight: '40px',
    width: '188px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    backgroundColor: state.isSelected
      ? '#3e9ee3'
      : state.isFocused
      ? '#e9ecef'
      : '#f7fafc',
    color: state.isSelected ? 'white' : '$color-darkblue',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: 1.4,
    cursor: 'pointer',
    paddingLeft: '12px',
    paddingRight: '12px',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    border: 'none',
    color: '#6c757d',
    padding: '0 8px',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'color 0.2s',
  }),
  indicatorSeparator: () => ({
    display: 'none',
    visibility: 'hidden',
  }),
  placeholder: (base) => ({
    ...base,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 1.4,
    color: '$color-lightGray',
  }),
};

type CustomSelectProps = {
  name: string;
  options: OptionType[];
  placeholder: string;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
};

export const CustomFormSelect = ({
  name,
  options,
  placeholder,
  isClearable = false,
  isSearchable = true,
  isDisabled = false,
}: CustomSelectProps) => {
  const { control } = useFormContext();

  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
  });

  const selectedOption = options.find((option) => option.value === value) || null;

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={(selected) => onChange(selected ? selected.value : '')}
        onBlur={onBlur}
        styles={customSelectStyles}
        placeholder={placeholder}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
      />
    </div>
  );
};
