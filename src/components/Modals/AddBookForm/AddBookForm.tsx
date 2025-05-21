import { useEffect, useState } from 'react';
import styles from './AddBookForm.module.scss';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Button } from '../../base/button/Button';
import { miniIcons } from '../../../assets/images/miniIcons';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import errIcon from '../../../assets/images/input/errIcon.svg';

import { z } from 'zod';
import { useAppDispatch } from '@/reduxHooks/useAppDispatch';
import { addBook } from '@/features/addBookSlice/addBookSlice';
import { AddBookRequest } from '@/types/Book';

const bookFormSchema = z.object({
  title: z.string().min(1, 'Назва обовʼязкова'),
  author: z.string().min(1, 'Імʼя автора обовʼязкове'),
  category: z.string().min(1, 'Оберіть категорію'),
  language: z.string().min(1, 'Оберіть мову'),
  year: z.string().optional(),
  pages: z.string().optional(),
  description: z.string().optional(),
  condition: z.string().min(1, 'Оберіть один з доступних нижче варіантів'),
  cover: z.any().optional(),
  // .refine((file) => file instanceof File && file.size > 0, {
  //   message: 'Додайте зображення обкладинки',
  // }),
  exchangeMethod: z.string().min(1, 'Оберіть спосіб обміну'),
});

interface Props {
  onClose: () => void;
}

type BookFormSchema = z.infer<typeof bookFormSchema>;

export const AddBookForm: React.FC<Props> = ({ onClose }) => {
  const methods = useForm<BookFormSchema>({
    mode: 'onChange',
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: '',
      author: '',
      category: '',
      language: '',
      year: '',
      pages: '',
      description: '',
      condition: '',
      cover: null,
      exchangeMethod: '',
    },
  });

  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<BookFormSchema> = async (data) => {
    const bookPayload: AddBookRequest = {
      title: data.title,
      author: data.author,
      category: data.category,
      language: data.language,
      publishedYear: data.year ? Number(data.year) : null,
      numberOfPages: data.pages ? Number(data.pages) : null,
      description: data.description || null,
      condition: data.condition,
      exchangeType: data.exchangeMethod,
    };

    try {
      await dispatch(addBook(bookPayload)).unwrap();
      // Якщо успішно, можна закрити форму або показати повідомлення
      onClose();
    } catch (error) {
      // Обробка помилки (наприклад, показати повідомлення)
      console.error('Failed to add book:', error);
    }
  };

  const stepName: Record<number, string> = {
    0: 'Деталі книги',
    1: 'Стан книги та зображення',
    2: 'Спосіб обміну',
  };

  const getStepFields = (step: number): (keyof BookFormSchema)[] => {
    switch (step) {
      case 0:
        return [
          'title',
          'author',
          'category',
          'language',
          'year',
          'pages',
          'description',
        ];
      case 1:
        return ['condition', 'cover'];
      case 2:
        return ['exchangeMethod'];
      default:
        return [];
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    methods.setValue('cover', file, { shouldValidate: true });

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const buildErrorMessage = (message: string) => (
    <div className={styles['errorGroup']}>
      <img className={styles['errorIcon']} src={errIcon} alt="error icon" />
      <div className={styles['error']}>{message}</div>
    </div>
  );

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const nextStep = async () => {
    const fields = getStepFields(step);
    const valid = await methods.trigger(fields);

    if (!valid) {
      console.log('Validation errors:', methods.formState.errors);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleCloseForm = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    onClose();
    console.log('Form closed');
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.bookForm}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <h2 className={styles.title}>Завантажити нову книгу</h2>
          <h5 className={styles.subtitle}>
            Поділіться своїми книгами зі спільнотою для обміну
          </h5>

          <div className={styles.progress}>
            <div className={styles.stepAbout}>
              <p className={styles.stepNumber}>Крок {step + 1} з 3</p>
              <p className={styles.about}>{stepName[step]}</p>
            </div>
            <div
              className={`${styles['bar']} ${styles[`bar--${step + 1}`]}`}
            ></div>
          </div>

          {step === 0 && <Step1 buildErrorMessage={buildErrorMessage} />}
          {step === 1 && (
            <Step2
              onImageSelect={handleImageChange}
              previewImg={preview}
              buildErrorMessage={buildErrorMessage}
            />
          )}
          {step === 2 && <Step3 buildErrorMessage={buildErrorMessage} />}

          <div className={styles.buttons}>
            {step > 0 ? (
              <div
                className={`${styles.buttonContainer} ${styles.buttonContainer__left}`}
                onClick={(e) => {
                  e.stopPropagation();
                  prevStep();
                }}
              >
                <Button
                  _buttonVariant="social"
                  _name="Назад"
                  _icon={miniIcons.arrowBackBlack}
                  _iconPosition="left"
                />
              </div>
            ) : (
              <div
                className={`${styles.buttonContainer} ${styles.buttonContainer__left}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <Button
                  _buttonVariant="social"
                  _name="Скасувати"
                  _fontSize="bold"
                  _type="button"
                />
              </div>
            )}

            <div
              className={`${styles.buttonContainer} ${styles.buttonContainer__right}`}
              onClick={async (e) => {
                e.stopPropagation();
                if (step === 2) {
                  methods.handleSubmit(onSubmit)();
                } else {
                  await nextStep();
                }
              }}
            >
              <Button
                _buttonVariant="blue"
                _name={step === 2 ? 'Завантажити' : 'Далі'}
                _icon={step !== 2 ? miniIcons.arrowRightWhite : null}
                _iconPosition="right"
                _type="button"
                onClick={handleCloseForm}
              />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
