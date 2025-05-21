import { Controller, useFormContext } from 'react-hook-form';
import styles from './AddBookForm.module.scss';
import { ReactNode } from 'react';
import { CustomFormSelect } from '../../base/customSelect/customFormSelect/CustomFormSelect';
import { languages as languageOptions } from '../../../resources/languages/languages';
import { bookCategories as categoryOptions } from '../../../resources/bookCategories/bookCategories';
// Опції для селектів

interface Props {
  buildErrorMessage: (message: string) => ReactNode;
}

const Step1: React.FC<Props> = ({ buildErrorMessage }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${styles['step']} ${styles['step1']}`}>
      <div className={styles['step1__fieldContainer']}>
        Назва книги <span className={styles['required']}>*</span>
        <input
          {...register('title')}
          type="text"
          placeholder="Введіть назву книги"
          className={styles['step1__input']}
        />
        {errors.title && buildErrorMessage(errors.title.message as string)}
      </div>

      <div className={styles['step1__row']}>
        <div className={styles['step1__fieldContainer']}>
          Автор <span className={styles['required']}>*</span>
          <input
            {...register('author')}
            type="text"
            placeholder="Повне імʼя автора або псведонім"
            className={styles['step1__input']}
          />
          {errors.author && buildErrorMessage(errors.author.message as string)}
        </div>
      </div>

      <div className={styles['step1__row']}>
        <div className={styles['step1__fieldContainer']}>
          Категорія <span className={styles['required']}>*</span>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CustomFormSelect
                {...field}
                options={categoryOptions}
                placeholder="Виберіть категорію"
              />
            )}
          />
          {errors.category &&
            buildErrorMessage(errors.category.message as string)}
        </div>

        <div className={styles['step1__fieldContainer']}>
          Мова <span className={styles['required']}>*</span>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <CustomFormSelect
                {...field}
                options={languageOptions}
                placeholder="Виберіть мову"
              />
            )}
          />
          {errors.language &&
            buildErrorMessage(errors.language.message as string)}
        </div>
      </div>

      <div className={styles['step1__row']}>
        <div className={styles['step1__fieldContainer']}>
          Рік видання
          <input
            {...register('year')}
            type="number"
            placeholder="Наприклад, 2020"
            className={`${styles['step1__input']} ${styles['step1__inputNumber']}`}
          />
          {errors.year && buildErrorMessage(errors.year.message as string)}
        </div>

        <div className={styles['step1__fieldContainer']}>
          Кількість сторінок
          <input
            {...register('pages')}
            type="number"
            placeholder="Наприклад, 320"
            className={`${styles['step1__input']} ${styles['step1__inputNumber']}`}
          />
          {errors.pages && buildErrorMessage(errors.pages.message as string)}
        </div>
      </div>

      <textarea
        {...register('description')}
        placeholder="Опишіть сюжет, жанр або враження"
        className={styles['step1__textarea']}
        maxLength={700}
      />
      {errors.description &&
        buildErrorMessage(errors.description.message as string)}
    </div>
  );
};

export default Step1;
