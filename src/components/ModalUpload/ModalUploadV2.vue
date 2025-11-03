<template>
  <UnnnicModalDialog
    :modelValue="props.modelValue"
    :title="props.title"
    :persistent="props.persistent"
    :icon="props.icon"
    :iconScheme="props.iconScheme"
    :showCloseIcon="props.showCloseIcon"
    :primaryButtonProps="props.primaryButtonProps"
    :secondaryButtonProps="props.secondaryButtonProps"
    @update:model-value="emit('update:modelValue', $event)"
    @close="emit('update:modelValue', false)"
    @primary-button-click="emit('primaryButtonClick')"
    @secondary-button-click="emit('update:modelValue', false)"
  >
    <UnnnicUploadArea
      :acceptMultiple="props.acceptMultiple"
      :supportedFormats="props.supportedFormats"
      :maximumUploads="props.maximumUploads"
      :filesProgress="props.filesProgress"
      :isUploading="props.isUploading"
      :canImport="props.canImport"
      :canDelete="props.canDelete"
      :maxFileSize="props.maxFileSize"
      :files="props.files"
      :subtitle="props.subtitle"
      @file-change="emit('file-change', $event)"
    />
  </UnnnicModalDialog>
</template>

<script lang="ts" setup>
import UnnnicModalDialog from '../ModalDialog/ModalDialog.vue';
import UnnnicUploadArea from '../UploadArea/UploadArea.vue';

interface ModalUploadProps {
  modelValue: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  persistent?: boolean;
  icon?: string;
  iconScheme?: string;
  showCloseIcon?: boolean;
  primaryButtonProps?: { [key: string]: unknown };
  secondaryButtonProps?: { [key: string]: unknown };
  acceptMultiple?: boolean;
  supportedFormats?: string;
  maximumUploads?: number;
  filesProgress?: Array<number>;
  isUploading?: boolean;
  canImport?: boolean;
  canDelete?: boolean;
  maxFileSize?: number;
  files?: Array<File>;
  subtitle?: string;
}

const props = withDefaults(defineProps<ModalUploadProps>(), {
  title: '',
  size: 'md',
  persistent: false,
  icon: '',
  iconScheme: '',
  primaryButtonProps: () => ({}),
  secondaryButtonProps: () => ({}),
  acceptMultiple: true,
  supportedFormats: '.png',
  maximumUploads: 1,
  filesProgress: () => [],
  isUploading: false,
  canImport: false,
  canDelete: true,
  maxFileSize: undefined,
  files: () => [],
  subtitle: '',
});

const emit = defineEmits<{
  'update:modelValue': [boolean];
  'file-change': [File[]];
  primaryButtonClick: [];
}>();
</script>
