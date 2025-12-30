import type { SchemeColor } from '@/types/scheme-colors';

export type DisclaimerType =
  | 'informational'
  | 'success'
  | 'attention'
  | 'error'
  | 'neutral';

export interface DisclaimerProps {
  title?: string;
  description?: string;
  type?: DisclaimerType;
  icon?: string | undefined;
  iconColor?: SchemeColor | undefined;
}
