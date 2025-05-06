import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.scss';
import { Header } from '../../components/layout/Header/Header';
import SingleCheckboxContainer from '../../components/base/checkbox/containers/SingleCheckboxContainer';
import errIcon from '../../assets/images/input/errIcon.svg';
import { useState } from 'react';
import { inputIcons } from '../../assets/images/registerLogin';
import { Button } from '../../components/base/button/Button';
import { miniIcons } from '../../assets/images/miniIcons';
import { Footer } from '../../components/layout/Footer/Footer';

const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type Errors = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  type FormValues = {
    email: string;
    password: string;
    rememberMe: boolean;
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const validate = (values: FormValues) => {
    const errors: Errors = {};

    if (!values.email) {
      errors.email = 'Обовʼязкове поле';
    } else if (!regEmail.test(values.email)) {
      errors.email = 'Некоректний email';
    }

    if (!values.password) {
      errors.password = 'Обовʼязкове поле';
    }
    return errors;
  };

  return (
    <div className={styles.loginPage}>
      <Header centerLogo={true} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={styles.form}>
            <h2 className={styles.title}>Вхід до облікового запису</h2>

            <div className={styles.control}>
              <div className={styles.inputs}>
                <div className={styles.inputContainer}>
                  <label className={styles.inputTitle} htmlFor="email">
                    Email
                  </label>
                  <Field
                    id="email"
                    type="text"
                    name="email"
                    placeholder="example@email.com"
                    className={styles.input}
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className={styles.errorContainer}>
                        <img
                          className={styles.errorImg}
                          src={errIcon}
                          alt="error icon"
                        />
                        <div className={styles.error}>{msg}</div>
                      </div>
                    )}
                  </ErrorMessage>
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
                  <Field
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Введіть пароль"
                    className={styles.input}
                  />
                  <img
                    className={styles.eye}
                    src={showPassword ? inputIcons.eyeOn : inputIcons.eyeOff}
                    alt="toggle visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className={styles.errorContainer}>
                        <img
                          className={styles.errorImg}
                          src={errIcon}
                          alt="error icon"
                        />
                        <div className={styles.error}>{msg}</div>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              <div className={styles.rememberMe}>
                <label
                  className={styles.rememberMe}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setFieldValue('rememberMe', !values.rememberMe)
                  }
                >
                  <SingleCheckboxContainer name="rememberMe" alt="checkbox" />
                  <span className={styles.inputTitle}>Запам'ятати мене</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.buttonLogin}
              >
                Увійти
              </button>

              <div className={styles.aboLine}>
                <div className={styles.abo}>АБО</div>
                <div className={styles.line}></div>
              </div>

              <div className={styles.logWithSocial}>
                <div className={styles.logWithSocialButton}>
                  <Button
                    _buttonVariant="social"
                    _name="Google"
                    _fontSize="bold"
                    _iconPosition="left"
                    _icon={miniIcons.iconGoogle}
                    _type="button"
                  />
                </div>
                <div className={styles.logWithSocialButton}>
                  <Button
                    _buttonVariant="social"
                    _name="Facebook"
                    _fontSize="bold"
                    _iconPosition="left"
                    _icon={miniIcons.iconFacebook}
                    _type="button"
                  />
                </div>
              </div>

              <div className={styles.footer}>
                <div style={{ alignSelf: 'center' }}>АБО</div>
                <p className={styles.register}>
                  Немає облікового запису?{' '}
                  <a className={styles.registerLink} href="/register">
                    Зареєструйтесь
                  </a>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Footer />
    </div>
  );
};

export default LoginPage;
