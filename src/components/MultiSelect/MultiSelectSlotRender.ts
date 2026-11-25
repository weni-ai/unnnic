import { defineComponent, type PropType } from 'vue';

import type { MultiSelectOptionSlotProps } from '../Select/types';

/**
 * Renders the consumer's `#option` slot from a function prop.
 *
 * `UnnnicMultiSelect` cannot place a `<slot>` inside the popover content: a
 * forwarded slot makes Vue re-render the popover differently, which changes the
 * `aria-controls` timing and the existing snapshots. Passing the slot function
 * through a prop keeps flat lists rendering exactly as before.
 */
export default defineComponent({
  name: 'UnnnicMultiSelectSlotRender',
  props: {
    render: {
      type: Function as PropType<
        (props: MultiSelectOptionSlotProps) => unknown
      >,
      required: true,
    },
    slotProps: {
      type: Object as PropType<MultiSelectOptionSlotProps>,
      required: true,
    },
  },
  setup(props) {
    return () => props.render(props.slotProps) as never;
  },
});
