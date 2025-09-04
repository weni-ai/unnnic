<template>
  <div
    :class="['emoji-picker', `emoji-picker--${position}`]"
    @click.stop
    @keypress.enter.stop
  >
    <Picker
      :data="emojiIndex"
      set="apple"
      theme="light"
      :preview="false"
      :search="true"
      nav-position="bottom"
      no-results-emoji="cry"
      :max-frequent-rows="3"
      :i18n="translations"
      @select="onEmojiSelect"
      @click-outside="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import i18n from '../../utils/plugins/i18n'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
import data from 'emoji-mart-vue-fast/data/all.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'

interface Emoji {
  id: string
  native: string
}

export interface Props {
  returnName?: boolean
  position?: 'top' | 'bottom'
}

const props = withDefaults(defineProps<Props>(), {
  returnName: false,
  position: 'top'
})

const emit = defineEmits<{
  close: []
  emojiSelected: [emoji: string]
}>()

const emojiIndex = computed(() => new EmojiIndex(data))

const translations = computed(() => ({
  search: i18n.global.t('emoji_picker.search'),
  notfound: i18n.global.t('emoji_picker.notfound'),
  categories: {
    search: i18n.global.t('emoji_picker.categories.search'),
    recent: i18n.global.t('emoji_picker.categories.recent'),
    smileys: i18n.global.t('emoji_picker.categories.smileys'),
    people: i18n.global.t('emoji_picker.categories.people'),
    nature: i18n.global.t('emoji_picker.categories.nature'),
    foods: i18n.global.t('emoji_picker.categories.foods'),
    activity: i18n.global.t('emoji_picker.categories.activity'),
    places: i18n.global.t('emoji_picker.categories.places'),
    objects: i18n.global.t('emoji_picker.categories.objects'),
    symbols: i18n.global.t('emoji_picker.categories.symbols'),
    flags: i18n.global.t('emoji_picker.categories.flags'),
    custom: i18n.global.t('emoji_picker.categories.custom')
  }
}))

const onEmojiSelect = (emoji: Emoji) => {
  emit('emojiSelected', props.returnName ? emoji.id : emoji.native)
}
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

  :deep(.emoji-mart) {
    border-radius: 16px;
    font-family: Lato, sans-serif; // $unnnic-font-family
    border: 1px solid rgb(244, 246, 248);
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
    cursor: default;
  }

  :deep(.emoji-mart-category-emoji) {
    cursor: pointer;
  }

  :deep(.emoji-mart-category-emoji:hover) {
    background: rgba(0, 164, 159, 0.1); // $unnnic-color-weni-600 with opacity
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
