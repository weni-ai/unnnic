<template>
  <div class="unnnic-select-smart__options__multiple">
    <div
      v-if="selectedOptions[0]"
      class="unnnic-select-smart__options__multiple__selecteds__container"
    >
      <div class="unnnic-select-smart__options__multiple__selecteds">
        <Tag
          v-for="option in firstMultipleSelecteds"
          :key="option.value"
          class="unnnic-select-smart__options__multiple__selecteds__option"
          :text="option.label"
          hasCloseIcon
          @close="unselectOption(option)"
        />
        <p
          v-if="selectedOptions.length > multipleSelectedsTags"
          class="unnnic-select-smart__options__multiple__selecteds__remaining"
          data-testid="remaining-count"
        >
          +{{ selectedOptions.length - multipleSelectedsTags }}
        </p>
      </div>
    </div>
    <p
      v-if="!selectedOptions[0]"
      class="unnnic-select-smart__options__multiple--without-multiples"
      data-testid="without-selects-message"
    >
      {{ withoutSelectsMessage || i18n('without_multiple_selected') }}
    </p>
  </div>
</template>

<script>
import Tag from '../Tag/Tag.vue';
import UnnnicI18n from '../../mixins/i18n';

export default {
  name: 'UnnnicSelectSmartMultipleHeader',
  components: {
    Tag,
  },
  mixins: [UnnnicI18n],
  props: {
    selectedOptions: {
      type: Array,
      required: true,
    },
    withoutSelectsMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      multipleSelectedsTags: 2,

      defaultTranslations: {
        without_multiple_selected: {
          'pt-br': 'Nenhuma opção selecionada',
          en: 'No option selected',
          es: 'Ninguna opción seleccionada',
        },
      },
    };
  },
  computed: {
    firstMultipleSelecteds() {
      const { selectedOptions, multipleSelectedsTags } = this;
      const selectedArray = [];

      for (let i = 0; i < multipleSelectedsTags; i += 1) {
        selectedArray.push(selectedOptions?.[i]);
      }

      return selectedArray.filter((option) => option !== undefined);
    },
  },
  methods: {
    unselectOption(option) {
      this.$emit('unselect-option', option);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-select-smart__options__multiple {
  border-bottom: 1px solid $unnnic-color-neutral-soft;

  &__selecteds {
    display: flex;
    align-items: center;

    color: $unnnic-color-neutral-dark;

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__option {
      margin: $unnnic-spacing-xs;
      margin-right: 0;

      &:first-child {
        margin-left: $unnnic-spacing-sm;
      }

      &.unnnic-tag {
        outline-color: $unnnic-color-neutral-light;
        background-color: $unnnic-color-neutral-light;

        color: $unnnic-color-neutral-dark;
      }
    }

    &__remaining {
      margin-left: $unnnic-spacing-xs;

      line-height: $unnnic-font-size-body-md + $unnnic-line-height-small;
      font-size: $unnnic-font-size-body-gt;
    }

    &__clear {
      margin-right: $unnnic-spacing-sm;
    }
  }

  &--without-multiples {
    margin: 0;

    color: $unnnic-color-neutral-cleanest;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    font-size: $unnnic-font-size-body-md;

    padding: $unnnic-spacing-ant $unnnic-spacing-sm;
  }
}
</style>
