import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.scss';
import iconEye from '../../assets/images/all_imgs/registerLogin/icon-eye.svg';
// import iconEyeOff from '../../assets/images/all_imgs/registerLogin/icon_eye-off.svg';
import { Header } from '../../components/1_BigComponents/Header/Header';
import SingleCheckboxContainer from '../../components/3_SmallComponents/Checkbox/containers/SingleCheckboxContainer';

const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

type Errors = {
  email?: string;
  password?: string;
};

const LoginPage = () => {
  const { login } = useAuth();
  // const navigate = useNavigate();

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
      // navigate('/profile');
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
    } else if (!regPassword.test(values.password)) {
      errors.password =
        'Пароль має бути не менше 8 символів і містити хоча б одну літеру та одну цифру';
    }

    return errors;
  };

  return (
    <div className={styles['login-page']}>
      <Header centerLogo={true} />

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={styles['login-page__form']}>
            <h2 className={styles['login-page__title']}>
              Вхід до облікового запису
            </h2>
            <div className={styles['login-page__control']}>
              <div>
                <label
                  className={styles['login-page__input-title']}
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  id="email"
                  type="text"
                  name="email"
                  placeholder="example@email.com"
                  className={styles['login-page__input']}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles['login-page__error']}
                />
              </div>

              <div className={styles['login-page__password']}>
                <div className={styles['login-page__password-header']}>
                  <label
                    className={styles['login-page__input-title']}
                    htmlFor="password"
                  >
                    Пароль
                  </label>
                  <a className={styles['login-page__forgot-password']} href="">
                    Забули пароль?
                  </a>
                </div>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Введіть пароль"
                  className={styles['login-page__input']}
                />
                <img
                  className={styles['login-page__eye']}
                  src={iconEye}
                  alt="toggle visibility"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles['login-page__error']}
                />
              </div>

              <div className={styles['login-page__remember-me']}>
                <label
                  className={styles['login-page__remember-me']}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setFieldValue('rememberMe', !values.rememberMe)
                  }
                >
                  <SingleCheckboxContainer name="rememberMe" alt="checkbox" />
                  <span className={styles['login-page__input-title']}>
                    Запам'ятати мене
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles['login-page__button-login']}
              >
                Увійти
              </button>

              <div className={styles['login-page__footer']}>
                <div style={{ alignSelf: 'center' }}>АБО</div>
                <p className={styles['login-page__register']}>
                  Немає облікового запису?{' '}
                  <a
                    className={styles['login-page__register-link']}
                    href="/register"
                  >
                    Зареєструйтесь
                  </a>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
