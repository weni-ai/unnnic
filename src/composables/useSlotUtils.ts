import type { VNode } from 'vue';
import { Comment, Fragment, Text, computed, useSlots } from 'vue';

export function isTextOnlySlot(vnodes: VNode[] | undefined): boolean {
  if (!vnodes?.length) return true;

  return vnodes.every((vnode) => {
    if (vnode.type === Comment || vnode.type === Text) return true;
    if (vnode.type === Fragment) {
      return isTextOnlySlot(vnode.children as VNode[]);
    }

    return false;
  });
}

export function useHasComponentContent(slotName = 'default') {
  const slots = useSlots();

  return computed(() => !isTextOnlySlot(slots[slotName]?.()));
}
