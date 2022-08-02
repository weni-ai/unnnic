<template>
  <div
    :class="[
      'unnnic-progress-bar',
      type,
      {
        inline,
        'has-subtitle':
        subtitle,
        'can-close': canClose,
      }
    ]"
  >
    <div class="main">
      <div v-if="title && !subtitle" class="title">{{ title }}</div>

      <div class="progress-bar-container">
        <div class="progress-container">
          <div class="bar" :style="{ width: `${value}%` }">
            <div
              v-if="type === 'secondary' && !subtitle"
              class="percentage"
            >
              {{ percentage }}%
            </div>
          </div>
        </div>

        <div
          v-if="type === 'primary' && !subtitle"
          class="percentage"
        >
          {{ percentage }}%
        </div>
      </div>

      <div v-if="type === 'primary' && subtitle" class="footer">
        <div class="subtitle">{{ subtitle }}</div>

        <div
          class="percentage"
        >
          {{ percentage }}%
        </div>
      </div>
    </div>

    <div v-if="type === 'primary' && subtitle && canClose" class="close">
      <unnnic-icon
        icon="close-1"
        scheme="neutral-clean"
        size="sm"
        clickable
        @click="$emit('close')"
      ></unnnic-icon>
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },

  props: {
    value: {
      type: Number,
    },

    type: {
      type: String,
      default: 'primary',
    },

    title: {
      type: String,
    },

    subtitle: {
      type: String,
    },

    inline: {
      type: Boolean,
    },

    canClose: {
      type: Boolean,
    },
  },

  computed: {
    percentage() {
      return Math.floor(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-progress-bar {
  &.primary, &.secondary {
    background-color: $unnnic-color-background-carpet;
    border-radius: $unnnic-border-radius-sm;
    padding: $unnnic-squish-md;
    box-shadow: $unnnic-shadow-level-separated;
    display: flex;

    .main {
      flex: 1;
    }

    .title {
      color: $unnnic-color-neutral-darkest;
      font-family: $unnnic-font-family-primary;
      font-size: $unnnic-font-size-title-sm;
      line-height: $unnnic-font-size-title-sm + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-regular;
      margin-bottom: $unnnic-spacing-stack-nano;
    }

    &.has-subtitle .footer .percentage,
    .progress-bar-container .percentage,
    .progress-bar-container .progress-container .bar .percentage {
      color: $unnnic-color-neutral-dark;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-bold;
      user-select: none;
    }

    .progress-bar-container {
      display: flex;
      align-items: center;

      .progress-container {
        background-color: rgba($unnnic-color-aux-blue, $unnnic-opacity-level-light);
        height: 1.25rem;
        min-width: 14rem;
        border-radius: $unnnic-border-radius-pill;
        overflow: hidden;
        flex: 1;

        .bar {
          background-color: $unnnic-color-aux-blue;
          height: 100%;
        }
      }
    }
  }

  &.primary {
    .progress-bar-container {
      .percentage {
        margin-left: $unnnic-spacing-inline-ant;
      }
    }

    &.inline {
      .main {
        display: flex;
        align-content: center;
      }

      .title {
        margin-bottom: 0;
        font-family: $unnnic-font-family-secondary;
        margin-right: $unnnic-spacing-inline-ant;
        font-size: $unnnic-font-size-body-lg;
        line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
      }

      .progress-bar-container {
        flex: 1;
      }
    }

    &.has-subtitle {
      &:not(.can-close) .progress-bar-container .progress-container {
        height: 0.5rem;
      }

      .footer {
        margin-top: $unnnic-spacing-stack-nano;
        display: flex;
        align-items: center;

        .subtitle {
          color: $unnnic-color-neutral-cloudy;
          font-family: $unnnic-font-family-secondary;
          font-size: $unnnic-font-size-body-gt;
          line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
          font-weight: $unnnic-font-weight-regular;
          margin-right: $unnnic-spacing-inline-xs;
          flex: 1;
        }

        .percentage {
          font-size: $unnnic-font-size-body-md;
          line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
        }
      }

      .close {
        margin-left: $unnnic-spacing-inline-nano;
        line-height: 1rem;
      }
    }
  }

  &.secondary {
    .progress-bar-container {
      .progress-container {
        .bar {
          text-align: right;

          .percentage {
            line-height: 1.25rem;
            margin: 0 $unnnic-spacing-inline-xs;
          }
        }
      }
    }
  }
}
</style>
