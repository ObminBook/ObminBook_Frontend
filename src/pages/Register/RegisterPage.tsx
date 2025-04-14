import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './RegisterPage.module.scss';
import SingleCheckboxContainer from '../../components/Checkbox/containers/SingleCheckboxContainer';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/views/Button';

const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

type Errors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

const RegisterPage = () => {
  // const navigate = useNavigate();
  const { register } = useAuth();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  };

  const validate = (values: typeof initialValues) => {
    const errors: Errors = {};

    if (!values.firstName) errors.firstName = 'Обовʼязкове поле';
    if (!values.lastName) errors.lastName = 'Обовʼязкове поле';

    if (!values.email) {
      errors.email = 'Обовʼязкове поле';
    } else if (!regEmail.test(values.email)) {
      errors.email = 'Некоректна електронна адреса';
    }

    if (!values.password) {
      errors.password = 'Обовʼязкове поле';
    } else if (!regPassword.test(values.password)) {
      errors.password =
        'Пароль має містити не менше 8 символів, одну велику літеру та одну цифру';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Обовʼязкове поле';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Паролі не співпадають';
    }

    if (!values.terms) {
      errors.terms = 'Ви маєте прийняти умови користування щоб продовжити';
    }

    return errors;
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await register(
        values.email,
        values.password,
        values.confirmPassword,
        values.firstName,
        values.lastName
      );
    } catch (error) {
      console.error('Registration error in UI:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles['register-page']}>
      <Header centerLogo={true} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={styles['register-page__form']}>
            <div className={styles['register-page__form-header']}>
              <h2 className={styles['register-page__title']}>
                Створити обліковий запис
              </h2>
              <p className={styles['register-page__subtitle']}>
                Введіть свої дані для реєстрації облікового запису
              </p>
            </div>

            <div className={styles['register-page__control']}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label
                    className={styles['register-page__input-title']}
                    htmlFor="firstName"
                  >
                    Ім’я
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Ваше ім’я"
                    className={`
                      ${styles['register-page__input']}
                      ${styles['register-page__input--name']}
                    `}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className={styles['register-page__error']}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    className={styles['register-page__input-title']}
                    htmlFor="lastName"
                  >
                    Прізвище
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Ваше прізвище"
                    className={`
                      ${styles['register-page__input']}
                      ${styles['register-page__input--name']}
                    `}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className={styles['register-page__error']}
                  />
                </div>
              </div>

              <div>
                <label
                  className={styles['register-page__input-title']}
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={styles['register-page__input']}
                  placeholder="Введіть вашу пошту"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles['register-page__error']}
                />
              </div>

              <div>
                <label
                  className={styles['register-page__input-title']}
                  htmlFor="password"
                >
                  Пароль
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className={styles['register-page__input']}
                  placeholder="Введіть пароль"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles['register-page__error']}
                />
              </div>

              <div>
                <label
                  className={styles['register-page__input-title']}
                  htmlFor="confirmPassword"
                >
                  Підтвердження паролю
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={styles['register-page__input']}
                  placeholder="Підтвердіть пароль"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles['register-page__error']}
                />
              </div>

              <div className={styles['register-page__social']}>
                <label
                  className={styles['register-page__terms-checkbox']}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFieldValue('terms', !values.terms)}
                >
                  <SingleCheckboxContainer name="terms" alt="checkbox" />
                  <span className={styles['register-page__input-title']}>
                    Я погоджуюсь з{' '}
                    <a className={styles['register-page__terms-link']} href="#">
                      умовами використання
                    </a>
                  </span>
                </label>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className={styles['register-page__error']}
                />

                <p className={styles['register-page__terms-text']}>
                  Натискаючи кнопку "Зареєструватися", ви погоджуєтесь з нашими
                  умовами користування та політикою конфіденційності.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                name="Зарєеструватися"
                classname={styles['register-page__button-register']}
                fontSize="bold"
                buttonColor="blue"
              />

              <div className={styles['register-page__footer']}>
                Вже маєте обліковий запис?{' '}
                <a
                  className={styles['register-page__register-link']}
                  href="/login"
                >
                  Увійти
                </a>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
