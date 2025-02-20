<template>
  <div
    v-on-click-outside="onClickOutside"
    class="unnnic-select-smart"
    data-testid="select-smart"
    @keydown="onKeyDownSelect"
  >
    <DropdownSkeleton
      ref="dropdown-skeleton"
      type="manual"
      :modelValue="active || null"
      position="bottom"
    >
      <TextInput
        ref="selectSmartInput"
        class="unnnic-select-smart__input"
        data-testid="select-smart-input"
        :modelValue="inputValue"
        :placeholder="placeholder || autocompletePlaceholder || selectedLabel"
        :type="type"
        :size="size"
        :disabled="disabled"
        :readonly="!isAutocompleteAllowed"
        :iconLeft="
          isAutocompleteAllowed && autocompleteIconLeft ? 'search-1' : ''
        "
        :iconRight="active ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        iconRightSize="ant"
        @click.stop="handleClickInput"
        @update:model-value="searchValue = $event"
      />

      <template #inside="props">
        <div
          v-if="active"
          :style="{ width: props.width }"
          :class="{
            'unnnic-select-smart__options': true,
            active: active,
            inactive: !active,
          }"
          data-testid="options-container"
        >
          <div :style="{ overflow: 'auto' }">
            <SelectSmartMultipleHeader
              v-if="multiple"
              :selectedOptions="modelValue"
              :withoutSelectsMessage="multipleWithoutSelectsMessage"
              :locale="locale"
              :translations="translations"
              @unselect-option="unselectOption"
            />
            <div
              ref="selectSmartOptionsScrollArea"
              data-testid="options-scroll-area"
              :class="[
                'unnnic-select-smart__options__scroll-area',
                `size-${size}`,
                {
                  'with-descriptions': hasDescriptionOptions,
                  'with-checkboxes': !!multiple,
                },
              ]"
            >
              <SelectSmartOption
                v-for="(option, index) in filterOptions(options)"
                :key="option.value"
                data-testid="option"
                :label="option.label"
                :description="option.description"
                :tabindex="index"
                :size="size"
                :active="
                  option.value === modelValue || optionIsSelected(option)
                "
                :focused="focusedOption && focusedOption.value === option.value"
                :allowCheckbox="!!multiple"
                @click="handleSelect(option)"
              />
              <p
                v-if="filterOptions(options).length === 0"
                class="unnnic-select-smart__options--no-results"
              >
                {{ i18n('without_results') }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </DropdownSkeleton>
  </div>
</template>

<script>
import { vOnClickOutside } from '@vueuse/components';

import SelectSmartOption from './SelectSmartOption.vue';
import SelectSmartMultipleHeader from './SelectSmartMultipleHeader.vue';
import TextInput from '../Input/TextInput.vue';
import DropdownSkeleton from '../Dropdown/DropdownSkeleton.vue';
import UnnnicI18n from '../../mixins/i18n';

export default {
  name: 'UnnnicSelectSmart',
  components: {
    TextInput,
    SelectSmartOption,
    SelectSmartMultipleHeader,
    DropdownSkeleton,
  },

  directives: {
    onClickOutside: vOnClickOutside,
  },
  mixins: [UnnnicI18n],
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
    modelValue: {
      type: Array,
      default: () => [],
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
      default: null,
    },
    orderedByIndex: {
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
    selectFirst: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      active: false,
      status: 'not-mounted',
      focusedOption: null,

      searchValue: '',
      isAutocompleteAllowed: false,

      multipleSelectedsTags: 2,

      defaultTranslations: {
        without_results: {
          'pt-br': 'Nenhum resultado encontrado',
          en: 'No results found',
          es: 'Ningún resultado encontrado',
        },
      },
    };
  },

  computed: {
    selectedLabel() {
      if (this.status !== 'mounted') {
        return '';
      }

      const selected = this.options.find((option) => {
        const isValueMatch = option.value === this.modelValue;

        if (this.isAutocompleteAllowed) {
          return isValueMatch && option.value !== '';
        }

        const isEmptyOption =
          option.value === '' && this.modelValue.length === 0;
        return isEmptyOption || isValueMatch;
      });

      if (selected) {
        return selected.label;
      }

      if (this.multiple) {
        const labels = this.modelValue.map((item) => item.label);
        return labels.join(', ');
      }

      const label = this.modelValue.at(-1)?.label || '';
      return label;
    },

    hasDescriptionOptions() {
      return this.options.some(
        (item) => typeof item.description !== 'undefined',
      );
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
      const { isAutocompleteAllowed, searchValue, multiple, modelValue } = this;

      if (isAutocompleteAllowed || multiple) {
        return searchValue;
      }
      if (!multiple && modelValue.length !== 0) {
        return modelValue?.[0].label;
      }

      return '';
    },
  },

  watch: {
    active(newValue) {
      this.$refs['dropdown-skeleton'].calculatePosition();

      this.$nextTick(() => {
        if (newValue && !this.multiple) {
          const activeOptionIndex = this.getOptionIndex('active');

          if (activeOptionIndex !== -1) {
            this.scrollToOption(activeOptionIndex, 'center');
          }
        }
      });
    },

    searchValue(newSearchValue, oldSearchValue) {
      this.focusedOption = null;

      if (!this.active && oldSearchValue) this.active = true;
    },

    modelValue: {
      deep: true,
      handler(newValue) {
        this.$emit('onChange', newValue);
        this.$emit('update:modelValue', newValue);

        this.onSelectOption(newValue.at(-1));
      },
    },

    autocomplete(newAutocomplete) {
      if (!this.multiple) {
        // The "multiple" variation only exists with autocomplete, so it can't be false
        this.isAutocompleteAllowed = newAutocomplete;
      }
    },
  },

  mounted() {
    this.status = 'mounted';

    if (this.multiple || this.autocomplete) {
      // The "multiple" variation only exists with autocomplete, so it can't be false
      this.isAutocompleteAllowed = true;
    }

    if (this.modelValue?.[0] && this.modelValue?.[0].value) {
      if (this.isAutocompleteAllowed) {
        this.$nextTick(() => {
          this.searchValue = this.selectedLabel;
        });
      }
    } else if (
      this.selectFirst &&
      this.options?.[0] &&
      this.options?.[0].value
    ) {
      this.selectOption(this.options?.[0]);
    }
  },

  methods: {
    optionIsSelected(option) {
      return this.modelValue.some(
        (selectedOption) => selectedOption.value === option.value,
      );
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
        if (this.autocompleteClearOnFocus || this.multiple) {
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

      const normalizeLabel = (label) =>
        label
          .toString()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

      const getNumber = (str) => parseInt(str.match(/\d+/)?.[0], 10) || 0;

      const filteredOptions = options.filter(
        ({ value, label }, index, self) => {
          const labelWithoutAccents = normalizeLabel(label);
          const isValueUnique =
            self.findIndex((option) => option.value === value) === index;
          const matchesSearchTerms = searchTerms.every((term) =>
            labelWithoutAccents.includes(term),
          );

          return isValueUnique && matchesSearchTerms && value;
        },
      );

      if (this.orderedByIndex) {
        return filteredOptions;
      }

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
        valueByType = this.modelValue?.[0]?.value;
      }
      if (type === 'focused') {
        valueByType =
          this.focusedOption?.value || this.modelValue.at(-1)?.value;
      }
      return options.findIndex((option) => option.value === valueByType);
    },

    scrollToOption(optionIndex, scrollBlock = 'nearest') {
      const elementScroll = this.$refs.selectSmartOptionsScrollArea;

      if (
        elementScroll &&
        optionIndex >= 0 &&
        optionIndex < elementScroll.childNodes.length
      ) {
        const optionElement = elementScroll.childNodes[optionIndex];

        if (optionElement instanceof HTMLElement) {
          optionElement?.scrollIntoView({ block: scrollBlock });
        }
      }
    },

    selectOption(option) {
      const selectedOption =
        option.value === null || option.value.length === 0 ? null : option;

      this.$emit(
        'update:modelValue',
        this.multiple ? [...this.modelValue, selectedOption] : [selectedOption],
      );
    },

    unselectOption(option) {
      const indexToRemove = this.modelValue.findIndex(
        (selectedOption) => selectedOption.value === option.value,
      );

      if (indexToRemove !== -1) {
        const newModelValue = this.modelValue;
        newModelValue.splice(indexToRemove, 1);
        this.$emit('update:modelValue', newModelValue);
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

      if (
        this.isAutocompleteAllowed &&
        !this.multiple &&
        newOption &&
        newOption.label
      ) {
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
            newIndex =
              key === 'ArrowUp'
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

        const newOption =
          options[newIndex === undefined ? focusedOptionIndex : newIndex];
        this.focusedOption = newOption;
      }
    },
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;
.unnnic-select-smart {
  position: relative;

  font-family: $unnnic-font-family-secondary;

  cursor: pointer;

  .dropdown-data {
    position: absolute !important;
    top: 100% !important;
  }

  &__options {
    left: 0;
    right: 0;

    margin-top: $unnnic-spacing-nano;

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

      max-height: calc-max-height(9.25);

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
        max-height: calc-max-height(14.25);
      }

      &.with-checkboxes {
        max-height: calc-max-height(11.75);
      }

      &.size-sm {
        max-height: calc-max-height(8.75);

        &.with-descriptions {
          max-height: calc-max-height(13.75);
        }

        &.with-checkboxes {
          max-height: calc-max-height(10.75);
        }
      }
    }

    &--no-results {
      margin: 0;

      color: $unnnic-color-neutral-cleanest;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
      font-size: $unnnic-font-size-body-md;

      padding: $unnnic-spacing-nano $unnnic-spacing-ant;
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
    }

    &:disabled {
      cursor: not-allowed;
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
