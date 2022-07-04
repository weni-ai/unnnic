<template>
  <div class="unnnic-autocomplete-select" v-click-outside="() => isMenuOpen = false">
    <unnnic-input
      v-model="inputValue"
      size="md"
      icon-left="search-1"
      :placeholder="placeholder"
      @focus="isMenuOpen = true"
    ></unnnic-input>

    <div v-if="isMenuOpen" class="options-container">
      <div class="options">
        <unnnic-select-item
          v-for="(item, index) in items"
          :key="item.value"
          size="md"
          @click="toggle(item)"
          :text-focused="value.some((itemSelected) => itemSelected.value === item.value)"
          :ref="`option-${index}`"
        >
          {{ item.text }}
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
  },

  data() {
    return {
      isMenuOpen: false,
      inputValue: '',
    };
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  computed: {
    inputValueAndIsMenuOpen() {
      return [this.inputValue, this.isMenuOpen].join('-');
    },
  },

  watch: {
    inputValueAndIsMenuOpen() {
      if (!this.isMenuOpen) {
        return;
      }

      const index = this.items
        .map((item) => ({ ...item, text: item.text.toLowerCase() }))
        .findIndex((item) => item.text.includes(this.inputValue.toLowerCase()));

      if (index === -1) {
        return;
      }

      this.$nextTick(() => {
        this.$refs[`option-${index}`]?.[0]?.$el?.scrollIntoView();
      });
    },
  },

  methods: {
    toggle(item) {
      const alreadySelected = this.value.some((itemSelected) => itemSelected.value === item.value);

      if (alreadySelected) {
        this.$emit('input', this.value.filter((itemSelected) => itemSelected.value !== item.value));
      } else {
        this.$emit('input', this.value.concat(item));
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
    background-color: $unnnic-color-background-snow;
    border-radius: $unnnic-border-radius-sm;
    box-shadow: $unnnic-shadow-level-near;
    padding-top: $unnnic-spacing-stack-xs;
    padding-right: $unnnic-spacing-inline-nano;
    padding-bottom: $unnnic-spacing-stack-sm;
    margin-top: $unnnic-spacing-stack-nano;
    max-height: 9rem;
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
    }
  }
}
</style>
