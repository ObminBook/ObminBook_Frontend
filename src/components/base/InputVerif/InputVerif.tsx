import React, { useEffect, useRef } from 'react';
import styles from './InputVerif.module.scss';
import { select, setStateError } from '../../../features/authSlice/authSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../reduxHooks/useAppDispatch';

type Props = {
  length?: number;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

const InputVerif: React.FC<Props> = ({ length = 6, setCode }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const isError = useSelector(select.error);
  const isCodeResent = useSelector(select.isCodeResent);
  const dispatch = useAppDispatch();

  const emitCode = () => {
    const currentCode = inputsRef.current
      .map((input) => input?.value || '')
      .join('');
    setCode(currentCode);
  };

  useEffect(() => {
    if (isCodeResent) {
      inputsRef.current.forEach((input) => {
        if (input) input.value = '';
      });
      inputsRef.current[0]?.focus();
    }
  }, [isCodeResent]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, '');

    if (!value) return;

    const chars = value.split('');

    for (let i = 0; i < chars.length && index + i < length; i++) {
      const input = inputsRef.current[index + i];
      if (input) {
        input.value = chars[i];
      }
    }

    const nextIndex = Math.min(index + chars.length, length - 1);

    setTimeout(() => {
      inputsRef.current[nextIndex]?.focus();
    }, 0);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    if (isError) {
      dispatch(setStateError(null));
    }

    if (e.key === 'Backspace') {
      const input = inputsRef.current[index];
      if (input?.value === '') {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onInput={emitCode}
          className={`${styles.inputCell} ${isError && styles.inputCell__err}`}
        />
      ))}
    </div>
  );
};

export default InputVerif;
