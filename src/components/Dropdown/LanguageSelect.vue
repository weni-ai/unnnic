<template>
  <unnic-dropdown :position="position">
    <div
      class="unnic-language-select"
      slot="trigger">
        <unnic-flag
          class="unnic-language-select__flag"
          size="sm"
          :code="val" />
        <div v-show="!contracted" class="unnic-language-select__title">{{ languages[val] }}</div>
        <UIcon
          class="unnic-language-select__icon"
          icon="arrow-button-up-1"
          size="xs" />
      </div>
      <unnic-dropdown-item
        v-for="language in languageList"
        :key="language.id"
        @click="val = language.id">
          {{ language.name }}
      </unnic-dropdown-item>
  </unnic-dropdown>
</template>

<script>
import UnnicDropdown from './Dropdown.vue';
import UnnicDropdownItem from './DropdownItem.vue';
import UIcon from '../Icon.vue';
import UnnicFlag from '../Flag.vue';

export default {
  name: 'LanguageSelect',
  components: {
    UnnicDropdown,
    UnnicDropdownItem,
    UIcon,
    UnnicFlag,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'top',
    },
    contracted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: this.value,
      languages: {
        'pt-br': 'Português do Brasil',
        en: 'English',
      },
    };
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
    value() {
      this.val = this.value;
    },
  },
  computed: {
    languageList() {
      return Object.entries(this.languages).map(([id, name]) => ({ id, name }));
    },
    currentLanguage() {
      if (this.languages[this.val]) return this.languages[this.val].name;
      return '';
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/unnic.scss";

  .unnic-language-select {
    background-color: $unnic-color-background-snow;
    padding: $unnic-squish-nano;
    border-radius: $unnic-border-radius-pill;

    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;
    font-weight: $unnic-font-weight-regular;
    line-height: $unnic-font-size-body-md + $unnic-line-height-medium;
    color: $unnic-color-neutral-dark;
    width: 100%;

    display: flex;
    align-items: center;

    &__title {
      flex: 1;
    }

    &__flag {
      margin-right: $unnic-inline-xs;
    }

    &__icon {
      color: $unnic-color-neutral-clean;
      margin-left: $unnic-inline-nano;
    }
  }
</style>
