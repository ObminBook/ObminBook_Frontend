import { FormProvider, useForm } from 'react-hook-form';
import styles from './LoginPage.module.scss';
import { Header } from '../../components/layout/Header/Header';
import SingleCheckboxContainer from '../../components/base/checkbox/containers/SingleCheckboxContainer';
import errIcon from '../../assets/images/input/errIcon.svg';
import { useEffect, useState } from 'react';
import { inputIcons } from '../../assets/images/registerLogin';
import { Button } from '../../components/base/button/Button';
import { miniIcons } from '../../assets/images/miniIcons';
import { Footer } from '../../components/layout/Footer/Footer';
import { login, select } from '../../features/authSlice/authSlice';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '@/components/base/Loader/Loader';

const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(select.loginStatus) === 'loading';
  const loginError = useSelector(select.error);

  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (values: FormValues) => {
    const toLogin = {
      email: values.email,
      password: values.password,
    };
    try {
      await dispatch(login(toLogin));
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://3.218.8.20/oauth2/authorization/google';
  };

  const rememberMeValue = watch('rememberMe');

  useEffect(() => {
    if (loginError?.field === 'login') {
      setError('password', { type: 'manual', message: loginError.message });
    }
  }, [loginError]);

  return (
    <div className={styles.loginPage}>
      <Header centerLogo={true} withSkeleton={false} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h2 className={styles.title}>Вхід до облікового запису</h2>

          <div className={styles.control}>
            <div className={styles.inputs}>
              <div className={styles.inputContainer}>
                <label className={styles.inputTitle} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="example@email.com"
                  className={styles.input}
                  {...register('email', {
                    required: 'Обовʼязкове поле',
                    pattern: {
                      value: regEmail,
                      message: 'Некоректний email',
                    },
                  })}
                />
                {errors.email && (
                  <div className={styles.errorContainer}>
                    <img className={styles.errorImg} src={errIcon} alt="error icon" />
                    <div className={styles.error}>{errors.email.message}</div>
                  </div>
                )}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.passwordHeader}>
                  <label className={styles.inputTitle} htmlFor="password">
                    Пароль
                  </label>
                  <a className={styles.forgotPassword} href="">
                    Забули пароль?
                  </a>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введіть пароль"
                  className={styles.input}
                  {...register('password', {
                    required: 'Обовʼязкове поле',
                  })}
                />
                <img
                  className={styles.eye}
                  src={showPassword ? inputIcons.eyeOn : inputIcons.eyeOff}
                  alt="toggle visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
                {errors.password && (
                  <div className={styles.errorContainer}>
                    <img className={styles.errorImg} src={errIcon} alt="error icon" />
                    <div className={styles.error}>{errors.password.message}</div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.rememberMe}>
              <label
                className={styles.rememberMe}
                style={{ cursor: 'pointer' }}
                onClick={() => setValue('rememberMe', !rememberMeValue)}
              >
                <SingleCheckboxContainer name="rememberMe" alt="checkbox" />
                <span className={styles.inputTitle}>Запам'ятати мене</span>
              </label>
            </div>

            <Button
              _buttonVariant="blue"
              _name={isLoading ? <Loader /> : 'Увійти'}
              _classname={styles.buttonLogin}
              _fontSize="bold"
              _type="submit"
            />

            <div className={styles.aboLine}>
              <div className={styles.abo}>АБО</div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.logWithSocial}>
              <div className={styles.logWithSocialButton} onClick={handleGoogleLogin}>
                <Button
                  _buttonVariant="social"
                  _name="Google"
                  _fontSize="bold"
                  _iconPosition="left"
                  _icon={miniIcons.iconGoogle}
                  _type="button"
                />
              </div>
            </div>

            <div className={styles.footer}>
              <div style={{ alignSelf: 'center' }}>АБО</div>
              <p className={styles.register}>
                Немає облікового запису?{' '}
                <Link className={styles.register__link} to="/register">
                  Зареєструйтесь
                </Link>
              </p>
            </div>
          </div>
        </form>
      </FormProvider>

      <Footer />
    </div>
  );
};

export default LoginPage;
