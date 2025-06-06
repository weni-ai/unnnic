<template>
  <div
    v-if="contracted"
    v-on-click-outside="onClickOutside"
    class="unnnic-language-select contracted"
  >
    <div
      :class="['container contracted', { open }]"
      @click="onClickTrigger"
    >
      <div class="option">
        <UnnnicFlag
          size="sm"
          :code="val"
        />
      </div>

      <div
        v-for="language in otherLanguages"
        :key="language.id"
        class="option"
        @click="val = language.id"
      >
        <UnnnicFlag
          size="sm"
          :code="language.id"
        />
      </div>
    </div>
  </div>

  <div
    v-else
    v-on-click-outside="onClickOutside"
    class="unnnic-language-select normal"
  >
    <div
      :class="['container normal', { open }]"
      @click="onClickTrigger"
    >
      <div
        :style="{
          position: 'absolute',
          [position === 'bottom' ? 'top' : 'bottom']:
            -0.125 * unnnicFontSize + 'px',
          width: '100%',
          padding: 0.0625 * unnnicFontSize + 'px',
          left: -0.0625 * unnnicFontSize + 'px',
        }"
        class="all"
      >
        <template v-if="position === 'bottom'">
          <div class="option">
            <UnnnicFlag
              size="sm"
              :code="val"
            />

            <div class="label">{{ languages[val] }}</div>

            <UnnnicIcon
              size="xs"
              :icon="dropdownIcon"
              scheme="neutral-clean"
            />
          </div>

          <div class="divider"></div>
        </template>

        <div
          v-for="language in otherLanguages"
          :key="language.id"
          class="option"
          @click="val = language.id"
        >
          <UnnnicFlag
            size="sm"
            :code="language.id"
          />

          <div class="label">{{ languages[language.id] }}</div>
        </div>

        <template v-if="position !== 'bottom'">
          <div class="divider"></div>

          <div class="option">
            <UnnnicFlag
              size="sm"
              :code="val"
            />

            <div class="label">{{ languages[val] }}</div>

            <UnnnicIcon
              size="xs"
              :icon="dropdownIcon"
              scheme="neutral-clean"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { vOnClickOutside } from '@vueuse/components';
import UnnnicFlag from '../Flag.vue';
import UnnnicIcon from '../Icon.vue';
import { unnnicFontSize } from '../config';

export default {
  name: 'LanguageSelect',
  components: {
    UnnnicFlag,
    UnnnicIcon,
  },
  directives: {
    onClickOutside: vOnClickOutside,
  },
  props: {
    modelValue: {
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
    supportedLanguages: {
      type: Array,
      default: () => ['pt-br', 'en'],
    },
  },
  data() {
    return {
      open: false,
      val: this.modelValue,
      unnnicFontSize,
    };
  },
  computed: {
    languages() {
      const languages = {
        'pt-br': 'Português - Brasil',
        en: 'English',
        es: 'Español',
      };

      return this.supportedLanguages.reduce(
        (previous, current) => ({
          ...previous,
          [current]: languages[current],
        }),
        {},
      );
    },

    otherLanguages() {
      return this.languageList.filter(({ id }) => id !== this.val);
    },
    languageList() {
      return Object.entries(this.languages).map(([id, name]) => ({ id, name }));
    },

    dropdownIcon() {
      let side = '';

      if (this.position === 'bottom') {
        side = this.open ? 'up' : 'down';
      } else {
        side = this.open ? 'down' : 'up';
      }

      return `arrow-button-${side}-1`;
    },
  },
  watch: {
    val() {
      this.$emit('update:model-value', this.val);
    },
    modelValue() {
      this.val = this.modelValue;
    },
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
};
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

.unnnic-language-select {
  &.normal {
    width: 100%;
    height: $unnnic-font-size-body-md + $unnnic-line-height-md + 2 *
      $unnnic-spacing-stack-xs;
    position: relative;
  }

  &.contracted {
    width: $unnnic-inset-xs * 2 + $unnnic-icon-size-sm;
    height: $unnnic-inset-xs * 2 + $unnnic-icon-size-sm;
    position: relative;
  }

  .container.contracted {
    display: flex;
    border-radius: $unnnic-border-radius-pill;
    padding: $unnnic-inset-xs;
    background-color: $unnnic-color-background-snow;
    width: $unnnic-inset-xs * 2 + $unnnic-icon-size-sm;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    position: absolute;

    .option {
      line-height: $unnnic-icon-size-sm;
      width: $unnnic-icon-size-sm;
      height: $unnnic-icon-size-sm;
    }

    .option:first-child {
      margin-right: $unnnic-inline-md;
    }

    &.open {
      padding: $unnnic-squish-xs;
      width: auto;
      box-shadow: $unnnic-shadow-level-near;
    }
  }

  .container.normal {
    border-radius: $unnnic-border-radius-pill;
    background-color: $unnnic-color-background-snow;
    min-width: 9 * $unnnic-font-size;
    width: 100%;
    height: $unnnic-font-size-body-md + $unnnic-line-height-md + 2 *
      $unnnic-spacing-stack-xs;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

    .option {
      display: flex;
      align-items: center;
      padding: $unnnic-squish-nano;

      .label {
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-md;
        font-weight: $unnnic-font-weight-regular;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
        color: $unnnic-color-neutral-dark;
        margin-left: $unnnic-spacing-inline-xs;
        margin-right: $unnnic-spacing-inline-nano;
        flex: 1;
      }
    }

    .divider {
      height: $unnnic-border-width-thinner;
      background: $unnnic-color-background-sky;
      margin: $unnnic-spacing-stack-xs $unnnic-spacing-inline-sm;
    }

    &.open {
      border-color: transparent;
      overflow: initial;

      .all {
        border-radius: $unnnic-border-radius-sm;
        background-color: $unnnic-color-background-snow;
        box-shadow: $unnnic-shadow-level-near;
      }
    }
  }
}
</style>
