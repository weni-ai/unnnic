<template>
  <div class="unnnic-autocomplete-select" v-click-outside="() => (isMenuOpen = false)">
    <unnnic-input
      v-model="inputValue"
      :size="size"
      :icon-left="hasIconLeft ? iconLeft : null"
      :icon-right="hasIconRight ? iconRight : null"
      :placeholder="placeholder"
      @focus="isMenuOpen = true"
      :disabled="disabled"
      @input="openMenuAndEmitSearch"
      @keyup.enter="emitTagCreate"
    />

    <div
      v-if="showMenu && isMenuOpen && !disabled && (items.length || (tag && inputValue))"
      class="options-container"
    >
      <div class="options">
        <unnnic-select-item
          v-for="(item, index) in items"
          :key="`${getValue(item)}-${index}`"
          size="md"
          @click="toggle(item)"
          :text-focused="checkFocus(item)"
          :ref="`option-${index}`"
        >
          {{ getText(item) }}

          <div v-if="descriptionKey" class="options__description">
            {{ getDescription(item) }}
          </div>
        </unnnic-select-item>

        <unnnic-select-item
          v-if="tag && inputValue && !containInputInItems"
          size="md"
          @click="emitTagCreate"
          :text-focused="false"
        >
          {{ `${tagCreateLabel} ${inputValue}` }}
        </unnnic-select-item>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import UnnnicInput from '../Input/Input.vue';
import UnnnicSelectItem from '../Select/SelectItem.vue';

export default {
  components: {
    UnnnicInput,
    UnnnicSelectItem,
  },

  props: {
    value: {
      type: Array,
    },
    items: {
      type: Array,
    },
    placeholder: {
      type: String,
      default: 'Buscar por',
    },
    disabled: {
      type: Boolean,
    },
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['sm', 'md'].indexOf(value) !== -1;
      },
    },
    textKey: {
      type: String,
      default: 'text',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    descriptionKey: {
      type: String,
      default: '',
    },
    closeOnSelect: {
      type: Boolean,
      default: false,
    },
    multi: {
      type: Boolean,
      default: true,
    },
    hasIconLeft: {
      type: Boolean,
      default: true,
    },
    iconLeft: {
      type: String,
      default: 'search-1',
    },
    hasIconRight: {
      type: Boolean,
      default: false,
    },
    iconRight: {
      type: String,
      default: 'keyboard-return-1',
    },
    showValue: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: Boolean,
      default: false,
    },
    tagCreateLabel: {
      type: String,
      default: '',
    },
    getTextFunc: {
      type: Function,
      default: null,
    },
    clearOnCreate: {
      type: Boolean,
      default: true,
    },
    showMenu: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isMenuOpen: false,
      inputValue: '',
      isCreated: false,
    };
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  created() {
    if (this.value && this.value.length) {
      this.updateInputValue({ items: this.value });
    }
    this.isCreated = true;
  },

  computed: {
    inputValueAndIsMenuOpen() {
      return [this.inputValue, this.isMenuOpen].join('-');
    },
    containInputInItems() {
      return this.items.some(
        (item) => this.getText(item).toLowerCase() === this.inputValue.toLowerCase(),
      );
    },
  },

  watch: {
    inputValueAndIsMenuOpen() {
      if (!this.isMenuOpen) {
        return;
      }

      const loweredInput = this.inputValue.toLowerCase();

      const index = this.items
        .map((item) => ({ ...item, text: this.getText(item).toLowerCase() }))
        .findIndex((item) => this.getText(item).toLowerCase().includes(loweredInput));

      if (index === -1) {
        return;
      }

      this.$nextTick(() => {
        const element = this.$refs[`option-${index}`];

        if (element && element[0] && element[0].$el && element[0].$el.scrollIntoView) {
          element[0].$el.scrollIntoView();
        }
      });
    },
  },

  methods: {
    getText(item) {
      if (this.getTextFunc) {
        return this.getTextFunc(item);
      }
      return item[this.textKey];
    },
    getValue(item) {
      return item[this.valueKey];
    },
    getDescription(item) {
      return item[this.descriptionKey];
    },
    toggle(item) {
      let finalValue = [item];
      if (!this.multi) {
        this.$emit('input', finalValue);
        this.updateInputValue({ items: finalValue });
      } else {
        const alreadySelected = this.value.some(
          (itemSelected) => this.getValue(itemSelected) === this.getValue(item),
        );

        if (alreadySelected) {
          finalValue = this.value.filter(
            (itemSelected) => this.getValue(itemSelected) !== this.getValue(item),
          );
          this.$emit('input', finalValue);
          this.updateInputValue({ items: finalValue });
        } else {
          finalValue = this.value.concat(item);
          this.$emit('input', finalValue);
          this.updateInputValue({ items: finalValue });
        }
      }

      if (this.closeOnSelect) {
        this.isMenuOpen = false;
      }
    },
    checkFocus(itemSelected) {
      return this.value.some((item) => this.getValue(item) === this.getValue(itemSelected));
    },
    updateInputValue({ items }) {
      if (this.showValue && items && Array.isArray(items)) {
        this.inputValue = items.map((item) => this.getText(item)).join(', ');
      }
    },
    emitTagCreate() {
      if (this.tag) {
        this.$emit('tag-create', this.inputValue);

        if (this.closeOnSelect) {
          this.isMenuOpen = false;
        }

        if (this.clearOnCreate) {
          this.inputValue = '';
        }
      }
    },
    openMenuAndEmitSearch(event) {
      if (this.isCreated) {
        if (this.showMenu) {
          this.isMenuOpen = true;
        }

        this.$emit('search', event);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-autocomplete-select {
  position: relative;

  .options-container {
    z-index: 1;
    background-color: $unnnic-color-background-snow;
    border-radius: $unnnic-border-radius-sm;
    box-shadow: $unnnic-shadow-level-near;
    padding-top: $unnnic-spacing-stack-xs;
    padding-right: $unnnic-spacing-inline-nano;
    padding-bottom: $unnnic-spacing-stack-sm;
    margin-top: $unnnic-spacing-stack-nano;
    max-height: 9 * $unnnic-font-size;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    position: absolute;

    .options {
      overflow-y: auto;
      flex: 1;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: $unnnic-color-neutral-clean;
        border-radius: $unnnic-border-radius-pill;
      }

      &::-webkit-scrollbar-track {
        background: $unnnic-color-neutral-soft;
        border-radius: $unnnic-border-radius-pill;
      }

      ::v-deep .unnnic-select-item {
        user-select: none;
        margin-top: 0;
        margin-bottom: 0;
      }

      &__description {
        font-size: $unnnic-font-size-body-gt;
        color: $unnnic-color-neutral-cloudy;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      }
    }
  }
}
</style>
