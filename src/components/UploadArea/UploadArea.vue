<template>
  <div>
    <div
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
        icon="upload-bottom-1"
        :scheme="hasError ? 'feedback-red' : 'brand-weni'"
        size="xl"
      />

      <div class="unnnic-upload-area__dropzone__content">
        <span class="unnnic-upload-area__dropzone__content__title">
          {{ $t('upload_area.title.text') }}
          <span
            :class="`unnnic-upload-area__dropzone__content__title__${
              hasError ? 'error' : 'search'
            }`"
          >
            {{ $t('upload_area.title.highlight') }}
          </span>
        </span>
        <span
          :class="[
            'unnnic-upload-area__dropzone__content__subtitle',
            {
              'unnnic-upload-area__dropzone__content__subtitle__error':
                hasError,
            },
          ]"
          :title="formattedSupportedFormats"
        >
          {{
            subtitle ||
            `${$t(
              `upload_area${hasError ? '.invalid' : ''}.subtitle`,
            )} ${formattedSupportedFormats}`
          }}
        </span>
      </div>
      <input
        ref="file"
        type="file"
        :accept="supportedFormats"
        :multiple="acceptMultiple"
        style="display: none"
        @input="handleFileChange"
      />
    </div>
    <div
      v-if="currentFiles.length > 0"
      class="unnnic-upload-area__cards"
    >
      <UnnnicImportCard
        v-for="(file, index) in currentFiles"
        :key="index"
        :title="file.name"
        :subtitle="file.name"
        :isImporting="isUploading"
        :importProgress="filesProgress[index] || 100"
        :canImport="canImport"
        :canDelete="canDelete"
        :acceptedFormats="supportedFormats"
        uploadIcon="button-refresh-arrows-1"
        @delete="removeFile(index)"
        @modified-file="modifyFile(index, $event)"
      />
    </div>
  </div>
</template>

<script>
import mime from 'mime';

import UnnnicIcon from '../Icon.vue';
import UnnnicImportCard from '../ImportCard/ImportCard.vue';

export default {
  name: 'UnnnicUploadArea',
  components: {
    UnnnicIcon,
    UnnnicImportCard,
  },
  model: {
    prop: 'files',
    event: 'fileChange',
  },
  props: {
    files: {
      type: Array,
      default: () => [],
    },
    acceptMultiple: {
      type: Boolean,
      default: true,
    },
    supportedFormats: {
      type: String,
      default: '*',
    },
    maximumUploads: {
      type: Number,
      default: 1,
    },
    filesProgress: {
      type: Array,
      default: () => [],
    },
    isUploading: {
      type: Boolean,
      default: false,
    },
    canImport: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: true,
    },
    maxFileSize: {
      type: Number,
      default: undefined,
    },
    shouldReplace: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      required: false,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hasError: false,
      isDragging: false,
      dragEnterCounter: 0, // to handle dragenter/dragleave on child elements
      currentFiles: this.files,
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
  watch: {
    files(newValue) {
      this.currentFiles = newValue;
    },
  },
  methods: {
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
    validateFiles(files) {
      if (!this.acceptMultiple && files.length > 1) {
        this.setErrorState();
        return false;
      }

      if (!this.validFormat(files)) {
        this.setErrorState();
        return false;
      }

      if (!this.validSize(files)) {
        this.setErrorState();
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
        const isValidFileType = fileType === mime.getType(fileName);

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

    setErrorState() {
      this.hasError = true;

      setTimeout(() => {
        this.hasError = false;
      }, 5000);
    },

    emitFileChange() {
      this.$emit('fileChange', this.currentFiles);
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

      if (this.shouldReplace) {
        this.currentFiles = validFiles;
      } else {
        this.currentFiles = this.currentFiles.concat(validFiles);
      }
      this.emitFileChange();
    },

    modifyFile(index, file) {
      this.currentFiles.splice(index, 1, file);
      this.emitFileChange();
    },

    removeFile(index) {
      this.currentFiles.splice(index, 1);
      this.emitFileChange();
    },

    checkDragAndDropSupport() {
      const { dropzone } = this.$refs;
      return (
        'FileReader' in window &&
        ('draggable' in dropzone ||
          ('ondragstart' in dropzone && 'ondrop' in dropzone))
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

@function borderDashed($color) {
  $colorString: unquote('' + $color);
  $cleanColor: str-slice($colorString, 2);
  @return url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23#{$cleanColor}' stroke-width='4' stroke-dasharray='4%2c 12' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
}

.unnnic-upload-area {
  &__dropzone {
    border-radius: $unnnic-border-radius-lg;
    background-color: $unnnic-color-background-carpet;
    padding: $unnnic-spacing-inset-lg;

    // Dashed border with increased dashes spacing and color neutral clean
    background-image: borderDashed($unnnic-color-neutral-cleanest);

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

      margin-bottom: $unnnic-spacing-stack-sm;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: $unnnic-spacing-stack-nano;

      text-align: center;
      font-family: $unnnic-font-family-secondary;

      &__title {
        color: $unnnic-color-neutral-darkest;
        font-weight: $unnnic-font-weight-bold;
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

  &__cards {
    margin-top: $unnnic-spacing-stack-md;
    display: flex;
    flex-direction: column;
    gap: $unnnic-spacing-stack-xs;
  }
}

.unnnic-upload-area__dropzone__dragndrop,
.unnnic-upload-area__dropzone__uploading,
.unnnic-upload-area__dropzone__success,
.unnnic-upload-area__dropzone__error {
  display: none;
}
</style>
