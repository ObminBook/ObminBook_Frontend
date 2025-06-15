import { useForm, FormProvider } from 'react-hook-form'; // Додаємо FormProvider
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './RegisterPage.module.scss';
import { Button } from '../../components/base/button/Button';
import { Header } from '../../components/layout/Header/Header';
import SingleCheckboxContainer from '../../components/base/checkbox/containers/SingleCheckboxContainer';
import errIcon from '../../assets/images/input/errIcon.svg';
import { Footer } from '../../components/layout/Footer/Footer';
import { useEffect, useRef, useState } from 'react';
import { inputIcons } from '../../assets/images/registerLogin';
import { TermsPortal } from '@/components/modals/Terms';
import { miniIcons } from '../../assets/images/miniIcons';
import {
  register as registerUser,
  select,
  setCodeResent,
  setStateError,
} from '../../features/authSlice/authSlice';
import { useAppDispatch } from '../../reduxHooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { VerifPortal } from '@/components/modals/Verif/Verif_Portal';
import { Loader } from '../../components/base/Loader/Loader';
import { Link } from 'react-router-dom';

const schema = z
  .object({
    firstName: z.string().nonempty('Обовʼязкове поле'),
    lastName: z.string().nonempty('Обовʼязкове поле'),
    email: z.string().nonempty('Обовʼязкове поле').email('Некоректна електронна адреса'),
    password: z
      .string()
      .nonempty('Обовʼязкове поле')
      .min(8, 'Мінімум 8 символів, 1 літера, 1 цифра')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Мінімум 8 символів, 1 літера, 1 цифра'
      ),
    confirmPassword: z.string().nonempty('Обовʼязкове поле'),
    terms: z.boolean().refine((val) => val, {
      message: 'Ви маєте погодитися з умовами',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Паролі не співпадають',
  });

type RegisterFormValues = z.infer<typeof schema>;

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTermalModal, setShowTermalModal] = useState(false);

  const isVerificationRequired = useSelector(select.isVerificationRequired);
  const isLoading = useSelector(select.registerStatus) === 'loading';
  const registerError = useSelector(select.error);

  const dispatch = useAppDispatch();

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = methods;

  const termsChecked = watch('terms');

  useEffect(() => {
    if (registerError?.field === 'email') {
      setError('email', { type: 'manual', message: registerError.message });
    }
  }, [registerError]);

  const onSubmit = async (data: RegisterFormValues) => {
    console.log('Форма сабмітиться');

    // eslint-disable-next-line
    const { terms: _, ...dataToReg } = data;
    try {
      dispatch(registerUser(dataToReg));
    } catch (err) {
      console.error('Registration error in UI:', err);
    }
  };

  const handleTermsClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setShowTermalModal(true);
  };

  const handleResend = async () => {
    await handleSubmit(onSubmit)();
    dispatch(setStateError(null));
    dispatch(setCodeResent(true));
  };

  return (
    <div className={styles.register}>
      <Header centerLogo={true} />
      {isVerificationRequired && (
        <VerifPortal email={watch('email')} onResend={handleResend} />
      )}

      <div className={styles.content}>
        <FormProvider {...methods}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles['form-header']}>
              <h2 className={styles.title}>Створити обліковий запис</h2>
              <p className={styles.subtitle}>
                Введіть свої дані для реєстрації облікового запису
              </p>
            </div>

            <div className={styles.control}>
              <div
                className={styles['input-group']}
                style={{ display: 'flex', gap: '16px' }}
              >
                {/* Імʼя */}
                <div style={{ flex: 1 }}>
                  <label className={styles['input-label']} htmlFor="firstName">
                    Ім’я
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Ваше ім’я"
                    className={`${styles.input} ${styles['input-name']}`}
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <div className={styles['error-group']}>
                      <img
                        className={styles['error-icon']}
                        src={errIcon}
                        alt="error icon"
                      />
                      <div className={styles.error}>{errors.firstName.message}</div>
                    </div>
                  )}
                </div>

                {/* Прізвище */}
                <div style={{ flex: 1 }}>
                  <label className={styles['input-label']} htmlFor="lastName">
                    Прізвище
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Ваше прізвище"
                    className={`${styles.input} ${styles['input-name']}`}
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <div className={styles['error-group']}>
                      <img
                        className={styles['error-icon']}
                        src={errIcon}
                        alt="error icon"
                      />
                      <div className={styles.error}>{errors.lastName.message}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Введіть вашу пошту"
                  className={styles.input}
                  {...register('email')}
                />
                {errors.email && (
                  <div className={styles['error-group']}>
                    <img
                      className={styles['error-icon']}
                      src={errIcon}
                      alt="error icon"
                    />
                    <div className={styles.error}>{errors.email.message}</div>
                  </div>
                )}
              </div>

              {/* Пароль */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']} htmlFor="password">
                  Пароль
                </label>
                <img
                  onClick={() => setShowPassword((p) => !p)}
                  className={styles['input-eye']}
                  src={showPassword ? inputIcons.eyeOn : inputIcons.eyeOff}
                  alt="eyeIcon"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введіть пароль"
                  className={styles.input}
                  {...register('password')}
                />
                {errors.password && (
                  <div className={styles['error-group']}>
                    <img
                      className={styles['error-icon']}
                      src={errIcon}
                      alt="error icon"
                    />
                    <div className={styles.error}>{errors.password.message}</div>
                  </div>
                )}
              </div>

              {/* Підтвердження паролю */}
              <div className={styles['input-group']}>
                <label className={styles['input-label']} htmlFor="confirmPassword">
                  Підтвердження паролю
                </label>
                <img
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className={styles['input-eye']}
                  src={showConfirmPassword ? inputIcons.eyeOn : inputIcons.eyeOff}
                  alt="eyeIcon"
                />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Підтвердіть пароль"
                  className={styles.input}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <div className={styles['error-group']}>
                    <img
                      className={styles['error-icon']}
                      src={errIcon}
                      alt="error icon"
                    />
                    <div className={styles.error}>{errors.confirmPassword.message}</div>
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className={styles.social}>
                <label
                  className={styles['terms-checkbox']}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setValue('terms', !termsChecked)}
                >
                  <SingleCheckboxContainer name="terms" alt="checkbox" />
                  <span className={styles['input-label']}>
                    Я погоджуюсь з{' '}
                    <span className={styles['terms-link']} onClick={handleTermsClick}>
                      умовами використання
                    </span>
                  </span>
                </label>
                {errors.terms && (
                  <div className={styles['error-group']} style={{ paddingLeft: '24px' }}>
                    <img
                      className={styles['error-icon']}
                      src={errIcon}
                      alt="error icon"
                    />
                    <div className={styles.error}>{errors.terms.message}</div>
                  </div>
                )}

                <div className={styles.termsText}>
                  Натискаючи кнопку "Зареєструватися", ви погоджуєтесь з нашими умовами
                  користування та політикою конфіденційності.
                </div>
              </div>

              <div className={styles.regButton}>
                <Button
                  _buttonVariant="blue"
                  _fontSize="bold"
                  _name={isLoading ? <Loader /> : 'Створити обліковий запис'}
                  _type="submit"
                ></Button>
              </div>

              <div className={styles.divider}>
                <div className={styles.dividerText}>АБО</div>
                <div className={styles.dividerLine}></div>
              </div>

              <div className={styles.socialRow}>
                <div className={styles.socialBtn}>
                  <Button
                    _icon={miniIcons.iconGoogle}
                    _iconPosition="left"
                    _buttonVariant="social"
                    _name="Google"
                    _type="button"
                  />
                </div>
              </div>

              <div className={styles.hasAccount}>
                <div className={styles.hasAccount__text}>Вже маєте обліковий запис?</div>
                <Link to="/login" className={styles.hasAccount__linkToLogin}>
                  Увійти
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      <Footer />
      {showTermalModal && <TermsPortal onClose={() => setShowTermalModal(false)} />}
    </div>
  );
};

export default RegisterPage;
