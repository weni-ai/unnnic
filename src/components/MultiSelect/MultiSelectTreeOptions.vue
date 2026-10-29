<template>
  <div
    class="unnnic-multi-select__options"
    role="tree"
    aria-multiselectable="true"
  >
    <div
      v-for="group in props.groups"
      :key="String(group[0].option[props.itemValue])"
      class="unnnic-multi-select__option-group"
    >
      <UnnnicMultiSelectOption
        v-for="row in group"
        :key="String(row.option[props.itemValue])"
        :data-option-index="row.index"
        :label="String(row.option[props.itemLabel] ?? '')"
        :active="row.checkState"
        :focused="props.focusedIndex === row.index"
        :disabled="row.option.disabled"
        :level="row.level"
        :expandable="row.hasChildren"
        :expanded="row.isExpanded"
        :expandDisabled="props.expandDisabled"
        role="treeitem"
        :aria-level="row.level"
        :aria-checked="toAriaChecked(row.checkState)"
        :aria-expanded="row.hasChildren ? row.isExpanded : undefined"
        @update:model-value="emit('select', row.option, $event)"
        @update:expanded="emit('expand', row.option, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UnnnicMultiSelectOption from './MultiSelectOption.vue';

import {
  toAriaChecked,
  type TreeRow,
} from '../../composables/useMultiSelectTree';
import type { SelectOption } from '../Select/types';

defineOptions({
  name: 'UnnnicMultiSelectTreeOptions',
});

interface MultiSelectTreeOptionsProps {
  groups: TreeRow[][];
  itemLabel: string;
  itemValue: string;
  focusedIndex: number;
  expandDisabled?: boolean;
}

const props = withDefaults(defineProps<MultiSelectTreeOptionsProps>(), {
  expandDisabled: false,
});

const emit = defineEmits<{
  select: [option: SelectOption, selected: boolean];
  expand: [option: SelectOption, expanded: boolean];
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-multi-select__option-group {
  display: flex;
  flex-direction: column;
  gap: $unnnic-space-4;
}
</style>
