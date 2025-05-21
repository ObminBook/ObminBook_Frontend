import { miniIcons } from '../../../assets/images/miniIcons';
import styles from './AddCity.module.scss';
import { citiesList } from '../../../resources/cites/citiesList';
import CustomCitySelect from '../../base/customSelect/customCitySelect/CustomCitySelect';
import { useState } from 'react';
import { Button } from '../../base/button/Button';

// Оголошуємо тип для опцій
type CityOption = {
  id: number;
  country: string;
  nameUa: string;
};

interface Props {
  onClose: () => void;
}

export const AddCity: React.FC<Props> = ({ onClose }) => {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  return (
    <div className={styles.addCity}>
      <div className={styles.content}>
        <img
          src={miniIcons.closeIcon}
          className={styles.closeIcon}
          onClick={(ev) => {
            ev.stopPropagation();
            onClose();
          }}
        />
        <h2 className={styles.title}>Виберіть ваше місто</h2>
        <p className={styles.info}>
          Це потрібно, щоб ви могли обмінюватися книжками особисто з
          користувачами у вашому місті. Ви зможете змінити цю інформацію пізніше
          в налаштуваннях
        </p>

        <div className={styles.cityTitle}>Місто</div>
        <div className={styles.selectContainer}>
          <CustomCitySelect
            options={citiesList}
            value={selectedCity}
            onChange={setSelectedCity}
          />
        </div>

        <div className={styles.buttons}>
          <div className={styles.buttonCancel}>
            <Button _name="Скасувати" _type="button" _buttonVariant="social" />
          </div>
          <div className={styles.buttonAccept}>
            <Button _name="Підтвердити" _buttonVariant="blue" _type="button" />
          </div>
        </div>
      </div>
    </div>
  );
};
