import React from 'react';
import imgChecked from '../../../../assets/images/checkbox/checked.svg';
import imgUnchecked from '../../../../assets/images/checkbox/unchecked.svg';

interface ICheckboxViewProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  alt?: string;
}

const CheckboxView: React.FC<ICheckboxViewProps> = ({
  checked,
  onChange,
  alt = 'checkbox',
}) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{ display: 'block', width: '16px', height: '16px' }}
    >
      <img
        src={checked ? imgChecked : imgUnchecked}
        alt={alt}
        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
      />
    </div>
  );
};

export default CheckboxView;
