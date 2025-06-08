// toastUtils.ts
import { toast } from 'react-toastify';
import CustomToast from './CustomToast';

export const showSuccessToast = (message = 'Успіх') => {
  toast(<CustomToast message={message} type="success" />);
};

export const showErrorToast = (message = 'Сталася помилка') => {
  toast(<CustomToast message={message} type="error" />);
};
