import type { SchemeColor } from "@/types/scheme-colors";

// Re-export SchemeColor for backward compatibility
export type { SchemeColor };

export type IconSize = 
  | 'nano'
  | 'xs'
  | 'sm'
  | 'ant'
  | 'md'
  | 'lg'
  | 'xl'
  | 'avatar-lg'
  | 'avatar-md'
  | 'avatar-sm'
  | 'avatar-xs'
  | 'avatar-nano';

export type LineHeight = 'sm' | 'md' | 'lg';

export interface IconProps {
  filled?: boolean;
  next?: boolean;
  icon?: string | null;
  clickable?: boolean;
  size?: IconSize;
  lineHeight?: LineHeight | null;
  scheme?: SchemeColor;
}
