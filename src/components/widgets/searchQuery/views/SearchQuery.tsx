import { inputIcons } from '../../../../assets/images/registerLogin';
import styles from './SearchQuery.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SearchQuery: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className={styles['searchQuery']}>
      <img
        src={inputIcons.loopa}
        className={styles['searchQuery__img']}
        alt="search"
      />
      <input
        type="text"
        placeholder={placeholder}
        className={styles['searchQuery__input']}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
