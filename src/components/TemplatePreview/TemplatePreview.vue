<template>
  <section class="unnnic-template-preview">
    <section
      :class="[
        'unnnic-template-preview__content',
        { 'unnnic-template-preview__content--has-media': hasHeaderMedia },
      ]"
    >
      <header
        v-if="hasHeader"
        :class="`unnnic-template-preview__header__${
          template?.header.type === 'TEXT' ? 'text' : 'media'
        }`"
      >
        <img
          v-if="
            template?.header.type === 'MEDIA' &&
            template?.header.mediaType === 'IMAGE'
          "
          class="unnnic-template-preview__header__media__preview"
          :src="template.header.src || imagePreview"
        />
        <template
          v-else-if="
            template?.header.type === 'MEDIA' &&
            template?.header.mediaType === 'VIDEO'
          "
        >
          <video
            v-if="template.header.src"
            class="unnnic-template-preview__header__media__preview"
            :src="template.header.src"
            controls
          />
          <img
            v-else
            class="unnnic-template-preview__header__media__preview"
            :src="videoPreview"
          />
        </template>
        <template
          v-else-if="
            template?.header.type === 'MEDIA' &&
            template?.header.mediaType === 'DOCUMENT'
          "
        >
          <img
            class="unnnic-template-preview__header__media__preview"
            :src="documentPreview"
          />
        </template>
        <h1
          v-else-if="template?.header.type === 'TEXT'"
          class="unnnic-template-preview__header__text__preview"
        >
          {{ template.header.text }}
        </h1>
      </header>
      <section
        v-if="hasBody"
        :class="[
          'unnnic-template-preview__body',
          { 'unnnic-template-preview__body--has-media': hasHeaderMedia },
        ]"
      >
        <section v-html="parsedBody"></section>
      </section>
      <footer
        v-if="hasFooter"
        :class="[
          'unnnic-template-preview__footer',
          { 'unnnic-template-preview__footer--has-media': hasHeaderMedia },
        ]"
      >
        {{ template?.footer }}
      </footer>
    </section>
    <footer
      v-if="hasButtons"
      class="unnnic-template-preview__buttons"
    >
      <section
        v-for="(button, index) in template?.buttons"
        :key="`button-${index}`"
        class="unnnic-template-preview__buttons__button"
      >
        <UnnnicIcon
          class="unnnic-template-preview__buttons__button__icon"
          :icon="getButtonIcon(button.type)"
          scheme="aux-blue-500"
          size="ant"
        />
        <p class="unnnic-template-preview__buttons__button__text">
          {{ button.text }}
        </p>
      </section>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { Template } from './types';

import imagePreview from '../../assets/img/previews/image-preview.png';
import documentPreview from '../../assets/img/previews/doc-preview.png';
import videoPreview from '../../assets/img/previews/video-preview.png';

import UnnnicIcon from '../Icon.vue';

interface Props {
  template?: Template | null;
}

const props = withDefaults(defineProps<Props>(), {
  template: null,
});

const hasHeader = computed(
  () => props.template?.header && props.template.header.type,
);
const hasHeaderMedia = computed(
  () => !!props.template?.header && props.template.header.type === 'MEDIA',
);
const hasBody = computed(
  () => !!props.template?.body && props.template.body.length > 0,
);
const hasFooter = computed(
  () => !!props.template?.footer && props.template.footer.length > 0,
);
const hasButtons = computed(
  () => !!props.template?.buttons && props.template.buttons.length > 0,
);
const parsedBody = computed(() => {
  if (!hasBody.value) return '';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const result = props
    .template!.body!.replaceAll('\n', '<br/>')
    .replaceAll(/(?:\*)([^*<\n]+)(?:\*)/g, '<strong>$1</strong>')
    .replaceAll(/(?:_)([^_<\n]+)(?:_)/g, '<i>$1</i>')
    .replaceAll(/(?:~)([^~<\n]+)(?:~)/g, '<s>$1</s>')
    .replaceAll(/(?:```)([^```<\n]+)(?:```)/g, '<tt>$1</tt>')
    .replaceAll(/{{.*?}}/g, (match) => `<strong>${match}</strong>`);

  return result;
});

const getButtonIcon = (buttonType) => {
  const buttonMapper = {
    PHONE_NUMBER: 'phone',
    URL: 'open_in_new',
    COPY_CODE: 'content_copy',
    FLOW: '',
    QUICK_REPLY: 'reply',
  };

  return buttonMapper[buttonType] || '';
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-template-preview {
  display: flex;
  flex-direction: column;
  box-shadow: $unnnic-shadow-level-near;
  background-color: $unnnic-color-background-white;
  width: 368px;
  border-radius: $unnnic-border-radius-md;

  &__content {
    display: flex;
    flex-direction: column;
    gap: $unnnic-space-3;
    padding: $unnnic-space-4 $unnnic-space-3;

    &--has-media {
      padding: $unnnic-space-1;
    }
  }

  &__header {
    &__text {
      &__preview {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-bold;
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
        color: $unnnic-color-neutral-dark;

        margin: $unnnic-space-0;
      }
    }

    &__media {
      &__preview {
        width: 100%;
        object-fit: cover;
      }
    }
  }

  &__body {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    color: $unnnic-color-neutral-cloudy;

    &--has-media {
      padding: $unnnic-space-0 $unnnic-space-2;
    }
  }

  &__footer {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    color: $unnnic-color-neutral-clean;

    &--has-media {
      padding: $unnnic-space-0 $unnnic-space-3 $unnnic-space-2;
    }
  }

  &__buttons {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-bold;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;

    &__button {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $unnnic-space-2;
      padding: $unnnic-space-3;
      border-top: 1px solid $unnnic-color-neutral-light;

      &__text {
        color: $unnnic-color-aux-blue-500;
        margin: $unnnic-space-0;
      }
    }
  }
}
</style>
