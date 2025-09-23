export interface ChipProps {
  isSelected?: boolean;
  text?: string;
  count?: number;
  type: 'single' | 'multiple';
  isClickable?: boolean;
  onClick?: (event: Event) => void;
}
