import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  classname?: string;
  name: string;
  iconPosition?: 'left' | 'right';
  icon?: string;
  fontSize?: 'bold' | 'regulare';
  buttonColor: 'default' | 'blue' | 'green' | 'red' | 'transparent';
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={classNames(
        props.classname,
        styles['button'],
        styles[`button--${props.buttonColor}`]
      )}
      onClick={props.onClick}
    >
      {props.icon && <img src={props.icon} alt="button-icon" />}
      {props.name}
    </button>
  );
};
