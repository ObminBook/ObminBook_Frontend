import { useFormContext } from 'react-hook-form';
import styles from './AddBookForm.module.scss';
import { miniIcons } from '../../../assets/images/miniIcons';
import { ReactNode } from 'react';

interface Props {
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buildErrorMessage: (message: string) => ReactNode;
  previewImg: string | null;
}

const Step2: React.FC<Props> = ({ onImageSelect, previewImg, buildErrorMessage }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const selectedCondition = watch('condition');
  const conditionOptions = [
    {
      title: 'Як нова',
      description: 'Прочитана один-два рази, виглядає як нова',
    },
    {
      title: 'Дуже добра',
      description: 'Дбайливо збережена, незначні сліди, все ціле',
    },
    {
      title: 'Добра',
      description: 'Деякі ознаки зносу, всі сторінки цілі',
    },
    {
      title: 'Прийнятна',
      description: 'Помітні ознаки зносу, можливі помітки',
    },
  ];

  return (
    <div className={`${styles['step']} ${styles['step2']}`}>
      <p className={styles['step2__conditionTitle']}>
        Стан книги <span className={styles['required']}>*</span>
      </p>
      {errors.condition && buildErrorMessage(errors.condition.message as string)}

      <div className={styles['step2__options']}>
        {conditionOptions.map((option) => (
          <label
            key={option.title}
            className={`${styles['step2__option']} ${
              selectedCondition === option.title ? styles['step2__optionSelected'] : ''
            }`}
          >
            <input
              className={styles['step2__optionRadio']}
              type="radio"
              value={option.title}
              {...register('condition', {
                required: 'Оберіть стан книги',
              })}
            />
            <p className={styles['step2__optionTitle']}>{option.title}</p>
            <p className={styles['step2__optionDescription']}>{option.description}</p>
          </label>
        ))}
      </div>

      <p className={styles['step2__coverTitle']}>Обкладинка книги</p>

      <div className={styles['step2__addImageContainer']}>
        <label className={styles['step2__upload']} htmlFor="cover">
          <img
            className={styles['step2__uploadImg']}
            src={miniIcons.uploadBook}
            alt="uploadBookIcon"
          />
          <div className={styles['step2__uploadText']}>
            <p className={styles['step2__uploadTitle']}>Завантажити обкладинку</p>
            <p className={styles['step2__uploadImgtype']}>JPG, JPEG або PNG, макс. 5MB</p>
          </div>

          <input
            className={styles['step2__chooseImg']}
            id="cover"
            type="file"
            accept="image/*"
            onChange={onImageSelect}
          />

          <div className={styles['step2__fakeButton']}>Вибрати файл</div>
        </label>

        <div className={styles['step2__preview']}>
          {previewImg ? (
            <img
              src={previewImg}
              alt="Попередній перегляд"
              className={styles['step2__image']}
            />
          ) : (
            <div className={styles['step2__previewTextBox']}>
              <div className={styles['step2__previewText']}>
                Попередній перегляд обкладинки
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
