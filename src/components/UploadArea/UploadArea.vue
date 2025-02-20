<template>
  <div>
    <UnnnicDropArea
      v-model:currentFiles="currentFiles"
      :acceptMultiple="acceptMultiple"
      :supportedFormats="supportedFormats"
      :maxFileSize="maxFileSize"
      :shouldReplace="shouldReplace"
      :maximumUploads="maximumUploads"
      :subtitle="subtitle"
      @file-change="$emit('fileChange', $event)"
    />

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
import UnnnicDropArea from '../DropArea/DropArea.vue';
import UnnnicImportCard from '../ImportCard/ImportCard.vue';

export default {
  name: 'UnnnicUploadArea',
  components: {
    UnnnicDropArea,
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

  emits: ['fileChange'],

  data() {
    return {
      currentFiles: this.files,
    };
  },

  watch: {
    files(newValue) {
      this.currentFiles = newValue;
    },
  },

  methods: {
    emitFileChange() {
      this.$emit('fileChange', this.currentFiles);
    },

    modifyFile(index, file) {
      this.currentFiles.splice(index, 1, file);
      this.emitFileChange();
    },

    removeFile(index) {
      this.currentFiles.splice(index, 1);
      this.emitFileChange();
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-upload-area {
  &__cards {
    margin-top: $unnnic-spacing-stack-md;
    display: flex;
    flex-direction: column;
    gap: $unnnic-spacing-stack-xs;
  }
}
</style>
