import Select, { StylesConfig } from 'react-select';
import { useSelector } from 'react-redux';
import { select, setSort } from '@/features/bookSearchSlice/bookSearchSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';

type Option = {
  value: string;
  label: string;
};

const customSortStyles: StylesConfig<Option, false> = {
  control: (base, state) => ({
    ...base,
    display: 'flex',
    flexWrap: 'wrap',
    border: state.isFocused ? '1px solid #3e9ee3 ' : '1px solid #E1E7EF',
    borderRadius: '8px',
    minWidth: '192px',
    width: '100%',
    height: '40px',
    backgroundColor: '#fffff',
    fontWeight: 500,
    fontSize: '14px',
    color: '#1c2c45',
    boxShadow: 'none',
    padding: '2px',
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
    gap: '5px',
    padding: '5px',
  }),
  option: (base, state) => ({
    ...base,
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    backgroundColor: state.isSelected
      ? '#3e9ee3'
      : state.isFocused
      ? '#e9ecef'
      : '#f7fafc',
    color: state.isSelected ? 'white' : '#1c2c45',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 1.4,
    cursor: 'pointer',
    paddingLeft: '12px',
    paddingRight: '12px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  placeholder: (base) => ({
    ...base,
    color: '#142952',
    fontSize: '14px',
    fontWeight: 500,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: 'transform 0.2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
};

type Props = {
  placeholder: string;
};

const options: Option[] = [
  { value: 'asc', label: 'За назвою А-Я' },
  { value: 'desc', label: 'За назвою Я-А' },
  { value: 'new', label: 'Нові оголошення' },
];

export const CustomSortSelect = ({ placeholder }: Props) => {
  const selectedValue = useSelector(select.sort);
  const dispatch = useAppDispatch();

  const selectedOption = options.find((option) => option.value === selectedValue) || null;

  const handleSelectChange = (selected: Option | null) => {
    if (selected) {
      dispatch(setSort(selected.value));
    }
  };

  return (
    <div>
      <Select
        options={options}
        isMulti={false} // можна й зовсім прибрати
        onChange={handleSelectChange}
        styles={customSortStyles}
        placeholder={placeholder}
        closeMenuOnSelect={true}
        isClearable={false}
        value={selectedOption}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
      />
    </div>
  );
};
