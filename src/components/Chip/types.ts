import type { SchemeColor } from '@/types/scheme-colors';

export type TealVariations = 
  | 'teal-50'
  | 'teal-100'
  | 'teal-200'
  | 'teal-300'
  | 'teal-400'
  | 'teal-500'
  | 'teal-600'
  | 'teal-700'
  | 'teal-800'
  | 'teal-900'
  | 'teal-950';

export type ChipScheme = SchemeColor | 'bg-base' | 'bg-soft' | TealVariations;

export interface ChipProps {
  scheme?: ChipScheme;
  text?: string;
  count?: number;
  icon?: string;
}
