<template>
  <div class="unnnic-import-card">
    <div class="unnnic-import-card__data">
      <div v-if="isImporting" class="unnnic-import-card__data__title">
        {{ $t('import_card.importing') }}...
      </div>
      <div v-else class="unnnic-import-card__data__title">
        {{ title }}
      </div>

      <div v-if="subtitle && isImporting" class="unnnic-import-card__data__subtitle">
        <div v-if="subtitle && isImporting" class="unnnic-import-card__data__subtitle__text">
          {{ subtitle }}
        </div>
        <div v-if="subtitle && isImporting" class="unnnic-import-card__data__subtitle__progress">
          &nbsp;- {{ importProgress }}%
        </div>
      </div>
    </div>

    <div class="unnnic-import-card__buttons">
      <unnnic-button
        v-if="canImport"
        class="unnnic-import-card__buttons__import"
        size="small"
        :icon-center="uploadIcon"
        type="primary"
        @click="importFile"
      >
        <input
          type="file"
          ref="file"
          :accept="acceptedFormats"
          @change="handleFileChange"
          style="display: none;"
        />
      </unnnic-button>

      <unnnic-button
        v-if="canDelete"
        class="unnnic-import-card__buttons__delete"
        size="small"
        :icon-center="`close-1`"
        type="primary"
        @click="emitDeletion"
      />
    </div>
  </div>
</template>

<script>
import unnnicButton from '../Button/Button.vue';

export default {
  name: 'ImportCard',
  components: {
    unnnicButton,
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

  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  border-radius: $unnnic-border-radius-md;

  background-color: $unnnic-color-background-snow;
  padding: $unnnic-squish-md;

  &__data {
    align-self: center;

    flex: 1;
    gap: $unnnic-spacing-stack-nano;

    font-family: $unnnic-font-family-secondary;

    &__title {
      color: $unnnic-color-neutral-darkest;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-bold;
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

    margin-left: $unnnic-spacing-inline-xs;

    align-self: center;

    &__import {
      background-color: rgba($unnnic-color-brand-weni, $unnnic-opacity-level-light);

      ::v-deep .unnnic-icon {
        svg {
          & .primary {
            fill: $unnnic-color-brand-weni;
          }
        }
      }
    }

    &__delete {
      background-color: rgba($unnnic-color-feedback-red, $unnnic-opacity-level-light);

      ::v-deep .unnnic-icon {
        svg {
          & .primary {
            fill: $unnnic-color-feedback-red;
          }
        }
      }
    }
  }
}
</style>
