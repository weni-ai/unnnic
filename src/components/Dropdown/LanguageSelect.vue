<template>
  <div v-click-outside="onClickOutside" :class="{
    'unnnic-language-select': true,
    'unnnic-language-select__container': true,
    'unnnic-language-select--contracted': contracted,
    [position]: true,
  }">
    <div
      v-show="open"
      :class="{
        'unnnic-language-select__seam': true,
        'unnnic-language-select__seam--vertical': contracted,
        'unnnic-language-select__seam--horizontal': !contracted}" />
    <div
      :class="{
        'unnnic--clickable': true,
        'unnnic-language-select--item': true,
        'unnnic-language-select--open': open,
        'unnnic-language-select--open--contracted': open && contracted,
        'unnnic-language-select--expanded': !contracted
      }"
      @click="onClickTrigger">
        <unnnic-flag
          :class="{ 'unnnic-language-select__flag': !contracted }"
          size="sm"
          :code="val" />
        <div
          v-show="!contracted"
          class="unnnic-language-select__title">
            {{ languages[val] }}
        </div>
        <UIcon
          v-if="position.includes('top')"
          v-show="!contracted"
          class="unnnic-language-select__icon"
          :icon="open ? 'arrow-button-down-1' : 'arrow-button-up-1'"
          size="xs"
        />

        <UIcon
          v-if="position.includes('bottom')"
          v-show="!contracted"
          class="unnnic-language-select__icon"
          :icon="open ? 'arrow-button-up-1' : 'arrow-button-down-1'"
          size="xs"
        />
      </div>
      <div
        v-show="open"
        :class="{
          'unnnic-language-select__list': true,
           'unnnic-language-select__list--contracted': contracted, }"
          >
        <div
          v-for="language in otherLanguages"
          :key="language.id">
          <div
            v-show="!contracted
            && position.includes('bottom')" class="unnnic-language-select__list__item__separator"
          />
          <div
            class="unnnic-language-select__list__item unnnic--clickable"
            @click="open=false; val=language.id "
          >
            <unnnic-flag
              :class="{ 'unnnic-language-select__flag': !contracted }"
              size="sm"
              :code="language.id" />
            <div
              v-show="!contracted"
              class="unnnic-language-select__title">
              {{ language.name }}
            </div>
          </div>
          <div
            v-show="!contracted && position.includes('top')"
            class="unnnic-language-select__list__item__separator"
          />
        </div>
      </div>
  </div>
</template>
<script>
import vClickOutside from 'v-click-outside';
import UIcon from '../Icon.vue';
import unnnicFlag from '../Flag.vue';

export default {
  name: 'LanguageSelect',
  components: {
    UIcon,
    unnnicFlag,
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
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    onClickTrigger() {
      this.open = !this.open;
    },
    onClickOutside() {
      if (!this.open) return;
      this.open = false;
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
@import "../../assets/scss/unnnic.scss";

  .unnnic-language-select {
    &--item {
      background-color: $unnnic-color-background-snow;
      padding: $unnnic-squish-xs;
      border-radius: $unnnic-border-radius-pill;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }

    &--contracted {
      display: inline-block;
    }

    &__container {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-md;
      font-weight: $unnnic-font-weight-regular;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
      color: $unnnic-color-neutral-dark;
      position: relative;
    }

    &--open {
      border-radius: 0 0 $unnnic-border-radius-sm $unnnic-border-radius-sm;
      box-shadow: $unnnic-shadow-level-near;
      position: relative;
      z-index: 2;

      &--contracted {
        border-radius: $unnnic-border-radius-pill 0 0 $unnnic-border-radius-pill;
        padding: $unnnic-squish-xs;
        padding-right: .5rem;
      }
    }

    &.bottom {
      .unnnic-language-select--open {
        border-radius: $unnnic-border-radius-sm $unnnic-border-radius-sm 0 0;
      }
    }

    &--expanded {
      padding: $unnnic-squish-nano;
      width: 100%;
    }

    &__title {
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__flag {
      margin-right: $unnnic-inline-xs;
    }

    &__icon {
      color: $unnnic-color-neutral-clean;
      margin-left: $unnnic-inline-nano;
    }

    &__list {
      position: absolute;
      top: 0;
      transform: translateY(-100%);
      left: 0;
      right: 0;
      width: 100%;
      border-radius: $unnnic-border-radius-sm $unnnic-border-radius-sm 0 0;
      background-color: $unnnic-color-background-snow;
      position: absolute;
      display: flex;
      flex-direction: column;
      box-shadow: $unnnic-shadow-level-near;
      z-index: 1;

      &--contracted {
        top: 0;
        transform: translateX(100%);
        flex-direction: row;
        border-radius: 0 $unnnic-border-radius-pill $unnnic-border-radius-pill 0 ;
      }

      &__item {
        display: flex;
        align-items: center;
        padding: $unnnic-squish-xs;
        padding-left: .5rem;
        position: relative;

        &__separator {
          height: 0;
          content: '';
          margin: $unnnic-spacing-stack-xs $unnnic-inline-sm;
          border: $unnnic-border-width-thinner solid $unnnic-color-background-sky;
        }
      }
    }

    &.bottom {
      .unnnic-language-select__list {
        border-radius: 0 0 $unnnic-border-radius-sm $unnnic-border-radius-sm;
        top: initial;
        transform: translateY(100%);
        bottom: 0;
        z-index: 2;
      }

      .unnnic-language-select__seam--horizontal {
        top: auto;
        bottom: -3px;
      }
    }

    &__seam {
      position: absolute;
      z-index: 4;
      background-color: $unnnic-color-background-snow;

      &--horizontal {
        left: 0;
        right: 0;
        top: 0;
        transform: translateY(-100%);
        height: 3px;
      }

      &--vertical {
        top: 0;
        bottom: 0;
        right: -5px;
        width: 5px;
      }
    }
  }
</style>
