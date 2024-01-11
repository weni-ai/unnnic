<template>
  <span :class="['dropdown', { active }]" ref="dropdown">
    <slot> </slot>
    <div class="dropdown-data" :style="{ position: 'fixed', ...positions }" ref="dropdown-data">
      <slot name="inside" :width="`${width}px`" :height="`${height}px`"></slot>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'automatic',
    },

    modelValue: Boolean,

    position: {
      type: String,
      default: 'bottom-left',
    },
  },

  data() {
    return {
      clientHeight: 0,
      clientWidth: 0,

      x: 0,
      y: 0,
      width: 0,
      height: 0,

      data: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    };
  },

  computed: {
    active() {
      if (this.type === 'manual') {
        return this.modelValue;
      }

      return false;
    },

    positions() {
      let top;
      let left;

      if (this.position.startsWith('bottom')) {
        top = this.y + this.height;

        if (top + this.data.height > this.clientHeight) {
          top = this.clientHeight - this.data.height;

          if (this.y >= this.data.height) {
            top = this.y - this.data.height;
          }
        }
      } else if (this.position.startsWith('top')) {
        top = this.y - this.data.height;

        if (top < 0) {
          top = 0;

          if (this.y + this.height + this.data.height <= this.clientHeight) {
            top = this.y + this.height;
          }
        }
      }

      if (this.position.endsWith('right')) {
        left = this.x + this.width;

        if (left + this.data.width > this.clientWidth) {
          left = this.clientWidth - this.data.width;

          if (this.x >= this.data.width) {
            left = this.x - this.data.width;
          }
        }
      } else if (this.position.endsWith('left')) {
        left = this.x - this.data.width;

        if (left < 0) {
          left = 0;

          if (this.x + this.width + this.data.width <= this.clientWidth) {
            left = this.x + this.width;
          }
        }
      }

      return {
        left: `${left}px`,
        top: `${top}px`,
      };
    },
  },

  mounted() {
    this.calculatePosition();

    window.addEventListener('scroll', this.calculatePosition);
    window.addEventListener('resize', this.calculatePosition);
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.calculatePosition);
    window.removeEventListener('resize', this.calculatePosition);
  },

  methods: {
    calculatePosition() {
      const rect = this.$refs.dropdown.getBoundingClientRect();
      const dataRect = this.$refs['dropdown-data'].getBoundingClientRect();

      this.clientHeight = document.documentElement.clientHeight;
      this.clientWidth = document.documentElement.clientWidth;

      this.x = rect.x;
      this.y = rect.y;
      this.width = rect.width;
      this.height = rect.height;

      this.data.x = dataRect.x;
      this.data.y = dataRect.y;
      this.data.width = dataRect.width;
      this.data.height = dataRect.height;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.dropdown {
  position: relative;

  .dropdown-data {
    z-index: 1;
    pointer-events: none;
    display: none;
  }

  &.active .dropdown-data {
    pointer-events: auto;
    display: block;
  }
}
</style>
