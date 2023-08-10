<template>
  <div @keydown="onKeyDownSelect" v-click-outside="onClickOutside" class="unnnic-select-smart">
    <dropdown-skeleton type="manual" :value="active" position="bottom" ref="dropdown-skeleton">
      <text-input
        :class="{
          'unnnic-select-smart__input': true,
          'unnnic-select-smart__input--disabled': disabled,
        }"
        ref="selectSmartInput"
        :value="valueLabel"
        :placeholder="placeholder || labelForValue"
        :type="type"
        :size="size"
        :disabled="disabled"
        :hasCloudyColor="hasCloudyColor"
        readonly
        :icon-right="active ? 'arrow-button-up-1' : 'arrow-button-down-1'"
        icon-right-clickable
        @icon-right-click="handleClickSelect"
        @click="handleClickSelect"
      />

      <template v-slot:inside="props">
        <div
          v-if="active"
          :style="{ width: props.width }"
          :class="{
            'unnnic-select-smart__options': true,
            'unnnic-select-smart__options--active': active,
            'unnnic-select-smart__options--inactive': !active,
          }"
        >
          <div :style="{ overflow: 'auto' }">
            <div
              ref="selectSmartOptionsScrollArea"
              class="unnnic-select-smart__options__scroll-area"
            >
              <select-smart-option
                v-for="(option, index) in filterOptions(options)"
                :key="option.value + index"
                :label="option.label"
                :description="option.description"
                :tabindex="index"
                :size="size"
                :active="option.value === value"
                @click="onSelectOption(option)"
              />
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

export default {
  name: 'UnnicSelectSmart',
  components: { TextInput, SelectSmartOption, DropdownSkeleton },
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
    value: {
      type: null,
    },
    hasCloudyColor: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      active: false,
      status: 'not-mounted',

      searchValue: '',
    };
  },

  watch: {
    active(newValue) {
      this.$nextTick(() => {
        this.$refs['dropdown-skeleton'].calculatePosition();

        if (newValue) {
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
  },

  computed: {
    labelForValue() {
      if (this.status !== 'mounted') {
        return '';
      }

      const selected = this.options.find(
        (option) => (option.value === '' && this.value == null) || option.value === this.value,
      );

      if (selected) {
        return selected.label;
      }

      return '';
    },
  },

  mounted() {
    this.status = 'mounted';
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    handleClickSelect() {
      this.active = !this.active;
    },

    filterOptions(options) {
      const searchValueLowerCase = this.searchValue.toLowerCase();

      const filterOption = ({ value, label }) => {
        const filteredLabel = label.toString().toLowerCase().includes(searchValueLowerCase);
        return value && filteredLabel;
      };

      return options.filter(filterOption);
    },

    onClickOutside() {
      this.active = false;
    },

    getActiveOptionIndex() {
      const options = this.filterOptions(this.options);
      return options.findIndex((option) => option.value === this.value);
    },

    scrollToOption(optionIndex) {
      const elementScroll = this.$refs.selectSmartOptionsScrollArea;
      elementScroll.childNodes[optionIndex].scrollIntoViewIfNeeded();
    },

    onSelectOption(option, type) {
      if (type === 'header') {
        if (option.click) {
          option.click();
        }
      } else {
        const value = option.value === null || option.value.length === 0 ? null : option.value;

        this.$emit('onChange', value);
        this.$emit('input', value);

        this.active = false;
      }

      this.$refs.selectSmartInput.focus();
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

        const newValue = options[newIndex === undefined ? activeOptionIndex : newIndex].value;
        this.$emit('onChange', newValue);
        this.$emit('input', newValue);
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
      margin: $unnnic-spacing-xs $unnnic-spacing-nano;
      margin-left: 0;

      max-height: 12.2 * $unnnic-font-size;
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
    }

    &--inactive {
      display: none;
    }

    &--active {
      display: block;
      z-index: 2;
    }
  }

  .unnnic-select-smart__input input {
      &:read-only {
        cursor: pointer;

        &::placeholder {
          color: $unnnic-color-neutral-dark;
        }
      }

      &:disabled {
        border: 1px solid $unnnic-color-neutral-cleanest;

        cursor: not-allowed;

        &::placeholder {
          color: $unnnic-color-neutral-cleanest;
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
