/**
 * Shared types for Select and MultiSelect components.
 */

import type { CheckboxValue } from '../Checkbox/Checkbox.vue';

export interface SelectOption {
  label?: string;
  value?: string;
  disabled?: boolean;
  children?: SelectOption[];
  [key: string]: unknown;
}

/** Props of the `#option` slot of `UnnnicMultiSelect`. */
export interface MultiSelectOptionSlotProps {
  option: SelectOption;
  label: string;
  /** `'less'` marks a partially checked parent in tree mode. */
  active: CheckboxValue;
  focused: boolean;
  index: number;
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
