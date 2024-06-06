<template>
  <div class="unnnic-select-smart__options__multiple">
    <div
      v-if="selectedOptions[0]"
      class="unnnic-select-smart__options__multiple__selecteds__container"
    >
      <div class="unnnic-select-smart__options__multiple__selecteds">
        <Tag
          v-for="option in firstMultipleSelecteds"
          class="unnnic-select-smart__options__multiple__selecteds__option"
          :key="option.value"
          :text="option.label"
          hasCloseIcon
          @click="unselectOption(option)"
        />
        <p
          v-if="selectedOptions.length > multipleSelectedsTags"
          class="unnnic-select-smart__options__multiple__selecteds__remaining"
        >
          +{{ selectedOptions.length - multipleSelectedsTags }}
        </p>
      </div>
      <UnnnicIcon
        class="unnnic-select-smart__options__multiple__selecteds__clear"
        icon="close-1"
        size="xs"
        clickable
        @click="clearSelectedOptions"
      />
    </div>
    <p
      v-if="!selectedOptions[0]"
      class="unnnic-select-smart__options__multiple--without-multiples"
    >
      {{ withoutSelectsMessage || i18n('without_multiple_selected') }}
    </p>
  </div>
</template>

<script>
import Tag from '../Tag/Tag.vue';
import UnnnicIcon from '../Icon.vue';
import UnnnicI18n from '../../mixins/i18n';

export default {
  name: 'UnnnicSelectSmartMultipleHeader',
  mixins: [UnnnicI18n],
  components: {
    Tag,
    UnnnicIcon,
  },
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
    clearSelectedOptions() {
      this.$emit('clear-selected-options');
    },
    unselectOption(option) {
      this.$emit('unselect-option', option);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

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

    padding: $unnnic-spacing-ant;
  }
}
</style>
