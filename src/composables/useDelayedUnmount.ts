import { type Ref, onBeforeUnmount, ref, watch } from 'vue';

/**
 * Keeps an overlay mounted for `delay` ms after it closes so the leave
 * animation can play, while still allowing lazy mounting on first open.
 *
 * Used internally by drawer/dialog components when `lazyMount` is enabled to
 * preserve their exit animation without keeping every overlay's portal
 * eagerly mounted in the DOM.
 */
export default function useDelayedUnmount(
  isOpen: Ref<boolean | undefined>,
  delay = 300,
): Ref<boolean> {
  const shouldRender = ref(!!isOpen.value);
  let timer: ReturnType<typeof setTimeout> | null = null;

  const clearTimer = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  watch(
    isOpen,
    (open) => {
      clearTimer();

      if (open) {
        shouldRender.value = true;
        return;
      }

      if (shouldRender.value) {
        timer = setTimeout(() => {
          shouldRender.value = false;
          timer = null;
        }, delay);
      }
    },
    { immediate: true },
  );

  onBeforeUnmount(clearTimer);

  return shouldRender;
}
