export interface ICheckboxViewProps {
  isChecked: boolean;
  onToggle: () => void;
  alt?: string;
}

export interface ICheckboxContainerProps {
  name: string;
  alt?: string;
}

export interface IMultiCheckboxProps {
  isChecked: boolean;
  onChange: (value: string) => void;
}
