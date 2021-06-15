<template>
  <div @keydown="onKeyDownSelect" v-click-outside="onClickOutside" class='unnnic-select'>
    <p v-if="label" class="unnnic-form__label"> {{ label }}  </p>
    <text-input
      :value="labelForValue"
      :placeholder="placeholder"
      :icon-right="active ?
      'arrow-button-up-1' : 'arrow-button-down-1'"
      :type="type"
      icon-right-clickable
      @icon-right-click="active = !active"
      :hasCloudyColor="hasCloudyColor"
      :size="size"
      @focus="active = true"
      readonly/>
    <slot />
    <div
      v-if="active"
      :class="{'unnnic-select__options': true,
      'unnnic-select__options--active': active,
      'unnnic-select__options--inactive': !active }">
    <select-item
      v-if="search"
      class="unnnic-select__header"
      :selectable="false"
      :size="size"
    >
      <text-input
        v-model="searchValue"
        :placeholder="searchPlaceholder"
        :icon-left="searchIconLeft"
        :size="searchSize"
      />
    </select-item>

    <select-item
      v-for="(option, index) in optionsHeader"
      :tabindex="index"
      :size="size"
      :key="index"
      @click="onSelectOption(option, 'header')"
      :title="option.text"
    >
      {{ option.text }}
    </select-item>

    <select-item
      v-if="hasHeader()"
      class="unnnic-select__header"
      :selectable="false"
      :size="size">
        <slot name="header" />
    </select-item>
    <div class="unnnic-select__options__scroll-area">
      <select-item
        v-for="(option, index) in filterOptions(options())"
        :tabindex="index"
        :size="size"
        :key="option.value"
        :active="option.value === value"
        @click="onSelectOption(option)"
        :title="option.text"
      >
          {{ option.text }}
      </select-item>
    </div>
    </div>
    <p v-if="message" class="unnnic-form__message"> {{ message }} </p>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import selectItem from './SelectItem.vue';
import TextInput from '../Input/TextInput.vue';

export default {
  name: 'UnnicSelect',
  components: { TextInput, selectItem },
  props: {
    search: {
      type: Boolean,
    },

    searchIconLeft: {
      type: String,
      default: 'search-1',
    },

    searchPlaceholder: {
      type: String,
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
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: null,
    },
    label: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    hasCloudyColor: {
      type: Boolean,
      default: false,
    },
    optionsHeader: {
      type: Array,
    },
  },
  data() {
    return {
      active: false,
      status: 'not-mounted',

      searchValue: '',
    };
  },

  computed: {
    searchSize() {
      return {
        md: 'sm',
        sm: 'sm',
      }[this.size];
    },

    labelForValue() {
      if (this.status !== 'mounted') {
        return '';
      }

      const selected = this.options().find((option) => (option.value === '' && this.value == null)
        || option.value === this.value);

      if (selected) {
        return selected.text;
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
    filterOptions(options) {
      return options
        .filter(({ text }) => String(text).toLowerCase().includes(this.searchValue.toLowerCase()));
    },

    onClickOutside() {
      this.active = false;
    },
    onKeyDownSelect(event) {
      if ([13, 38, 40].includes(event.keyCode)) {
        event.preventDefault();
        const options = this.filterOptions(this.options());
        if (!options.length) return;
        const activeOption = options.findIndex((item) => item.value === this.value);
        const verifyOption = activeOption === -1 ? 0 : activeOption;
        const key = event.keyCode;
        const elementScroll = document.querySelector('.unnnic-select__options__scroll-area');
        // eslint-disable-next-line prefer-destructuring
        let value = options[verifyOption].value;
        if (key === 13) {
          this.onSelectOption(options[verifyOption]);
          return;
        }
        if (key === 38) {
          value = options[verifyOption === 0 ? 0 : verifyOption - 1].value;
        } else if (key === 40) {
          value = options[verifyOption === options.length - 1
            ? options.length - 1 : verifyOption + 1].value;
        }
        const indexOfValue = options.findIndex((item) => item.value === value);
        if (this.active) elementScroll.childNodes[value === '' ? 0 : indexOfValue].scrollIntoView();
        this.$emit('onChange', value);
        this.$emit('input', value);
      }
    },
    onSelectOption(option, type) {
      if (type === 'header') {
        if (option.click) {
          option.click();
        }
      } else {
        const value = (option.value === null || option.value.length === 0)
          ? null
          : option.value;

        this.$emit('onChange', value);
        this.$emit('input', value);

        this.active = false;
      }
    },
    options() {
      const children = this.$el.querySelectorAll('option');
      return [...children].map((option) => (
        { value: option.value, text: option.label || option.innerHtml }
      ));
    },
    hasHeader() {
      return !!this.$slots.header;
    },
    handleClickSelect() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';
.unnnic-select {
  option {
    display: none;
  }
}

 ::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: $unnnic-color-neutral-soft;
}

::-webkit-scrollbar-thumb {
  background: $unnnic-color-neutral-clean;
  border-radius: $unnnic-border-radius-pill;
}

  .unnnic-select {
  font-family: $unnnic-font-family-secondary;
  position: relative;

  &__header {
    &::after {
      content: '';
      display: block;
      border: 1px $unnnic-color-neutral-lightest solid;
      margin: $unnnic-spacing-stack-xs 0 0 0;
    }
  }

  &__field {
    display: flex;
    justify-content: space-between;
    border: 1px solid $unnnic-color-neutral-soft;
    border-radius: $unnnic-border-radius-sm;
    background-color: $unnnic-color-background-snow;
    padding: $unnnic-squish-nano;

    display: flex;
    align-items: center;
    cursor: pointer;

    &__selected{
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
      -webkit-line-clamp: 1;

      &--md{
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
      }
      &--sm{
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
      }
    }

     &--inactive{
      border: 1px solid $unnnic-color-neutral-soft;
      color: $unnnic-color-neutral-clean;
    }

    &--active{
      border: 1px solid $unnnic-color-brand-weni;
      color: $unnnic-color-brand-weni;
    }

  }

  &__options{
    margin-top: 4px;
    box-shadow: $unnnic-shadow-level-near;
    background-color: $unnnic-color-background-snow;
    position: absolute;
    left: 0;
    right: 0;

    &__scroll-area {
      max-height: 12.5rem;
      overflow-y: auto;
    }

    &--inactive{
      display: none;
    }

    &--active{
      display: block;
      z-index: 2;
    }
  }
}
</style>
