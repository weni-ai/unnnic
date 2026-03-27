export interface PageHeaderProps {
  title: string;
  description?: string;

  hasBackButton?: boolean;
  hideDivider?: boolean;
}

export interface PageHeaderEmits {
  (event: 'back'): void;
}
