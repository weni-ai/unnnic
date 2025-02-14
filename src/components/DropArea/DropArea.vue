<template>
  <section
    ref="dropzone"
    :class="{
      'unnnic-upload-area__dropzone': true,
      'unnnic-upload-area__dropzone__is-dragover': isDragging,
      'unnnic-upload-area__dropzone__has-error': hasError,
    }"
    @dragenter.stop.prevent="dragenter"
    @dragover.stop.prevent="dragover"
    @dragleave.stop.prevent="dragleave"
    @dragend.stop.prevent="dragend"
    @drop.stop.prevent="drop"
    @click="() => $refs.file.click()"
  >
    <UnnnicIcon
      class="unnnic-upload-area__dropzone__icon"
      icon="upload"
      :scheme="hasError ? 'feedback-red' : 'weni-500'"
      size="lg"
    />

    <div class="unnnic-upload-area__dropzone__content">
      <span class="unnnic-upload-area__dropzone__content__title">
        <slot name="title">
          {{ $t('upload_area.title.text') }}
          <span
            :class="`unnnic-upload-area__dropzone__content__title__${
              hasError ? 'error' : 'search'
            }`"
          >
            {{ $t('upload_area.title.highlight') }}
          </span>
        </slot>
      </span>
      <span
        :class="[
          'unnnic-upload-area__dropzone__content__subtitle',
          {
            'unnnic-upload-area__dropzone__content__subtitle__error': hasError,
          },
        ]"
        :title="formattedSupportedFormats"
      >
        <slot name="subtitle">
          {{
            subtitle ||
            `${$t(
              `upload_area${hasError ? '.invalid' : ''}.subtitle`,
            )} ${formattedSupportedFormats}`
          }}
        </slot>
      </span>
    </div>
    <input
      v-show="false"
      ref="file"
      type="file"
      :accept="supportedFormats"
      :multiple="acceptMultiple"
      @input="handleFileChange"
    />
  </section>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue';
import mime from 'mime';

import UnnnicIcon from '../Icon.vue';

const isDragging = ref(false);
const hasError = ref(false);
const dragEnterCounter = ref(0);
const file = ref();

const props = defineProps({
  acceptMultiple: {
    type: Boolean,
    default: true,
  },

  supportedFormats: {
    type: String,
    default: '*',
  },

  maxFileSize: {
    type: Number,
    default: undefined,
  },

  shouldReplace: {
    type: Boolean,
    default: false,
  },

  currentFiles: {
    type: Array,
    default() {
      return [];
    },
  },

  maximumUploads: {
    type: Number,
    default: 1,
  },

  subtitle: {
    type: String,
    default: '',
  },
});

const emit = defineEmits([
  'update:currentFiles',
  'fileChange',
  'unsupportedFormat',
  'exceededTheMaximumFileSizeLimit',
]);

const instance = getCurrentInstance();

function isEventDefined(eventName) {
  return !!instance?.vnode?.props?.[eventName];
}

const formattedSupportedFormats = computed(() => {
  const formats = props.supportedFormats
    .split(',')
    .map((format) => format.toUpperCase());

  return formats.join(', ');
});

function dragenter() {
  dragEnterCounter.value += 1;
  isDragging.value = true;
}

function dragover() {
  isDragging.value = true;
}

function dragleave() {
  dragEnterCounter.value -= 1;
  if (dragEnterCounter.value === 0) {
    isDragging.value = false;
  }
}

function dragend() {
  isDragging.value = false;
}

function drop(event) {
  isDragging.value = false;

  const { files } = event.dataTransfer;

  if (validateFiles(files)) {
    addFiles(files);
  }
}

function handleFileChange(event) {
  const { files } = event.target;

  if (validateFiles(files)) {
    addFiles(files);
  }

  file.value.value = '';
}

function setErrorState() {
  hasError.value = true;

  setTimeout(() => {
    hasError.value = false;
  }, 5000);
}

function validateFiles(files) {
  if (!props.acceptMultiple && files.length > 1) {
    setErrorState();
    return false;
  }

  if (!validFormat(files)) {
    if (isEventDefined('onUnsupportedFormat')) {
      emit('unsupportedFormat');
    } else {
      setErrorState();
    }

    return false;
  }

  if (!validSize(files)) {
    if (isEventDefined('onExceededTheMaximumFileSizeLimit')) {
      emit('exceededTheMaximumFileSizeLimit');
    } else {
      setErrorState();
    }

    return false;
  }

  return true;
}

function validFormat(files) {
  if (props.supportedFormats === '*') {
    return true;
  }

  const formats = props.supportedFormats
    .split(',')
    .map((format) => format.trim());

  const isValid = Array.from(files).find((file) => {
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    const fileExtension = `.${fileName.split('.').pop()}`;

    const isValidFileExtension = formats.includes(fileExtension);
    const isValidFileType = fileType === mime.getType(fileName);

    return isValidFileExtension && isValidFileType;
  });

  return isValid;
}

function validSize(files) {
  if (!props.maxFileSize) {
    return true;
  }

  const isValid = Array.from(files).find((file) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

    return sizeInMB <= props.maxFileSize;
  });

  return isValid;
}

function addFiles(files) {
  let totalLength = files.length;

  if (!props.shouldReplace) {
    totalLength += props.currentFiles.length;
  }

  if (totalLength > props.maximumUploads) {
    setErrorState();
    return;
  }

  const validFiles = Array.from(files).filter((file) => {
    if (validFormat([file]) && validSize([file])) {
      return true;
    }
    return false;
  });

  let currentFiles;

  if (props.shouldReplace) {
    currentFiles = validFiles;
  } else {
    currentFiles = props.currentFiles.concat(validFiles);
  }

  emit('update:currentFiles', currentFiles);
  emit('fileChange', currentFiles);
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

@function borderDashed($color) {
  $colorString: unquote('' + $color);
  $cleanColor: str-slice($colorString, 2);
  @return url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23#{$cleanColor}' stroke-width='1' stroke-dasharray='4%2c 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
}

.unnnic-upload-area__dropzone {
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-spacing-inset-lg;

  // Dashed border with increased dashes spacing and color neutral clean
  background-image: borderDashed($unnnic-color-neutral-clean);

  &__has-error {
    background-image: borderDashed($unnnic-color-feedback-red);
  }

  &__is-dragover {
    background-color: $unnnic-color-background-sky;
    background-image: borderDashed($unnnic-color-brand-weni);
  }

  &__icon {
    display: block;
    margin: 0 auto;

    margin-bottom: $unnnic-spacing-stack-xs;
  }

  &__content {
    display: flex;
    flex-direction: column;

    text-align: center;
    font-family: $unnnic-font-family-secondary;

    &__title {
      color: $unnnic-color-neutral-darkest;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;

      &__search {
        color: $unnnic-color-brand-weni;
      }

      &__error {
        color: $unnnic-color-feedback-red;
      }
    }

    &__subtitle {
      color: $unnnic-color-neutral-cloudy;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;

      &__error {
        color: $unnnic-color-feedback-red;
      }
    }
  }
}
</style>
