import React from 'react';
import imgChecked from '../../../../assets/images/all_imgs/checkbox/checked.svg';
import imgUnchecked from '../../../../assets/images/all_imgs/checkbox/unchecked.svg';

interface ICheckboxViewProps {
  isChecked: boolean;
  onToggle: () => void;
  alt?: string;
}

const Checkbox: React.FC<ICheckboxViewProps> = ({
  isChecked,
  onToggle,
  alt = 'checkbox',
}) => {
  return (
    <div
      onClick={onToggle}
      style={{ display: 'block', width: '16px', height: '16px' }}
    >
      <img
        src={isChecked ? imgChecked : imgUnchecked}
        alt={alt}
        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
      />
    </div>
  );
};

export default Checkbox;
