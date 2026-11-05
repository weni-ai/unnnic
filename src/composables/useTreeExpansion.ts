/**
 * Which tree parents are expanded. While searching, every parent starts
 * expanded and the user may still collapse it; that search-only state is
 * discarded when the search starts or ends, so the manual expansion is back
 * once the search is cleared.
 */
import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue';

export function useTreeExpansion(isSearchActive: MaybeRefOrGetter<boolean>) {
  const expandedValues = ref(new Set<unknown>());
  const searchCollapsedValues = ref(new Set<unknown>());

  watch(
    () => toValue(isSearchActive),
    () => {
      searchCollapsedValues.value = new Set();
    },
  );

  function isExpanded(value: unknown) {
    return toValue(isSearchActive)
      ? !searchCollapsedValues.value.has(value)
      : expandedValues.value.has(value);
  }

  function setExpanded(value: unknown, expanded = !isExpanded(value)) {
    const searching = toValue(isSearchActive);
    const target = searching ? searchCollapsedValues : expandedValues;
    const shouldInclude = searching ? !expanded : expanded;
    const next = new Set(target.value);

    if (shouldInclude) next.add(value);
    else next.delete(value);

    target.value = next;
  }

  function reset() {
    expandedValues.value = new Set();
    searchCollapsedValues.value = new Set();
  }

  return { isExpanded, setExpanded, reset };
}
