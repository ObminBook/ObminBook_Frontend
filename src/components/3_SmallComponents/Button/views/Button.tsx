import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonStyleProps {
  _iconPosition?: 'left' | 'right';
  _icon?: string;
  _fontSize?: 'bold' | 'regular';
  _buttonColor:
    | 'default'
    | 'blue'
    | 'green'
    | 'red'
    | 'transparent'
    | 'blueTransparent'
    | 'transparentNoBorder';
  _classname?: string;
}

interface ButtonProps extends ButtonStyleProps {
  _type?: 'button' | 'submit';
  onClick?: () => void;
  _disabled?: boolean;
  _name: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      type={props._type}
      className={classNames(
        props._classname,
        styles['button'],
        styles[
          `button--color-${props._buttonColor}${
            (props._disabled && '--disabled') || ''
          }`
        ],
        styles[`button--font-${props._fontSize}`]
      )}
      onClick={props.onClick}
    >
      {props._icon && <img src={props._icon} alt="button__icon" />}
      {props._name}
    </button>
  );
};
