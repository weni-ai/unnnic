<template>
  <div class="modal-upload">
    <div class="close-button-container">
      <unnnic-icon
        class="close-button"
        icon="close-1"
        scheme="neutral-dark"
        size="sm"
        @click="$emit('close')"
      />
    </div>

    <div class="title">
      {{ textTitle }}
    </div>

    <unnnic-upload-area
      :accept-multiple="acceptMultiple"
      :supported-formats="supportedFormats"
      :maximum-uploads="maximumUploads"
      :files-progress="filesProgress"
      :is-uploading="isUploading"
      :can-import="canImport"
      :can-delete="canDelete"
      :max-file-size="maxFileSize"
      :files="files"
      :subtitle="subtitle"
      @fileChange="$emit('file-change', $event)"
    />

    <div class="footer">
      <unnnic-button
        size="large"
        type="tertiary"
        :text="textCancel"
        @click="$emit('cancel')"
      />

      <unnnic-button
        size="large"
        type="primary"
        :text="textAction"
        @click="$emit('action')"
      />
    </div>
  </div>
</template>

<script>
import UnnnicUploadArea from '../UploadArea/UploadArea.vue';
import UnnnicIcon from '../Icon.vue';
import UnnnicButton from '../Button/Button.vue';

export default {
  model: {
    prop: 'files',
    event: 'file-change',
  },

  components: {
    UnnnicUploadArea,
    UnnnicIcon,
    UnnnicButton,
  },

  props: {
    textCancel: {
      type: String,
      default: 'Cancelar',
    },

    textAction: {
      type: String,
      default: 'Importar tudo',
    },

    textTitle: {
      type: String,
      default: 'Importar sentenças',
    },

    acceptMultiple: {
      type: Boolean,
      default: true,
    },

    supportedFormats: {
      type: String,
      default: 'png',
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

    files: {
      type: Array,
      default: () => [],
    },
    subtitle: {
      required: false,
      type: String,
      default: '',
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.modal-upload {
  background-color: $unnnic-color-background-carpet;
  border-radius: $unnnic-border-radius-sm;
  padding: 0 $unnnic-spacing-inline-md;
  padding-top: $unnnic-spacing-stack-sm;
  padding-bottom: $unnnic-spacing-stack-giant;
  box-shadow: $unnnic-shadow-level-separated;

  .close-button-container {
    text-align: right;
    margin-bottom: $unnnic-spacing-stack-xs;

    .close-button {
      cursor: pointer;
    }
  }

  .title {
    text-align: center;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-black;
    font-size: $unnnic-font-size-title-sm;
    line-height: $unnnic-font-size-title-sm + $unnnic-line-height-md;
    color: $unnnic-color-neutral-darkest;
    margin-bottom: $unnnic-spacing-stack-md;
  }

  .footer {
    margin-top: $unnnic-spacing-stack-md;
    margin-bottom: -$unnnic-spacing-stack-sm;
    display: grid;
    grid-gap: $unnnic-spacing-inline-lg;
    grid-template-columns: repeat(auto-fit, minmax(10 * $unnnic-font-size, 1fr));
  }
}
</style>
