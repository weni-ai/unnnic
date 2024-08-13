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

<script>
import mime from 'mime-types';

import UnnnicIcon from '../Icon.vue';

export default {

  components: {
    UnnnicIcon,
  },

  props: {
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
  },

  emits: [
    'update:currentFiles',
    'fileChange',
    'unsupportedFormat',
    'exceededTheMaximumFileSizeLimit',
  ],

  data() {
    return {
      isDragging: false,
      hasError: false,
      dragEnterCounter: 0,
    };
  },

  computed: {
    formattedSupportedFormats() {
      const formats = this.supportedFormats
        .split(',')
        .map((format) => format.toUpperCase());

      return formats.join(', ');
    },
  },

  methods: {
    isEventDefined(eventName) {
      return this.$listeners[eventName];
    },

    dragenter() {
      this.dragEnterCounter += 1;
      this.isDragging = true;
    },

    dragover() {
      this.isDragging = true;
    },

    dragleave() {
      this.dragEnterCounter -= 1;
      if (this.dragEnterCounter === 0) {
        this.isDragging = false;
      }
    },

    dragend() {
      this.isDragging = false;
    },

    drop(event) {
      this.isDragging = false;

      const { files } = event.dataTransfer;

      if (this.validateFiles(files)) {
        this.addFiles(files);
      }
    },

    handleFileChange(event) {
      const { files } = event.target;

      if (this.validateFiles(files)) {
        this.addFiles(files);
      }

      this.$refs.file.value = '';
    },

    setErrorState() {
      this.hasError = true;

      setTimeout(() => {
        this.hasError = false;
      }, 5000);
    },

    validateFiles(files) {
      if (!this.acceptMultiple && files.length > 1) {
        this.setErrorState();
        return false;
      }

      if (!this.validFormat(files)) {
        if (this.isEventDefined('unsupportedFormat')) {
          this.$emit('unsupportedFormat');
        } else {
          this.setErrorState();
        }

        return false;
      }

      if (!this.validSize(files)) {
        if (this.isEventDefined('exceededTheMaximumFileSizeLimit')) {
          this.$emit('exceededTheMaximumFileSizeLimit');
        } else {
          this.setErrorState();
        }

        return false;
      }

      return true;
    },

    validFormat(files) {
      if (this.supportedFormats === '*') {
        return true;
      }

      const formats = this.supportedFormats
        .split(',')
        .map((format) => format.trim());

      const isValid = Array.from(files).find((file) => {
        const fileName = file.name.toLowerCase();
        const fileType = file.type.toLowerCase();
        const fileExtension = `.${fileName.split('.').pop()}`;

        const isValidFileExtension = formats.includes(fileExtension);
        const isValidFileType = fileType === mime.lookup(fileName);

        return isValidFileExtension && isValidFileType;
      });

      return isValid;
    },

    validSize(files) {
      if (!this.maxFileSize) {
        return true;
      }

      const isValid = Array.from(files).find((file) => {
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

        return sizeInMB <= this.maxFileSize;
      });

      return isValid;
    },

    addFiles(files) {
      let totalLength = files.length;

      if (!this.shouldReplace) {
        totalLength += this.currentFiles.length;
      }

      if (totalLength > this.maximumUploads) {
        this.setErrorState();
        return;
      }

      const validFiles = Array.from(files).filter((file) => {
        if (this.validFormat([file]) && this.validSize([file])) {
          return true;
        }
        return false;
      });

      let currentFiles;

      if (this.shouldReplace) {
        currentFiles = validFiles;
      } else {
        currentFiles = this.currentFiles.concat(validFiles);
      }

      console.log('teste', this.$emit, currentFiles);

      this.$emit('update:currentFiles', currentFiles);
      this.$emit('fileChange', currentFiles);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

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
