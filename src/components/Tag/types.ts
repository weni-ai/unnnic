export type TagType = 'default' | 'brand' | 'next';
export type TagSize = 'small' | 'medium';

export interface TagProps {
  type?: TagType;
  size?: TagSize;
  text?: string;
  disabled?: boolean;
  scheme?: string;
  leftIcon?: string;
  hasCloseIcon?: boolean;
}

export interface DefaultTagProps {
  text?: string;
  size?: TagSize;
  scheme?: string;
  leftIcon?: string;
}
