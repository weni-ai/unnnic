<template>
  <div @keydown="onKeyDownSelect" v-click-outside="onClickOutside" class="unnnic-select-smart">
    <dropdown-skeleton type="manual" :value="active" position="bottom" ref="dropdown-skeleton">
      <text-input
        class="unnnic-select-smart__input"
        ref="selectSmartInput"
        :value="inputValue"
        :placeholder="autocompletePlaceholder || selectedLabel"
        :type="type"
        :size="size"
        :disabled="disabled"
        :readonly="!isAutocompleteAllowed"
        :icon-left="isAutocompleteAllowed && autocompleteIconLeft ? 'search-1' : ''"
        :icon-right="active ? 'arrow-button-up-1' : 'arrow-button-down-1'"
        :icon-right-clickable="!disabled"
        @icon-right-click="handleClickSelect"
        @click="handleClickSelect"
        @input="searchValue = $event"
      />

      <template v-slot:inside="props">
        <div
          v-if="active"
          :style="{ width: props.width }"
          :class="{
            'unnnic-select-smart__options': true,
            active: active,
            inactive: !active,
          }"
        >
          <div :style="{ overflow: 'auto' }">
            <div v-if="multiple" class="unnnic-select-smart__options__multiple">
              <div
                v-if="selectedOptions[0]"
                class="unnnic-select-smart__options__multiple__selecteds__container"
              >
                <div class="unnnic-select-smart__options__multiple__selecteds">
                  <tag
                    v-for="option in firstMultipleSelecteds"
                    class="unnnic-select-smart__options__multiple__selecteds__option"
                    :key="option.value"
                    :text="option.label"
                    hasCloseIcon
                    @close="unselectOption(option)"
                  />
                  <p
                    v-if="selectedOptions.length > multipleSelectedsTags"
                    class="unnnic-select-smart__options__multiple__selecteds__remaining"
                  >
                    +{{ selectedOptions.length - multipleSelectedsTags }}
                  </p>
                </div>
                <icon-svg
                  class="unnnic-select-smart__options__multiple__selecteds__clear"
                  icon="close-1"
                  size="sm"
                  clickable
                  @click="clearSelectedOptions"
                />
              </div>
              <p
                v-if="!selectedOptions[0]"
                class="unnnic-select-smart__options__multiple--without-multiples"
              >
                {{ multipleWithoutSelectsMessage || $t('select_smart.without_multiple_selected') }}
              </p>
            </div>
            <div
              ref="selectSmartOptionsScrollArea"
              :class="[
                'unnnic-select-smart__options__scroll-area',
                `size-${size}`,
                {
                  'with-descriptions': hasDescriptionOptions,
                },
              ]"
            >
              <select-smart-option
                v-for="(option, index) in filterOptions(options)"
                :key="option.value"
                :label="option.label"
                :description="option.description"
                :tabindex="index"
                :size="size"
                :active="option.value === value || optionIsSelected(option)"
                :allowCheckbox="!!multiple"
                @click="
                  multiple && optionIsSelected(option)
                    ? unselectOption(option)
                    : onSelectOption(option)
                "
              />
              <p
                v-if="filterOptions(options).length === 0"
                class="unnnic-select-smart__options--no-results"
              >
                {{ $t('select_smart.without_results') }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </dropdown-skeleton>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import SelectSmartOption from './SelectSmartOption.vue';
import TextInput from '../Input/TextInput.vue';
import DropdownSkeleton from '../Dropdown/DropdownSkeleton.vue';
import Tag from '../Tag/Tag.vue';
import IconSvg from '../Icon.vue';

export default {
  name: 'UnnicSelectSmart',
  components: {
    TextInput,
    SelectSmartOption,
    DropdownSkeleton,
    Tag,
    IconSvg,
  },
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [
        {
          value: '',
          label: 'Initial value',
        },
        {
          value: 'option1',
          label: 'Option1',
        },
      ],
    },
    value: {
      type: null,
    },
    size: {
      type: String,
      default: 'md',
    },
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    multipleWithoutSelectsMessage: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
    autocompleteIconLeft: {
      type: Boolean,
      default: false,
    },
    autocompleteClearOnFocus: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      active: false,
      status: 'not-mounted',

      searchValue: '',
      isAutocompleteAllowed: false,

      selectedOptions: [],
      multipleSelectedsTags: 2,
    };
  },

  watch: {
    active(newValue) {
      this.$nextTick(() => {
        this.$refs['dropdown-skeleton'].calculatePosition();

        if (newValue && !this.multiple) {
          const activeOptionIndex = this.getActiveOptionIndex();

          if (activeOptionIndex !== -1) {
            this.scrollToOption(activeOptionIndex);
          }
        }
      });
    },

    searchValue() {
      this.$nextTick(() => {
        this.$refs['dropdown-skeleton'].calculatePosition();
      });
    },

    selectedOptions(newSelectedOptions) {
      this.$emit('onChange', newSelectedOptions);
      this.$emit('input', newSelectedOptions);
    },
  },

  computed: {
    selectedLabel() {
      if (this.status !== 'mounted') {
        return '';
      }

      const selected = this.options.find((option) => {
        if (this.isAutocompleteAllowed) {
          return option.value === this.value && option.value !== '';
        }

        return (option.value === '' && this.value == null) || option.value === this.value;
      });

      if (selected) {
        return selected.label;
      }

      return '';
    },

    hasDescriptionOptions() {
      return this.options.some((item) => typeof item.description !== 'undefined');
    },

    autocompletePlaceholder() {
      if (this.isAutocompleteAllowed) {
        const selected = this.options.find((option) => option.value === '');

        if (selected) {
          return selected.label;
        }
      }
      return '';
    },

    inputValue() {
      const {
        isAutocompleteAllowed, searchValue, multiple, selectedOptions,
      } = this;

      if (isAutocompleteAllowed || multiple) {
        return searchValue;
      }
      if (!multiple && selectedOptions.length !== 0) {
        return selectedOptions[0].label;
      }

      return '';
    },

    firstMultipleSelecteds() {
      const { selectedOptions, multipleSelectedsTags } = this;
      const selectedArray = [];

      for (let i = 0; i < multipleSelectedsTags; i += 1) {
        selectedArray.push(selectedOptions?.[i]);
      }

      return selectedArray.filter((option) => option !== undefined);
    },
  },

  mounted() {
    this.status = 'mounted';

    if (this.multiple || this.autocomplete) {
      this.isAutocompleteAllowed = true;
    }
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  methods: {
    optionIsSelected(option) {
      return this.selectedOptions.some((selectedOption) => selectedOption.value === option.value);
    },

    clearSelectedOptions() {
      this.selectedOptions = [];
    },

    handleClickSelect() {
      if (this.isAutocompleteAllowed) {
        if (this.active) {
          return;
        }
        if (this.autocompleteClearOnFocus) {
          this.searchValue = '';
        }
      }

      this.active = !this.active;
    },

    filterOptions(options) {
      const removeAccents = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const searchValueWithoutAccents = removeAccents(this.searchValue.toLowerCase());
      const searchTerms = searchValueWithoutAccents.split(' ');

      const filterOption = ({ value, label }) => {
        const labelWithoutAccents = removeAccents(label.toString().toLowerCase());

        return searchTerms.every((term) => labelWithoutAccents.includes(term)) && value;
      };

      const filteredOptions = options.filter(filterOption);

      const sortedOptions = filteredOptions.sort((a, b) => {
        const labelA = removeAccents(a.label.toString()).toLowerCase();
        const labelB = removeAccents(b.label.toString()).toLowerCase();

        const numberA = parseInt(labelA.match(/\d+/)?.[0], 10) || 0;
        const numberB = parseInt(labelB.match(/\d+/)?.[0], 10) || 0;

        if (numberA < numberB) return -1;
        if (numberA > numberB) return 1;

        if (labelA < labelB) return -1;
        if (labelA > labelB) return 1;
        return 0;
      });

      return sortedOptions;
    },

    onClickOutside() {
      this.active = false;
      if (this.isAutocompleteAllowed) {
        this.searchValue = this.selectedLabel;
      }
    },

    getActiveOptionIndex() {
      const activeValue = this.value?.[0]?.value;
      const options = this.filterOptions(this.options);
      return options.findIndex((option) => option.value === activeValue);
    },

    scrollToOption(optionIndex) {
      const elementScroll = this.$refs.selectSmartOptionsScrollArea;
      elementScroll.childNodes[optionIndex].scrollIntoViewIfNeeded();
    },

    onSelectOption(option) {
      const selectedOption = option.value === null || option.value.length === 0 ? null : option;

      this.selectedOptions = this.multiple
        ? [...this.selectedOptions, selectedOption]
        : [selectedOption];

      if (!this.multiple) this.active = false;

      if (this.isAutocompleteAllowed && !this.multiple) {
        this.searchValue = option.label;
        return;
      }

      if (this.multiple) {
        this.searchValue = '';
        return;
      }

      this.$refs.selectSmartInput.focus();
    },

    unselectOption(option) {
      const indexToRemove = this.selectedOptions.findIndex(
        (selectedOption) => selectedOption === option,
      );

      if (indexToRemove !== -1) {
        this.selectedOptions.splice(indexToRemove, 1);
      }

      if (this.multiple) {
        this.searchValue = '';
      }
    },

    onKeyDownSelect(event) {
      const { key } = event;

      const validKeys = ['Enter', 'ArrowUp', 'ArrowDown'];

      if (validKeys.includes(key)) {
        event.preventDefault();

        const options = this.filterOptions(this.options);

        if (options.length === 0) {
          return;
        }

        const activeOptionIndex = this.getActiveOptionIndex();

        let newIndex;

        // eslint-disable-next-line default-case
        switch (key) {
          case 'Enter':
            this.active = !this.active;
            break;
          case 'ArrowUp':
            newIndex = Math.max(activeOptionIndex - 1, 0);
            break;
          case 'ArrowDown':
            newIndex = Math.min(activeOptionIndex + 1, options.length - 1);
            break;
        }

        if (newIndex !== undefined && this.active) {
          this.scrollToOption(newIndex);
        }

        const newValue = options[newIndex === undefined ? activeOptionIndex : newIndex];
        this.selectedOptions = [newValue];
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';
.unnnic-select-smart {
  position: relative;

  font-family: $unnnic-font-family-secondary;

  cursor: pointer;

  &__options {
    left: 0;
    right: 0;

    margin-top: 2px;

    border-radius: $unnnic-border-radius-sm;

    box-shadow: $unnnic-shadow-level-near;

    background-color: $unnnic-color-background-snow;

    cursor: default;

    &__scroll-area {
      @function calc-max-height($value) {
        @return ($value * $unnnic-font-size) - ($unnnic-spacing-xs * 2);
      }

      margin: $unnnic-spacing-xs;
      margin-right: $unnnic-inline-xs;
      padding-right: $unnnic-inline-xs;

      max-height: calc-max-height(8.5);

      overflow-y: auto;

      &::-webkit-scrollbar {
        width: $unnnic-spacing-inline-nano;
      }

      &::-webkit-scrollbar-thumb {
        background: $unnnic-color-neutral-cleanest;
        border-radius: $unnnic-border-radius-pill;
      }

      &::-webkit-scrollbar-track {
        background: $unnnic-color-neutral-soft;
        border-radius: $unnnic-border-radius-pill;
      }

      &.with-descriptions {
        max-height: calc-max-height(13.5);
      }

      &.size-sm {
        max-height: calc-max-height(8);

        &.with-descriptions {
          max-height: calc-max-height(12);
        }
      }
    }

    &__multiple--without-multiples,
    &--no-results {
      margin: 0;

      color: $unnnic-color-neutral-cleanest;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
      font-size: $unnnic-font-size-body-md;
    }

    &__multiple--without-multiples {
      padding: $unnnic-spacing-ant;
    }

    &--no-results {
      padding: $unnnic-spacing-nano $unnnic-spacing-ant;
    }

    &__multiple {
      border-bottom: 1px solid $unnnic-color-neutral-soft;

      &__selecteds {
        display: flex;

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
    }

    &.inactive {
      display: none;
    }

    &.active {
      display: block;
      z-index: 2;
    }
  }

  .unnnic-select-smart__input input {
    // entire class name to have higher priority in styles
    &:read-only {
      cursor: pointer;

      &::placeholder {
        color: $unnnic-color-neutral-dark;
      }
    }

    &:not(:read-only :focus) {
      &::placeholder {
        color: $unnnic-color-neutral-dark;
      }
    }

    &:not(:read-only) {
      &:focus {
        &::placeholder {
          color: $unnnic-color-neutral-cleanest;
        }
      }
    }

    &:disabled {
      border: 1px solid $unnnic-color-neutral-cleanest;

      cursor: not-allowed;

      &::placeholder {
        color: $unnnic-color-neutral-cleanest;
      }

      + .icon-right {
        cursor: not-allowed;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: $unnnic-color-neutral-soft;
}

::-webkit-scrollbar-thumb {
  background: $unnnic-color-neutral-cleanest;
  border-radius: $unnnic-border-radius-pill;
}
</style>
