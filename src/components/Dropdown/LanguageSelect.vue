<template>
  <div :class="{ 
    'unnic-language-select__container': true,
    'unnic-language-select--contracted': contracted }">
    <div
      :class="{
        'unnic--clickable': true,
        'unnic-language-select': true,
        'unnic-language-select--open': open,
        'unnic-language-select--open--contracted': open && contracted,
        'unnic-language-select--expanded': !contracted
      }"
      @click="open=!open">
        <unnic-flag
          :class="{ 'unnic-language-select__flag': !contracted }"
          size="sm"
          :code="val" />
        <div
          v-show="!contracted"
          class="unnic-language-select__title">
            {{ languages[val] }}
        </div>
        <UIcon
          v-show="!contracted"
          class="unnic-language-select__icon"
          :icon="open ? 'arrow-button-down-1' : 'arrow-button-up-1'"
          size="xs" />
      </div>
      <div
        v-show="open"
        :class="{
          'unnic-language-select__list': true,
           'unnic-language-select__list--contracted': contracted }">
        <div
          v-for="language in otherLanguages"
          :key="language.id">
          <div
            class="unnic-language-select__list__item unnic--clickable"
            @click=" open=false; val=language.id ">
            <unnic-flag
              :class="{ 'unnic-language-select__flag': !contracted }"
              size="sm"
              :code="language.id" />
            <div
              v-show="!contracted"
              class="unnic-language-select__title">
              {{ language.name }}
            </div>
          </div>
          <div v-show="!contracted" class="unnic-language-select__list__item__separator" />
        </div>
      </div>
  </div>
</template>
<script>
import UIcon from '../Icon.vue';
import UnnicFlag from '../Flag.vue';

export default {
  name: 'LanguageSelect',
  components: {
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
      default: 'top-right',
    },
    contracted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      val: this.value,
      languages: {
        'pt-br': 'Português - Brasil',
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
    otherLanguages() {
      return this.languageList.filter(({ id }) => id !== this.val);
    },
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
    box-sizing: border-box;

    &--contracted {
      display: inline-block;
    }

    &__container {
      font-family: $unnic-font-family-secondary;
      font-size: $unnic-font-size-body-md;
      font-weight: $unnic-font-weight-regular;
      line-height: $unnic-font-size-body-md + $unnic-line-height-medium;
      color: $unnic-color-neutral-dark;
      position: relative;
    }

    &--open {
      border-radius: 0 0 $unnic-border-radius-sm $unnic-border-radius-sm;
      box-shadow: $unnic-shadow-level-near;

      &--contracted {
        border-radius: $unnic-border-radius-pill 0 0 $unnic-border-radius-pill;
      }
    }

    &--expanded {
      width: 100%;
    }

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

    &__list {
      position: absolute;
      top: 0;
      transform: translateY(-100%);
      left: 0;
      right: 0;
      width: 100%;
      border-radius: $unnic-border-radius-sm $unnic-border-radius-sm 0 0;
      background-color: $unnic-color-background-snow;
      position: absolute;
      display: flex;
      flex-direction: column;
      padding-right: 1px;

      &--contracted {
        top: 0;
        left: 0;
        transform: translateX(100%);
        flex-direction: row;
        border-radius: 0 $unnic-border-radius-pill $unnic-border-radius-pill 0 ;
      }

      &__item {
        display: flex;
        align-items: center;
        padding: $unnic-squish-nano;
        position: relative;

        &__separator {
          height: 0;
          content: '';
          margin: $unnic-spacing-stack-xs $unnic-inline-sm;
          border: $unnic-border-width-thinner solid $unnic-color-background-sky;
        }
      }
    }
  }
</style>
