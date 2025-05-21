import { useFormContext, Controller } from 'react-hook-form';
import { ICheckboxContainerProps } from '../../../../types/Checkbox';
import CheckboxView from '../views/CheckboxView';

const SingleCheckboxContainer = ({ name, alt }: ICheckboxContainerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CheckboxView
          alt={alt}
          checked={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
};

export default SingleCheckboxContainer;
