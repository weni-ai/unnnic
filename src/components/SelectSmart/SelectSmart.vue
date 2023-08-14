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
        @icon-right-click="handleClickInput"
        @click="handleClickInput"
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
                :focused="focusedOption && focusedOption.value === option.value"
                :allowCheckbox="!!multiple"
                @click="handleSelect(option)"
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
      focusedOption: null,

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
          const activeOptionIndex = this.getOptionIndex('active');

          if (activeOptionIndex !== -1) {
            this.scrollToOption(activeOptionIndex, 'center');
          }
        }
      });
    },

    searchValue() {
      this.$nextTick(() => {
        this.$refs['dropdown-skeleton'].calculatePosition();
      });

      this.focusedOption = null;

      if (!this.active) this.active = true;
    },

    selectedOptions(newSelectedOptions) {
      this.$emit('onChange', newSelectedOptions);
      this.$emit('input', newSelectedOptions);

      this.onSelectOption(newSelectedOptions.at(-1));
    },
  },

  computed: {
    selectedLabel() {
      if (this.status !== 'mounted') {
        return '';
      }

      const selected = this.options.find((option) => {
        const isValueMatch = option.value === this.value;

        if (this.isAutocompleteAllowed) {
          return isValueMatch && option.value !== '';
        }

        const isEmptyOption = option.value === '' && this.value == null;
        return isEmptyOption || isValueMatch;
      });

      if (selected) {
        return selected.label;
      }

      return this.multiple ? '' : this.selectedOptions.at(-1)?.label || '';
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

    if (this.options[0].value) {
      this.selectOption(this.options[0]);
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

    handleSelect(option) {
      if (option) {
        if (this.multiple && this.optionIsSelected(option)) {
          this.unselectOption(option);
          return;
        }

        this.selectOption(option);
      }
    },

    handleClickInput() {
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
      const searchValue = this.searchValue.toLowerCase();
      const searchTerms = searchValue
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ');

      const normalizeLabel = (label) => label
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const getNumber = (str) => parseInt(str.match(/\d+/)?.[0], 10) || 0;

      const filteredOptions = options.filter(({ value, label }, index, self) => {
        const labelWithoutAccents = normalizeLabel(label);
        const isValueUnique = self.findIndex((option) => option.value === value) === index;
        const matchesSearchTerms = searchTerms.every((term) => labelWithoutAccents.includes(term));

        return isValueUnique && matchesSearchTerms && value;
      });

      const sortedOptions = filteredOptions.sort((a, b) => {
        const labelA = normalizeLabel(a.label);
        const labelB = normalizeLabel(b.label);

        const numberA = getNumber(labelA);
        const numberB = getNumber(labelB);

        return numberA - numberB || labelA.localeCompare(labelB);
      });

      return sortedOptions;
    },

    onClickOutside() {
      if (this.active) {
        if (this.isAutocompleteAllowed) {
          this.searchValue = this.selectedLabel;
        }
        this.$nextTick(() => {
          this.active = false;
        });
      }
    },

    getOptionIndex(type) {
      const options = this.filterOptions(this.options);
      let valueByType = '';
      if (type === 'active') {
        valueByType = this.value?.[0]?.value;
      }
      if (type === 'focused') {
        valueByType = this.focusedOption?.value || this.selectedOptions.at(-1)?.value;
      }
      return options.findIndex((option) => option.value === valueByType);
    },

    scrollToOption(optionIndex, scrollBlock = 'nearest') {
      const elementScroll = this.$refs.selectSmartOptionsScrollArea;

      if (elementScroll && optionIndex >= 0 && optionIndex < elementScroll.childNodes.length) {
        const optionElement = elementScroll.childNodes[optionIndex];

        if (optionElement instanceof HTMLElement) {
          optionElement.scrollIntoView({ block: scrollBlock });
        }
      }
    },

    selectOption(option) {
      const selectedOption = option.value === null || option.value.length === 0 ? null : option;

      this.selectedOptions = this.multiple
        ? [...this.selectedOptions, selectedOption]
        : [selectedOption];
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

    onSelectOption(newOption) {
      this.$nextTick(() => {
        if (!this.multiple) {
          this.active = false;
        }
      });

      if (this.isAutocompleteAllowed && !this.multiple) {
        this.searchValue = newOption.label;
        return;
      }

      if (this.multiple) {
        this.searchValue = '';
      }
    },

    async onKeyDownSelect(event) {
      const { key } = event;

      const validKeys = ['Escape', 'Enter', 'ArrowUp', 'ArrowDown'];

      if (validKeys.includes(key)) {
        event.preventDefault();

        const options = this.filterOptions(this.options);
        const focusedOptionIndex = this.getOptionIndex('focused');
        let newIndex;

        // eslint-disable-next-line default-case
        switch (key) {
          case 'Escape':
            this.active = false;
            this.searchValue = '';
            break;
          case 'Enter':
            if (this.focusedOption && this.active) {
              this.handleSelect(this.focusedOption);
            }
            if (!this.active) {
              this.active = true;
            }
            break;

          case 'ArrowUp':
          case 'ArrowDown':
            if (this.multiple && !this.active) {
              this.active = true;
              await this.$nextTick();
            }
            newIndex = key === 'ArrowUp'
              ? Math.max(focusedOptionIndex - 1, 0)
              : Math.min(focusedOptionIndex + 1, options.length - 1);
            if (!this.active) {
              this.handleSelect(options[newIndex]);
            }
            break;
        }

        if (newIndex !== undefined && this.active) {
          this.scrollToOption(newIndex);
        }

        const newOption = options[newIndex === undefined ? focusedOptionIndex : newIndex];
        this.focusedOption = newOption;
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
