import type { SchemeColor } from '@/types/scheme-colors';

export type ChipScheme = SchemeColor
export interface ChipProps {
  scheme?: ChipScheme;
  text?: string;
  count?: number;
  icon?: string;
}
