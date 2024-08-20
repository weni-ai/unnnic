<template>
  <div class="unnnic-import-card">
    <UnnnicIcon
      class="unnnic-import-card__file-icon"
      size="md"
      scheme="weni-600"
      :icon="fileIcon"
    />

    <div class="unnnic-import-card__data">
      <div
        v-if="isImporting"
        class="unnnic-import-card__data__title"
      >
        {{ $t('import_card.importing') }}...
      </div>
      <div
        v-else
        class="unnnic-import-card__data__title"
      >
        {{ title }}
      </div>

      <div
        v-if="subtitle && isImporting"
        class="unnnic-import-card__data__subtitle"
      >
        <div
          v-if="subtitle && isImporting"
          class="unnnic-import-card__data__subtitle__text"
        >
          {{ subtitle }}
        </div>
        <div
          v-if="subtitle && isImporting"
          class="unnnic-import-card__data__subtitle__progress"
        >
          &nbsp;- {{ importProgress }}%
        </div>
      </div>
    </div>

    <div class="unnnic-import-card__buttons">
      <UnnnicButton
        v-if="canImport"
        class="unnnic-import-card__buttons__import"
        size="small"
        :iconCenter="uploadIcon"
        type="primary"
        @click="importFile"
      >
        <input
          ref="file"
          type="file"
          :accept="acceptedFormats"
          style="display: none"
          @change="handleFileChange"
        />
      </UnnnicButton>

      <UnnnicIcon
        v-if="canDelete"
        class="unnnic-import-card__buttons__delete"
        size="sm"
        scheme="neutral-cloudy"
        icon="delete"
        clickable
        @click="emitDeletion"
      />
    </div>
  </div>
</template>

<script>
import UnnnicButton from '../Button/Button.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'ImportCard',
  components: {
    UnnnicButton,
    UnnnicIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    importProgress: {
      type: Number,
      default: 0,
    },
    isImporting: {
      type: Boolean,
      default: false,
    },
    canImport: {
      type: Boolean,
      default: true,
    },
    canDelete: {
      type: Boolean,
      default: true,
    },
    acceptedFormats: {
      type: String,
      default: '*',
    },
    uploadIcon: {
      type: String,
      default: 'upload-bottom-1',
    },
  },
  computed: {
    fileIcon() {
      const extension = this.title.slice(this.title.lastIndexOf('.') + 1);

      return (
        {
          pdf: 'picture_as_pdf',
          txt: 'text_snippet',
          xls: 'table',
          xlsx: 'table',
          doc: 'draft',
          docx: 'draft',
        }[extension] || 'draft'
      );
    },
  },
  methods: {
    importFile() {
      this.$refs.file.click();
    },
    handleFileChange(event) {
      const { files } = event.target;
      let file;

      if (files.length > 0) {
        [file] = event.target.files;
      }

      if (file) {
        this.$emit('modifiedFile', file);
      }
    },
    emitDeletion() {
      this.$emit('delete');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-import-card {
  display: flex;
  column-gap: $unnnic-spacing-xs;
  align-items: center;

  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  border-radius: $unnnic-border-radius-sm;

  background-color: $unnnic-color-neutral-white;
  padding: $unnnic-spacing-xs - $unnnic-border-width-thinner;

  &__file-icon {
    user-select: none;
    margin: $unnnic-spacing-xs;
  }

  &__data {
    align-self: center;
    overflow: hidden;

    flex: 1;
    gap: $unnnic-spacing-stack-nano;

    font-family: $unnnic-font-family-secondary;

    &__title {
      color: $unnnic-color-neutral-dark;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-regular;

      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__subtitle {
      color: $unnnic-color-neutral-cloudy;
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-regular;

      display: inline-flex;

      &__text {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }

      &__progress {
        min-width: fit-content;
      }
    }
  }

  &__buttons {
    display: flex;
    gap: $unnnic-spacing-inline-xs;
    align-items: center;

    margin-right: $unnnic-spacing-xs;

    align-self: center;

    &__import {
      background-color: rgba(
        $unnnic-color-brand-weni,
        $unnnic-opacity-level-light
      );

      :deep(.unnnic-icon) {
        svg {
          & .primary {
            fill: $unnnic-color-brand-weni;
          }
        }
      }
    }

    &__delete {
      user-select: none;
    }
  }
}
</style>
