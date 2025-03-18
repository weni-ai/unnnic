<template>
  <section
    :class="{
      'unnnic-card-project': true,
      'unnnic-card-project--clickable': clickable,
      'unnnic-card-project--inactive': status === 'inactive',
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
          'unnnic-card-project__title--inactive': status === 'inactive',
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
          'unnnic-card-project__description--inactive': status === 'inactive',
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
      >
        <p>
          {{ i18n(status) }}
        </p>
        <UnnnicDropdown v-if="canUpdateStatus">
          <template #trigger>
            <UnnnicIcon
              icon="keyboard_arrow_down"
              size="sm"
              clickable
              :scheme="colorStatus"
            />
          </template>

          <UnnnicDropdownItem
            v-for="option in statusOptions"
            :key="option"
            @click="$emit('changeProjectStatus', option)"
          >
            {{ i18n(option) }}
          </UnnnicDropdownItem>
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
      defaultTranslations: {
        'in-test': {
          'pt-br': 'Em teste',
          en: 'In test',
          es: 'En prueba',
        },
        active: {
          'pt-br': 'Ativo',
          en: 'Active',
          es: 'Activo',
        },
        inactive: {
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
        active: 'aux-green-900',
        inactive: 'neutral-cloudy',
        'in-test': 'aux-orange-500',
      };

      return colorStatusMapper[this.status] || '';
    },
    statusOptions() {
      return ['active', 'in-test', 'inactive'].filter(
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
      console.log(event);
      this.$emit('click', { button: event?.button });
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

    &--inactive {
      color: $unnnic-color-neutral-clean;
    }
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

    :deep(.unnnic-dropdown__trigger) {
      display: flex;
    }

    &--active {
      background-color: $unnnic-color-aux-green-100;
      color: $unnnic-color-aux-green-900;
    }

    &--in-test {
      background-color: $unnnic-color-aux-orange-100;
      color: $unnnic-color-aux-orange-500;
    }

    &--inactive {
      background-color: $unnnic-color-neutral-soft;
      color: $unnnic-color-neutral-cloudy;
    }
  }
}
// .unnnic-card-project--inactive {
//   background-color: grey;
// }
</style>
