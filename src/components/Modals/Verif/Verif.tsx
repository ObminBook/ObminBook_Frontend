import { useEffect, useState } from 'react';
import { miniIcons } from '../../../assets/images/miniIcons';
import { Button } from '../../base/button/Button';
import InputVerif from '../../base/InputVerif/InputVerif';
import styles from './Verif.module.scss';
import { useAppDispatch } from '../../../reduxHooks/useAppDispatch';
import {
  select,
  setDefault,
  verification,
} from '../../../features/authSlice/authSlice';
import { useSelector } from 'react-redux';
import { Loader } from '../../base/Loader/Loader';
import ResendCodeButton from '../../base/ResendCodeButton/ResendCodeButton';
import { useNavigate } from 'react-router-dom';

interface Props {
  enteredEmail: string;
  onResend: () => void;
}

export const Verif: React.FC<Props> = ({ enteredEmail, onResend }) => {
  const [code, setCode] = useState('');
  const verifStatus = useSelector(select.verificationStatus);

  const isVerifError = useSelector(select.error);
  const isLoading = verifStatus === 'loading';
  const isSuccess = verifStatus === 'succeeded';
  const isCodeResent = useSelector(select.isCodeResent);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(verification({ email: enteredEmail, code }));
  };

  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        dispatch(setDefault());
        navigate('/login');
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isSuccess]);

  return (
    <div className={styles.confirm}>
      <div className={styles.content}>
        {isSuccess ? (
          <div className={styles.verificationSuccess}>
            <img
              src={miniIcons.recentIcon}
              alt="Успішно"
              className={styles.successIcon}
            />
            <h2>Верифікація пройшла успішно!</h2>
          </div>
        ) : (
          <>
            <img
              className={styles.emailIcon}
              src={miniIcons.emailIcon}
              alt="confirmIcon"
            />
            <h4 className={styles.title}>Підтвердіть вашу електронну пошту</h4>
            <p
              className={styles.subtitle}
            >{`Ми надіслали 6-значний код підтвердження на адресу ${enteredEmail}`}</p>
            <p className={styles.enterInput}>Введіть код підтвердження нижче</p>
            <div className={styles.inputCode}>
              <InputVerif setCode={setCode} />
            </div>
            {isVerifError && (
              <div className={styles.errMessage}>
                <img
                  className={styles.errIcon}
                  src={miniIcons.errIcon}
                  alt="errIcon"
                />
                Код не дійсний. Спробуйте надіслати новий код
              </div>
            )}
            {!isVerifError && isCodeResent && (
              <div className={styles.codeResent}>
                <img
                  className={styles.codeResentImg}
                  src={miniIcons.recentIcon}
                  alt="recentIcon"
                />
                Новий код надіслано на вашу електронну пошту
              </div>
            )}
            <p className={styles.checkSpam}>
              Перевірте папку "Спам", якщо не бачите лист у вхідних
            </p>
            <div className={styles.sendAgainBox}>
              <div className={styles.didntRecieve}>Не отримали код?</div>
              <ResendCodeButton onResend={onResend} />
            </div>
            <div className={styles.buttons}>
              <div
                className={styles.cancelButt}
                onClick={() => {
                  dispatch(setDefault());
                }}
              >
                <Button
                  _name="Скасувати"
                  _buttonVariant="social"
                  _fontSize="bold"
                />
              </div>

              <div
                className={styles.submitButt}
                onClick={() => {
                  handleSubmit();
                  console.log('clicked');
                }}
              >
                <Button
                  _name={isLoading ? <Loader /> : 'Підтвердити Email'}
                  _buttonVariant="blue"
                  _icon={isLoading ? null : miniIcons.arrowRightWhite}
                  _iconPosition="right"
                  _type="button"
                  _disabled={code.length !== 6 ? true : false}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
