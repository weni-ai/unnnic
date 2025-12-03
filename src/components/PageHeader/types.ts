export interface PageHeaderProps {
  title: string;
  description?: string;

  hasBackButton?: boolean;
}

export interface PageHeaderEmits {
  (event: 'back'): void;
}
