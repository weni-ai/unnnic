// Core component prop types
export * from './components';

// Common types used across components
export type ColorScheme = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral-darkest'
  | 'neutral-dark'
  | 'neutral-clean'
  | 'neutral-white'
  | 'aux-green-500'
  | 'aux-red-500'
  | 'aux-yellow-500'
  | 'aux-purple';

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type InputType = 'normal' | 'error';

export type ButtonType = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'alternative'
  | 'warning'
  | 'attention';

export type ComponentVariant = 'default' | 'filled' | 'outlined' | 'text';
