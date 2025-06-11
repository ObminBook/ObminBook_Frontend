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
import { addBook, select } from '@/features/addBookSlice/addBookSlice';
import { getMyBooks } from '@/features/manageBookSlice/manageBookSlice';
import { showSuccessToast } from '@/components/customToast/toastUtils';
import { useSelector } from 'react-redux';
import { Loader } from '@/components/base/Loader/Loader';

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
  const isLoading = useSelector(select.loading);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<BookFormSchema> = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('category', data.category);
    formData.append('language', data.language);
    if (data.year) formData.append('publishedYear', data.year);
    if (data.pages) formData.append('numberOfPages', data.pages);
    if (data.description) formData.append('description', data.description);
    formData.append('condition', data.condition);
    formData.append('exchangeType', data.exchangeMethod);
    if (data.cover) {
      formData.append('cover', data.cover);
    }

    try {
      await dispatch(addBook(formData)).unwrap();
      dispatch(getMyBooks());

      onClose();
      showSuccessToast(`Книжка "${data.title}" була успішно додана!`);
    } catch (error) {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const nextStep = async () => {
    const fields = getStepFields(step);
    const valid = await methods.trigger(fields);

    if (valid) {
      setStep((prevStep) => prevStep + 1);
    } else {
      console.log('Validation errors:', methods.formState.errors);
    }
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleCloseForm = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    onClose();
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
            <div className={`${styles['bar']} ${styles[`bar--${step + 1}`]}`}></div>
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
                  _fontSize="bold"
                />
              </div>
            ) : (
              <div
                className={`${styles.buttonContainer} ${styles.buttonContainer__left}`}
                onClick={handleCloseForm}
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
                  await methods.handleSubmit(onSubmit)();
                } else {
                  await nextStep();
                }
              }}
            >
              <Button
                _buttonVariant="blue"
                _name={step === 2 ? isLoading ? <Loader /> : 'Завантажити' : 'Далі'}
                _icon={step !== 2 ? miniIcons.arrowRightWhite : null}
                _iconPosition="right"
                _type="button"
                _fontSize="bold"
              />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
