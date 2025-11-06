export type ButtonSize = 'small' | 'large' | 'extra-large';

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'warning'
  | 'attention';

export interface ButtonProps {
  size?: ButtonSize;
  text?: string;
  type?: ButtonType;
  float?: boolean;
  iconLeft?: string;
  iconRight?: string;
  iconCenter?: string;
  iconsFilled?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
