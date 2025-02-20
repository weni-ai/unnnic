<template>
  <div class="unnnic-card-container">
    <div class="header">
      <div class="title">
        <span
          class="name"
          :title="name.length > 25 ? name : null"
        >
          {{ name }}
        </span>

        <div
          v-if="subtitle"
          class="subtitle"
        >
          {{ subtitle }}
        </div>
      </div>

      <slot name="header-buttons" />
    </div>

    <div
      v-if="description"
      class="description"
    >
      {{ description }}
    </div>

    <div
      v-if="descriptionRow || descriptionRowInfo"
      class="description-row-container"
    >
      <div
        v-if="descriptionRow"
        class="description-row"
      >
        {{ descriptionRow }}
      </div>

      <UnnnicToolTip
        v-if="descriptionRowInfo"
        side="top"
        :text="descriptionRowInfo"
        enabled
      >
        <UnnnicIcon
          class="info"
          icon="information-circle-4"
          size="sm"
          scheme="neutral-soft"
        ></UnnnicIcon>
      </UnnnicToolTip>
    </div>

    <div class="separator" />

    <slot name="content" />

    <div
      class="statuses"
      :style="{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minStatusWidth}, 1fr))`,
      }"
    >
      <div
        v-for="(status, index) in statuses"
        :key="index"
        class="status"
      >
        <div class="title">{{ status.title }}</div>

        <div class="content">
          <UnnnicAvatarIcon
            :icon="status.icon"
            :scheme="status.scheme"
            size="xs"
          />

          <div class="number">
            {{ status.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicAvatarIcon from '../AvatarIcon/AvatarIcon.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';
import UnnnicIcon from '../Icon.vue';
import { unnnicFontSize } from '../config';

export default {
  components: {
    UnnnicAvatarIcon,
    UnnnicToolTip,
    UnnnicIcon,
  },

  props: {
    name: {
      type: String,
      default: '',
    },

    subtitle: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    descriptionRow: {
      type: String,
      default: '',
    },

    descriptionRowInfo: {
      type: String,
      default: '',
    },

    statuses: {
      type: Array,
    },

    minStatusWidth: {
      type: [String, Number],
      default: 5.625 * unnnicFontSize,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

$calculated-width: 6 * $unnnic-font-size;

.unnnic-card-container {
  padding: $unnnic-inset-sm;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  border-radius: $unnnic-border-radius-md;

  .separator {
    height: $unnnic-border-width-thinner;
    background-color: $unnnic-color-neutral-lightest;
    margin: $unnnic-spacing-stack-xs 0;
  }

  &--highlighted {
    color: $unnnic-color-brand-weni;
    font-weight: $unnnic-font-weight-bold;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% - #{$calculated-width});
      margin-right: $unnnic-spacing-inline-xs;

      .name {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-bold;
        font-size: $unnnic-font-size-body-lg;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
        color: $unnnic-color-neutral-darkest;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }

      .subtitle {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
        color: $unnnic-color-neutral-cloudy;
      }
    }
  }

  .description {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-cloudy;
    margin: $unnnic-spacing-stack-sm 0;
  }

  .description-row-container {
    display: flex;

    .description-row {
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-bold;
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      color: $unnnic-color-neutral-cloudy;
      margin-right: $unnnic-spacing-inline-xs;
    }
  }

  .statuses {
    display: grid;
    justify-content: space-between;
    gap: $unnnic-spacing-inline-xs;
    grid-template-columns: repeat(
      auto-fit,
      minmax(5.625 * $unnnic-font-size, 1fr)
    );

    .status {
      flex: 1;

      .title {
        font-family: $unnnic-font-family-secondary;
        font-weight: $unnnic-font-weight-regular;
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
        color: $unnnic-color-neutral-dark;
      }

      .content {
        margin-top: $unnnic-spacing-stack-nano;
        display: flex;
        align-items: center;

        .number {
          margin-left: $unnnic-spacing-inline-xs;
          font-family: $unnnic-font-family-secondary;
          font-weight: $unnnic-font-weight-black;
          font-size: $unnnic-font-size-body-gt;
          line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
          color: $unnnic-color-neutral-darkest;
        }
      }
    }
  }
}
</style>
