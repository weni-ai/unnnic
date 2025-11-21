<template>
  <header
    :class="`page-header 
      ${hasBackButton ? 'page-header--has-back-button' : ''} 
      ${$slots.tabs ? 'page-header--has-tabs' : ''}
    `"
  >
    <UnnnicButton
      v-if="hasBackButton"
      data-testid="back-button"
      type="tertiary"
      iconCenter="arrow_back_ios_new"
      class="page-header__back-button"
      @click="handleBackClick"
    />

    <section class="page-header__infos">
      <section class="page-header__main-infos">
        <h1
          class="page-header__title"
          data-testid="page-title"
        >
          {{ title }}
        </h1>

        <slot name="tag" />
      </section>

      <p
        v-if="description"
        class="page-header__description"
        data-testid="page-description"
      >
        {{ description }}
      </p>
    </section>

    <section
      v-if="$slots.actions"
      class="page-header__actions"
      data-testid="page-actions"
    >
      <slot name="actions" />
    </section>

    <section
      v-if="$slots.tabs"
      class="page-header__tabs"
      data-testid="page-tabs"
    >
      <slot name="tabs" />
    </section>
  </header>
</template>

<script setup lang="ts">
import UnnnicButton from '../Button/Button.vue';

import type { PageHeaderProps, PageHeaderEmits } from './types';

withDefaults(defineProps<PageHeaderProps>(), {
  description: '',
  hasBackButton: false,
});

const emit = defineEmits<PageHeaderEmits>();

const handleBackClick = (): void => {
  emit('back');
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-header {
  width: 100%;

  margin-top: $unnnic-space-2;
  padding-bottom: $unnnic-space-6;

  display: grid;
  gap: $unnnic-space-4;
  grid-template-columns: 1fr minmax(250px, 20%); // TODO: Verify if is 250px or 20% (8fr 2fr)
  align-items: center;

  border-bottom: 1px solid $unnnic-color-border-soft;

  &--has-back-button {
    grid-template-columns: auto 1fr minmax(250px, 20%);
  }

  &--has-tabs {
    border-bottom: none;
  }

  &__infos {
    display: flex;
    flex-direction: column;
    gap: $unnnic-space-2;
  }

  &__main-infos {
    display: flex;
    align-items: center;
    gap: $unnnic-space-2;
  }

  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: $unnnic-color-fg-emphasized;
    text-overflow: ellipsis;

    font: $unnnic-font-display-1;
  }

  &__description {
    color: $unnnic-color-fg-base;

    font: $unnnic-font-body;
  }

  &__actions {
    display: flex;
    gap: $unnnic-space-2;
    align-items: center;
    justify-content: flex-end;

    > * {
      width: 100%;
    }
  }

  &__tabs {
    grid-column: 1 / -1;
    grid-row: 2 / 3;
  }
}
</style>
