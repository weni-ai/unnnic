<template>
  <div
    :class="[
      'unnnic-multi-select__options',
      { 'unnnic-multi-select__options--custom-option': hasCustomOption },
    ]"
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
        :customLabel="hasCustomOption"
        role="treeitem"
        :aria-level="row.level"
        :aria-checked="toAriaChecked(row.checkState)"
        :aria-expanded="row.hasChildren ? row.isExpanded : undefined"
        @update:model-value="emit('select', row.option, $event)"
        @update:expanded="emit('expand', row.option, $event)"
      >
        <template #default>
          <UnnnicMultiSelectSlotRender
            v-if="props.renderOption"
            :render="props.renderOption"
            :slotProps="
              toOptionSlotProps(row, props.itemLabel, props.focusedIndex)
            "
          />
        </template>
      </UnnnicMultiSelectOption>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import UnnnicMultiSelectOption from './MultiSelectOption.vue';
import UnnnicMultiSelectSlotRender from './MultiSelectSlotRender';

import { toOptionSlotProps } from '../../composables/useMultiSelectRows';
import type { OptionRow } from '../../composables/useMultiSelectRows';
import type { CheckboxValue } from '../Checkbox/Checkbox.vue';
import type { MultiSelectOptionSlotProps, SelectOption } from '../Select/types';

defineOptions({
  name: 'UnnnicMultiSelectTreeOptions',
});

interface MultiSelectTreeOptionsProps {
  groups: OptionRow[][];
  itemLabel: string;
  itemValue: string;
  focusedIndex: number;
  renderOption?: (props: MultiSelectOptionSlotProps) => unknown;
}

const props = defineProps<MultiSelectTreeOptionsProps>();

const hasCustomOption = computed(() => !!props.renderOption);

const emit = defineEmits<{
  select: [option: SelectOption, selected: boolean];
  expand: [option: SelectOption, expanded: boolean];
}>();

function toAriaChecked(state: CheckboxValue) {
  if (state === 'less') return 'mixed';
  return state ? 'true' : 'false';
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-multi-select__option-group {
  display: flex;
  flex-direction: column;
  gap: $unnnic-space-4;
}
</style>
