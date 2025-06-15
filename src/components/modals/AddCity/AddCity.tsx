import { miniIcons } from '../../../assets/images/miniIcons';
import styles from './AddCity.module.scss';
import { citiesList } from '../../../resources/cites/citiesList';
import CustomCitySelect from '../../base/customSelect/customCitySelect/CustomCitySelect';
import { useEffect, useState } from 'react';
import { Button } from '../../base/button/Button';
import { booksApi } from '@/api/booksApi';
import { Loader } from '@/components/base/Loader/Loader';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { fetchUser } from '@/features/authSlice/authSlice';
import { showErrorToast } from '@/components/customToast/toastUtils';

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
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const dispatch = useAppDispatch();

  const setUserCity = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    setError(false);

    console.log(selectedCity);

    try {
      if (selectedCity) {
        await booksApi.setUserCity(selectedCity.nameUa);
        setStatusMessage('Місто успішно оновлено');
      }
    } catch {
      setStatusMessage('Помилка при оновленні міста ❌');
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      showErrorToast('Сталася помилка при оновленні міста ❌');
    }
  }, [error]);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
        dispatch(fetchUser());
        onClose();
      }, 1000);
      console.log(statusMessage);

      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  return (
    <div className={styles.addCity}>
      <div className={styles.content}>
        {statusMessage ? (
          <SuccessModal title={statusMessage} />
        ) : (
          <>
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
              Це потрібно, щоб ви могли обмінюватися книжками особисто з користувачами у
              вашому місті. Ви зможете змінити цю інформацію пізніше в налаштуваннях
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
              <div className={styles.buttonAccept} onClick={setUserCity}>
                <Button
                  _name={isLoading ? <Loader /> : 'Підтвердити'}
                  _buttonVariant="blue"
                  _type="button"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
