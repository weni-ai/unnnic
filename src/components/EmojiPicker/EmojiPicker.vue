<template>
  <div
    ref="pickerContainer"
    :class="['emoji-picker', `emoji-picker--${position}`]"
    @click.stop
    @keypress.enter.stop
  />
</template>

<script>
import i18n from '@emoji-mart/data/i18n/pt.json';
import data from '@emoji-mart/data/sets/14/apple.json';
import { Picker } from 'emoji-mart/';

export default {
  name: 'UnnnicEmojiPicker',
  props: {
    returnName: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'top',
      validator: (position) => ['top', 'bottom'].includes(position),
    },
  },
  emits: ['close', 'emojiSelected'],
  computed: {
    emojiPickerPreferences() {
      return {
        data,
        set: 'apple',
        theme: 'light',
        previewPosition: 'none',
        searchPosition: 'none',
        navPosition: 'bottom',
        noResultsEmoji: 'cry',
        maxFrequentRows: 3,
      };
    },
  },
  mounted() {
    this.initPicker();
  },
  methods: {
    initPicker() {
      // eslint-disable-next-line no-new
      new Picker({
        i18n,
        parent: this.$refs.pickerContainer,
        onEmojiSelect: this.onEmojiSelect,
        onClickOutside: () => this.$emit('close'),
        ...this.emojiPickerPreferences,
      });
    },
    onEmojiSelect(emoji) {
      this.$emit('emojiSelected', this.returnName ? emoji.id : emoji.native);
    },
  },
};
</script>

<style lang="scss" scoped>
.emoji-picker {
  position: absolute;
  z-index: 1;

  animation-duration: 0.3s;

  &--top {
    bottom: 100%;
    animation-name: slideInUp;
  }

  &--bottom {
    top: 100%;
    animation-name: slideInDown;
  }

  :deep(em-emoji-picker) {
    // Most variables don't work here
    --border-radius: 16px;
    --font-family: Lato, sans-serif; // $unnnic-font-family
    --rgb-accent: 0, 164, 159; // $unnnic-color-weni-600
    --rgb-color: 59, 65, 77; // $unnnic-color-neutral-darkest
    --color-border: rgb(244, 246, 248);
    --shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);

    cursor: default;
  }
}

@keyframes slideInUp {
  0% {
    transform: translateY(5%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

@keyframes slideInDown {
  0% {
    transform: translateY(-5%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
