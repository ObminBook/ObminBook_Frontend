import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonStyleProps {
  _iconPosition?: 'left' | 'right';
  _icon?: string | null;
  _fontSize?: 'bold' | 'regular';
  _buttonVariant:
    | 'default'
    | 'blue'
    | 'green'
    | 'red'
    | 'transparent'
    | 'blueTransparent'
    | 'transparentNoBorder'
    | 'social';
  _classname?: string;
}

interface ButtonProps extends ButtonStyleProps {
  _type?: 'button' | 'submit';
  _disabled?: boolean;
  _name: string | React.ReactNode;
  onClick?: (ev: React.MouseEvent) => void;
}

export const Button = (props: ButtonProps) => {
  const icon = props._icon && <img src={props._icon} alt="button__icon" />;

  return (
    <button
      type={props._type}
      disabled={props._disabled}
      className={classNames(
        props._classname,
        styles['button'],
        styles[
          `button--variant-${props._buttonVariant}${
            (props._disabled && '--disabled') || ''
          }`
        ],
        styles[`button--font-${props._fontSize}`]
      )}
      onClick={(ev) => props.onClick?.(ev)}
    >
      {props._iconPosition === 'left' && icon}
      {props._name}
      {props._iconPosition === 'right' && icon}
    </button>
  );
};
