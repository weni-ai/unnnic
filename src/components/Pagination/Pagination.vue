<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pagination">
    <UnnnicButton
      type="tertiary"
      size="small"
      iconCenter="arrow-left-1-1"
      :disabled="!canPrevious || disabled"
      data-test="previous-button"
      @click="previousPage"
    />

    <UnnnicButton
      v-for="(page, index) in pages"
      :key="index"
      :type="page === modelValue ? 'secondary' : 'tertiary'"
      size="small"
      :text="
        ['left-hidden', 'right-hidden'].includes(page as string)
          ? '...'
          : String(page)
      "
      :disabled="disabled"
      data-test="page-button"
      @click="selectPage(page)"
    />

    <UnnnicButton
      type="tertiary"
      size="small"
      iconCenter="arrow-right-1-1"
      :disabled="!canNext || disabled"
      data-test="next-button"
      @click="nextPage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import UnnnicButton from '../Button/Button.vue';

defineOptions({
  name: 'UnnnicPagination',
});

export type PaginationPage = number | 'left-hidden' | 'right-hidden';

export interface PaginationProps {
  modelValue?: number;
  max?: number;
  show?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  modelValue: 1,
  max: 1,
  show: 5,
  disabled: false,
});

const emit = defineEmits<{
  'update:model-value': [value: number];
}>();

const reference = ref(3);

const pages = computed((): PaginationPage[] => {
  const pagesList: PaginationPage[] = [];

  for (let i = 1; i <= props.max; i += 1) {
    pagesList.push(i);
  }

  const plus = props.show - 4;
  const maxToRemove = props.max - plus - 3;

  if (reference.value > 3) {
    const toRemove = reference.value - 2;
    const maxRemove = toRemove > maxToRemove ? maxToRemove : toRemove;
    pagesList.splice(1, maxRemove, 'left-hidden');
  }

  if (reference.value < props.max - plus - 1) {
    const toRemove = props.max - plus - reference.value;
    const maxRemove = toRemove > maxToRemove ? maxToRemove : toRemove;
    pagesList.splice(-(maxRemove + 1), maxRemove, 'right-hidden');
  }

  return pagesList;
});

const canPrevious = computed(() => props.modelValue > 1);

const canNext = computed(() => props.modelValue < props.max);

function setReference(value: number) {
  reference.value = value;
}

function selectPage(page: PaginationPage, dontEmit?: boolean) {
  if (page === 'left-hidden') {
    const pageNumber =
      (pages.value[pages.value.indexOf('left-hidden') + 1] as number) - 1;

    if (!dontEmit) {
      emit('update:model-value', pageNumber);
    }
    setReference(pageNumber);
  } else if (page === 'right-hidden') {
    const pageNumber =
      (pages.value[pages.value.indexOf('right-hidden') - 1] as number) + 1;

    if (!dontEmit) {
      emit('update:model-value', pageNumber);
    }

    if (pages.value.includes('left-hidden')) {
      setReference(
        (pages.value[pages.value.indexOf('left-hidden') + 1] as number) + 1,
      );
    } else {
      setReference(4);
    }
  } else if (!dontEmit) {
    emit('update:model-value', page);
  }
}

function previousPage() {
  if (canPrevious.value) {
    const pageNumber = props.modelValue - 1;

    selectPage(pageNumber);

    if (!pages.value.includes(pageNumber)) {
      setReference(pageNumber);
    }
  }
}

function nextPage() {
  if (canNext.value) {
    const pageNumber = props.modelValue + 1;

    selectPage(pageNumber);

    if (!pages.value.includes(pageNumber)) {
      setReference(pageNumber);
    }
  }
}

const pageNumber = props.modelValue;

selectPage(pageNumber, true);

if (!pages.value.includes(pageNumber)) {
  setReference(pageNumber);
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.pagination {
  display: flex;
  align-items: center;
  column-gap: $unnnic-space-2;
  user-select: none;
}
</style>
