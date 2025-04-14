import React from 'react';
import { useFormikContext } from 'formik';
import CheckboxView from '../views/CheckboxView';
import { ICheckboxContainerProps } from '../../../types/Checkbox';

const SingleCheckboxContainer: React.FC<ICheckboxContainerProps> = ({
  name,
  alt,
}) => {
  const { values, setFieldValue } = useFormikContext<Record<string, boolean>>();
  const isChecked = Boolean(values[name]);

  const handleToggle = () => setFieldValue(name, !isChecked);

  return (
    <CheckboxView isChecked={isChecked} onToggle={handleToggle} alt={alt} />
  );
};

export default SingleCheckboxContainer;
