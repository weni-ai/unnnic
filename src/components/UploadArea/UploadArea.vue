<template>
  <div>
    <div
      ref="dropzone"
      :class="{
        'unnnic-upload-area__dropzone': true,
        'unnnic-upload-area__dropzone__is-dragover': isDragging,
      }"
      v-on:dragenter.stop.prevent="dragenter"
      v-on:dragover.stop.prevent="dragover"
      v-on:dragleave.stop.prevent="dragleave"
      v-on:dragend.stop.prevent="dragend"
      v-on:drop.stop.prevent="drop"
    >
      <unnnic-icon-svg
        class="unnnic-upload-area__dropzone__icon"
        icon="upload-bottom-1"
        :scheme="hasError ? 'feedback-red' : 'brand-weni'"
        size="xl"
      />

      <div class="unnnic-upload-area__dropzone__content">
        <span v-if="!hasError" class="unnnic-upload-area__dropzone__content__title">
          {{ $t('upload_area.title.text') }}
          <span class="unnnic-upload-area__dropzone__content__title__search">
            {{ $t('upload_area.title.highlight') }}
          </span>
        </span>
        <span v-else class="unnnic-upload-area__dropzone__content__title">
          <span class="unnnic-upload-area__dropzone__content__title__error">
            {{ $t('upload_area.invalid.highlight') }}
          </span>
          {{ $t('upload_area.invalid.text') }}
        </span>
        <span class="unnnic-upload-area__dropzone__content__subtitle">
          {{ $t('upload_area.subtitle') }} {{ formattedSupportedFormats }}
        </span>
      </div>
    </div>
    <div v-if="currentFiles.length > 0" class="unnnic-upload-area__cards">
      <unnnic-import-card
        v-for="(file, index) in currentFiles"
        :key="index"
        :title="file.name"
        :subtitle="file.name"
        :isImporting="isUploading"
        :importProgress="filesProgress[index] || 100"
        :canImport="canImport"
        :canDelete="canDelete"
        :acceptedFormats="supportedFormats"
        @delete="removeFile(index)"
        @modifiedFile="modifyFile(index, $event)"
      />
    </div>
  </div>
</template>

<script>
import UnnnicIconSvg from '../Icon-svg.vue';
import UnnnicImportCard from '../ImportCard/ImportCard.vue';

export default {
  name: 'unnnic-upload-area',
  components: {
    UnnnicIconSvg,
    UnnnicImportCard,
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
  },
  data() {
    return {
      hasError: false,
      isDragging: false,
      dragEnterCounter: 0, // to handle dragenter/dragleave on child elements
      currentFiles: [],
    };
  },
  computed: {
    formattedSupportedFormats() {
      const formats = this.supportedFormats.split(',').map((format) => format.toUpperCase());

      return formats.join(', ');
    },
  },
  methods: {
    debug(event) {
      console.log('Event0:', event.type);
    },
    dragenter() {
      this.dragEnterCounter += 1;
      this.isDragging = true;
      console.log('Entered');
    },
    dragover() {
      console.log('over');
    },
    dragleave() {
      this.dragEnterCounter -= 1;
      if (this.dragEnterCounter === 0) {
        this.isDragging = false;
        console.log('leaving');
      }
    },
    dragend() {
      this.isDragging = false;
      console.log('end');
    },
    drop(event) {
      this.isDragging = false;

      console.log('Drop:', event);
      console.log('Files');
      const { files } = event.dataTransfer;

      if (!this.acceptMultiple && files.length > 1) {
        this.setErrorState();
        return;
      }

      if (!this.validFormat(files)) {
        this.setErrorState();
        return;
      }

      this.addFiles(files);
    },

    validFormat(files) {
      const formats = this.supportedFormats.replace('.', '').split(',');
      console.log('Files:', files);
      console.log('Formats:', formats);

      const isValid = Array.from(files).find((file) => {
        // eslint-disable-next-line arrow-body-style
        const validFormat = formats.find((format) => {
          return file.type.toLowerCase().includes(format.toLowerCase());
        });

        return validFormat;
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
      if (this.currentFiles.length + files.length > this.maximumUploads) {
        this.setErrorState();
        return;
      }

      const validFiles = Array.from(files).filter((file) => {
        if (this.validFormat([file])) {
          return true;
        }
        return false;
      });

      this.currentFiles = this.currentFiles.concat(validFiles);
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
        'FileReader' in window
        && ('draggable' in dropzone || ('ondragstart' in dropzone && 'ondrop' in dropzone))
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-upload-area {
  &__dropzone {
    border-radius: $unnnic-border-radius-lg;
    background-color: $unnnic-color-background-carpet;
    padding: $unnnic-spacing-inset-lg;

    // Dashed border with increased dashes spacing and color neutral clean
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23D0D3D9FF' stroke-width='4' stroke-dasharray='4%2c 12' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");

    &__is-dragover {
      background-color: $unnnic-color-background-sky;
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%2300DED2FF' stroke-width='4' stroke-dasharray='4%2c 12' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
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
