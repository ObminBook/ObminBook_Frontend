import React from 'react';
import CheckboxView from '../views/CheckboxView';

interface IMultiCheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

const MultiSelectCheckboxContainer: React.FC<IMultiCheckboxProps> = ({
  isChecked,
  onChange,
}) => {
  return <CheckboxView checked={isChecked} onChange={onChange} />;
};

export default MultiSelectCheckboxContainer;
