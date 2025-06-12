import Select, { MultiValue, StylesConfig } from 'react-select';
import styles from './CustomCategorySelect.module.scss';
import { useSelector } from 'react-redux';
import { select, setCategory } from '@/features/bookSearchSlice/bookSearchSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { bookCategories } from '../../../../resources/bookCategories/bookCategories';

type Option = {
  value: string;
  label: string;
};

const customSelectStyles: StylesConfig<Option, true> = {
  control: (base, state) => ({
    ...base,
    display: 'flex',
    flexWrap: 'wrap',
    border: state.isFocused ? '1px solid #3e9ee3' : '1px solid #E1E7EF',
    borderRadius: '8px',
    minWidth: '192px',
    width: '100%',
    height: '45px',
    backgroundColor: '#fffff',
    fontWeight: 500,
    fontSize: '14px',
    color: '#1c2c45',
    boxShadow: 'none',
    padding: '2px',

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
  multiValue: () => ({ display: 'none' }),
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

export const CustomCategorySelect = ({ placeholder }: Props) => {
  const options: Option[] = bookCategories;
  const selectedValues = useSelector(select.categories) as string[];
  const dispatch = useAppDispatch();

  // Конвертуємо значення з Redux в опції для react-select
  const selectedOptions: Option[] = options.filter((opt) =>
    selectedValues.includes(opt.value)
  );

  // Обробка зміни вибору - відправляємо тільки values в Redux
  const handleSelectChange = (selected: MultiValue<Option>) => {
    const values = selected ? selected.map((opt) => opt.value) : [];

    dispatch(setCategory(values));
  };

  // Видалення одного тегу
  const handleRemoveTag = (valueToRemove: string) => {
    const updated = selectedValues.filter((val) => val !== valueToRemove);
    dispatch(setCategory(updated));
  };

  return (
    <div>
      <Select
        options={options}
        isMulti={true}
        onChange={handleSelectChange}
        styles={customSelectStyles}
        placeholder={placeholder}
        closeMenuOnSelect={true}
        isClearable={false}
        value={selectedOptions}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
      />

      {/* Кастомні теги - відображаємо labels для знайдених опцій */}
      {selectedValues.length > 0 && (
        <div className={styles.selectedTags}>
          {selectedValues.map((value) => {
            const option = options.find((opt) => {
              return opt.value === value;
            });

            if (!option) return null; // Якщо опція не знайдена, не відображаємо тег

            return (
              <span key={value} className={styles.tag}>
                {option.label}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveTag(value)}
                  aria-label={`Remove ${option.label}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
