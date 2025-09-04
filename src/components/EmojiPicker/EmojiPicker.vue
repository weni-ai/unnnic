<template>
  <div
    ref="emojiPickerRef"
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
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
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

const emojiPickerRef = ref<HTMLElement>()
const emojiIndex = computed(() => new EmojiIndex(data));

// @ts-expect-error: Type instantiation is excessively deep and possibly infinite
const translation = (key: string) => i18n.global.t(key) as string;

const translations = computed(() => ({
  search: translation('emoji_picker.search'),
  notfound: translation('emoji_picker.notfound'),
  categories: {
    search: translation('emoji_picker.categories.search'),
    recent: translation('emoji_picker.categories.recent'),
    smileys: translation('emoji_picker.categories.smileys'),
    people: translation('emoji_picker.categories.people'),
    nature: translation('emoji_picker.categories.nature'),
    foods: translation('emoji_picker.categories.foods'),
    activity: translation('emoji_picker.categories.activity'),
    places: translation('emoji_picker.categories.places'),
    objects: translation('emoji_picker.categories.objects'),
    symbols: translation('emoji_picker.categories.symbols'),
    flags: translation('emoji_picker.categories.flags'),
    custom: translation('emoji_picker.categories.custom')
  }
}))

const handleClickOutside = (event: Event) => {
  if (emojiPickerRef.value && !emojiPickerRef.value.contains(event.target as Node)) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

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

  :deep(.emoji-mart-emoji) {
    cursor: pointer;
  }

  :deep(.emoji-mart-category .emoji-mart-emoji span) {
    cursor: pointer;
  }

  :deep(.emoji-mart-anchor) {
    cursor: pointer;
  }

  :deep(.emoji-mart-anchor:hover) {
    color: rgb(59, 65, 77) // $unnnic-color-weni-600 with opacity
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
