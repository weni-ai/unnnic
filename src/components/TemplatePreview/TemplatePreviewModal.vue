<template>
  <UnnnicModalDialog
    :modelValue="modelValue"
    :title="defaultTranslations.title[props.locale]"
    :showCloseIcon="true"
    class="unnnic-template-preview-modal"
    @update:model-value="$event === false && $emit('close')"
  >
    <UnnnicTemplatePreview :template="template" />
  </UnnnicModalDialog>
</template>

<script lang="ts" setup>
import UnnnicTemplatePreview from './TemplatePreview.vue';
import UnnnicModalDialog from '../ModalDialog/ModalDialog.vue';

import type { Template } from './types';

const defaultTranslations = {
  title: {
    'pt-br': 'Visualizar modelo',
    en: 'Template preview',
    es: 'Vista previa de plantilla',
  },
};

interface Props {
  locale?: string;
  template: Template;
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  locale: 'en',
});

defineEmits<{
  close: void;
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

:deep(.unnnic-modal-dialog__container__content) {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $unnnic-color-neutral-lightest;
}
</style>
