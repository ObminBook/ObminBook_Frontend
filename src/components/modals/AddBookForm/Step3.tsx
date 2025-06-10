import { useFormContext } from 'react-hook-form';
import styles from './AddBookForm.module.scss';
import { ReactNode } from 'react';

interface Props {
  buildErrorMessage: (message: string) => ReactNode;
}

const Step3: React.FC<Props> = ({ buildErrorMessage }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedCondition = watch('exchangeMethod');
  const exchangeOptions = [
    {
      title: 'Особисто',
      description:
        'Зустріньтеся з іншим користувачем у вашому місті, щоб обмінятись книжками напряму.',
    },
    {
      title: 'Поштою',
      description:
        'Надішліть книгу поштою — виберіть зручного перевізника і домовтесь про доставку.',
    },
    {
      title: 'Будь-який',
      description:
        'Підійде як зустріч, так і доставка поштою — домовитесь із користувачем після згоди на обмін.',
    },
  ];

  return (
    <div className={`${styles['step']} ${styles['step3']}`}>
      <p>
        Спосіб обміну <span className={styles.required}>*</span>
      </p>
      <div className={styles['step3__options']}>
        {exchangeOptions.map((option) => (
          <label
            key={option.title}
            className={`${styles['step3__option']} ${
              selectedCondition === option.title ? styles['step3__optionSelected'] : ''
            }`}
          >
            <input
              className={styles['step2__optionRadio']}
              type="radio"
              value={option.title}
              {...register('exchangeMethod', {
                required: 'Оберіть спосіб обміну',
              })}
            />
            <p className={styles['step3__optionTitle']}>{option.title}</p>
            <p className={styles['step3__optionDescription']}>{option.description}</p>
          </label>
        ))}
      </div>
      {errors.exchangeMethod &&
        buildErrorMessage(errors.exchangeMethod.message as string)}
    </div>
  );
};

export default Step3;
