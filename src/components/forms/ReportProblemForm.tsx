import { SubmitHandler, useForm } from 'react-hook-form';
import { miniIcons } from '@/assets/images/miniIcons';
import { Button } from '../base/button/Button';
import { Loader } from '../base/Loader/Loader';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './ReportProblemForm.module.scss';

const schema = z.object({
  id: z
    .string()
    .min(6, 'ID повинен містити 6 цифр')
    .regex(/^\d{6}$/, 'ID повинен складатися лише з цифр'),
  problemType: z.enum(['NOT_SENT', 'BAD_CONDITION', 'RECEIVED_OTHER_BOOK', 'OTHER'], {
    errorMap: () => ({ message: 'Оберіть тип проблеми' }),
  }),
  problemDescription: z.string().optional(),
});

type FormFields = z.infer<typeof schema>;

export const ReportProblemForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const selectedRadio = watch('problemType');

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch {
      setError('problemType', {
        message: 'Сталася помилка. Спробуйте ще раз.',
      });
    }
  };

  return (
    <form className={styles.form} action="" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.idBlock}>
        <h5 className={styles.title}>ID угоди</h5>
        <input
          className={styles.idInput}
          {...register('id', {
            onChange: (e) => {
              if (!/^\d{0,6}$/.test(e.target.value)) {
                e.preventDefault();
              }
            },
          })}
          type="text"
          placeholder="######"
          maxLength={6}
        />

        {errors.id && <div className={styles.errorMessage}>{errors.id.message}</div>}
        <p className={styles.idDescription}>
          Його можна знайти на сторінці вашого профілю у “Всі запити”
        </p>
      </div>
      <div className={styles.problemTypes}>
        <h5 className={styles.title}>Тип проблеми</h5>

        <label>
          <div className={styles.problemTypes__radioContainer}>
            <img
              className={styles.problemTypes__fakeRadio}
              src={
                selectedRadio === 'NOT_SENT'
                  ? miniIcons.radioChecked
                  : miniIcons.radioUnchecked
              }
              alt="radio"
            />
            <input
              className={styles.problemTypes__radio}
              type="radio"
              value="NOT_SENT"
              {...register('problemType')}
            />
            <div className={styles.problemTypes__radioValue}>Книга не була надіслана</div>
          </div>
          <p className={styles.problemTypes__radioDescr}>
            Користувач погодився на обмін, але не надіслав книгу у визначений термін
          </p>
        </label>

        <label>
          <div className={styles.problemTypes__radioContainer}>
            <img
              className={styles.problemTypes__fakeRadio}
              src={
                selectedRadio === 'BAD_CONDITION'
                  ? miniIcons.radioChecked
                  : miniIcons.radioUnchecked
              }
              alt="radio"
            />
            <input
              className={styles.problemTypes__radio}
              type="radio"
              value="BAD_CONDITION"
              {...register('problemType')}
            />
            <div className={styles.problemTypes__radioValue}>
              Стан книги не відповідає опису
            </div>
          </div>
          <p className={styles.problemTypes__radioDescr}>
            Отримана книга має пошкодження або дефекти, які не були вказані в описі
          </p>
        </label>

        <label>
          <div className={styles.problemTypes__radioContainer}>
            <img
              className={styles.problemTypes__fakeRadio}
              src={
                selectedRadio === 'RECEIVED_OTHER_BOOK'
                  ? miniIcons.radioChecked
                  : miniIcons.radioUnchecked
              }
              alt="radio"
            />
            <input
              className={styles.problemTypes__radio}
              type="radio"
              value="RECEIVED_OTHER_BOOK"
              {...register('problemType')}
            />
            <div className={styles.problemTypes__radioValue}>Отримана інша книга</div>
          </div>
          <p className={styles.problemTypes__radioDescr}>
            Отримана книга відрізняється від тієї, про яку була домовленість
          </p>
        </label>

        <label>
          <div className={styles.problemTypes__radioContainer}>
            <img
              className={styles.problemTypes__fakeRadio}
              src={
                selectedRadio === 'OTHER'
                  ? miniIcons.radioChecked
                  : miniIcons.radioUnchecked
              }
              alt="radio"
            />
            <input
              className={styles.problemTypes__radio}
              type="radio"
              value="OTHER"
              {...register('problemType')}
            />
            <div className={styles.problemTypes__radioValue}>Інша проблема</div>
          </div>
          <p className={styles.problemTypes__radioDescr}>
            Опишіть проблему детально в полі нижче
          </p>
        </label>

        {errors.problemType && (
          <div className={styles.errorMessage}>{errors.problemType.message}</div>
        )}
      </div>

      <div className={styles.problemDescription}>
        <h5 className={styles.title}>Опис проблеми</h5>
        <textarea
          placeholder="Опишіть проблему детально, вказавши дати та інші важливі деталі"
          className={styles.textarea}
          {...register('problemDescription')}
        />
      </div>

      <div className={styles.submitButton}>
        <Button
          _buttonVariant="blue"
          _name={isSubmitting ? <Loader /> : 'Надіслати скаргу'}
          _type="submit"
        />
      </div>
    </form>
  );
};
