<template>
  <div
    ref="tooltip"
    :class="{
      'unnnic-tooltip': enabled || forceOpen,
      'force-open': forceOpen,
    }"
    @mouseover="handleResize"
  >
    <slot />
    <span
      v-show="enabled || forceOpen"
      ref="label"
      :class="['unnnic-tooltip-label', `unnnic-tooltip-label-${side}`]"
      :style="{ maxWidth: maxWidth, left: leftPos, top: topPos }"
      data-testid="tooltip-label"
    >
      <template v-if="enableHtml">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <section v-html="text"></section>
      </template>
      <template
        v-for="(line, index) in text.split('\n')"
        v-else
        :key="index"
      >
        {{ line }}
        <br />
      </template>

      <template v-if="shortcutText">
        <span
          class="unnnic-tooltip-label-shortcut"
          data-testid="tooltip-label-shortcut"
        >
          {{ shortcutText }}
        </span>
      </template>
    </span>
  </div>
</template>

<script>
export default {
  name: 'UnnnicTooltip',
  props: {
    text: {
      type: String,
      default: '',
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    forceOpen: {
      type: Boolean,
      default: false,
    },
    side: {
      type: String,
      default: 'right',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].indexOf(value) !== -1;
      },
    },
    maxWidth: {
      type: String,
      default: '',
    },
    shortcutText: {
      type: String,
      default: null,
    },
    enableHtml: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      topPos: null,
      leftPos: null,
    };
  },
  watch: {
    side() {
      this.getRightPost(this.$refs.tooltip);
    },
  },
  mounted() {
    this.handleResize();

    window.addEventListener('scroll', this.handleResize);
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleResize);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.getRightPost(this.$refs.tooltip);
    },
    getRightPost(element) {
      const elementPos = element.getBoundingClientRect();

      if (element && this.$refs.label) {
        if (this.side === 'right') {
          this.leftPos = `${elementPos.x + elementPos.width + 8}px`;
          this.topPos = `${elementPos.y + elementPos.height / 2 - this.$refs.label.offsetHeight / 2}px`;
        } else if (this.side === 'left') {
          this.leftPos = `${elementPos.x - this.$refs.label.offsetWidth - 8}px`;
          this.topPos = `${elementPos.y + elementPos.height / 2 - this.$refs.label.offsetHeight / 2}px`;
        } else if (this.side === 'top') {
          this.leftPos = `${elementPos.x + elementPos.width / 2 - this.$refs.label.clientWidth / 2}px`;
          this.topPos = `${elementPos.y - this.$refs.label.offsetHeight - 8}px`;
        } else if (this.side === 'bottom') {
          this.leftPos = `${elementPos.x + elementPos.width / 2 - this.$refs.label.clientWidth / 2}px`;
          this.topPos = `${elementPos.y + elementPos.height + 8}px`;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-tooltip {
  position: relative;
  display: inline-block;
  overflow-wrap: break-word;
}

.unnnic-tooltip-label {
  z-index: 1;
  visibility: hidden;
  text-align: center;
  position: fixed;
  width: max-content;
  min-width: 2 * $unnnic-font-size;
  box-sizing: border-box;
  width: auto;
  display: flex;
  justify-content: center;
  gap: $unnnic-spacing-xs;
  align-items: center;

  background-color: $unnnic-color-neutral-black;
  color: $unnnic-color-neutral-snow;
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-inset-nano;
  box-shadow: $unnnic-shadow-level-near;
  font-size: $unnnic-font-size-body-md;
  font-family: $unnnic-font-family-secondary;
  font-weight: $unnnic-font-weight-regular;
  line-height: ($unnnic-font-size-body-md + $unnnic-line-height-medium);

  &::after {
    content: '';
    position: absolute;
    border-width: 5px;
    border-style: solid;
  }

  &-top {
    position: fixed;
    &::after {
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-color: $unnnic-color-neutral-black transparent transparent
        transparent;
    }
  }

  &-bottom {
    position: fixed;
    &::after {
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-color: transparent transparent $unnnic-color-neutral-black
        transparent;
    }
  }
  &-right {
    position: fixed;
    &::after {
      top: 50%;
      right: 100%;
      margin-top: -5px;
      border-color: transparent $unnnic-color-neutral-black transparent
        transparent;
    }
  }
  &-left {
    position: fixed;
    &::after {
      top: 50%;
      left: 100%;
      margin-top: -5px;
      border-color: transparent transparent transparent
        $unnnic-color-neutral-black;
    }
  }

  &-shortcut {
    background-color: $unnnic-color-neutral-darkest;
    border-radius: $unnnic-border-radius-sm;
    padding: calc($unnnic-inset-nano / 2) $unnnic-inset-nano;
  }
}

.unnnic-tooltip.force-open {
  .unnnic-tooltip-label {
    visibility: visible;
  }
}

.unnnic-tooltip:hover {
  .unnnic-tooltip-label {
    visibility: visible;
    width: auto;
  }
}
</style>
