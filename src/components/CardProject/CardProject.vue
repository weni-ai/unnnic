<template>
  <section
    :class="{
      'unnnic-card-project': true,
      'unnnic-card-project--clickable': clickable,
      'unnnic-card-project--inactive': status === 'INACTIVE',
    }"
    @click.left.exact="emitClick"
    @click.middle.exact.prevent="emitClick"
    @click.ctrl="emitClick({ button: 1 })"
  >
    <section class="unnnic-card-project__header">
      <h1
        :title="name"
        :class="{
          'unnnic-card-project__title': true,
          'unnnic-card-project__title--inactive': status === 'INACTIVE',
        }"
      >
        {{ name }}
      </h1>
      <UnnnicDropdown
        v-if="showActions"
        position="bottom-left"
      >
        <template #trigger>
          <UnnnicIcon
            size="sm"
            icon="navigation-menu-vertical-1"
            clickable
            scheme="neutral-cleanest"
          />
        </template>

        <slot name="actions" />
      </UnnnicDropdown>
    </section>
    <section class="unnnic-card-project__description">
      <p
        :title="description"
        :class="{
          'unnnic-card-project__description': true,
          'unnnic-card-project__description--inactive': status === 'INACTIVE',
        }"
      >
        {{ description }}
      </p>
    </section>
    <section class="unnnic-card-project__bottom">
      <section
        :class="[
          'unnnic-card-project__status-chip',
          `unnnic-card-project__status-chip--${status}`,
        ]"
        @click.stop="handlerDropdownOpen()"
      >
        <p>
          {{ i18n(status) }}
        </p>
        <UnnnicIcon
          v-if="canUpdateStatus"
          icon="keyboard_arrow_down"
          size="sm"
          clickable
          :scheme="colorStatus"
        />
        <UnnnicDropdown
          :open="openDropdown"
          useOpenProp
          @update:open="openDropdown = $event"
        >
          <section class="unnnic-card-project__status-options-container">
            <UnnnicDropdownItem
              v-for="option in statusOptions"
              :key="option"
              class="status-option"
              @click="handlerClickDropdownItem(option)"
            >
              {{ i18n(option) }}
            </UnnnicDropdownItem>
          </section>
        </UnnnicDropdown>
      </section>
    </section>
  </section>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicDropdown from '../Dropdown/Dropdown.vue';
import UnnnicDropdownItem from '../Dropdown/DropdownItem.vue';

import i18n from '@/mixins/i18n';
export default {
  components: {
    UnnnicIcon,
    UnnnicDropdown,
    UnnnicDropdownItem,
  },

  mixins: [i18n],

  props: {
    name: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      required: true,
    },

    canUpdateStatus: {
      type: Boolean,
      default: false,
    },

    clickable: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click', 'changeProjectStatus'],

  data() {
    return {
      openDropdown: false,
      defaultTranslations: {
        IN_TEST: {
          'pt-br': 'Em teste',
          en: 'In test',
          es: 'En prueba',
        },
        ACTIVE: {
          'pt-br': 'Ativo',
          en: 'Active',
          es: 'Activo',
        },
        INACTIVE: {
          'pt-br': 'Inativo',
          en: 'Inactive',
          es: 'Inactivo',
        },
      },
    };
  },

  computed: {
    showActions() {
      const actions = this.$slots.actions?.();
      return !!actions.length;
    },
    colorStatus() {
      const colorStatusMapper = {
        ACTIVE: 'aux-green-900',
        INACTIVE: 'neutral-cloudy',
        IN_TEST: 'aux-orange-500',
      };

      return colorStatusMapper[this.status] || '';
    },
    statusOptions() {
      return ['ACTIVE', 'INACTIVE', 'IN_TEST'].filter(
        (option) => option !== this.status,
      );
    },
  },

  methods: {
    emitClick(event) {
      if (!this.clickable) return;
      // send button to handling open in new tab project
      // button 0 = left
      // button 1 = scroll (or ctrl + click)
      this.$emit('click', { button: event?.button });
    },
    handlerDropdownOpen() {
      if (!this.canUpdateStatus) return;
      this.openDropdown = !this.openDropdown;
    },
    handlerClickDropdownItem(option) {
      this.$emit('changeProjectStatus', option);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

* {
  margin: 0;
  padding: 0;
}

.unnnic-card-project {
  display: flex;
  flex-direction: column;
  gap: $unnnic-spacing-xs;
  padding: $unnnic-inset-sm;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  border-radius: $unnnic-border-radius-md;

  :deep(.unnnic-dropdown__content) {
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08);
    padding: $unnnic-spacing-nano;

    .unnnic-dropdown-item {
      padding: 0px $unnnic-spacing-nano;
      &:hover {
        border-radius: $unnnic-border-radius-sm;
        background: $unnnic-color-neutral-lightest;
      }
    }
    .unnnic-dropdown-item::before {
      content: none;
    }
  }

  &--inactive {
    background-color: $unnnic-color-neutral-lightest;
  }

  &--clickable {
    cursor: pointer;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: $unnnic-color-neutral-darkest;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-lg;
    font-weight: $unnnic-font-weight-bold;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;

    &--inactive {
      color: $unnnic-color-neutral-clean;
    }
  }

  &__description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $unnnic-color-neutral-dark;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    white-space: pre-line;
    min-height: 44px;

    &--inactive {
      color: $unnnic-color-neutral-clean;
    }
  }

  &__status-options-container {
    display: grid;
    gap: $unnnic-spacing-nano;
  }

  &__status-chip {
    display: flex;
    align-items: center;
    padding: $unnnic-spacing-nano $unnnic-spacing-ant;
    gap: $unnnic-spacing-nano;
    border-radius: $unnnic-border-radius-pill;
    max-width: fit-content;

    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;

    cursor: pointer;

    :deep(.unnnic-dropdown__trigger) {
      display: flex;
    }

    &--ACTIVE {
      background-color: $unnnic-color-aux-green-100;
      color: $unnnic-color-aux-green-900;
    }

    &--IN_TEST {
      background-color: $unnnic-color-aux-orange-100;
      color: $unnnic-color-aux-orange-500;
    }

    &--INACTIVE {
      background-color: $unnnic-color-neutral-soft;
      color: $unnnic-color-neutral-cloudy;
    }
  }
}
</style>
