import type { InjectionKey, Ref } from 'vue';

export const POPOVER_FOOTER_TARGET: InjectionKey<Ref<HTMLElement | null>> =
  Symbol('unnnicPopoverFooterTarget');
