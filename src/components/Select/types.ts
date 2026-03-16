/**
 * Shared types for Select and MultiSelect components.
 */

export interface SelectOption {
  label?: string;
  value?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface SelectBaseProps {
  options: SelectOption[];
  itemLabel?: string;
  itemValue?: string;
  placeholder?: string;
  label?: string;
  type?: 'normal' | 'error';
  errors?: string | Array<string>;
  message?: string;
  size?: 'sm' | 'md';
  optionsLines?: number;
  enableSearch?: boolean;
  search?: string;
  locale?: string;
  disabled?: boolean;
  clearable?: boolean;
  returnObject?: boolean;
}

export interface SelectPopoverHeightParams {
  optionsLength: number;
  optionsLines: number;
  enableSearch: boolean;
  /** 'single' = Select (37px line), 'multi' = MultiSelect (22px line) */
  variant: 'single' | 'multi';
}
